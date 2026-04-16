/// <reference types="vite/client" />

import { importedRuleset } from "@bugchud/core/data";
import { convexTest } from "convex-test";
import { expect, test } from "vitest";
import {
  buildExtensionsWithStoredAttributeRolls,
  computeRolledAttributesForRace,
  getRaceRollProfile,
} from "../lib/character-attribute-rolls";
import { EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS } from "../lib/character-background-special-steps";
import {
  ARCYNE_PREPARED_SLOT_TOTAL,
  getStoredSpellPreparation,
} from "../lib/character-spell-preparation";
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

async function createCharacter(
  owner: ReturnType<ReturnType<typeof convexTest>["withIdentity"]>,
  name: string,
) {
  return owner.mutation(api.characters.create, {
    input: {
      name,
      currentFate: 1,
    },
  });
}

function findCrossOriginBackgroundExample(guidedOptions: {
  backgroundsByOrigin: Array<{
    originId: string;
    backgroundIds: string[];
    startingDreamIds?: string[];
  }>;
}) {
  for (const primaryOrigin of guidedOptions.backgroundsByOrigin) {
    const ownBackgroundId = primaryOrigin.backgroundIds[0];
    const secondOwnBackgroundId = primaryOrigin.backgroundIds[1];
    if (!ownBackgroundId) {
      continue;
    }

    const crossOriginBackgroundIds: string[] = [];
    for (const secondaryOrigin of guidedOptions.backgroundsByOrigin) {
      if (secondaryOrigin.originId === primaryOrigin.originId) {
        continue;
      }

      for (const backgroundId of secondaryOrigin.backgroundIds) {
        if (!primaryOrigin.backgroundIds.includes(backgroundId)) {
          crossOriginBackgroundIds.push(backgroundId);
        }
      }
    }

    if (ownBackgroundId && secondOwnBackgroundId && crossOriginBackgroundIds.length >= 2) {
      return {
        primaryOrigin,
        ownBackgroundId,
        secondOwnBackgroundId,
        crossOriginBackgroundId: crossOriginBackgroundIds[0],
        secondCrossOriginBackgroundId: crossOriginBackgroundIds[1],
      }
    }
  }

  return null;
}

function findBackgroundByName(
  guidedOptions: {
    backgrounds: Array<{ id: string; name: string }>;
  },
  expectedName: string,
) {
  return guidedOptions.backgrounds.find(
    (background) => background.name.toLocaleLowerCase() === expectedName.toLocaleLowerCase(),
  );
}

function findOriginForBackground(
  guidedOptions: {
    backgroundsByOrigin: Array<{
      originId: string;
      backgroundIds: string[];
    }>;
  },
  backgroundId: string,
) {
  return guidedOptions.backgroundsByOrigin.find((origin) =>
    origin.backgroundIds.includes(backgroundId),
  );
}

function findSpellBySlug(
  guidedOptions: {
    spells: Array<{ id: string; slug: string }>;
  },
  slug: string,
) {
  return guidedOptions.spells.find((spell) => spell.slug === slug);
}

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
});

test("guided creator options expose the curated creation payload", async () => {
  const t = convexTest(schema, modules);

  const guidedOptions = await t.query(api.ruleset.getGuidedCharacterCreationOptions, {});

  expect(guidedOptions.rulesetId).toBe(importedRuleset.id);
  expect(guidedOptions.rulesetVersion).toBe(importedRuleset.version);
  expect(guidedOptions.races.length).toBeGreaterThan(0);
  expect(guidedOptions.origins.length).toBeGreaterThan(0);
  expect(guidedOptions.backgrounds.length).toBeGreaterThan(0);
  expect(guidedOptions.dreams.length).toBeGreaterThan(0);
  expect(guidedOptions.mutations.length).toBeGreaterThan(0);
  expect(guidedOptions.bionics.length).toBeGreaterThan(0);
  expect(guidedOptions.backgroundsByOrigin).toHaveLength(guidedOptions.origins.length);
  expect(guidedOptions.patrons.every((patron) => patron.kind === "patron")).toBe(true);
});

