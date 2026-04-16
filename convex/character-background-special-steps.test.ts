/// <reference types="vite/client" />

import { importedRuleset } from "@bugchud/core/data";
import { expect, test } from "vitest";
import {
  ARCYNE_PREPARED_SLOT_TOTAL,
} from "../lib/character-spell-preparation";
import {
  EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
  getActiveGuidedBackgroundSpecials,
  getMajorBionicIds,
  sanitizeGuidedBackgroundSpecialSelections,
  validateGuidedBackgroundSpecialSelections,
} from "../lib/character-background-special-steps";

function requireDreamId(slug: string) {
  const dream = Object.values(importedRuleset.registries.dream).find(
    (entry) => entry.slug === slug,
  );

  expect(dream).toBeDefined();
  return dream!.id;
}

function requireSpellId(slug: string) {
  const spell = Object.values(importedRuleset.registries.spell).find(
    (entry) => entry.slug === slug,
  );

  expect(spell).toBeDefined();
  return spell!.id;
}

test("major bionic filtering keeps only major surgery entries", () => {
  const bionics = Object.values(importedRuleset.registries.bionic);
  const majorBionicIds = getMajorBionicIds(bionics);

  expect(majorBionicIds.size).toBeGreaterThan(0);
  for (const bionic of bionics) {
    expect(majorBionicIds.has(bionic.id)).toBe(
      bionic.surgeryCode.startsWith("Major"),
    );
  }
});

test("guided special activity turns on from the expected opening dream ids", () => {
  const active = getActiveGuidedBackgroundSpecials([
    { id: requireDreamId("gene-freek") },
    { id: requireDreamId("overclocked") },
    { id: requireDreamId("dread-tongued") },
    { id: requireDreamId("sterile-tyrant") },
  ]);

  expect(active).toEqual({
    geneFreek: true,
    overclocked: true,
    dreadTongued: true,
    sterileTyrant: true,
    arcynePotential: false,
  });
});

test("guided special activity turns on arcyne potential from the wizard dream id", () => {
  const active = getActiveGuidedBackgroundSpecials([
    { id: requireDreamId("arcyne-potential") },
  ]);

  expect(active.arcynePotential).toBe(true);
});

test("guided special selection sanitization clears inactive and invalid state", () => {
  const mutations = Object.values(importedRuleset.registries.mutation);
  const bionics = Object.values(importedRuleset.registries.bionic);
  const spells = Object.values(importedRuleset.registries.spell);
  const validMutationIds = new Set(mutations.slice(0, 2).map((mutation) => mutation.id));
  const validMajorBionicIds = getMajorBionicIds(bionics);
  const validSpellIds = new Set(spells.slice(0, 3).map((spell) => spell.id));
  const firstMajorBionicId = [...validMajorBionicIds][0];

  expect(firstMajorBionicId).toBeDefined();

  const inactiveSelections = sanitizeGuidedBackgroundSpecialSelections({
    selections: {
      geneFreekMutationIds: [mutations[0]!.id],
      overclockedBionicId: firstMajorBionicId!,
      sterileTyrantCutthroatCount: 9,
      arcyneKnownSpellIds: [spells[0]!.id],
      arcynePreparedSpellSlotsById: {
        [spells[0]!.id]: 4,
      },
    },
    active: {
      geneFreek: false,
      overclocked: false,
      dreadTongued: false,
      sterileTyrant: false,
      arcynePotential: false,
    },
    validMutationIds,
    validMajorBionicIds,
    validSpellIds,
  });

  expect(inactiveSelections).toEqual(EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS);

  const activeSelections = sanitizeGuidedBackgroundSpecialSelections({
    selections: {
      geneFreekMutationIds: [mutations[0]!.id, mutations[0]!.id, "__missing__"],
      overclockedBionicId: firstMajorBionicId!,
      sterileTyrantCutthroatCount: 11,
      arcyneKnownSpellIds: [spells[0]!.id, "__missing__", spells[0]!.id],
      arcynePreparedSpellSlotsById: {
        [spells[0]!.id]: ARCYNE_PREPARED_SLOT_TOTAL,
        "__missing__": 2,
      },
    },
    active: {
      geneFreek: true,
      overclocked: true,
      dreadTongued: false,
      sterileTyrant: true,
      arcynePotential: true,
    },
    validMutationIds,
    validMajorBionicIds,
    validSpellIds,
  });

  expect(activeSelections).toEqual({
    geneFreekMutationIds: [mutations[0]!.id],
    overclockedBionicId: firstMajorBionicId!,
    sterileTyrantCutthroatCount: 11,
    arcyneKnownSpellIds: [spells[0]!.id],
    arcynePreparedSpellSlotsById: {
      [spells[0]!.id]: ARCYNE_PREPARED_SLOT_TOTAL,
    },
  });
});

test("guided arcyne spell validation enforces known pool and exact prepared slots", () => {
  const spells = Object.values(importedRuleset.registries.spell);
  const validSpellIds = new Set(spells.map((spell) => spell.id));
  const selectedSpellIds = [
    requireSpellId("fireball"),
    requireSpellId("teleport"),
  ];

  const invalidPreparedSource = validateGuidedBackgroundSpecialSelections({
    selections: {
      ...EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
      arcyneKnownSpellIds: [selectedSpellIds[0]!],
      arcynePreparedSpellSlotsById: {
        [selectedSpellIds[1]!]: ARCYNE_PREPARED_SLOT_TOTAL,
      },
    },
    active: {
      geneFreek: false,
      overclocked: false,
      dreadTongued: false,
      sterileTyrant: false,
      arcynePotential: true,
    },
    validMutationIds: new Set(),
    validMajorBionicIds: new Set(),
    validSpellIds,
  });

  expect(invalidPreparedSource).toContain(
    "Arcyne Potential prepared slots must come from selected known spells.",
  );

  const wrongTotal = validateGuidedBackgroundSpecialSelections({
    selections: {
      ...EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
      arcyneKnownSpellIds: selectedSpellIds,
      arcynePreparedSpellSlotsById: {
        [selectedSpellIds[0]!]: 5,
        [selectedSpellIds[1]!]: 2,
      },
    },
    active: {
      geneFreek: false,
      overclocked: false,
      dreadTongued: false,
      sterileTyrant: false,
      arcynePotential: true,
    },
    validMutationIds: new Set(),
    validMajorBionicIds: new Set(),
    validSpellIds,
  });

  expect(wrongTotal).toContain(
    `Arcyne Potential requires exactly ${ARCYNE_PREPARED_SLOT_TOTAL} prepared spell slots.`,
  );
});
