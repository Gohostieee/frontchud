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