test("guided initialization preview is public and guided draft handoff lands on review", async () => {
  const t = convexTest(schema, modules);
  const owner = t.withIdentity(createIdentity("user|owner"));

  const guidedOptions = await t.query(api.ruleset.getGuidedCharacterCreationOptions, {});
  const backgroundExample = findCrossOriginBackgroundExample(guidedOptions);
  expect(backgroundExample).not.toBeNull();
  const originMapping = backgroundExample!.primaryOrigin;
  const ownBackgroundId = backgroundExample!.ownBackgroundId;
  const secondOwnBackgroundId = backgroundExample!.secondOwnBackgroundId;
  const crossOriginBackgroundId = backgroundExample!.crossOriginBackgroundId;
  const secondCrossOriginBackgroundId = backgroundExample!.secondCrossOriginBackgroundId;
  const suggestedDreamId = originMapping.startingDreamIds?.[0];
  const rolledRace = guidedOptions.races.find((race) => getRaceRollProfile(race).supported);
  const storedAttributeRolls = rolledRace
    ? {
        version: 1 as const,
        usedAt: 1_716_000_000_000,
        raceIdAtRoll: rolledRace.id,
        pools: {
          twitch: [6, 4, 1] as [number, number, number],
          flesh: [5, 3, 2] as [number, number, number],
          mojo: [6, 6, 2] as [number, number, number],
        },
      }
    : null;

  const previewInput = {
    name: "Guided Ash",
    raceRef: {
      kind: "race" as const,
      id: rolledRace?.id ?? guidedOptions.races[0]!.id,
    },
    originRef: {
      kind: "origin" as const,
      id: originMapping.originId,
    },
    backgroundRefs: [
      {
        kind: "background" as const,
        id: ownBackgroundId,
      },
      {
        kind: "background" as const,
        id: crossOriginBackgroundId,
      },
      {
        kind: "background" as const,
        id: secondOwnBackgroundId,
      },
    ],
    dreamRefs: suggestedDreamId
      ? [
          {
            kind: "dream" as const,
            id: suggestedDreamId,
          },
        ]
      : [],
    patronRef: guidedOptions.patrons[0]
      ? {
          kind: "patron" as const,
          id: guidedOptions.patrons[0].ref.id,
        }
      : undefined,
    tags: ["guided", "frontchud"],
    extensions: storedAttributeRolls
      ? buildExtensionsWithStoredAttributeRolls(undefined, storedAttributeRolls)
      : undefined,
  };

  const preview = await t.query(api.characters.previewInitialization, {
    input: previewInput,
    specialSelections: EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
  });

  expect(preview.normalizedState.identity.name).toBe("Guided Ash");
  expect(
    preview.normalizedState.identity.backgroundRefs.map((refValue) => refValue.id),
  ).toEqual(
    expect.arrayContaining([
      ownBackgroundId,
      secondOwnBackgroundId,
      crossOriginBackgroundId,
    ]),
  );
  expect(preview.normalizedState.identity.backgroundRefs).toHaveLength(3);
  expect(preview.validation.ok).toBe(true);
  expect(preview.combatProfile.displayName).toContain("Guided Ash");
  if (rolledRace && storedAttributeRolls) {
    expect(preview.normalizedState.extensions).toMatchObject(
      buildExtensionsWithStoredAttributeRolls(undefined, storedAttributeRolls),
    );
    expect(preview.normalizedState.attributes).toMatchObject(
      computeRolledAttributesForRace(
        rolledRace,
        storedAttributeRolls.pools,
        preview.normalizedState.attributes.glory,
      )!,
    );
  }

  await expect(
    t.query(api.characters.previewInitialization, {
      input: {
        ...previewInput,
        backgroundRefs: [
          {
            kind: "background" as const,
            id: "__missing__",
          } as never,
        ],
      },
      specialSelections: EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
    }),
  ).rejects.toThrow();

  await expect(
    t.query(api.characters.previewInitialization, {
      input: {
        ...previewInput,
        backgroundRefs: [
          {
            kind: "background" as const,
            id: crossOriginBackgroundId,
          },
        ],
      },
      specialSelections: EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
    }),
  ).rejects.toThrow("Choose at least one background from your origin.");

  await expect(
    t.query(api.characters.previewInitialization, {
      input: {
        ...previewInput,
        backgroundRefs: [
          {
            kind: "background" as const,
            id: ownBackgroundId,
          },
          {
            kind: "background" as const,
            id: crossOriginBackgroundId,
          },
          {
            kind: "background" as const,
            id: secondCrossOriginBackgroundId,
          },
        ],
      },
      specialSelections: EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
    }),
  ).rejects.toThrow("Choose no more than 1 background from another origin.");

  await expect(
    t.query(api.characters.previewInitialization, {
      input: {
        ...previewInput,
        backgroundRefs: [
          {
            kind: "background" as const,
            id: ownBackgroundId,
          },
          {
            kind: "background" as const,
            id: secondOwnBackgroundId,
          },
          {
            kind: "background" as const,
            id: crossOriginBackgroundId,
          },
          {
            kind: "background" as const,
            id: secondCrossOriginBackgroundId,
          },
        ],
      },
      specialSelections: EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
    }),
  ).rejects.toThrow("Choose no more than 3 backgrounds.");

  const created = await owner.mutation(api.characters.createGuidedDraft, {
    input: previewInput,
    specialSelections: EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
  });

  expect(created).not.toBeNull();
  expect(created?.status).toBe("draft");
  expect(created?.currentStep).toBe("review");
  expect(created?.completedAt).toBeUndefined();
  expect(created?.name).toBe("Guided Ash");

  const persisted = await owner.query(api.characters.getMine, {
    bugchudId: created!.bugchudId,
  });
  expect(persisted?.currentStep).toBe("review");
  expect(persisted?.status).toBe("draft");
  if (rolledRace && storedAttributeRolls) {
    expect(persisted?.state.extensions).toMatchObject(
      buildExtensionsWithStoredAttributeRolls(undefined, storedAttributeRolls),
    );
    expect(persisted?.state.attributes).toMatchObject(
      computeRolledAttributesForRace(
        rolledRace,
        storedAttributeRolls.pools,
        persisted!.state.attributes.glory,
      )!,
    );
  }

  await expect(
    owner.mutation(api.characters.createGuidedDraft, {
      input: {
        ...previewInput,
        raceRef: {
          kind: "race" as const,
          id: "__missing__",
        } as never,
      },
      specialSelections: EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
    }),
  ).rejects.toThrow();
});

