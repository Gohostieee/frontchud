import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import {
  BUGCHUD_SCHEMA_VERSION,
  actorKindValidator,
  characterWizardStepValidator,
  npcWizardStepValidator,
  characterStateValidator,
  npcStateValidator,
} from "./bugchud";

export default defineSchema({
  characterCategories: defineTable({
    ownerTokenIdentifier: v.string(),
    label: v.string(),
    labelLower: v.string(),
    sortOrder: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_ownerTokenIdentifier", ["ownerTokenIdentifier"]),

  npcCategories: defineTable({
    ownerTokenIdentifier: v.string(),
    label: v.string(),
    labelLower: v.string(),
    sortOrder: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_ownerTokenIdentifier", ["ownerTokenIdentifier"]),

  characters: defineTable({
    ownerTokenIdentifier: v.string(),
    bugchudId: v.string(),
    schemaVersion: v.union(v.literal(1), v.literal(BUGCHUD_SCHEMA_VERSION)),
    rulesetId: v.string(),
    rulesetVersion: v.string(),
    name: v.string(),
    nameLower: v.string(),
    status: v.union(v.literal("draft"), v.literal("complete")),
    currentStep: characterWizardStepValidator,
    completedAt: v.optional(v.number()),
    isArchived: v.boolean(),
    archivedAt: v.optional(v.union(v.number(), v.null())),
    managerCategoryId: v.optional(v.union(v.id("characterCategories"), v.null())),
    managerSortOrder: v.optional(v.number()),
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
    .index("by_ownerTokenIdentifier_and_managerCategoryId", [
      "ownerTokenIdentifier",
      "managerCategoryId",
    ])
    .index("by_ownerTokenIdentifier_and_isArchived_and_managerCategoryId", [
      "ownerTokenIdentifier",
      "isArchived",
      "managerCategoryId",
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
    schemaVersion: v.union(v.literal(1), v.literal(BUGCHUD_SCHEMA_VERSION)),
    rulesetId: v.string(),
    rulesetVersion: v.string(),
    name: v.string(),
    nameLower: v.string(),
    status: v.union(v.literal("draft"), v.literal("complete")),
    currentStep: npcWizardStepValidator,
    completedAt: v.optional(v.number()),
    actorKind: actorKindValidator,
    allegiance: v.optional(v.string()),
    isArchived: v.boolean(),
    archivedAt: v.optional(v.union(v.number(), v.null())),
    managerCategoryId: v.optional(v.union(v.id("npcCategories"), v.null())),
    managerSortOrder: v.optional(v.number()),
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
    .index("by_ownerTokenIdentifier_and_managerCategoryId", [
      "ownerTokenIdentifier",
      "managerCategoryId",
    ])
    .index("by_ownerTokenIdentifier_and_isArchived_and_managerCategoryId", [
      "ownerTokenIdentifier",
      "isArchived",
      "managerCategoryId",
    ])
    .index("by_ownerTokenIdentifier_and_status", [
      "ownerTokenIdentifier",
      "status",
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
