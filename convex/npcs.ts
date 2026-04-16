import type { NpcInitializationInput, NpcState } from "@bugchud/core";
import { v } from "convex/values";
import type { Doc, Id } from "./_generated/dataModel";
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
  activeEffectValidator,
  actorKindValidator,
  assertNpcInitializationRefs,
  assertNpcStateIsValid,
  bodyStateValidator,
  bugchudCore,
  buildNpcMetadata,
  clampListLimit,
  faithStateValidator,
  inventoryStateValidator,
  loadoutStateValidator,
  magicStateValidator,
  normalizeNpcState,
  normalizeSearchText,
  npcStateValidator,
  npcWizardStepValidator,
  ownedItemStackValidator,
  previewNpcState,
  registryRefValidator,
  requireViewerTokenIdentifier,
  resourceStateMapValidator,
  serializeValidationResult,
  toBugchudNpcInput,
  toBugchudNpcState,
  toConvexNpcState,
} from "./bugchud";

const npcStatusValidator = v.union(v.literal("draft"), v.literal("complete"));
const nullableNpcCategoryIdValidator = v.union(v.id("npcCategories"), v.null());
const jsonBlobValidator = v.record(v.string(), v.any());

const npcWorkflowInputValidator = v.object({
  id: v.optional(v.string()),
  name: v.optional(v.string()),
  creatureRef: v.optional(registryRefValidator("creature")),
  npcLoadoutRef: v.optional(registryRefValidator("npcLoadout")),
  allegiance: v.optional(v.string()),
  actorKind: v.optional(actorKindValidator),
  startingItems: v.optional(v.array(ownedItemStackValidator)),
  tags: v.optional(v.array(v.string())),
  extensions: v.optional(jsonBlobValidator),
  mutationRefs: v.optional(v.array(registryRefValidator("mutation"))),
  bionicRefs: v.optional(v.array(registryRefValidator("bionic"))),
  grimoireRefs: v.optional(v.array(registryRefValidator("grimoire"))),
  knownSpellRefs: v.optional(v.array(registryRefValidator("spell"))),
  preparedSpellRefs: v.optional(v.array(registryRefValidator("spell"))),
  pantheonRef: v.optional(registryRefValidator("pantheon")),
  patronRef: v.optional(registryRefValidator("patron")),
  boonRefs: v.optional(v.array(registryRefValidator("boon"))),
  covenantRefs: v.optional(v.array(registryRefValidator("covenant"))),
  relicRefs: v.optional(v.array(registryRefValidator("relic"))),
  body: v.optional(bodyStateValidator),
  inventory: v.optional(inventoryStateValidator),
  loadout: v.optional(loadoutStateValidator),
  magic: v.optional(magicStateValidator),
  faith: v.optional(faithStateValidator),
  resources: v.optional(resourceStateMapValidator),
  activeEffects: v.optional(v.array(activeEffectValidator)),
});

type NpcWorkflowStatus = "draft" | "complete";
type NpcWizardStep =
  | "identity"
  | "template"
  | "body"
  | "doctrine"
  | "gear"
  | "review";
type NpcDoc = Doc<"npcs">;
type NpcCategoryDoc = Doc<"npcCategories">;
type NpcWorkflowInput = {
  id?: string;
  name?: string;
  creatureRef?: { kind: "creature"; id: string };
  npcLoadoutRef?: { kind: "npcLoadout"; id: string };
  allegiance?: string;
  actorKind?: "creature" | "npc" | "mount";
  startingItems?: NpcInitializationInput["startingItems"];
  tags?: string[];
  extensions?: Record<string, unknown>;
  mutationRefs?: NpcState["body"]["mutationRefs"];
  bionicRefs?: NpcState["body"]["bionicRefs"];
  grimoireRefs?: NpcState["magic"]["grimoireRefs"];
  knownSpellRefs?: NpcState["magic"]["knownSpellRefs"];
  preparedSpellRefs?: NpcState["magic"]["preparedSpellRefs"];
  pantheonRef?: NpcState["faith"]["pantheonRef"];
  patronRef?: NpcState["faith"]["patronRef"];
  boonRefs?: NpcState["faith"]["boonRefs"];
  covenantRefs?: NpcState["faith"]["covenantRefs"];
  relicRefs?: NpcState["faith"]["relicRefs"];
  body?: NpcState["body"];
  inventory?: NpcState["inventory"];
  loadout?: NpcState["loadout"];
  magic?: NpcState["magic"];
  faith?: NpcState["faith"];
  resources?: NpcState["resources"];
  activeEffects?: NpcState["activeEffects"];
};

