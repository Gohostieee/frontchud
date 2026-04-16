import type { CharacterState } from "@bugchud/core";
import type { RaceDefinition } from "@bugchud/core/content";
import { v } from "convex/values";
import type { Doc, Id } from "./_generated/dataModel";
import {
  buildExtensionsWithStoredAttributeRolls,
  computeRolledAttributesForRace,
  getStoredAttributeRollsFromExtensions,
} from "../lib/character-attribute-rolls";
import {
  type GuidedBackgroundSpecialSelections,
  applyGuidedBackgroundSpecialSelectionsToState,
  getActiveGuidedBackgroundSpecials,
  getDreadTonguedAutoGrants,
  getMajorBionicIds,
  sanitizeGuidedBackgroundSpecialSelections,
  validateGuidedBackgroundSpecialSelections,
} from "../lib/character-background-special-steps";
import {
  mutation,
  query,
  type MutationCtx,
  type QueryCtx,
} from "./_generated/server";
import {
  BUGCHUD_RULESET_ID,
  BUGCHUD_RULESET_VERSION,
  BUGCHUD_SCHEMA_VERSION,
  assertCharacterBackgroundSelectionAllowed,
  assertCharacterInitializationRefs,
  assertGuidedBackgroundSpecialSelectionRefs,
  bugchudCore,
  buildCharacterMetadata,
  characterInitializationInputValidator,
  characterStateValidator,
  characterWizardStepValidator,
  clampListLimit,
  guidedBackgroundSpecialSelectionsValidator,
  normalizeCharacterState,
  normalizeSearchText,
  previewCharacterState,
  requireViewerTokenIdentifier,
  serializeValidationResult,
  toBugchudCharacterInput,
  toBugchudCharacterState,
  toConvexCharacterState,
} from "./bugchud";

const characterStatusValidator = v.union(
  v.literal("draft"),
  v.literal("complete"),
);
const nullableCharacterCategoryIdValidator = v.union(
  v.id("characterCategories"),
  v.null(),
);

type CharacterWorkflowStatus = "draft" | "complete";
type CharacterWizardStep =
  | "identity"
  | "lineage"
  | "background"
  | "path"
  | "faith"
  | "gear"
  | "review";
type CharacterDoc = Doc<"characters">;
type CharacterCategoryDoc = Doc<"characterCategories">;

const compareCharactersByManagerOrder = (
  left: CharacterDoc,
  right: CharacterDoc,
) => {
  const orderDelta =
    getCharacterManagerSortOrder(left) - getCharacterManagerSortOrder(right);
  if (orderDelta !== 0) {
    return orderDelta;
  }

  return right.updatedAt - left.updatedAt;
};

const compareCategoriesByOrder = (
  left: CharacterCategoryDoc,
  right: CharacterCategoryDoc,
) => {
  const orderDelta = left.sortOrder - right.sortOrder;
  if (orderDelta !== 0) {
    return orderDelta;
  }

  return left.label.localeCompare(right.label);
};

const getCharacterManagerCategoryId = (character: CharacterDoc) =>
  character.managerCategoryId ?? null;

const getCharacterManagerSortOrder = (character: CharacterDoc) =>
  character.managerSortOrder ?? -character.updatedAt;

const getCharacterArchivedAt = (character: CharacterDoc) =>
  character.archivedAt ?? (character.isArchived ? character.updatedAt : null);

const isCharacterCategoryOwned = (
  categories: CharacterCategoryDoc[],
  categoryId: Id<"characterCategories"> | null,
) => {
  if (!categoryId) {
    return true;
  }

  return categories.some((category) => category._id === categoryId);
};