test("guided background special steps validate and apply opening grants", async () => {
  const t = convexTest(schema, modules);
  const owner = t.withIdentity(createIdentity("user|owner"));

  const guidedOptions = await t.query(api.ruleset.getGuidedCharacterCreationOptions, {});
  const raceId = guidedOptions.races[0]?.id;
  const mutant = findBackgroundByName(guidedOptions, "MUTANT");
  const cyborg = findBackgroundByName(guidedOptions, "CYBORG");
  const dreadTongued = findBackgroundByName(guidedOptions, "DREAD-TONGUED");
  const archon = findBackgroundByName(guidedOptions, "ARCHON");
  const wizard = findBackgroundByName(guidedOptions, "WIZARD");
  const majorBionic = guidedOptions.bionics.find((bionic) =>
    bionic.surgeryCode.startsWith("Major"),
  );
  const minorBionic = guidedOptions.bionics.find(
    (bionic) => !bionic.surgeryCode.startsWith("Major"),
  );
  const mutationSelections = guidedOptions.mutations.slice(0, 2).map((mutation) => mutation.id);

  expect(raceId).toBeDefined();
  expect(mutant).toBeDefined();
  expect(cyborg).toBeDefined();
  expect(dreadTongued).toBeDefined();
  expect(archon).toBeDefined();
  expect(wizard).toBeDefined();
  expect(majorBionic).toBeDefined();
  expect(mutationSelections).toHaveLength(2);

  const baseInputFor = (backgroundId: string, name: string) => {
    const origin = findOriginForBackground(guidedOptions, backgroundId);
    expect(origin).toBeDefined();

    return {
      name,
      raceRef: {
        kind: "race" as const,
        id: raceId!,
      },
      originRef: {
        kind: "origin" as const,
        id: origin!.originId,
      },
      backgroundRefs: [
        {
          kind: "background" as const,
          id: backgroundId,
        },
      ],
      tags: ["guided-special"],
    };
  };

  await expect(
    t.query(api.characters.previewInitialization, {
      input: baseInputFor(mutant!.id, "Mutant Ash"),
      specialSelections: EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
    }),
  ).rejects.toThrow("Gene-Freek requires exactly two mutation picks.");

  const mutantPreview = await t.query(api.characters.previewInitialization, {
    input: baseInputFor(mutant!.id, "Mutant Ash"),
    specialSelections: {
      ...EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
      geneFreekMutationIds: mutationSelections,
    },
  });

  expect(mutantPreview.normalizedState.body.mutationRefs.map((refValue) => refValue.id)).toEqual(
    expect.arrayContaining(mutationSelections),
  );

  await expect(
    t.query(api.characters.previewInitialization, {
      input: baseInputFor(cyborg!.id, "Cyborg Ash"),
      specialSelections: EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
    }),
  ).rejects.toThrow("Overclocked requires one major bionic selection.");

  if (minorBionic) {
    await expect(
      t.query(api.characters.previewInitialization, {
        input: baseInputFor(cyborg!.id, "Cyborg Ash"),
        specialSelections: {
          ...EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
          overclockedBionicId: minorBionic.id,
        },
      }),
    ).rejects.toThrow("Overclocked must use a major bionic selection.");
  }

  const cyborgPreview = await t.query(api.characters.previewInitialization, {
    input: baseInputFor(cyborg!.id, "Cyborg Ash"),
    specialSelections: {
      ...EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
      overclockedBionicId: majorBionic!.id,
    },
  });

  expect(cyborgPreview.normalizedState.body.bionicRefs.map((refValue) => refValue.id)).toEqual(
    expect.arrayContaining([majorBionic!.id]),
  );

  const dreadPreview = await t.query(api.characters.previewInitialization, {
    input: baseInputFor(dreadTongued!.id, "Dread Ash"),
    specialSelections: EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
  });

  expect(dreadPreview.normalizedState.social.languages).toContain("The Black Tongue");
  expect(
    dreadPreview.normalizedState.magic.knownSpellRefs.map((refValue) => refValue.id),
  ).toEqual(expect.arrayContaining(["spell.ork-spawn", "spell.raise-dead"]));

  const archonInput = baseInputFor(archon!.id, "Archon Ash");
  const archonSelections = {
    ...EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
    sterileTyrantCutthroatCount: 11,
  };
  const archonPreview = await t.query(api.characters.previewInitialization, {
    input: archonInput,
    specialSelections: archonSelections,
  });

  expect(archonPreview.normalizedState.social.followers).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        label: "Cutthroats",
        quantity: 11,
      }),
    ]),
  );

  const createdArchon = await owner.mutation(api.characters.createGuidedDraft, {
    input: archonInput,
    specialSelections: archonSelections,
  });
  const persistedArchon = await owner.query(api.characters.getMine, {
    bugchudId: createdArchon!.bugchudId,
  });

  expect(persistedArchon?.state.social.followers).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        label: "Cutthroats",
        quantity: 11,
      }),
    ]),
  );

  const fireball = findSpellBySlug(guidedOptions, "fireball");
  const teleport = findSpellBySlug(guidedOptions, "teleport");

  expect(fireball).toBeDefined();
  expect(teleport).toBeDefined();

  const wizardInput = baseInputFor(wizard!.id, "Wizard Ash");

  await expect(
    t.query(api.characters.previewInitialization, {
      input: wizardInput,
      specialSelections: EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
    }),
  ).rejects.toThrow("Arcyne Potential requires at least one known spell selection.");

  await expect(
    t.query(api.characters.previewInitialization, {
      input: wizardInput,
      specialSelections: {
        ...EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
        arcyneKnownSpellIds: [fireball!.id, teleport!.id],
        arcynePreparedSpellSlotsById: {
          [fireball!.id]: 3,
          [teleport!.id]: 2,
        },
      },
    }),
  ).rejects.toThrow(
    `Arcyne Potential requires exactly ${ARCYNE_PREPARED_SLOT_TOTAL} prepared spell slots.`,
  );

  const wizardSelections = {
    ...EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS,
    arcyneKnownSpellIds: [fireball!.id, teleport!.id],
    arcynePreparedSpellSlotsById: {
      [fireball!.id]: 5,
      [teleport!.id]: 3,
    },
  };

  const wizardPreview = await t.query(api.characters.previewInitialization, {
    input: wizardInput,
    specialSelections: wizardSelections,
  });

  expect(
    wizardPreview.normalizedState.magic.knownSpellRefs.map((refValue) => refValue.id),
  ).toEqual(expect.arrayContaining([fireball!.id, teleport!.id]));
  expect(
    wizardPreview.normalizedState.magic.preparedSpellRefs.map((refValue) => refValue.id),
  ).toEqual(expect.arrayContaining([fireball!.id, teleport!.id]));
  expect(getStoredSpellPreparation(wizardPreview.normalizedState)?.preparedSlotsBySpellId).toEqual(
    wizardSelections.arcynePreparedSpellSlotsById,
  );

  const createdWizard = await owner.mutation(api.characters.createGuidedDraft, {
    input: wizardInput,
    specialSelections: wizardSelections,
  });
  const persistedWizard = await owner.query(api.characters.getMine, {
    bugchudId: createdWizard!.bugchudId,
  });

  expect(getStoredSpellPreparation(persistedWizard!.state)?.preparedSlotsBySpellId).toEqual(
    wizardSelections.arcynePreparedSpellSlotsById,
  );

  const wizardStaleState = structuredClone(persistedWizard!.state);
  wizardStaleState.magic.preparedSpellRefs = [{ kind: "spell", id: fireball!.id }];

  const savedWizard = await owner.mutation(api.characters.saveDraft, {
    bugchudId: createdWizard!.bugchudId,
    state: wizardStaleState,
    currentStep: "path",
  });

  expect(getStoredSpellPreparation(savedWizard!.state)?.preparedSlotsBySpellId).toEqual(
    wizardSelections.arcynePreparedSpellSlotsById,
  );
});