const compareNpcsByManagerOrder = (left: NpcDoc, right: NpcDoc) => {
  const orderDelta = getNpcManagerSortOrder(left) - getNpcManagerSortOrder(right);
  if (orderDelta !== 0) {
    return orderDelta;
  }

  return right.updatedAt - left.updatedAt;
};

const compareCategoriesByOrder = (left: NpcCategoryDoc, right: NpcCategoryDoc) => {
  const orderDelta = left.sortOrder - right.sortOrder;
  if (orderDelta !== 0) {
    return orderDelta;
  }

  return left.label.localeCompare(right.label);
};

const getNpcManagerCategoryId = (npc: NpcDoc) => npc.managerCategoryId ?? null;
const getNpcManagerSortOrder = (npc: NpcDoc) => npc.managerSortOrder ?? -npc.updatedAt;
const getNpcArchivedAt = (npc: NpcDoc) =>
  npc.archivedAt ?? (npc.isArchived ? npc.updatedAt : null);

const isNpcCategoryOwned = (
  categories: NpcCategoryDoc[],
  categoryId: Id<"npcCategories"> | null,
) => {
  if (!categoryId) {
    return true;
  }

  return categories.some((category) => category._id === categoryId);
};

const ensureRegistryRefsExist = (
  refs: ReadonlyArray<{ kind: string; id: string }> | undefined,
) => {
  for (const refValue of refs ?? []) {
    bugchudCore.catalog.mustResolveRef(refValue as never);
  }
};

const assertNpcWorkflowRefs = (input: NpcWorkflowInput) => {
  assertNpcInitializationRefs(
    toBugchudNpcInput({
      id: input.id,
      name: input.name,
      creatureRef: input.creatureRef,
      npcLoadoutRef: input.npcLoadoutRef,
      allegiance: input.allegiance,
      actorKind: input.actorKind,
      startingItems: input.startingItems,
      tags: input.tags,
      extensions: input.extensions,
    }),
  );
  ensureRegistryRefsExist(input.mutationRefs);
  ensureRegistryRefsExist(input.bionicRefs);
  ensureRegistryRefsExist(input.grimoireRefs);
  ensureRegistryRefsExist(input.knownSpellRefs);
  ensureRegistryRefsExist(input.preparedSpellRefs);
  ensureRegistryRefsExist(input.inventory?.items.map((item) => item.ref));
  ensureRegistryRefsExist(input.loadout?.equippedItemRefs);
  ensureRegistryRefsExist(input.loadout?.primaryWeaponRef ? [input.loadout.primaryWeaponRef] : []);
  ensureRegistryRefsExist(
    input.loadout?.secondaryWeaponRef ? [input.loadout.secondaryWeaponRef] : [],
  );
  ensureRegistryRefsExist(input.loadout?.armorRef ? [input.loadout.armorRef] : []);
  ensureRegistryRefsExist(input.loadout?.shieldRef ? [input.loadout.shieldRef] : []);
  ensureRegistryRefsExist(
    input.loadout?.preparedVehicleWeaponRefs ?? [],
  );

  if (input.pantheonRef) {
    bugchudCore.catalog.mustResolveRef(input.pantheonRef as never);
  }
  if (input.patronRef) {
    bugchudCore.catalog.mustResolveRef(input.patronRef as never);
  }
  ensureRegistryRefsExist(input.boonRefs);
  ensureRegistryRefsExist(input.covenantRefs);
  ensureRegistryRefsExist(input.relicRefs);
};

