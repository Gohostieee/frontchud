import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import {
  BUGCHUD_SCHEMA_VERSION,
  actorKindValidator,
  characterWizardStepValidator,
  characterStateValidator,
  npcStateValidator,
} from "./bugchud";

export default defineSchema({
  characters: defineTable({
    ownerTokenIdentifier: v.string(),
    bugchudId: v.string(),
    schemaVersion: v.literal(BUGCHUD_SCHEMA_VERSION),
    rulesetId: v.string(),
    rulesetVersion: v.string(),
    name: v.string(),
    nameLower: v.string(),
    status: v.union(v.literal("draft"), v.literal("complete")),
    currentStep: characterWizardStepValidator,
    completedAt: v.optional(v.number()),
    isArchived: v.boolean(),
    updatedAt: v.number(),
    state: characterStateValidator,
  })
    .index("by_ownerTokenIdentifier", ["ownerTokenIdentifier"])
    .index("by_ownerTokenIdentifier_and_bugchudId", [
      "ownerTokenIdentifier",
      "bugchudId",
    ])
    .index("by_ownerTokenIdentifier_and_isArchived", [
      "ownerTokenIdentifier",
      "isArchived",
    ])
    .index("by_ownerTokenIdentifier_and_status", [
      "ownerTokenIdentifier",
      "status",
    ])
    .searchIndex("search_name", {
      searchField: "nameLower",
      filterFields: ["ownerTokenIdentifier", "isArchived"],
    }),

  npcs: defineTable({
    ownerTokenIdentifier: v.string(),
    bugchudId: v.string(),
    schemaVersion: v.literal(BUGCHUD_SCHEMA_VERSION),
    rulesetId: v.string(),
    rulesetVersion: v.string(),
    name: v.string(),
    nameLower: v.string(),
    actorKind: actorKindValidator,
    allegiance: v.optional(v.string()),
    isArchived: v.boolean(),
    updatedAt: v.number(),
    state: npcStateValidator,
  })
    .index("by_ownerTokenIdentifier", ["ownerTokenIdentifier"])
    .index("by_ownerTokenIdentifier_and_bugchudId", [
      "ownerTokenIdentifier",
      "bugchudId",
    ])
    .index("by_ownerTokenIdentifier_and_actorKind", [
      "ownerTokenIdentifier",
      "actorKind",
    ])
    .index("by_ownerTokenIdentifier_and_isArchived", [
      "ownerTokenIdentifier",
      "isArchived",
    ])
    .index("by_ownerTokenIdentifier_and_allegiance", [
      "ownerTokenIdentifier",
      "allegiance",
    ])
    .searchIndex("search_name", {
      searchField: "nameLower",
      filterFields: ["ownerTokenIdentifier", "isArchived"],
    }),
});
