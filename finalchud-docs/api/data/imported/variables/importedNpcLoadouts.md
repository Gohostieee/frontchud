[**@bugchud/core API Reference v0.2.0**](../../../index.md)

***

[@bugchud/core API Reference](../../../index.md) / [data/imported](../index.md) / importedNpcLoadouts

# Variable: importedNpcLoadouts

```ts
const importedNpcLoadouts: readonly [{
  kind: "npcLoadout";
  id: Brand<string, "NpcLoadoutId">;
  name: "ORK WARBANDER";
  slug: "ork-warbander";
  summary: "Reusable ork melee package derived from the warrior entries in the GM chapter.";
  tags: readonly ["npc", "ork"];
  source: SourceTrace;
  role: "Brutal infantry";
  combatTemplate: {
     role: string;
     size: "medium" | "tiny" | "small" | "large" | "huge";
     movement: {
        land: number;
     };
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: Partial<Record<"death" | "physique" | "dodge" | "magick" | "zealotry", number>>;
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     defaultArmorRef?: RegistryRef<"armor">;
     tags?: readonly string[];
  };
  gear: readonly [{
     ref: RegistryRef<"weapon">;
     quantity: 1;
   }, {
     ref: RegistryRef<"item">;
     quantity: 1;
  }];
}, {
  kind: "npcLoadout";
  id: Brand<string, "NpcLoadoutId">;
  name: "ORK SHAMAN";
  slug: "ork-shaman";
  summary: "Reusable ork caster package derived from the printed ork shaman stat block.";
  tags: readonly ["npc", "ork", "wizard"];
  source: SourceTrace;
  role: "Battle shaman";
  combatTemplate: {
     role: string;
     size: "medium" | "tiny" | "small" | "large" | "huge";
     movement: {
        land: number;
     };
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: Partial<Record<"death" | "physique" | "dodge" | "magick" | "zealotry", number>>;
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     defaultArmorRef?: RegistryRef<"armor">;
     tags?: readonly string[];
  };
  gear: readonly [{
     ref: RegistryRef<"item">;
     quantity: 1;
   }, {
     ref: RegistryRef<"grimoire">;
     quantity: 1;
  }];
  spellRefs: readonly [RegistryRef<"spell">, RegistryRef<"spell">];
  faithRefs: readonly [RegistryRef<"patron">];
}, {
  kind: "npcLoadout";
  id: Brand<string, "NpcLoadoutId">;
  name: "GOBLIN SHOOTER";
  slug: "goblin-shooter";
  summary: "Fragile gun-goblin package based on the handgonne-carrying bestiary entry.";
  tags: readonly ["npc", "goblin", "firearm"];
  source: SourceTrace;
  role: "Cowardly gunner";
  combatTemplate: {
     role: string;
     size: "medium" | "tiny" | "small" | "large" | "huge";
     movement: {
        land: number;
     };
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: Partial<Record<"death" | "physique" | "dodge" | "magick" | "zealotry", number>>;
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     defaultArmorRef?: RegistryRef<"armor">;
     tags?: readonly string[];
  };
  gear: readonly [{
     ref: RegistryRef<"weapon">;
     quantity: 1;
   }, {
     ref: RegistryRef<"item">;
     quantity: 1;
   }, {
     ref: RegistryRef<"item">;
     quantity: 1;
  }];
}, {
  kind: "npcLoadout";
  id: Brand<string, "NpcLoadoutId">;
  name: "RAVOXIAN QUESTOR";
  slug: "ravoxian-questor";
  summary: "A faith-forward knight-errant package built from Ravoxian and pseudo-civilized material.";
  tags: readonly ["npc", "faith", "questor"];
  source: SourceTrace;
  role: "Knight-errant";
  combatTemplate: {
     role: string;
     size: "medium" | "tiny" | "small" | "large" | "huge";
     movement: {
        land: number;
     };
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: Partial<Record<"death" | "physique" | "dodge" | "magick" | "zealotry", number>>;
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     defaultArmorRef?: RegistryRef<"armor">;
     tags?: readonly string[];
  };
  gear: readonly [{
     ref: RegistryRef<"weapon">;
     quantity: 1;
   }, {
     ref: RegistryRef<"armor">;
     quantity: 1;
   }, {
     ref: RegistryRef<"item">;
     quantity: 1;
   }, {
     ref: RegistryRef<"relic">;
     quantity: 1;
  }];
  faithRefs: readonly [RegistryRef<"patron">, RegistryRef<"relic">];
}, {
  kind: "npcLoadout";
  id: Brand<string, "NpcLoadoutId">;
  name: "CITY-STATE ARCHON";
  slug: "city-state-archon";
  summary: "Darklands elite armed with SCOM hardware, city-state privilege, and Zizoid piety.";
  tags: readonly ["npc", "darklands", "elite"];
  source: SourceTrace;
  role: "Darklands enforcer";
  combatTemplate: {
     role: string;
     size: "medium" | "tiny" | "small" | "large" | "huge";
     movement: {
        land: number;
     };
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: Partial<Record<"death" | "physique" | "dodge" | "magick" | "zealotry", number>>;
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     defaultArmorRef?: RegistryRef<"armor">;
     tags?: readonly string[];
  };
  gear: readonly [{
     ref: RegistryRef<"weapon">;
     quantity: 1;
   }, {
     ref: RegistryRef<"armor">;
     quantity: 1;
   }, {
     ref: RegistryRef<"relic">;
     quantity: 1;
  }];
  faithRefs: readonly [RegistryRef<"patron">, RegistryRef<"relic">];
}, {
  kind: "npcLoadout";
  id: Brand<string, "NpcLoadoutId">;
  name: "FREEMAN BRIGAND";
  slug: "freeman-brigand";
  summary: "Matthian highwayman package representing the violent fringe of anti-noble rebellion.";
  tags: readonly ["npc", "freemen", "bandit"];
  source: SourceTrace;
  role: "Ambush brigand";
  combatTemplate: {
     role: string;
     size: "medium" | "tiny" | "small" | "large" | "huge";
     movement: {
        land: number;
     };
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: Partial<Record<"death" | "physique" | "dodge" | "magick" | "zealotry", number>>;
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     defaultArmorRef?: RegistryRef<"armor">;
     tags?: readonly string[];
  };
  gear: readonly [{
     ref: RegistryRef<"weapon">;
     quantity: 1;
   }, {
     ref: RegistryRef<"item">;
     quantity: 1;
   }, {
     ref: RegistryRef<"relic">;
     quantity: 1;
  }];
  faithRefs: readonly [RegistryRef<"patron">, RegistryRef<"relic">];
}, {
  kind: "npcLoadout";
  id: Brand<string, "NpcLoadoutId">;
  name: "BATTALION VETERAN";
  slug: "battalion-veteran";
  summary: "Old-world loyalist rifleman still fighting wars for a dead god-king.";
  tags: readonly ["npc", "battalion", "psydon"];
  source: SourceTrace;
  role: "Disciplined rifleman";
  combatTemplate: {
     role: string;
     size: "medium" | "tiny" | "small" | "large" | "huge";
     movement: {
        land: number;
     };
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: Partial<Record<"death" | "physique" | "dodge" | "magick" | "zealotry", number>>;
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     defaultArmorRef?: RegistryRef<"armor">;
     tags?: readonly string[];
  };
  gear: readonly [{
     ref: RegistryRef<"weapon">;
     quantity: 1;
   }, {
     ref: RegistryRef<"armor">;
     quantity: 1;
   }, {
     ref: RegistryRef<"relic">;
     quantity: 1;
  }];
  faithRefs: readonly [RegistryRef<"patron">, RegistryRef<"relic">];
}];
```

Defined in: [data/imported/gm/npc-loadouts.ts:49](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/data/imported/gm/npc-loadouts.ts#L49)