const toNpcSummary = (npc: Awaited<ReturnType<typeof getNpcByBugchudId>>) => {
  if (!npc) {
    return null;
  }

  const creature = bugchudCore.catalog.resolveRef(npc.state.identity.creatureRef as never) as
    | { name?: string }
    | undefined;
  const npcLoadout = npc.state.identity.npcLoadoutRef
    ? (bugchudCore.catalog.resolveRef(npc.state.identity.npcLoadoutRef as never) as
        | { name?: string }
        | undefined)
    : undefined;

  return {
    _id: npc._id,
    bugchudId: npc.bugchudId,
    name: npc.name,
    status: npc.status,
    currentStep: npc.currentStep,
    completedAt: npc.completedAt ?? null,
    actorKind: npc.actorKind,
    allegiance: npc.allegiance ?? null,
    isArchived: npc.isArchived,
    archivedAt: getNpcArchivedAt(npc),
    managerCategoryId: getNpcManagerCategoryId(npc),
    managerSortOrder: getNpcManagerSortOrder(npc),
    updatedAt: npc.updatedAt,
    creatureRef: npc.state.identity.creatureRef,
    creatureName: creature?.name ?? npc.state.identity.creatureRef.id,
    npcLoadoutRef: npc.state.identity.npcLoadoutRef ?? null,
    npcLoadoutName: npcLoadout?.name ?? null,
  };
};

const listOwnedNpcs = async (
  ctx: QueryCtx | MutationCtx,
  ownerTokenIdentifier: string,
) => {
  const npcs: NpcDoc[] = [];

  for await (const npc of ctx.db
    .query("npcs")
    .withIndex("by_ownerTokenIdentifier", (q) =>
      q.eq("ownerTokenIdentifier", ownerTokenIdentifier),
    )) {
    npcs.push(npc);
  }

  return npcs;
};

const listOwnedNpcCategories = async (
  ctx: QueryCtx | MutationCtx,
  ownerTokenIdentifier: string,
) => {
  const categories: NpcCategoryDoc[] = [];

  for await (const category of ctx.db
    .query("npcCategories")
    .withIndex("by_ownerTokenIdentifier", (q) =>
      q.eq("ownerTokenIdentifier", ownerTokenIdentifier),
    )) {
    categories.push(category);
  }

  return categories.sort(compareCategoriesByOrder);
};

const getNpcByBugchudId = async (
  ctx: QueryCtx | MutationCtx,
  ownerTokenIdentifier: string,
  bugchudId: string,
) =>
  ctx.db
    .query("npcs")
    .withIndex("by_ownerTokenIdentifier_and_bugchudId", (q) =>
      q.eq("ownerTokenIdentifier", ownerTokenIdentifier).eq("bugchudId", bugchudId),
    )
    .unique();

const requireOwnedNpc = async (
  ctx: QueryCtx | MutationCtx,
  ownerTokenIdentifier: string,
  bugchudId: string,
) => {
  const existing = await getNpcByBugchudId(ctx, ownerTokenIdentifier, bugchudId);

  if (!existing) {
    throw new Error("NPC not found.");
  }
  if (existing.ownerTokenIdentifier !== ownerTokenIdentifier) {
    throw new Error("You do not own this NPC.");
  }

  return existing;
};

const requireOwnedCategory = async (
  ctx: QueryCtx | MutationCtx,
  ownerTokenIdentifier: string,
  categoryId: Id<"npcCategories">,
) => {
  const category = await ctx.db.get(categoryId);

  if (!category || category.ownerTokenIdentifier !== ownerTokenIdentifier) {
    throw new Error("Category not found.");
  }

  return category;
};

const appendToCategorySortOrder = (
  npcs: NpcDoc[],
  categoryId: Id<"npcCategories"> | null,
) => {
  const existingInCategory = npcs
    .filter((npc) => !npc.isArchived && getNpcManagerCategoryId(npc) === categoryId)
    .sort(compareNpcsByManagerOrder);

  return existingInCategory.length;
};

