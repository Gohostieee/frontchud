import { v } from "convex/values";
import { query } from "./_generated/server";
import { bugchudCore, registryRefValidator } from "./bugchud";

export const getCharacterCreationOptions = query({
  args: {
    originRef: v.optional(registryRefValidator("origin")),
  },
  handler: async (_ctx, args) => {
    const creationOptions = bugchudCore.catalog.getCreationOptions({
      originRef: args.originRef as never,
    });

    return {
      rulesetId: bugchudCore.ruleset.id,
      rulesetVersion: bugchudCore.ruleset.version,
      ...creationOptions,
    };
  },
});

export const getNpcCreationOptions = query({
  args: {},
  handler: async () => ({
    rulesetId: bugchudCore.ruleset.id,
    rulesetVersion: bugchudCore.ruleset.version,
    creatures: bugchudCore.catalog.listByKind("creature"),
    npcLoadouts: bugchudCore.catalog.listByKind("npcLoadout"),
  }),
});
