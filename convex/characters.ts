import type { CharacterState } from "@bugchud/core";
import { v } from "convex/values";
import type { Doc, Id } from "./_generated/dataModel";
import { mutation, query, type MutationCtx, type QueryCtx } from "./_generated/server";
import {
  BUGCHUD_RULESET_ID,
  BUGCHUD_RULESET_VERSION,
  BUGCHUD_SCHEMA_VERSION,
  assertCharacterInitializationRefs,
  bugchudCore,
  buildCharacterMetadata,
  characterInitializationInputValidator,
  characterStateValidator,
  characterWizardStepValidator,
  clampListLimit,
  normalizeCharacterState,
  normalizeSearchText,
  previewCharacterState,
  requireViewerTokenIdentifier,
  serializeValidationResult,
  toBugchudCharacterInput,
  toBugchudCharacterState,
  toConvexCharacterState,
} from "./bugchud";

const characterStatusValidator = v.union(v.literal("draft"), v.literal("complete"));

type CharacterWorkflowStatus = "draft" | "complete";
type CharacterWizardStep =
  | "identity"
  | "lineage"
  | "background"
  | "path"
  | "faith"
  | "gear"
  | "review";

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
    updatedAt: character.updatedAt,
    raceRef: character.state.identity.raceRef,
    originRef: character.state.identity.originRef,
    backgroundCount: character.state.identity.backgroundRefs.length,
    currentFate: character.state.progression.currentFate,
  };
};

const getCharacterByBugchudId = async (
  ctx: QueryCtx | MutationCtx,
  ownerTokenIdentifier: string,
  bugchudId: string,
) =>
  ctx.db
    .query("characters")
    .withIndex("by_ownerTokenIdentifier_and_bugchudId", (q) =>
      q.eq("ownerTokenIdentifier", ownerTokenIdentifier).eq("bugchudId", bugchudId),
    )
    .unique();

const requireOwnedCharacter = async (
  ctx: QueryCtx | MutationCtx,
  ownerTokenIdentifier: string,
  bugchudId: string,
) => {
  const existing = await getCharacterByBugchudId(ctx, ownerTokenIdentifier, bugchudId);

  if (!existing) {
    throw new Error("Character not found.");
  }
  if (existing.ownerTokenIdentifier !== ownerTokenIdentifier) {
    throw new Error("You do not own this character.");
  }

  return existing;
};

const persistCharacter = async (
  ctx: MutationCtx,
  ownerTokenIdentifier: string,
  state: CharacterState,
  workflow: {
    status: CharacterWorkflowStatus;
    currentStep: CharacterWizardStep;
    completedAt?: number;
    existingId?: Id<"characters">;
    isArchived?: boolean;
  },
) => {
  const normalizedState = normalizeCharacterState(state);
  const metadata = buildCharacterMetadata(normalizedState);
  const convexState = toConvexCharacterState(normalizedState) as unknown as Doc<
    "characters"
  >["state"];
  const schemaVersion = BUGCHUD_SCHEMA_VERSION as 1;
  const value = {
    ownerTokenIdentifier,
    schemaVersion,
    rulesetId: BUGCHUD_RULESET_ID,
    rulesetVersion: BUGCHUD_RULESET_VERSION,
    status: workflow.status,
    currentStep: workflow.currentStep,
    completedAt: workflow.completedAt,
    isArchived: workflow.isArchived ?? false,
    updatedAt: Date.now(),
    state: convexState,
    ...metadata,
  };

  if (workflow.existingId) {
    await ctx.db.patch(workflow.existingId, value);
    return ctx.db.get(workflow.existingId);
  }

  const id = await ctx.db.insert("characters", value);
  return ctx.db.get(id);
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
        .filter((character) => (args.status ? character.status === args.status : true))
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
      characters = characters.filter((character) => character.status === args.status);
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
    const state = bugchudCore.createCharacter(input).toState();

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
    const state = bugchudCore.createCharacter(input).toState();

    return persistCharacter(ctx, ownerTokenIdentifier, state, {
      status: "draft",
      currentStep: "identity",
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
    const existing = await requireOwnedCharacter(ctx, ownerTokenIdentifier, args.bugchudId);

    if (existing.bugchudId !== state.id) {
      throw new Error("The provided state does not match the target character.");
    }

    return persistCharacter(ctx, ownerTokenIdentifier, state, {
      status: existing.status === "complete" ? "complete" : "draft",
      currentStep: args.currentStep as CharacterWizardStep,
      completedAt: existing.completedAt,
      existingId: existing._id,
      isArchived: existing.isArchived,
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
    const existing = await requireOwnedCharacter(ctx, ownerTokenIdentifier, args.bugchudId);

    if (existing.bugchudId !== state.id) {
      throw new Error("The provided state does not match the target character.");
    }

    return persistCharacter(ctx, ownerTokenIdentifier, state, {
      status: "complete",
      currentStep: "review",
      completedAt: existing.completedAt ?? Date.now(),
      existingId: existing._id,
      isArchived: existing.isArchived,
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
    const existing = await requireOwnedCharacter(ctx, ownerTokenIdentifier, args.bugchudId);

    if (existing.bugchudId !== state.id) {
      throw new Error("The provided state does not match the target character.");
    }

    return persistCharacter(ctx, ownerTokenIdentifier, state, {
      status: existing.status,
      currentStep: existing.currentStep as CharacterWizardStep,
      completedAt: existing.completedAt,
      existingId: existing._id,
      isArchived: existing.isArchived,
    });
  },
});

export const archive = mutation({
  args: {
    bugchudId: v.string(),
    isArchived: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const existing = await requireOwnedCharacter(ctx, ownerTokenIdentifier, args.bugchudId);

    await ctx.db.patch(existing._id, {
      isArchived: args.isArchived ?? true,
      updatedAt: Date.now(),
    });

    return ctx.db.get(existing._id);
  },
});