const persistCategorySortOrder = async (
  ctx: MutationCtx,
  categories: NpcCategoryDoc[],
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

const persistNpcSortOrder = async (
  ctx: MutationCtx,
  npcs: NpcDoc[],
  categoryId: Id<"npcCategories"> | null,
) => {
  const orderedNpcs = [...npcs];

  for (let index = 0; index < orderedNpcs.length; index += 1) {
    const npc = orderedNpcs[index];
    const patch: Partial<NpcDoc> = {};

    if (getNpcManagerCategoryId(npc) !== categoryId) {
      patch.managerCategoryId = categoryId;
    }
    if (getNpcManagerSortOrder(npc) !== index) {
      patch.managerSortOrder = index;
    }

    if (Object.keys(patch).length > 0) {
      await ctx.db.patch(npc._id, patch);
    }
  }
};

const buildNpcStateFromInput = (input: NpcWorkflowInput) => {
  const baseInput = toBugchudNpcInput({
    id: input.id,
    name: input.name,
    creatureRef: input.creatureRef,
    npcLoadoutRef: input.npcLoadoutRef,
    allegiance: input.allegiance,
    actorKind: input.actorKind,
    startingItems: input.startingItems,
    tags: input.tags,
    extensions: input.extensions,
  });
  const state = bugchudCore.createNpc(baseInput).toState();

  if (input.actorKind) {
    state.actorKind = input.actorKind;
  }
  if (input.allegiance !== undefined) {
    state.identity.allegiance = input.allegiance;
  }
  if (input.tags) {
    state.tags = [...input.tags];
  }
  if (input.extensions !== undefined) {
    state.extensions = structuredClone(input.extensions) as NpcState["extensions"];
  }

  if (input.body) {
    state.body = structuredClone(input.body) as NpcState["body"];
  } else {
    if (input.mutationRefs) {
      state.body.mutationRefs = structuredClone(input.mutationRefs);
    }
    if (input.bionicRefs) {
      state.body.bionicRefs = structuredClone(input.bionicRefs);
    }
  }

  if (input.inventory) {
    state.inventory = structuredClone(input.inventory) as NpcState["inventory"];
  }
  if (input.loadout) {
    state.loadout = structuredClone(input.loadout) as NpcState["loadout"];
  }

  if (input.magic) {
    state.magic = structuredClone(input.magic) as NpcState["magic"];
  } else {
    if (input.grimoireRefs) {
      state.magic.grimoireRefs = structuredClone(input.grimoireRefs);
    }
    if (input.knownSpellRefs) {
      state.magic.knownSpellRefs = structuredClone(input.knownSpellRefs);
    }
    if (input.preparedSpellRefs) {
      state.magic.preparedSpellRefs = structuredClone(input.preparedSpellRefs);
    }
  }

  if (input.faith) {
    state.faith = structuredClone(input.faith) as NpcState["faith"];
  } else {
    if (input.pantheonRef !== undefined) {
      state.faith.pantheonRef = structuredClone(input.pantheonRef);
    }
    if (input.patronRef !== undefined) {
      state.faith.patronRef = structuredClone(input.patronRef);
    }
    if (input.boonRefs) {
      state.faith.boonRefs = structuredClone(input.boonRefs);
    }
    if (input.covenantRefs) {
      state.faith.covenantRefs = structuredClone(input.covenantRefs);
    }
    if (input.relicRefs) {
      state.faith.relicRefs = structuredClone(input.relicRefs);
    }
  }

  if (input.resources) {
    state.resources = structuredClone(input.resources) as NpcState["resources"];
  }
  if (input.activeEffects) {
    state.activeEffects = structuredClone(input.activeEffects) as NpcState["activeEffects"];
  }

  return state;
};

const persistNpc = async (
  ctx: MutationCtx,
  ownerTokenIdentifier: string,
  state: NpcState,
  workflow: {
    status: NpcWorkflowStatus;
    currentStep: NpcWizardStep;
    completedAt?: number;
    existing?: NpcDoc;
  },
) => {
  const normalizedState = normalizeNpcState(state);
  assertNpcStateIsValid(normalizedState);
  const metadata = buildNpcMetadata(normalizedState);
  const convexState = toConvexNpcState(normalizedState) as unknown as Doc<"npcs">["state"];
  const existing = workflow.existing;
  const allNpcs = await listOwnedNpcs(ctx, ownerTokenIdentifier);
  const initialSortOrder =
    existing?.managerSortOrder ?? appendToCategorySortOrder(allNpcs, null);

  const value = {
    ownerTokenIdentifier,
    schemaVersion: BUGCHUD_SCHEMA_VERSION as 2,
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

  const id = await ctx.db.insert("npcs", value);
  return ctx.db.get(id);
};

export const listMine = query({
  args: {
    search: v.optional(v.string()),
    includeArchived: v.optional(v.boolean()),
    limit: v.optional(v.number()),
    status: v.optional(npcStatusValidator),
    actorKind: v.optional(actorKindValidator),
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const includeArchived = args.includeArchived ?? false;
    const limit = clampListLimit(args.limit);
    const search = args.search?.trim();

    if (search) {
      const results = await ctx.db
        .query("npcs")
        .withSearchIndex("search_name", (q) => {
          const scoped = q
            .search("nameLower", normalizeSearchText(search))
            .eq("ownerTokenIdentifier", ownerTokenIdentifier);
          return includeArchived ? scoped : scoped.eq("isArchived", false);
        })
        .take(limit);

      return results
        .filter((npc) => (args.status ? npc.status === args.status : true))
        .filter((npc) => (args.actorKind ? npc.actorKind === args.actorKind : true))
        .map(toNpcSummary);
    }

    let npcs = includeArchived
      ? await ctx.db
          .query("npcs")
          .withIndex("by_ownerTokenIdentifier", (q) =>
            q.eq("ownerTokenIdentifier", ownerTokenIdentifier),
          )
          .order("desc")
          .take(limit)
      : await ctx.db
          .query("npcs")
          .withIndex("by_ownerTokenIdentifier_and_isArchived", (q) =>
            q.eq("ownerTokenIdentifier", ownerTokenIdentifier).eq("isArchived", false),
          )
          .order("desc")
          .take(limit);

    if (args.status) {
      npcs = npcs.filter((npc) => npc.status === args.status);
    }
    if (args.actorKind) {
      npcs = npcs.filter((npc) => npc.actorKind === args.actorKind);
    }

    return npcs.map(toNpcSummary);
  },
});

export const getMine = query({
  args: {
    bugchudId: v.string(),
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    return getNpcByBugchudId(ctx, ownerTokenIdentifier, args.bugchudId);
  },
});

export const getManagerData = query({
  args: {},
  handler: async (ctx) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const [npcs, categories] = await Promise.all([
      listOwnedNpcs(ctx, ownerTokenIdentifier),
      listOwnedNpcCategories(ctx, ownerTokenIdentifier),
    ]);
    const categoryIds = new Set(categories.map((category) => category._id));
    const summaries = npcs
      .map(toNpcSummary)
      .filter((summary): summary is NonNullable<ReturnType<typeof toNpcSummary>> => summary !== null)
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
      npcs: summaries.filter((npc) => !npc.isArchived),
      trashedNpcs: summaries.filter((npc) => npc.isArchived),
    };
  },
});