const toCharacterSummary = (
  character: Awaited<ReturnType<typeof getCharacterByBugchudId>>,
) => {
  if (!character) {
    return null;
  }

  return {
    _id: character._id,
    bugchudId: character.bugchudId,
    name: character.name,
    status: character.status,
    currentStep: character.currentStep,
    completedAt: character.completedAt ?? null,
    isArchived: character.isArchived,
    archivedAt: getCharacterArchivedAt(character),
    managerCategoryId: getCharacterManagerCategoryId(character),
    managerSortOrder: getCharacterManagerSortOrder(character),
    updatedAt: character.updatedAt,
    raceRef: character.state.identity.raceRef,
    originRef: character.state.identity.originRef,
    backgroundCount: character.state.identity.backgroundRefs.length,
    currentFate: character.state.progression.currentFate,
  };
};

const listOwnedCharacters = async (
  ctx: QueryCtx | MutationCtx,
  ownerTokenIdentifier: string,
) => {
  const characters: CharacterDoc[] = [];

  for await (const character of ctx.db
    .query("characters")
    .withIndex("by_ownerTokenIdentifier", (q) =>
      q.eq("ownerTokenIdentifier", ownerTokenIdentifier),
    )) {
    characters.push(character);
  }

  return characters;
};

const listOwnedCharacterCategories = async (
  ctx: QueryCtx | MutationCtx,
  ownerTokenIdentifier: string,
) => {
  const categories: CharacterCategoryDoc[] = [];

  for await (const category of ctx.db
    .query("characterCategories")
    .withIndex("by_ownerTokenIdentifier", (q) =>
      q.eq("ownerTokenIdentifier", ownerTokenIdentifier),
    )) {
    categories.push(category);
  }

  return categories.sort(compareCategoriesByOrder);
};

const getCharacterByBugchudId = async (
  ctx: QueryCtx | MutationCtx,
  ownerTokenIdentifier: string,
  bugchudId: string,
) =>
  ctx.db
    .query("characters")
    .withIndex("by_ownerTokenIdentifier_and_bugchudId", (q) =>
      q
        .eq("ownerTokenIdentifier", ownerTokenIdentifier)
        .eq("bugchudId", bugchudId),
    )
    .unique();

const requireOwnedCharacter = async (
  ctx: QueryCtx | MutationCtx,
  ownerTokenIdentifier: string,
  bugchudId: string,
) => {
  const existing = await getCharacterByBugchudId(
    ctx,
    ownerTokenIdentifier,
    bugchudId,
  );

  if (!existing) {
    throw new Error("Character not found.");
  }
  if (existing.ownerTokenIdentifier !== ownerTokenIdentifier) {
    throw new Error("You do not own this character.");
  }

  return existing;
};

const requireOwnedCategory = async (
  ctx: QueryCtx | MutationCtx,
  ownerTokenIdentifier: string,
  categoryId: Id<"characterCategories">,
) => {
  const category = await ctx.db.get(categoryId);

  if (!category || category.ownerTokenIdentifier !== ownerTokenIdentifier) {
    throw new Error("Category not found.");
  }

  return category;
};

const appendToCategorySortOrder = (
  characters: CharacterDoc[],
  categoryId: Id<"characterCategories"> | null,
) => {
  const existingInCategory = characters
    .filter(
      (character) =>
        !character.isArchived &&
        getCharacterManagerCategoryId(character) === categoryId,
    )
    .sort(compareCharactersByManagerOrder);

  return existingInCategory.length;
};

const persistCategorySortOrder = async (
  ctx: MutationCtx,
  categories: CharacterCategoryDoc[],
) => {
  const sorted = [...categories].sort(compareCategoriesByOrder);

  for (let index = 0; index < sorted.length; index += 1) {
    const category = sorted[index];
    if (category.sortOrder !== index) {
      await ctx.db.patch(category._id, {
        sortOrder: index,
        updatedAt: Date.now(),
      });
    }
  }
};

