/// <reference types="vite/client" />

import { importedRuleset } from "@bugchud/core/data";
import { convexTest } from "convex-test";
import { expect, test } from "vitest";
import { api } from "./_generated/api";
import { normalizeCharacterState, toBugchudCharacterState } from "./bugchud";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");

const createIdentity = (tokenIdentifier: string) => ({
  tokenIdentifier,
  subject: tokenIdentifier,
  issuer: "https://clerk.test",
});

const firstCreature = importedRuleset.registries.creature
  ? Object.values(importedRuleset.registries.creature)[0]
  : undefined;

const firstNpcLoadout = importedRuleset.registries.npcLoadout
  ? Object.values(importedRuleset.registries.npcLoadout)[0]
  : undefined;

test("ruleset queries expose imported BUGCHUD creation data", async () => {
  const t = convexTest(schema, modules);

  const characterOptions = await t.query(api.ruleset.getCharacterCreationOptions, {});
  const filteredCharacterOptions = await t.query(
    api.ruleset.getCharacterCreationOptions,
    {
      originRef: importedRuleset.characterCreation.originRefs[0] as never,
    },
  );
  const npcOptions = await t.query(api.ruleset.getNpcCreationOptions, {});

  expect(characterOptions.rulesetId).toBe(importedRuleset.id);
  expect(characterOptions.races.length).toBeGreaterThan(0);
  expect(filteredCharacterOptions.backgrounds.length).toBeLessThanOrEqual(
    characterOptions.backgrounds.length,
  );
  expect(npcOptions.creatures.length).toBeGreaterThan(0);
  expect(npcOptions.npcLoadouts.length).toBeGreaterThan(0);
});

test("character editor options expose grouped step registries and empty-state arrays", async () => {
  const t = convexTest(schema, modules);

  const editorOptions = await t.query(api.ruleset.getCharacterEditorOptions, {});

  expect(editorOptions.rulesetId).toBe(importedRuleset.id);
  expect(editorOptions.steps.lineage.races.length).toBeGreaterThan(0);
  expect(editorOptions.steps.lineage.origins.length).toBeGreaterThan(0);
  expect(editorOptions.steps.background.backgrounds.length).toBeGreaterThan(0);
  expect(editorOptions.steps.path.dreams.length).toBeGreaterThan(0);
  expect(editorOptions.steps.path.spells.length).toBeGreaterThan(0);
  expect(editorOptions.steps.faith.pantheons.length).toBeGreaterThan(0);
  expect(editorOptions.steps.faith.patrons.length).toBeGreaterThan(0);
  expect(editorOptions.steps.gear.items.length).toBeGreaterThan(0);
  expect(editorOptions.steps.gear.weapons.length).toBeGreaterThan(0);
  expect(editorOptions.steps.gear.armors.length).toBeGreaterThan(0);
  expect(editorOptions.steps.social.factions.length).toBeGreaterThan(0);
  expect(editorOptions.steps.social.cultures.length).toBeGreaterThan(0);

  expect(editorOptions.steps.faith.boons).toEqual([]);
  expect(editorOptions.steps.faith.covenants).toEqual([]);
  expect(editorOptions.steps.gear.shields).toEqual([]);
  expect(editorOptions.steps.background.backgroundsByOrigin).toHaveLength(
    editorOptions.steps.lineage.origins.length,
  );

  const allFaithOptions = editorOptions.characterCreation.faithOptions.all;
  expect(allFaithOptions.length).toBeGreaterThan(0);
  expect(
    editorOptions.characterCreation.faithOptions.pantheons.length +
      editorOptions.characterCreation.faithOptions.patrons.length,
  ).toBe(allFaithOptions.length);
  expect(
    allFaithOptions.every(
      (option) => option.kind === "pantheon" || option.kind === "patron",
    ),
  ).toBe(true);

  const firstOrigin = editorOptions.steps.lineage.origins[0];
  const firstOriginMapping = editorOptions.steps.background.backgroundsByOrigin.find(
    (entry) => entry.originId === firstOrigin?.id,
  );
  expect(firstOriginMapping).toBeDefined();
  expect(Array.isArray(firstOriginMapping?.backgroundIds)).toBe(true);
  expect(Array.isArray(firstOriginMapping?.startingDreamIds)).toBe(true);
  expect(Array.isArray(firstOriginMapping?.startingLanguages)).toBe(true);
});

