/// <reference types="vite/client" />

import { importedRuleset } from "@bugchud/core/data";
import { convexTest } from "convex-test";
import { expect, test } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");

const createIdentity = (tokenIdentifier: string) => ({
  tokenIdentifier,
  subject: tokenIdentifier,
  issuer: "https://clerk.test",
});

const firstCreature = Object.values(importedRuleset.registries.creature ?? {})[0];
const firstNpcLoadout = Object.values(importedRuleset.registries.npcLoadout ?? {})[0];

async function createNpc(
  owner: ReturnType<ReturnType<typeof convexTest>["withIdentity"]>,
  name: string,
  actorKind: "npc" | "creature" | "mount" = "npc",
) {
  return owner.mutation(api.npcs.create, {
    input: {
      name,
      actorKind,
      creatureRef: firstCreature
        ? {
            kind: "creature" as const,
            id: firstCreature.id as string,
          }
        : undefined,
      npcLoadoutRef: firstNpcLoadout
        ? {
            kind: "npcLoadout" as const,
            id: firstNpcLoadout.id as string,
          }
        : undefined,
    },
  });
}

test("npc ruleset queries expose creation and editor payloads", async () => {
  const t = convexTest(schema, modules);

  const creationOptions = await t.query(api.ruleset.getNpcCreationOptions, {});
  const editorOptions = await t.query(api.ruleset.getNpcEditorOptions, {});

  expect(creationOptions.creatures.length).toBeGreaterThan(0);
  expect(creationOptions.npcLoadouts.length).toBeGreaterThan(0);
  expect(editorOptions.templates.creatures.length).toBeGreaterThan(0);
  expect(editorOptions.templates).not.toHaveProperty("npcLoadouts");
  expect(editorOptions.body.mutations).toBeDefined();
  expect(editorOptions.doctrine.spells).toBeDefined();
  expect(editorOptions.gear.items).toBeDefined();
});

test("npc template preview is public and createDraft starts in template mode", async () => {
  const t = convexTest(schema, modules);
  const owner = t.withIdentity(createIdentity("gm|owner"));

  const previewInput = {
    name: "Roadfang",
    actorKind: "npc" as const,
    allegiance: "Raiders",
    creatureRef: {
      kind: "creature" as const,
      id: firstCreature!.id as string,
    },
  };

  const preview = await t.query(api.npcs.previewInitialization, {
    input: previewInput,
  });

  expect(preview.normalizedState.identity.name).toBe("Roadfang");
  expect(preview.normalizedState.actorKind).toBe("npc");
  expect(preview.validation.ok).toBe(true);

  const created = await owner.mutation(api.npcs.createDraft, {
    input: previewInput,
  });

  expect(created?.status).toBe("draft");
  expect(created?.currentStep).toBe("template");
});

test("npc draft lifecycle normalizes preview, saves, completes, and resumes", async () => {
  const t = convexTest(schema, modules);
  const owner = t.withIdentity(createIdentity("gm|owner"));

  const created = await owner.mutation(api.npcs.createDraft, {
    input: {
      name: "Ash Mount",
      actorKind: "mount",
      creatureRef: {
        kind: "creature" as const,
        id: firstCreature!.id as string,
      },
    },
  });

  expect(created?.status).toBe("draft");
  expect(created?.currentStep).toBe("template");

  const staleState = structuredClone(created!.state);
  staleState.identity.name = "Ash Mount Prime";
  staleState.body.mutationRefs = [];
  staleState.magic.knownSpellRefs = [];

  const preview = await owner.query(api.npcs.previewDraft, {
    state: staleState,
  });
  expect(preview.normalizedState.identity.name).toBe("Ash Mount Prime");

  const saved = await owner.mutation(api.npcs.saveDraft, {
    bugchudId: created!.bugchudId,
    state: staleState,
    currentStep: "template",
  });
  expect(saved?.currentStep).toBe("template");

  const resumed = await owner.query(api.npcs.getMine, {
    bugchudId: created!.bugchudId,
  });
  expect(resumed?.currentStep).toBe("template");

  const completed = await owner.mutation(api.npcs.completeDraft, {
    bugchudId: created!.bugchudId,
    state: staleState,
  });
  expect(completed?.status).toBe("complete");
  expect(completed?.currentStep).toBe("review");
});

test("npc manager CRUD, actor filters, trash, and restore work", async () => {
  const t = convexTest(schema, modules);
  const owner = t.withIdentity(createIdentity("gm|owner"));

  const raider = await createNpc(owner, "Raider", "npc");
  const beast = await createNpc(owner, "Beast", "creature");
  await createNpc(owner, "Horse", "mount");
  const category = await owner.mutation(api.npcs.createCategory, {
    label: "Hostiles",
  });

  await owner.mutation(api.npcs.moveInManager, {
    bugchudId: raider!.bugchudId,
    targetCategoryId: category!._id,
    targetIndex: 0,
  });
  await owner.mutation(api.npcs.moveInManager, {
    bugchudId: beast!.bugchudId,
    targetCategoryId: category!._id,
    targetIndex: 1,
  });

  let managerData = await owner.query(api.npcs.getManagerData, {});
  expect(managerData.categories).toHaveLength(1);
  expect(managerData.npcs).toHaveLength(3);

  const creatureResults = await owner.query(api.npcs.listMine, {
    actorKind: "creature",
  });
  expect(creatureResults).toHaveLength(1);
  expect(creatureResults[0]?.name).toBe("Beast");

  await owner.mutation(api.npcs.archive, {
    bugchudId: beast!.bugchudId,
  });

  managerData = await owner.query(api.npcs.getManagerData, {});
  expect(managerData.npcs.map((entry) => entry.name)).toEqual(
    expect.arrayContaining(["Raider", "Horse"]),
  );
  expect(managerData.trashedNpcs.map((entry) => entry.name)).toEqual(["Beast"]);

  await owner.mutation(api.npcs.archive, {
    bugchudId: beast!.bugchudId,
    isArchived: false,
  });
  managerData = await owner.query(api.npcs.getManagerData, {});
  expect(managerData.trashedNpcs).toEqual([]);

  await owner.mutation(api.npcs.renameCategory, {
    categoryId: category!._id,
    label: "Warhost",
  });
  await owner.mutation(api.npcs.deleteCategory, {
    categoryId: category!._id,
  });

  managerData = await owner.query(api.npcs.getManagerData, {});
  expect(managerData.categories).toEqual([]);
});

test("legacy npc create path stays complete and invalid refs are rejected", async () => {
  const t = convexTest(schema, modules);
  const owner = t.withIdentity(createIdentity("gm|owner"));

  const created = await createNpc(owner, "Roadfang");
  expect(created?.status).toBe("complete");
  expect(created?.currentStep).toBe("review");

  await expect(
    owner.mutation(api.npcs.create, {
      input: {
        creatureRef: {
          kind: "creature",
          id: "creature.missing",
        } as never,
      },
    }),
  ).rejects.toThrow();
});