const persistCharacterSortOrder = async (
  ctx: MutationCtx,
  characters: CharacterDoc[],
  categoryId: Id<"characterCategories"> | null,
) => {
  const orderedCharacters = [...characters];

  for (let index = 0; index < orderedCharacters.length; index += 1) {
    const character = orderedCharacters[index];
    const nextCategoryId = categoryId;
    const nextSortOrder = index;
    const patch: Partial<CharacterDoc> = {};

    if (getCharacterManagerCategoryId(character) !== nextCategoryId) {
      patch.managerCategoryId = nextCategoryId;
    }
    if (getCharacterManagerSortOrder(character) !== nextSortOrder) {
      patch.managerSortOrder = nextSortOrder;
    }

    if (Object.keys(patch).length > 0) {
      await ctx.db.patch(character._id, patch);
    }
  }
};

const persistCharacter = async (
  ctx: MutationCtx,
  ownerTokenIdentifier: string,
  state: CharacterState,
  workflow: {
    status: CharacterWorkflowStatus;
    currentStep: CharacterWizardStep;
    completedAt?: number;
    existing?: CharacterDoc;
  },
) => {
  const normalizedState = normalizeCharacterState(state);
  const metadata = buildCharacterMetadata(normalizedState);
  const convexState = toConvexCharacterState(normalizedState) as unknown as Doc<
    "characters"
  >["state"];
  const schemaVersion = BUGCHUD_SCHEMA_VERSION as 2;
  const existing = workflow.existing;
  const allCharacters = await listOwnedCharacters(ctx, ownerTokenIdentifier);
  const initialSortOrder =
    existing?.managerSortOrder ??
    appendToCategorySortOrder(allCharacters, null);

  const value = {
    ownerTokenIdentifier,
    schemaVersion,
    rulesetId: BUGCHUD_RULESET_ID,
    rulesetVersion: BUGCHUD_RULESET_VERSION,
    status: workflow.status,
    currentStep: workflow.currentStep,
    completedAt: workflow.completedAt,
    isArchived: existing?.isArchived ?? false,
    archivedAt:
      existing?.archivedAt ?? (existing?.isArchived ? existing.updatedAt : null),
    managerCategoryId: existing?.managerCategoryId ?? null,
    managerSortOrder: initialSortOrder,
    updatedAt: Date.now(),
    state: convexState,
    ...metadata,
  };

  if (existing) {
    await ctx.db.patch(existing._id, value);
    return ctx.db.get(existing._id);
  }

  const id = await ctx.db.insert("characters", value);
  return ctx.db.get(id);
};

const buildCharacterStateFromInput = (
  input: ReturnType<typeof toBugchudCharacterInput>,
) => {
  const state = bugchudCore.createCharacter(input).toState();
  const storedAttributeRolls = getStoredAttributeRollsFromExtensions(input.extensions);
  if (!storedAttributeRolls) {
    return state;
  }

  state.extensions = buildExtensionsWithStoredAttributeRolls(
    state.extensions,
    storedAttributeRolls,
  ) as CharacterState["extensions"];

  if (!input.raceRef) {
    return state;
  }

  const race = bugchudCore.catalog.mustResolveRef(input.raceRef as never) as RaceDefinition;
  const resolvedAttributes = computeRolledAttributesForRace(
    race,
    storedAttributeRolls.pools,
    state.attributes.glory,
  );
  if (resolvedAttributes) {
    state.attributes = resolvedAttributes;
  }

  return state;
};

const listCatalogDefinitions = <
  TKind extends Parameters<typeof bugchudCore.catalog.listByKind>[0],
>(
  kind: TKind,
) => [...bugchudCore.catalog.listByKind(kind)];

