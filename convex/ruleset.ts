import { v } from "convex/values";
import { query } from "./_generated/server";
import {
  bugchudCore,
  getBackgroundsByOrigin,
  registryRefValidator,
} from "./bugchud";

const catalogList = <TKind extends Parameters<typeof bugchudCore.catalog.listByKind>[0]>(
  kind: TKind,
) => [...bugchudCore.catalog.listByKind(kind)];

const resolveFaithOption = (refValue: { kind: string; id: string }) => ({
  kind: refValue.kind,
  ref: refValue,
  definition: bugchudCore.catalog.mustResolveRef(refValue as never),
});

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

export const getGuidedCharacterCreationOptions = query({
  args: {},
  handler: async () => {
    const races = catalogList("race");
    const origins = catalogList("origin");
    const backgrounds = catalogList("background");
    const dreams = catalogList("dream");
    const mutations = catalogList("mutation");
    const bionics = catalogList("bionic");
    const spells = catalogList("spell");
    const backgroundsByOrigin = getBackgroundsByOrigin();

    const patronOptionRefs = bugchudCore.ruleset.characterCreation.faithOptions
      .filter((refValue) => refValue.kind === "patron")
      .map((refValue) => ({
        kind: "patron" as const,
        id: refValue.id,
      }));

    const items = catalogList("item");
    const weapons = catalogList("weapon");
    const armors = catalogList("armor");
    const shields = catalogList("shield");
    const startingBudget = bugchudCore.ruleset.characterCreation.startingBudget;
    const defaultCurrency = bugchudCore.ruleset.inventoryAndAssets.economy.defaultCurrency;
    const denominations = [...bugchudCore.ruleset.inventoryAndAssets.economy.denominations];

    return {
      rulesetId: bugchudCore.ruleset.id,
      rulesetVersion: bugchudCore.ruleset.version,
      generationNotes: [...(bugchudCore.ruleset.characterLore.generationNotes ?? [])],
      races,
      origins,
      backgrounds,
      backgroundsByOrigin,
      dreams,
      mutations,
      bionics,
      spells,
      patrons: patronOptionRefs.map(resolveFaithOption),
      items,
      weapons,
      armors,
      shields,
      startingBudget,
      defaultCurrency,
      denominations,
    };
  },
});