export const previewInitialization = query({
  args: {
    input: npcWorkflowInputValidator,
  },
  handler: async (_ctx, args) => {
    const input = structuredClone(args.input) as NpcWorkflowInput;
    assertNpcWorkflowRefs(input);
    const state = buildNpcStateFromInput(input);
    const preview = previewNpcState(state);

    return {
      normalizedState: preview.normalizedState,
      validation: serializeValidationResult(preview.validation),
      combatProfile: preview.combatProfile,
    };
  },
});

export const previewDraft = query({
  args: {
    state: npcStateValidator,
  },
  handler: async (ctx, args) => {
    await requireViewerTokenIdentifier(ctx);
    const state = toBugchudNpcState(args.state);
    const preview = previewNpcState(state);

    return {
      normalizedState: preview.normalizedState,
      validation: serializeValidationResult(preview.validation),
      combatProfile: preview.combatProfile,
    };
  },
});

export const create = mutation({
  args: {
    input: npcWorkflowInputValidator,
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const input = structuredClone(args.input) as NpcWorkflowInput;
    assertNpcWorkflowRefs(input);
    const state = buildNpcStateFromInput(input);

    return persistNpc(ctx, ownerTokenIdentifier, state, {
      status: "complete",
      currentStep: "review",
      completedAt: Date.now(),
    });
  },
});