const buildGuidedCharacterStateFromInput = (
  input: ReturnType<typeof toBugchudCharacterInput>,
  specialSelections: GuidedBackgroundSpecialSelections,
) => {
  const state = buildCharacterStateFromInput(input);
  const dreams = listCatalogDefinitions("dream");
  const mutations = listCatalogDefinitions("mutation");
  const bionics = listCatalogDefinitions("bionic");
  const spells = listCatalogDefinitions("spell");
  const active = getActiveGuidedBackgroundSpecials(state.progression.dreamRefs);
  const validMutationIds = new Set(mutations.map((mutation) => mutation.id));
  const validMajorBionicIds = getMajorBionicIds(bionics);
  const validSpellIds = new Set(spells.map((spell) => spell.id));
  const lockedKnownSpellIds = getDreadTonguedAutoGrants(
    dreams,
    state.progression.dreamRefs,
  ).spellIds;
  const selectionIssues = validateGuidedBackgroundSpecialSelections({
    selections: specialSelections,
    active,
    validMutationIds,
    validMajorBionicIds,
    validSpellIds,
    lockedKnownSpellIds,
  });

  if (selectionIssues.length > 0) {
    throw new Error(selectionIssues.join(" "));
  }

  const sanitizedSelections = sanitizeGuidedBackgroundSpecialSelections({
    selections: specialSelections,
    active,
    validMutationIds,
    validMajorBionicIds,
    validSpellIds,
    lockedKnownSpellIds,
  });

  assertGuidedBackgroundSpecialSelectionRefs(sanitizedSelections);

  return applyGuidedBackgroundSpecialSelectionsToState({
    state,
    dreams,
    validSpellIds,
    selections: sanitizedSelections,
  });
};

export const listMine = query({
  args: {
    search: v.optional(v.string()),
    includeArchived: v.optional(v.boolean()),
    limit: v.optional(v.number()),
    status: v.optional(characterStatusValidator),
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const includeArchived = args.includeArchived ?? false;
    const limit = clampListLimit(args.limit);
    const search = args.search?.trim();

    if (search) {
      const searchQuery = ctx.db
        .query("characters")
        .withSearchIndex("search_name", (q) => {
          const scoped = q
            .search("nameLower", normalizeSearchText(search))
            .eq("ownerTokenIdentifier", ownerTokenIdentifier);
          return includeArchived ? scoped : scoped.eq("isArchived", false);
        });

      const results = await searchQuery.take(limit);
      return results
        .filter((character) =>
          args.status ? character.status === args.status : true,
        )
        .map(toCharacterSummary);
    }

    let characters = includeArchived
      ? await ctx.db
          .query("characters")
          .withIndex("by_ownerTokenIdentifier", (q) =>
            q.eq("ownerTokenIdentifier", ownerTokenIdentifier),
          )
          .order("desc")
          .take(limit)
      : await ctx.db
          .query("characters")
          .withIndex("by_ownerTokenIdentifier_and_isArchived", (q) =>
            q
              .eq("ownerTokenIdentifier", ownerTokenIdentifier)
              .eq("isArchived", false),
          )
          .order("desc")
          .take(limit);

    if (args.status) {
      characters = characters.filter(
        (character) => character.status === args.status,
      );
    }

    return characters.map(toCharacterSummary);
  },
});

export const getMine = query({
  args: {
    bugchudId: v.string(),
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    return getCharacterByBugchudId(ctx, ownerTokenIdentifier, args.bugchudId);
  },
});

export const getManagerData = query({
  args: {},
  handler: async (ctx) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const [characters, categories] = await Promise.all([
      listOwnedCharacters(ctx, ownerTokenIdentifier),
      listOwnedCharacterCategories(ctx, ownerTokenIdentifier),
    ]);
    const categoryIds = new Set(categories.map((category) => category._id));
    const summaries = characters
      .map(toCharacterSummary)
      .filter(
        (
          summary,
        ): summary is NonNullable<ReturnType<typeof toCharacterSummary>> =>
          summary !== null,
      )
      .map((summary) => ({
        ...summary,
        managerCategoryId:
          summary.managerCategoryId && categoryIds.has(summary.managerCategoryId)
            ? summary.managerCategoryId
            : null,
      }))
      .sort((left, right) => left.managerSortOrder - right.managerSortOrder);

    return {
      categories: categories.map((category) => ({
        _id: category._id,
        label: category.label,
        sortOrder: category.sortOrder,
        updatedAt: category.updatedAt,
      })),
      characters: summaries.filter((character) => !character.isArchived),
      trashedCharacters: summaries.filter((character) => character.isArchived),
    };
  },
});