test("character create, read, update, archive, restore, and manager data all work", async () => {
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
  expect(created?.managerCategoryId ?? null).toBeNull();
  expect(created?.archivedAt ?? null).toBeNull();
  expect(typeof created?.managerSortOrder).toBe("number");

  const listed = await owner.query(api.characters.listMine, {});
  const fetched = await owner.query(api.characters.getMine, {
    bugchudId: created!.bugchudId,
  });
  const initialManagerData = await owner.query(api.characters.getManagerData, {});

  expect(listed).toHaveLength(1);
  expect(listed[0]?.bugchudId).toBe(created?.bugchudId);
  expect(fetched?._id).toBe(created?._id);
  expect(initialManagerData.categories).toEqual([]);
  expect(initialManagerData.characters).toHaveLength(1);
  expect(initialManagerData.trashedCharacters).toHaveLength(0);

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

  const trashedManagerData = await owner.query(api.characters.getManagerData, {});
  expect(await owner.query(api.characters.listMine, {})).toHaveLength(0);
  expect(
    await owner.query(api.characters.listMine, { includeArchived: true }),
  ).toHaveLength(1);
  expect(trashedManagerData.characters).toHaveLength(0);
  expect(trashedManagerData.trashedCharacters).toHaveLength(1);
  expect(trashedManagerData.trashedCharacters[0]?.archivedAt).toBeTypeOf("number");

  await owner.mutation(api.characters.archive, {
    bugchudId: created!.bugchudId,
    isArchived: false,
  });

  const restoredManagerData = await owner.query(api.characters.getManagerData, {});
  expect(restoredManagerData.characters).toHaveLength(1);
  expect(restoredManagerData.trashedCharacters).toHaveLength(0);
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
  expect(created?.managerCategoryId ?? null).toBeNull();
  expect(typeof created?.managerSortOrder).toBe("number");

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

test("category CRUD is scoped to the owner and deleting a category preserves characters", async () => {
  const t = convexTest(schema, modules);
  const owner = t.withIdentity(createIdentity("user|owner"));
  const outsider = t.withIdentity(createIdentity("user|outsider"));

  const first = await createCharacter(owner, "Alpha");
  const second = await createCharacter(owner, "Beta");
  const createdCategory = await owner.mutation(api.characters.createCategory, {
    label: "Frontline",
  });

  expect(createdCategory?.label).toBe("Frontline");

  await expect(
    outsider.mutation(api.characters.renameCategory, {
      categoryId: createdCategory!._id,
      label: "Stolen",
    }),
  ).rejects.toThrow("Category not found.");

  const renamedCategory = await owner.mutation(api.characters.renameCategory, {
    categoryId: createdCategory!._id,
    label: "Frontline Prime",
  });
  expect(renamedCategory?.label).toBe("Frontline Prime");

  await owner.mutation(api.characters.moveInManager, {
    bugchudId: first!.bugchudId,
    targetCategoryId: createdCategory!._id,
    targetIndex: 0,
  });
  await owner.mutation(api.characters.moveInManager, {
    bugchudId: second!.bugchudId,
    targetCategoryId: createdCategory!._id,
    targetIndex: 1,
  });

  let managerData = await owner.query(api.characters.getManagerData, {});
  expect(managerData.categories).toHaveLength(1);
  expect(
    managerData.characters
      .filter((character) => character.managerCategoryId === createdCategory!._id)
      .map((character) => character.name),
  ).toEqual(["Alpha", "Beta"]);

  await owner.mutation(api.characters.deleteCategory, {
    categoryId: createdCategory!._id,
  });

  managerData = await owner.query(api.characters.getManagerData, {});
  expect(managerData.categories).toEqual([]);
  expect(managerData.characters.map((character) => character.managerCategoryId)).toEqual([
    null,
    null,
  ]);
  expect(managerData.characters.map((character) => character.name)).toEqual([
    "Alpha",
    "Beta",
  ]);
});

test("moveInManager reorders within and across categories", async () => {
  const t = convexTest(schema, modules);
  const owner = t.withIdentity(createIdentity("user|owner"));

  const first = await createCharacter(owner, "A");
  const second = await createCharacter(owner, "B");
  const third = await createCharacter(owner, "C");
  const categoryA = await owner.mutation(api.characters.createCategory, {
    label: "Category A",
  });
  const categoryB = await owner.mutation(api.characters.createCategory, {
    label: "Category B",
  });

  await owner.mutation(api.characters.moveInManager, {
    bugchudId: first!.bugchudId,
    targetCategoryId: categoryA!._id,
    targetIndex: 0,
  });
  await owner.mutation(api.characters.moveInManager, {
    bugchudId: second!.bugchudId,
    targetCategoryId: categoryA!._id,
    targetIndex: 1,
  });
  await owner.mutation(api.characters.moveInManager, {
    bugchudId: third!.bugchudId,
    targetCategoryId: categoryA!._id,
    targetIndex: 1,
  });

  let managerData = await owner.query(api.characters.getManagerData, {});
  expect(
    managerData.characters
      .filter((character) => character.managerCategoryId === categoryA!._id)
      .map((character) => character.name),
  ).toEqual(["A", "C", "B"]);

  await owner.mutation(api.characters.moveInManager, {
    bugchudId: third!.bugchudId,
    targetCategoryId: categoryB!._id,
    targetIndex: 0,
  });

  managerData = await owner.query(api.characters.getManagerData, {});
  expect(
    managerData.characters
      .filter((character) => character.managerCategoryId === categoryA!._id)
      .map((character) => character.name),
  ).toEqual(["A", "B"]);
  expect(
    managerData.characters
      .filter((character) => character.managerCategoryId === categoryB!._id)
      .map((character) => character.name),
  ).toEqual(["C"]);
});

test("trashing removes a character from the active section and restoring appends it back", async () => {
  const t = convexTest(schema, modules);
  const owner = t.withIdentity(createIdentity("user|owner"));

  const first = await createCharacter(owner, "Vex");
  const second = await createCharacter(owner, "Kite");
  const third = await createCharacter(owner, "Mora");
  const category = await owner.mutation(api.characters.createCategory, {
    label: "Strike Team",
  });

  await owner.mutation(api.characters.moveInManager, {
    bugchudId: first!.bugchudId,
    targetCategoryId: category!._id,
    targetIndex: 0,
  });
  await owner.mutation(api.characters.moveInManager, {
    bugchudId: second!.bugchudId,
    targetCategoryId: category!._id,
    targetIndex: 1,
  });
  await owner.mutation(api.characters.moveInManager, {
    bugchudId: third!.bugchudId,
    targetCategoryId: category!._id,
    targetIndex: 2,
  });

  await owner.mutation(api.characters.archive, {
    bugchudId: second!.bugchudId,
  });

  let managerData = await owner.query(api.characters.getManagerData, {});
  expect(
    managerData.characters
      .filter((character) => character.managerCategoryId === category!._id)
      .map((character) => character.name),
  ).toEqual(["Vex", "Mora"]);
  expect(managerData.trashedCharacters.map((character) => character.name)).toEqual([
    "Kite",
  ]);

  await owner.mutation(api.characters.archive, {
    bugchudId: second!.bugchudId,
    isArchived: false,
  });

  managerData = await owner.query(api.characters.getManagerData, {});
  expect(
    managerData.characters
      .filter((character) => character.managerCategoryId === category!._id)
      .map((character) => character.name),
  ).toEqual(["Vex", "Mora", "Kite"]);
  expect(managerData.trashedCharacters).toEqual([]);
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