export const createDraft = mutation({
  args: {
    input: v.optional(npcWorkflowInputValidator),
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const input = structuredClone(args.input ?? {}) as NpcWorkflowInput;
    assertNpcWorkflowRefs(input);
    const state = buildNpcStateFromInput(input);

    return persistNpc(ctx, ownerTokenIdentifier, state, {
      status: "draft",
      currentStep: "identity",
    });
  },
});

export const createGuidedDraft = mutation({
  args: {
    input: npcWorkflowInputValidator,
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const input = structuredClone(args.input) as NpcWorkflowInput;
    assertNpcWorkflowRefs(input);
    const state = buildNpcStateFromInput(input);

    return persistNpc(ctx, ownerTokenIdentifier, state, {
      status: "draft",
      currentStep: "review",
    });
  },
});

export const saveDraft = mutation({
  args: {
    bugchudId: v.string(),
    state: npcStateValidator,
    currentStep: npcWizardStepValidator,
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const state = toBugchudNpcState(args.state);
    const existing = await requireOwnedNpc(ctx, ownerTokenIdentifier, args.bugchudId);

    if (existing.bugchudId !== state.id) {
      throw new Error("The provided state does not match the target NPC.");
    }

    return persistNpc(ctx, ownerTokenIdentifier, state, {
      status: existing.status === "complete" ? "complete" : "draft",
      currentStep: args.currentStep as NpcWizardStep,
      completedAt: existing.completedAt,
      existing,
    });
  },
});