export const previewInitialization = query({
  args: {
    input: characterInitializationInputValidator,
    specialSelections: guidedBackgroundSpecialSelectionsValidator,
  },
  handler: async (_ctx, args) => {
    const input = toBugchudCharacterInput(args.input);
    assertCharacterInitializationRefs(input);
    assertCharacterBackgroundSelectionAllowed(input);
    const state = buildGuidedCharacterStateFromInput(
      input,
      structuredClone(args.specialSelections),
    );
    const preview = previewCharacterState(state);

    return {
      normalizedState: preview.normalizedState,
      validation: serializeValidationResult(preview.validation),
      combatProfile: preview.combatProfile,
    };
  },
});

export const previewDraft = query({
  args: {
    state: characterStateValidator,
  },
  handler: async (ctx, args) => {
    await requireViewerTokenIdentifier(ctx);
    const state = toBugchudCharacterState(args.state);
    const preview = previewCharacterState(state);

    return {
      normalizedState: preview.normalizedState,
      validation: serializeValidationResult(preview.validation),
      combatProfile: preview.combatProfile,
    };
  },
});

export const create = mutation({
  args: {
    input: characterInitializationInputValidator,
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const input = toBugchudCharacterInput(args.input);
    assertCharacterInitializationRefs(input);
    assertCharacterBackgroundSelectionAllowed(input);
    const state = buildCharacterStateFromInput(input);

    return persistCharacter(ctx, ownerTokenIdentifier, state, {
      status: "complete",
      currentStep: "review",
      completedAt: Date.now(),
    });
  },
});

export const createDraft = mutation({
  args: {
    input: v.optional(characterInitializationInputValidator),
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const input = toBugchudCharacterInput(args.input ?? {});
    assertCharacterInitializationRefs(input);
    assertCharacterBackgroundSelectionAllowed(input);
    const state = buildCharacterStateFromInput(input);

    return persistCharacter(ctx, ownerTokenIdentifier, state, {
      status: "draft",
      currentStep: "identity",
    });
  },
});

export const createGuidedDraft = mutation({
  args: {
    input: characterInitializationInputValidator,
    specialSelections: guidedBackgroundSpecialSelectionsValidator,
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const input = toBugchudCharacterInput(args.input);
    assertCharacterInitializationRefs(input);
    assertCharacterBackgroundSelectionAllowed(input);
    const state = buildGuidedCharacterStateFromInput(
      input,
      structuredClone(args.specialSelections),
    );

    return persistCharacter(ctx, ownerTokenIdentifier, state, {
      status: "draft",
      currentStep: "review",
    });
  },
});

export const saveDraft = mutation({
  args: {
    bugchudId: v.string(),
    state: characterStateValidator,
    currentStep: characterWizardStepValidator,
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const state = toBugchudCharacterState(args.state);
    assertCharacterBackgroundSelectionAllowed({
      originRef: state.identity.originRef,
      backgroundRefs: state.identity.backgroundRefs,
    });
    const existing = await requireOwnedCharacter(
      ctx,
      ownerTokenIdentifier,
      args.bugchudId,
    );

    if (existing.bugchudId !== state.id) {
      throw new Error("The provided state does not match the target character.");
    }

    return persistCharacter(ctx, ownerTokenIdentifier, state, {
      status: existing.status === "complete" ? "complete" : "draft",
      currentStep: args.currentStep as CharacterWizardStep,
      completedAt: existing.completedAt,
      existing,
    });
  },
});

export const completeDraft = mutation({
  args: {
    bugchudId: v.string(),
    state: characterStateValidator,
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const state = toBugchudCharacterState(args.state);
    assertCharacterBackgroundSelectionAllowed({
      originRef: state.identity.originRef,
      backgroundRefs: state.identity.backgroundRefs,
    });
    const existing = await requireOwnedCharacter(
      ctx,
      ownerTokenIdentifier,
      args.bugchudId,
    );

    if (existing.bugchudId !== state.id) {
      throw new Error("The provided state does not match the target character.");
    }

    return persistCharacter(ctx, ownerTokenIdentifier, state, {
      status: "complete",
      currentStep: "review",
      completedAt: existing.completedAt ?? Date.now(),
      existing,
    });
  },
});

