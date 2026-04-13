import type { CharacterState } from "@bugchud/core";
import { v } from "convex/values";
import type { Doc, Id } from "./_generated/dataModel";
import { mutation, query, type MutationCtx, type QueryCtx } from "./_generated/server";
import {
  BUGCHUD_RULESET_ID,
  BUGCHUD_RULESET_VERSION,
  BUGCHUD_SCHEMA_VERSION,
  assertCharacterInitializationRefs,
  assertCharacterStateIsValid,
  bugchudCore,
  buildCharacterMetadata,
  characterInitializationInputValidator,
  characterStateValidator,
  clampListLimit,
  normalizeSearchText,
  requireViewerTokenIdentifier,
  toBugchudCharacterInput,
  toBugchudCharacterState,
  toConvexCharacterState,
} from "./bugchud";

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

const persistCharacter = async (
  ctx: MutationCtx,
  ownerTokenIdentifier: string,
  state: CharacterState,
  existingId?: Id<"characters">,
) => {
  assertCharacterStateIsValid(state);
  const metadata = buildCharacterMetadata(state);
  const convexState = toConvexCharacterState(state) as unknown as Doc<
    "characters"
  >["state"];
  const schemaVersion = BUGCHUD_SCHEMA_VERSION as 1;
  const value = {
    ownerTokenIdentifier,
    schemaVersion,
    rulesetId: BUGCHUD_RULESET_ID,
    rulesetVersion: BUGCHUD_RULESET_VERSION,
    isArchived: false,
    updatedAt: Date.now(),
    state: convexState,
    ...metadata,
  };

  if (existingId) {
    await ctx.db.patch(existingId, value);
    return ctx.db.get(existingId);
  }

  const id = await ctx.db.insert("characters", value);
  return ctx.db.get(id);
};

export const listMine = query({
  args: {
    search: v.optional(v.string()),
    includeArchived: v.optional(v.boolean()),
    limit: v.optional(v.number()),
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

      return (await searchQuery.take(limit)).map(toCharacterSummary);
    }

    const characters = includeArchived
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

export const create = mutation({
  args: {
    input: characterInitializationInputValidator,
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const input = toBugchudCharacterInput(args.input);
    assertCharacterInitializationRefs(input);
    const state = bugchudCore.createCharacter(input).toState();
    return persistCharacter(ctx, ownerTokenIdentifier, state);
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
    const existing = await getCharacterByBugchudId(
      ctx,
      ownerTokenIdentifier,
      args.bugchudId,
    );

    if (!existing) {
      throw new Error("Character not found.");
    }
    if (existing.ownerTokenIdentifier !== ownerTokenIdentifier) {
      throw new Error("You do not own this character.");
    }
    if (existing.bugchudId !== state.id) {
      throw new Error("The provided state does not match the target character.");
    }

    return persistCharacter(ctx, ownerTokenIdentifier, state, existing._id);
  },
});

export const archive = mutation({
  args: {
    bugchudId: v.string(),
    isArchived: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const existing = await getCharacterByBugchudId(
      ctx,
      ownerTokenIdentifier,
      args.bugchudId,
    );

    if (!existing) {
      throw new Error("Character not found.");
    }
    if (existing.ownerTokenIdentifier !== ownerTokenIdentifier) {
      throw new Error("You do not own this character.");
    }

    await ctx.db.patch(existing._id, {
      isArchived: args.isArchived ?? true,
      updatedAt: Date.now(),
    });

    return ctx.db.get(existing._id);
  },
});