test("character create, read, update, archive, and owner scoping all work", async () => {
  const t = convexTest(schema, modules);
  const owner = t.withIdentity(createIdentity("user|owner"));
  const outsider = t.withIdentity(createIdentity("user|outsider"));

  const created = await owner.mutation(api.characters.create, {
    input: {
      name: "Selene Ash",
      currentFate: 1,
    },
  });

  expect(created).not.toBeNull();
  expect(created?.state.kind).toBe("character");
  expect(created?.name).toBe("Selene Ash");

  const listed = await owner.query(api.characters.listMine, {});
  const fetched = await owner.query(api.characters.getMine, {
    bugchudId: created!.bugchudId,
  });

  expect(listed).toHaveLength(1);
  expect(listed[0]?.bugchudId).toBe(created?.bugchudId);
  expect(fetched?._id).toBe(created?._id);

  const updatedState = structuredClone(created!.state);
  updatedState.identity.name = "Marta Rust";

  const updated = await owner.mutation(api.characters.updateState, {
    bugchudId: created!.bugchudId,
    state: updatedState,
  });

  expect(updated?.name).toBe("Marta Rust");
  expect(updated?.nameLower).toBe("marta rust");

  const searchResults = await owner.query(api.characters.listMine, {
    search: "marta",
  });
  expect(searchResults).toHaveLength(1);

  expect(
    await outsider.query(api.characters.getMine, {
      bugchudId: created!.bugchudId,
    }),
  ).toBeNull();
  await expect(
    outsider.mutation(api.characters.archive, {
      bugchudId: created!.bugchudId,
    }),
  ).rejects.toThrow("Character not found.");

  await owner.mutation(api.characters.archive, {
    bugchudId: created!.bugchudId,
  });

  expect(await owner.query(api.characters.listMine, {})).toHaveLength(0);
  expect(
    await owner.query(api.characters.listMine, { includeArchived: true }),
  ).toHaveLength(1);
});