export const updateState = mutation({
  args: {
    bugchudId: v.string(),
    state: characterStateValidator,
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const state = toBugchudCharacterState(args.state);
    const existing = await requireOwnedCharacter(
      ctx,
      ownerTokenIdentifier,
      args.bugchudId,
    );

    if (existing.bugchudId !== state.id) {
      throw new Error("The provided state does not match the target character.");
    }

    return persistCharacter(ctx, ownerTokenIdentifier, state, {
      status: existing.status,
      currentStep: existing.currentStep as CharacterWizardStep,
      completedAt: existing.completedAt,
      existing,
    });
  },
});

export const createCategory = mutation({
  args: {
    label: v.string(),
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const label = args.label.trim();

    if (!label) {
      throw new Error("Category label is required.");
    }

    const categories = await listOwnedCharacterCategories(ctx, ownerTokenIdentifier);
    const now = Date.now();
    const id = await ctx.db.insert("characterCategories", {
      ownerTokenIdentifier,
      label,
      labelLower: normalizeSearchText(label),
      sortOrder: categories.length,
      createdAt: now,
      updatedAt: now,
    });

    return ctx.db.get(id);
  },
});

export const renameCategory = mutation({
  args: {
    categoryId: v.id("characterCategories"),
    label: v.string(),
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const category = await requireOwnedCategory(
      ctx,
      ownerTokenIdentifier,
      args.categoryId,
    );
    const label = args.label.trim();

    if (!label) {
      throw new Error("Category label is required.");
    }

    await ctx.db.patch(category._id, {
      label,
      labelLower: normalizeSearchText(label),
      updatedAt: Date.now(),
    });

    return ctx.db.get(category._id);
  },
});

export const deleteCategory = mutation({
  args: {
    categoryId: v.id("characterCategories"),
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const category = await requireOwnedCategory(
      ctx,
      ownerTokenIdentifier,
      args.categoryId,
    );
    const [allCharacters, categories] = await Promise.all([
      listOwnedCharacters(ctx, ownerTokenIdentifier),
      listOwnedCharacterCategories(ctx, ownerTokenIdentifier),
    ]);
    const assignedCharacters = allCharacters.filter(
      (character) => getCharacterManagerCategoryId(character) === category._id,
    );
    const movedActiveCharacters = assignedCharacters
      .filter((character) => !character.isArchived)
      .sort(compareCharactersByManagerOrder);
    const uncategorizedActiveCharacters = allCharacters
      .filter(
        (character) =>
          !character.isArchived &&
          getCharacterManagerCategoryId(character) === null,
      )
      .sort(compareCharactersByManagerOrder);

    await persistCharacterSortOrder(
      ctx,
      [...uncategorizedActiveCharacters, ...movedActiveCharacters],
      null,
    );

    for (const character of assignedCharacters.filter(
      (entry) => entry.isArchived,
    )) {
      await ctx.db.patch(character._id, {
        managerCategoryId: null,
      });
    }

    await ctx.db.delete(category._id);
    await persistCategorySortOrder(
      ctx,
      categories.filter((entry) => entry._id !== category._id),
    );

    return { deletedCategoryId: category._id };
  },
});