export const completeDraft = mutation({
  args: {
    bugchudId: v.string(),
    state: npcStateValidator,
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const state = toBugchudNpcState(args.state);
    const existing = await requireOwnedNpc(ctx, ownerTokenIdentifier, args.bugchudId);

    if (existing.bugchudId !== state.id) {
      throw new Error("The provided state does not match the target NPC.");
    }

    return persistNpc(ctx, ownerTokenIdentifier, state, {
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
    state: npcStateValidator,
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const state = toBugchudNpcState(args.state);
    const existing = await requireOwnedNpc(ctx, ownerTokenIdentifier, args.bugchudId);

    if (existing.bugchudId !== state.id) {
      throw new Error("The provided state does not match the target NPC.");
    }

    return persistNpc(ctx, ownerTokenIdentifier, state, {
      status: existing.status,
      currentStep: existing.currentStep as NpcWizardStep,
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

    const categories = await listOwnedNpcCategories(ctx, ownerTokenIdentifier);
    const now = Date.now();
    const id = await ctx.db.insert("npcCategories", {
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
    categoryId: v.id("npcCategories"),
    label: v.string(),
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const category = await requireOwnedCategory(ctx, ownerTokenIdentifier, args.categoryId);
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
    categoryId: v.id("npcCategories"),
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const category = await requireOwnedCategory(ctx, ownerTokenIdentifier, args.categoryId);
    const [allNpcs, categories] = await Promise.all([
      listOwnedNpcs(ctx, ownerTokenIdentifier),
      listOwnedNpcCategories(ctx, ownerTokenIdentifier),
    ]);
    const assignedNpcs = allNpcs.filter((npc) => getNpcManagerCategoryId(npc) === category._id);
    const movedActiveNpcs = assignedNpcs
      .filter((npc) => !npc.isArchived)
      .sort(compareNpcsByManagerOrder);
    const uncategorizedActiveNpcs = allNpcs
      .filter((npc) => !npc.isArchived && getNpcManagerCategoryId(npc) === null)
      .sort(compareNpcsByManagerOrder);

    await persistNpcSortOrder(ctx, [...uncategorizedActiveNpcs, ...movedActiveNpcs], null);

    for (const npc of assignedNpcs.filter((entry) => entry.isArchived)) {
      await ctx.db.patch(npc._id, {
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
    targetCategoryId: nullableNpcCategoryIdValidator,
    targetIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const [existing, allNpcs, categories] = await Promise.all([
      requireOwnedNpc(ctx, ownerTokenIdentifier, args.bugchudId),
      listOwnedNpcs(ctx, ownerTokenIdentifier),
      listOwnedNpcCategories(ctx, ownerTokenIdentifier),
    ]);

    if (existing.isArchived) {
      throw new Error("Archived NPCs cannot be reordered.");
    }
    if (args.targetCategoryId && !isNpcCategoryOwned(categories, args.targetCategoryId)) {
      throw new Error("Target category not found.");
    }

    const sourceCategoryId = getNpcManagerCategoryId(existing);
    const activeNpcs = allNpcs.filter((npc) => !npc.isArchived);
    const sourceNpcs = activeNpcs
      .filter((npc) => npc._id !== existing._id && getNpcManagerCategoryId(npc) === sourceCategoryId)
      .sort(compareNpcsByManagerOrder);
    const targetNpcs = activeNpcs
      .filter(
        (npc) => npc._id !== existing._id && getNpcManagerCategoryId(npc) === args.targetCategoryId,
      )
      .sort(compareNpcsByManagerOrder);
    const insertionIndex = Math.max(0, Math.min(Math.floor(args.targetIndex), targetNpcs.length));

    targetNpcs.splice(insertionIndex, 0, existing);

    if (sourceCategoryId === args.targetCategoryId) {
      await persistNpcSortOrder(ctx, targetNpcs, args.targetCategoryId);
    } else {
      await persistNpcSortOrder(ctx, sourceNpcs, sourceCategoryId);
      await persistNpcSortOrder(ctx, targetNpcs, args.targetCategoryId);
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
    const existing = await requireOwnedNpc(ctx, ownerTokenIdentifier, args.bugchudId);
    const nextArchived = args.isArchived ?? true;
    const allNpcs = await listOwnedNpcs(ctx, ownerTokenIdentifier);
    const categories = await listOwnedNpcCategories(ctx, ownerTokenIdentifier);

    if (nextArchived) {
      const remainingInCategory = allNpcs
        .filter(
          (npc) =>
            npc._id !== existing._id &&
            !npc.isArchived &&
            getNpcManagerCategoryId(npc) === getNpcManagerCategoryId(existing),
        )
        .sort(compareNpcsByManagerOrder);

      await ctx.db.patch(existing._id, {
        isArchived: true,
        archivedAt: Date.now(),
        updatedAt: Date.now(),
        managerCategoryId: getNpcManagerCategoryId(existing),
        managerSortOrder: getNpcManagerSortOrder(existing),
      });
      await persistNpcSortOrder(ctx, remainingInCategory, getNpcManagerCategoryId(existing));

      return ctx.db.get(existing._id);
    }

    const restoredCategoryId =
      getNpcManagerCategoryId(existing) &&
      isNpcCategoryOwned(categories, getNpcManagerCategoryId(existing))
        ? getNpcManagerCategoryId(existing)
        : null;
    const restoredNpcs = allNpcs
      .filter(
        (npc) =>
          npc._id !== existing._id &&
          !npc.isArchived &&
          getNpcManagerCategoryId(npc) === restoredCategoryId,
      )
      .sort(compareNpcsByManagerOrder);
    const restoredNpc = {
      ...existing,
      isArchived: false,
      archivedAt: null,
      managerCategoryId: restoredCategoryId,
      managerSortOrder: restoredNpcs.length,
      updatedAt: Date.now(),
    };

    await persistNpcSortOrder(ctx, [...restoredNpcs, restoredNpc as NpcDoc], restoredCategoryId);
    await ctx.db.patch(existing._id, {
      isArchived: false,
      archivedAt: null,
      managerCategoryId: restoredCategoryId,
      managerSortOrder: restoredNpcs.length,
      updatedAt: Date.now(),
    });

    return ctx.db.get(existing._id);
  },
});
