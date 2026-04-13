[**@bugchud/core API Reference v0.1.0**](../../../index.md)

***

[@bugchud/core API Reference](../../../index.md) / [data/imported](../index.md) / importedDreams

# Variable: importedDreams

```ts
const importedDreams: readonly [{
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "IMPROVED TWITCH";
  slug: "improved-twitch";
  summary: "Receive +1 Twitch. May be taken up to three times.";
  tags: readonly ["dream", "attribute"];
  source: SourceTrace;
  group: "attribute";
  tier: 1;
  fateCost: 10;
  repeatable: true;
  grants: readonly [{
     kind: "modifierSet";
     modifierSet: {
        modifiers: readonly [{
           target: "attribute:twitch";
           operation: "add";
           value: 1;
           source: "Improved Twitch";
        }];
     };
  }];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "IMPROVED FLESH";
  slug: "improved-flesh";
  summary: "Receive +1 Flesh. May be taken up to three times.";
  tags: readonly ["dream", "attribute"];
  source: SourceTrace;
  group: "attribute";
  tier: 1;
  fateCost: 12;
  repeatable: true;
  grants: readonly [{
     kind: "modifierSet";
     modifierSet: {
        modifiers: readonly [{
           target: "attribute:flesh";
           operation: "add";
           value: 1;
           source: "Improved Flesh";
        }];
     };
  }];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "IMPROVED MOJO";
  slug: "improved-mojo";
  summary: "Receive +1 Mojo. May be taken up to three times.";
  tags: readonly ["dream", "attribute"];
  source: SourceTrace;
  group: "attribute";
  tier: 1;
  fateCost: 12;
  repeatable: true;
  grants: readonly [{
     kind: "modifierSet";
     modifierSet: {
        modifiers: readonly [{
           target: "attribute:mojo";
           operation: "add";
           value: 1;
           source: "Improved Mojo";
         }, {
           target: "magic:manaDiceMax";
           operation: "add";
           value: 2;
           source: "Improved Mojo";
        }];
     };
  }];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "MARTIAL PROWESS";
  slug: "martial-prowess";
  summary: "You may reroll locational hit rolls for melee weapons.";
  tags: readonly ["dream", "pseudoCivilized", "martial"];
  source: SourceTrace;
  group: "pseudoCivilized";
  tier: 1;
  fateCost: 13;
  grants: readonly [];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "DAMN DIRTY ROGUE";
  slug: "damn-dirty-rogue";
  summary: "May reroll Twitch checks for suitably roguish activity such as lockpicking or pickpocketing.";
  tags: readonly ["dream", "pseudoCivilized", "rogue"];
  source: SourceTrace;
  group: "pseudoCivilized";
  tier: 1;
  fateCost: 13;
  grants: readonly [];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "SCHOLAR";
  slug: "scholar";
  summary: "Make a DC 15 Mojo check to remember 1d4 facts about any subject.";
  tags: readonly ["dream", "pseudoCivilized", "learned"];
  source: SourceTrace;
  group: "pseudoCivilized";
  tier: 1;
  fateCost: 13;
  grants: readonly [];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "ZEALOT";
  slug: "zealot";
  summary: "Whenever rolling a save vs Zealotry, roll 2d20 and choose the preferred roll.";
  tags: readonly ["dream", "pseudoCivilized", "faith"];
  source: SourceTrace;
  group: "faith";
  tier: 1;
  fateCost: 13;
  grants: readonly [];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "NOBLE-BLOOD";
  slug: "noble-blood";
  summary: "An unobtainable-after-creation noble lineage that avoids Shylock deposit taxes and establishes minor noble-house status.";
  tags: readonly ["dream", "pseudoCivilized", "noble"];
  source: SourceTrace;
  group: "pseudoCivilized";
  tier: 1;
  fateCost: 13;
  grants: readonly [];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "NITE-SLAYER";
  slug: "nite-slayer";
  summary: "Receive +2 to combat checks when attacking a nite-creecher.";
  tags: readonly ["dream", "pseudoCivilized", "hunter"];
  source: SourceTrace;
  group: "pseudoCivilized";
  tier: 1;
  fateCost: 13;
  grants: readonly [{
     kind: "modifierSet";
     modifierSet: {
        modifiers: readonly [{
           target: "combat:accuracy";
           operation: "add";
           value: 2;
           source: "Nite-Slayer";
           notes: readonly ["Only against nite-creechers."];
        }];
     };
  }];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "DANCING TECHNIQUE";
  slug: "dancing-technique";
  summary: "Use Twitch checks instead of Flesh for one-handed melee attacks while the off hand is empty.";
  tags: readonly ["dream", "pseudoCivilized", "duelist"];
  source: SourceTrace;
  group: "pseudoCivilized";
  tier: 1;
  fateCost: 13;
  grants: readonly [];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "SURGEON";
  slug: "surgeon";
  summary: "Surgical kits heal for 2d4.";
  tags: readonly ["dream", "pseudoCivilized", "medical"];
  source: SourceTrace;
  group: "pseudoCivilized";
  tier: 1;
  fateCost: 13;
  grants: readonly [];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "WRATHFUL ABANDON";
  slug: "wrathful-abandon";
  summary: "Take only half damage rounded down during combat, then suffer the ignored damage +2 after combat ends.";
  tags: readonly ["dream", "barbaric", "berserker"];
  source: SourceTrace;
  group: "barbaric";
  tier: 1;
  fateCost: 13;
  grants: readonly [];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "SEXY SAVAGE";
  slug: "sexy-savage";
  summary: "While naked or in a skimpy loincloth, flip a coin whenever damaged; on heads, no damage is applied.";
  tags: readonly ["dream", "barbaric", "savage"];
  source: SourceTrace;
  group: "barbaric";
  tier: 1;
  fateCost: 13;
  grants: readonly [];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "DILIGENT BOWMAN";
  slug: "diligent-bowman";
  summary: "The first arrow or bolt fired at a target always hits.";
  tags: readonly ["dream", "barbaric", "ranged"];
  source: SourceTrace;
  group: "barbaric";
  tier: 1;
  fateCost: 13;
  grants: readonly [];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "ROAMING CAVALRY";
  slug: "roaming-cavalry";
  summary: "No penalty to ranged attacks while on a moving vehicle or mount, reroll getting-lost checks, and gas mileage rolls receive -1 die.";
  tags: readonly ["dream", "barbaric", "mounted"];
  source: SourceTrace;
  group: "leadership";
  tier: 1;
  fateCost: 13;
  grants: readonly [];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "FELL-BEEST";
  slug: "fell-beest";
  summary: "Eat the heart of a worthy opponent to gain a permanent +1 damage to unarmed strikes.";
  tags: readonly ["dream", "barbaric", "bestial"];
  source: SourceTrace;
  group: "barbaric";
  tier: 1;
  fateCost: 13;
  grants: readonly [{
     kind: "modifierSet";
     modifierSet: {
        modifiers: readonly [{
           target: "combat:damage";
           operation: "add";
           value: 1;
           source: "Fell-Beest";
           notes: readonly ["Only for unarmed strikes after fulfilling the dream's rite."];
        }];
     };
  }];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "ARCYNE POTENTIAL";
  slug: "arcyne-potential";
  summary: "Gain the ability to use spells and read grimoires.";
  tags: readonly ["dream", "darklands", "magick"];
  source: SourceTrace;
  group: "arcane";
  tier: 1;
  fateCost: 15;
  grants: readonly [{
     kind: "spellAccess";
  }];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "CRUEL TECHNIQUE";
  slug: "cruel-technique";
  summary: "Whenever attacking a creecher already wounded by you, add +1 to the combat check.";
  tags: readonly ["dream", "darklands", "cruel"];
  source: SourceTrace;
  group: "darklands";
  tier: 1;
  fateCost: 15;
  grants: readonly [{
     kind: "modifierSet";
     modifierSet: {
        modifiers: readonly [{
           target: "combat:accuracy";
           operation: "add";
           value: 1;
           source: "Cruel Technique";
           notes: readonly ["Only against creatures already wounded by the character."];
        }];
     };
  }];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "GENE-FREEK";
  slug: "gene-freek";
  summary: "Roll twice on the mutation table when acquired and gain Twitch and Flesh based on total held mutations.";
  tags: readonly ["dream", "darklands", "mutation"];
  source: SourceTrace;
  group: "darklands";
  tier: 1;
  fateCost: 15;
  grants: readonly [];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "CHEM-TECH";
  slug: "chem-tech";
  summary: "Gain the ability to create potions and powders.";
  tags: readonly ["dream", "darklands", "alchemy"];
  source: SourceTrace;
  group: "alchemy";
  tier: 1;
  fateCost: 15;
  grants: readonly [{
     kind: "alchemyAccess";
     recipeRefs: readonly [RegistryRef<"alchemyRecipe">, RegistryRef<"alchemyRecipe">];
  }];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "STERILE-TYRANT";
  slug: "sterile-tyrant";
  summary: "Character-creation-only Darklands nobility with title protection and 3d6 sworn cutthroats in the home city-state.";
  tags: readonly ["dream", "darklands", "noble"];
  source: SourceTrace;
  group: "leadership";
  tier: 1;
  fateCost: 15;
  grants: readonly [{
     kind: "follower";
     label: "Cutthroats";
     quantity: 10;
  }];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "TRODDEN-UPON";
  slug: "trodden-upon";
  summary: "An additional 1 must be rolled in order to die during a Doom roll.";
  tags: readonly ["dream", "darklands", "survival"];
  source: SourceTrace;
  group: "darklands";
  tier: 1;
  fateCost: 15;
  grants: readonly [];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "OVERCLOCKED";
  slug: "overclocked";
  summary: "Gain a major bionic at character creation and double activated bionic effects by auto-degrading the maintenance die one tier.";
  tags: readonly ["dream", "darklands", "bionic"];
  source: SourceTrace;
  group: "darklands";
  tier: 1;
  fateCost: 15;
  grants: readonly [];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "EFFICIENT GUNMAN";
  slug: "efficient-gunman";
  summary: "The first ammo die spent does not contribute to the Ammo Scarcity roll.";
  tags: readonly ["dream", "darklands", "firearms"];
  source: SourceTrace;
  group: "darklands";
  tier: 1;
  fateCost: 15;
  grants: readonly [];
}, {
  kind: "dream";
  id: Brand<string, "DreamId">;
  name: "DREAD-TONGUED";
  slug: "dread-tongued";
  summary: "Gain the ability to speak the Black Word, required for the most sinister spells.";
  tags: readonly ["dream", "darklands", "language"];
  source: SourceTrace;
  group: "darklands";
  tier: 1;
  fateCost: 15;
  grants: readonly [{
     kind: "language";
     language: "The Black Tongue";
   }, {
     kind: "spellAccess";
     spellRefs: readonly [RegistryRef<"spell">, RegistryRef<"spell">];
  }];
}];
```

Defined in: [data/imported/character/dreams.ts:9](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/data/imported/character/dreams.ts#L9)