export const moveInManager = mutation({
  args: {
    bugchudId: v.string(),
    targetCategoryId: nullableCharacterCategoryIdValidator,
    targetIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const [existing, allCharacters, categories] = await Promise.all([
      requireOwnedCharacter(ctx, ownerTokenIdentifier, args.bugchudId),
      listOwnedCharacters(ctx, ownerTokenIdentifier),
      listOwnedCharacterCategories(ctx, ownerTokenIdentifier),
    ]);

    if (existing.isArchived) {
      throw new Error("Archived characters cannot be reordered.");
    }
    if (
      args.targetCategoryId &&
      !isCharacterCategoryOwned(categories, args.targetCategoryId)
    ) {
      throw new Error("Target category not found.");
    }

    const sourceCategoryId = getCharacterManagerCategoryId(existing);
    const activeCharacters = allCharacters.filter((character) => !character.isArchived);
    const sourceCharacters = activeCharacters
      .filter(
        (character) =>
          character._id !== existing._id &&
          getCharacterManagerCategoryId(character) === sourceCategoryId,
      )
      .sort(compareCharactersByManagerOrder);
    const targetCharacters = activeCharacters
      .filter(
        (character) =>
          character._id !== existing._id &&
          getCharacterManagerCategoryId(character) === args.targetCategoryId,
      )
      .sort(compareCharactersByManagerOrder);
    const insertionIndex = Math.max(
      0,
      Math.min(Math.floor(args.targetIndex), targetCharacters.length),
    );

    targetCharacters.splice(insertionIndex, 0, existing);

    if (sourceCategoryId === args.targetCategoryId) {
      await persistCharacterSortOrder(ctx, targetCharacters, args.targetCategoryId);
    } else {
      await persistCharacterSortOrder(ctx, sourceCharacters, sourceCategoryId);
      await persistCharacterSortOrder(ctx, targetCharacters, args.targetCategoryId);
    }

    return ctx.db.get(existing._id);
  },
});

export const archive = mutation({
  args: {
    bugchudId: v.string(),
    isArchived: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const existing = await requireOwnedCharacter(
      ctx,
      ownerTokenIdentifier,
      args.bugchudId,
    );
    const nextArchived = args.isArchived ?? true;
    const allCharacters = await listOwnedCharacters(ctx, ownerTokenIdentifier);
    const categories = await listOwnedCharacterCategories(ctx, ownerTokenIdentifier);

    if (nextArchived) {
      const remainingInCategory = allCharacters
        .filter(
          (character) =>
            character._id !== existing._id &&
            !character.isArchived &&
            getCharacterManagerCategoryId(character) ===
              getCharacterManagerCategoryId(existing),
        )
        .sort(compareCharactersByManagerOrder);

      await ctx.db.patch(existing._id, {
        isArchived: true,
        archivedAt: Date.now(),
        updatedAt: Date.now(),
        managerCategoryId: getCharacterManagerCategoryId(existing),
        managerSortOrder: getCharacterManagerSortOrder(existing),
      });
      await persistCharacterSortOrder(
        ctx,
        remainingInCategory,
        getCharacterManagerCategoryId(existing),
      );

      return ctx.db.get(existing._id);
    }

    const restoredCategoryId =
      getCharacterManagerCategoryId(existing) &&
      isCharacterCategoryOwned(categories, getCharacterManagerCategoryId(existing))
        ? getCharacterManagerCategoryId(existing)
        : null;
    const restoredCharacters = allCharacters
      .filter(
        (character) =>
          character._id !== existing._id &&
          !character.isArchived &&
          getCharacterManagerCategoryId(character) === restoredCategoryId,
      )
      .sort(compareCharactersByManagerOrder);
    const restoredCharacter = {
      ...existing,
      isArchived: false,
      archivedAt: null,
      managerCategoryId: restoredCategoryId,
      managerSortOrder: restoredCharacters.length,
      updatedAt: Date.now(),
    };

    await persistCharacterSortOrder(
      ctx,
      [...restoredCharacters, restoredCharacter as CharacterDoc],
      restoredCategoryId,
    );
    await ctx.db.patch(existing._id, {
      isArchived: false,
      archivedAt: null,
      managerCategoryId: restoredCategoryId,
      managerSortOrder: restoredCharacters.length,
      updatedAt: Date.now(),
    });

    return ctx.db.get(existing._id);
  },
});
