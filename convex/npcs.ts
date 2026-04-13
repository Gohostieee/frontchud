import type { NpcState } from "@bugchud/core";
import { v } from "convex/values";
import type { Doc, Id } from "./_generated/dataModel";
import { mutation, query, type MutationCtx, type QueryCtx } from "./_generated/server";
import {
  BUGCHUD_RULESET_ID,
  BUGCHUD_RULESET_VERSION,
  BUGCHUD_SCHEMA_VERSION,
  assertNpcInitializationRefs,
  assertNpcStateIsValid,
  bugchudCore,
  buildNpcMetadata,
  clampListLimit,
  normalizeSearchText,
  npcInitializationInputValidator,
  npcStateValidator,
  requireViewerTokenIdentifier,
  toBugchudNpcInput,
  toBugchudNpcState,
  toConvexNpcState,
} from "./bugchud";

const toNpcSummary = (npc: Awaited<ReturnType<typeof getNpcByBugchudId>>) => {
  if (!npc) {
    return null;
  }

  return {
    _id: npc._id,
    bugchudId: npc.bugchudId,
    name: npc.name,
    actorKind: npc.actorKind,
    allegiance: npc.allegiance ?? null,
    isArchived: npc.isArchived,
    updatedAt: npc.updatedAt,
    creatureRef: npc.state.identity.creatureRef,
    npcLoadoutRef: npc.state.identity.npcLoadoutRef ?? null,
  };
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

const persistNpc = async (
  ctx: MutationCtx,
  ownerTokenIdentifier: string,
  state: NpcState,
  existingId?: Id<"npcs">,
) => {
  assertNpcStateIsValid(state);
  const metadata = buildNpcMetadata(state);
  const convexState = toConvexNpcState(state) as unknown as Doc<"npcs">["state"];
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

  const id = await ctx.db.insert("npcs", value);
  return ctx.db.get(id);
};

export const listMine = query({
  args: {
    search: v.optional(v.string()),
    actorKind: v.optional(
      v.union(v.literal("creature"), v.literal("npc"), v.literal("mount")),
    ),
    includeArchived: v.optional(v.boolean()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const includeArchived = args.includeArchived ?? false;
    const limit = clampListLimit(args.limit);
    const search = args.search?.trim();

    if (search) {
      const npcs = await ctx.db
        .query("npcs")
        .withSearchIndex("search_name", (q) => {
          const scoped = q
            .search("nameLower", normalizeSearchText(search))
            .eq("ownerTokenIdentifier", ownerTokenIdentifier);
          return includeArchived ? scoped : scoped.eq("isArchived", false);
        })
        .take(limit);

      return npcs
        .filter((npc) => (args.actorKind ? npc.actorKind === args.actorKind : true))
        .map(toNpcSummary);
    }

    const npcs = args.actorKind
      ? await ctx.db
          .query("npcs")
          .withIndex("by_ownerTokenIdentifier_and_actorKind", (q) =>
            q
              .eq("ownerTokenIdentifier", ownerTokenIdentifier)
              .eq("actorKind", args.actorKind!),
          )
          .order("desc")
          .take(limit)
      : includeArchived
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
              q
                .eq("ownerTokenIdentifier", ownerTokenIdentifier)
                .eq("isArchived", false),
            )
            .order("desc")
            .take(limit);

    return npcs
      .filter((npc) => (includeArchived ? true : npc.isArchived === false))
      .map(toNpcSummary);
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

export const create = mutation({
  args: {
    input: npcInitializationInputValidator,
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const input = toBugchudNpcInput(args.input);
    assertNpcInitializationRefs(input);
    const state = bugchudCore.createNpc(input).toState();
    return persistNpc(ctx, ownerTokenIdentifier, state);
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
    const existing = await getNpcByBugchudId(ctx, ownerTokenIdentifier, args.bugchudId);

    if (!existing) {
      throw new Error("NPC not found.");
    }
    if (existing.ownerTokenIdentifier !== ownerTokenIdentifier) {
      throw new Error("You do not own this NPC.");
    }
    if (existing.bugchudId !== state.id) {
      throw new Error("The provided state does not match the target NPC.");
    }

    return persistNpc(ctx, ownerTokenIdentifier, state, existing._id);
  },
});

export const archive = mutation({
  args: {
    bugchudId: v.string(),
    isArchived: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const ownerTokenIdentifier = await requireViewerTokenIdentifier(ctx);
    const existing = await getNpcByBugchudId(ctx, ownerTokenIdentifier, args.bugchudId);

    if (!existing) {
      throw new Error("NPC not found.");
    }
    if (existing.ownerTokenIdentifier !== ownerTokenIdentifier) {
      throw new Error("You do not own this NPC.");
    }

    await ctx.db.patch(existing._id, {
      isArchived: args.isArchived ?? true,
      updatedAt: Date.now(),
    });

    return ctx.db.get(existing._id);
  },
});