test("character drafts normalize persisted state and track workflow metadata", async () => {
  const t = convexTest(schema, modules);
  const owner = t.withIdentity(createIdentity("user|owner"));
  const outsider = t.withIdentity(createIdentity("user|outsider"));

  const created = await owner.mutation(api.characters.createDraft, {
    input: {
      name: "Ash Vale",
      currentFate: 2,
    },
  });

  expect(created).not.toBeNull();
  expect(created?.status).toBe("draft");
  expect(created?.currentStep).toBe("identity");
  expect(created?.completedAt).toBeUndefined();

  expect(await owner.query(api.characters.listMine, { status: "draft" })).toHaveLength(1);
  expect(await owner.query(api.characters.listMine, { status: "complete" })).toHaveLength(0);

  const staleState = structuredClone(created!.state);
  const firstSaveKey = Object.keys(staleState.saveBonuses)[0] as
    | keyof typeof staleState.saveBonuses
    | undefined;
  staleState.identity.name = "Ashen Vale";
  staleState.derivedStats.sprint = 999;
  staleState.derivedStats.focus = 999;
  if (firstSaveKey) {
    staleState.saveBonuses[firstSaveKey] = 999;
  }
  staleState.progression.spellAccessUnlocked = !staleState.progression.spellAccessUnlocked;
  staleState.resources.health = {
    current: 99,
    maximum: 99,
  };

  const preview = await owner.query(api.characters.previewDraft, {
    state: staleState,
  });
  const expectedNormalized = normalizeCharacterState(toBugchudCharacterState(staleState));

  expect(preview.normalizedState.derivedStats).toEqual(expectedNormalized.derivedStats);
  expect(preview.normalizedState.saveBonuses).toEqual(expectedNormalized.saveBonuses);
  expect(preview.normalizedState.progression.spellAccessUnlocked).toBe(
    expectedNormalized.progression.spellAccessUnlocked,
  );
  expect(preview.normalizedState.resources).toEqual(expectedNormalized.resources);

  const saved = await owner.mutation(api.characters.saveDraft, {
    bugchudId: created!.bugchudId,
    state: staleState,
    currentStep: "path",
  });

  expect(saved?.status).toBe("draft");
  expect(saved?.currentStep).toBe("path");
  expect(saved?.name).toBe("Ashen Vale");
  expect(saved?.state.derivedStats).toEqual(expectedNormalized.derivedStats);
  expect(saved?.state.saveBonuses).toEqual(expectedNormalized.saveBonuses);
  expect(saved?.state.progression.spellAccessUnlocked).toBe(
    expectedNormalized.progression.spellAccessUnlocked,
  );
  expect(saved?.state.resources).toEqual(expectedNormalized.resources);

  const resumed = await owner.query(api.characters.getMine, {
    bugchudId: created!.bugchudId,
  });
  expect(resumed?.status).toBe("draft");
  expect(resumed?.currentStep).toBe("path");
  expect(resumed?.state.derivedStats).toEqual(expectedNormalized.derivedStats);

  expect(
    await outsider.query(api.characters.getMine, {
      bugchudId: created!.bugchudId,
    }),
  ).toBeNull();

  const completed = await owner.mutation(api.characters.completeDraft, {
    bugchudId: created!.bugchudId,
    state: staleState,
  });

  expect(completed?.status).toBe("complete");
  expect(completed?.currentStep).toBe("review");
  expect(completed?.completedAt).toBeTypeOf("number");
  expect(await owner.query(api.characters.listMine, { status: "draft" })).toHaveLength(0);
  expect(await owner.query(api.characters.listMine, { status: "complete" })).toHaveLength(1);
});

test("character creation rejects invalid ruleset refs", async () => {
  const t = convexTest(schema, modules);
  const owner = t.withIdentity(createIdentity("user|owner"));

  await expect(
    owner.mutation(api.characters.create, {
      input: {
        raceRef: {
          kind: "race",
          id: "race.missing",
        },
      },
    }),
  ).rejects.toThrow();
});

test("npc create, search, and metadata sync work", async () => {
  const t = convexTest(schema, modules);
  const owner = t.withIdentity(createIdentity("gm|owner"));

  expect(firstCreature).toBeDefined();
  expect(firstNpcLoadout).toBeDefined();

  const created = await owner.mutation(api.npcs.create, {
    input: {
      name: "Roadfang",
      allegiance: "Raiders",
      actorKind: "npc",
      creatureRef: {
        kind: "creature",
        id: firstCreature!.id as never,
      },
      npcLoadoutRef: {
        kind: "npcLoadout",
        id: firstNpcLoadout!.id as never,
      },
    },
  });

  expect(created).not.toBeNull();
  expect(created?.state.kind).toBe("creatureState");
  expect(created?.actorKind).toBe("npc");
  expect(created?.allegiance).toBe("Raiders");

  const updatedState = structuredClone(created!.state);
  updatedState.identity.name = "Roadfang Prime";
  updatedState.identity.allegiance = "Raiders Elite";

  const updated = await owner.mutation(api.npcs.updateState, {
    bugchudId: created!.bugchudId,
    state: updatedState,
  });

  expect(updated?.name).toBe("Roadfang Prime");
  expect(updated?.allegiance).toBe("Raiders Elite");

  const searchResults = await owner.query(api.npcs.listMine, {
    search: "roadfang",
  });
  expect(searchResults).toHaveLength(1);
  expect(searchResults[0]?.name).toBe("Roadfang Prime");
});