export const getCharacterEditorOptions = query({
  args: {},
  handler: async () => {
    const races = catalogList("race");
    const origins = catalogList("origin");
    const backgrounds = catalogList("background");
    const dreams = catalogList("dream");
    const factions = catalogList("faction");
    const cultures = catalogList("culture");
    const items = catalogList("item");
    const weapons = catalogList("weapon");
    const armors = catalogList("armor");
    const shields = catalogList("shield");
    const bionics = catalogList("bionic");
    const mutations = catalogList("mutation");
    const grimoires = catalogList("grimoire");
    const spells = catalogList("spell");
    const alchemyRecipes = catalogList("alchemyRecipe");
    const pantheons = catalogList("pantheon");
    const patrons = catalogList("patron");
    const boons = catalogList("boon");
    const covenants = catalogList("covenant");
    const relics = catalogList("relic");
    const backgroundsByOrigin = getBackgroundsByOrigin();

    const faithOptionRefs = bugchudCore.ruleset.characterCreation.faithOptions
      .filter(
        (refValue) => refValue.kind === "pantheon" || refValue.kind === "patron",
      )
      .map((refValue) => ({
        kind: refValue.kind,
        id: refValue.id,
      }));
    const resolvedFaithOptions = faithOptionRefs.map(resolveFaithOption);

    return {
      rulesetId: bugchudCore.ruleset.id,
      rulesetVersion: bugchudCore.ruleset.version,
      characterCreation: {
        ...bugchudCore.ruleset.characterCreation,
        faithOptions: {
          all: resolvedFaithOptions,
          pantheons: resolvedFaithOptions.filter((option) => option.kind === "pantheon"),
          patrons: resolvedFaithOptions.filter((option) => option.kind === "patron"),
        },
      },
      characterLore: bugchudCore.ruleset.characterLore,
      characterProgression: bugchudCore.ruleset.progression,
      inventoryRules: bugchudCore.ruleset.inventoryAndAssets.inventoryRules,
      steps: {
        lineage: {
          races,
          origins,
        },
        background: {
          backgrounds,
          backgroundsByOrigin,
        },
        path: {
          dreams,
          mutations,
          bionics,
          grimoires,
          spells,
          alchemyRecipes,
        },
        faith: {
          pantheons,
          patrons,
          boons,
          covenants,
          relics,
        },
        gear: {
          items,
          weapons,
          armors,
          shields,
          containerDefinitions: bugchudCore.ruleset.inventoryAndAssets.inventoryRules.containerDefinitions,
          denominations: [...bugchudCore.ruleset.inventoryAndAssets.economy.denominations],
          defaultCurrency: bugchudCore.ruleset.inventoryAndAssets.economy.defaultCurrency,
        },
        social: {
          factions,
          cultures,
        },
      },
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

export const getGuidedNpcCreationOptions = query({
  args: {},
  handler: async () => {
    const creatures = catalogList("creature");
    const npcLoadouts = catalogList("npcLoadout");
    const items = catalogList("item");
    const weapons = catalogList("weapon");
    const armors = catalogList("armor");
    const shields = catalogList("shield");
    const grimoires = catalogList("grimoire");
    const spells = catalogList("spell");
    const mutations = catalogList("mutation");
    const bionics = catalogList("bionic");
    const pantheons = catalogList("pantheon");
    const patrons = catalogList("patron");
    const boons = catalogList("boon");
    const covenants = catalogList("covenant");
    const relics = catalogList("relic");

    return {
      rulesetId: bugchudCore.ruleset.id,
      rulesetVersion: bugchudCore.ruleset.version,
      creatures,
      npcLoadouts,
      items,
      weapons,
      armors,
      shields,
      grimoires,
      spells,
      mutations,
      bionics,
      pantheons,
      patrons,
      boons,
      covenants,
      relics,
      containerDefinitions:
        bugchudCore.ruleset.inventoryAndAssets.inventoryRules.containerDefinitions,
      denominations: [...bugchudCore.ruleset.inventoryAndAssets.economy.denominations],
      defaultCurrency: bugchudCore.ruleset.inventoryAndAssets.economy.defaultCurrency,
    };
  },
});

export const getNpcEditorOptions = query({
  args: {},
  handler: async () => {
    const creatures = catalogList("creature");
    const npcLoadouts = catalogList("npcLoadout");
    const items = catalogList("item");
    const weapons = catalogList("weapon");
    const armors = catalogList("armor");
    const shields = catalogList("shield");
    const grimoires = catalogList("grimoire");
    const spells = catalogList("spell");
    const mutations = catalogList("mutation");
    const bionics = catalogList("bionic");
    const pantheons = catalogList("pantheon");
    const patrons = catalogList("patron");
    const boons = catalogList("boon");
    const covenants = catalogList("covenant");
    const relics = catalogList("relic");

    return {
      rulesetId: bugchudCore.ruleset.id,
      rulesetVersion: bugchudCore.ruleset.version,
      templates: {
        creatures,
        npcLoadouts,
      },
      body: {
        mutations,
        bionics,
      },
      doctrine: {
        grimoires,
        spells,
        pantheons,
        patrons,
        boons,
        covenants,
        relics,
      },
      gear: {
        items,
        weapons,
        armors,
        shields,
        containerDefinitions:
          bugchudCore.ruleset.inventoryAndAssets.inventoryRules.containerDefinitions,
        denominations: [...bugchudCore.ruleset.inventoryAndAssets.economy.denominations],
        defaultCurrency: bugchudCore.ruleset.inventoryAndAssets.economy.defaultCurrency,
      },
    };
  },
});
