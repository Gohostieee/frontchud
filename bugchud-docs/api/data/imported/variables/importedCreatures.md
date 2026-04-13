[**@bugchud/core API Reference v0.1.0**](../../../index.md)

***

[@bugchud/core API Reference](../../../index.md) / [data/imported](../index.md) / importedCreatures

# Variable: importedCreatures

```ts
const importedCreatures: readonly [{
  kind: "creature";
  id: Brand<string, "CreatureId">;
  name: "ORK WARRIOR";
  slug: "ork-warrior";
  summary: "Blue-tinted brutalist footsoldier. Printed statline: Twitch 3, Flesh 5, Mojo 1, Glory 0, Morale -1, equipment hand-axe.";
  tags: readonly ["creature", "ork"];
  source: SourceTrace;
  species: "Ork";
  challenge: 2;
  combatTemplate: {
     role: string;
     size: "medium" | "tiny" | "small" | "large" | "huge";
     movement: MovementProfile;
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: {
        physique: number;
        dodge: number;
        magick?: number;
        zealotry?: number;
     };
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     innateAttacks?: readonly AttackProfileTemplate[];
     passiveEffects?: readonly ActiveEffect[];
     tags?: readonly string[];
  };
  defaultLoadout: readonly [{
     ref: RegistryRef<"weapon">;
     quantity: 1;
  }];
  moraleProfile: {
     discipline: -1;
     breakThreshold: 2;
  };
}, {
  kind: "creature";
  id: Brand<string, "CreatureId">;
  name: "ORK SHAMAN";
  slug: "ork-shaman";
  summary: "Graggarite ork mystic. Printed statline: Twitch 2, Flesh 4, Mojo 3, Glory 2, Morale 0, equipment wizard-staff, spells lightning bolt and fireball.";
  tags: readonly ["creature", "ork", "wizard"];
  source: SourceTrace;
  species: "Ork";
  challenge: 3;
  combatTemplate: {
     role: string;
     size: "medium" | "tiny" | "small" | "large" | "huge";
     movement: MovementProfile;
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: {
        physique: number;
        dodge: number;
        magick?: number;
        zealotry?: number;
     };
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     innateAttacks?: readonly AttackProfileTemplate[];
     passiveEffects?: readonly ActiveEffect[];
     tags?: readonly string[];
  };
  defaultSpellRefs: readonly [RegistryRef<"spell">, RegistryRef<"spell">];
  defaultLoadout: readonly [{
     ref: RegistryRef<"item">;
     quantity: 1;
  }];
  moraleProfile: {
     discipline: 0;
     breakThreshold: 2;
  };
}, {
  kind: "creature";
  id: Brand<string, "CreatureId">;
  name: "ORK SLAVEDRIVER";
  slug: "ork-slavedriver";
  summary: "Cruel overseer that weaponizes fear more than steel. Printed statline: Twitch 2, Flesh 4, Mojo 1, Morale 0.";
  tags: readonly ["creature", "ork", "slaver"];
  source: SourceTrace;
  species: "Ork";
  challenge: 2;
  combatTemplate: {
     role: string;
     size: "medium" | "tiny" | "small" | "large" | "huge";
     movement: MovementProfile;
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: {
        physique: number;
        dodge: number;
        magick?: number;
        zealotry?: number;
     };
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     innateAttacks?: readonly AttackProfileTemplate[];
     passiveEffects?: readonly ActiveEffect[];
     tags?: readonly string[];
  };
  moraleProfile: {
     discipline: 0;
     breakThreshold: 2;
  };
}, {
  kind: "creature";
  id: Brand<string, "CreatureId">;
  name: "GOBLIN WARRIOR";
  slug: "goblin-warrior";
  summary: "Expendable imp footman. Printed statline: Twitch 2, Flesh 2, Mojo 1, Morale -2, equipment spear.";
  tags: readonly ["creature", "goblin"];
  source: SourceTrace;
  species: "Goblin";
  challenge: 1;
  combatTemplate: {
     role: string;
     size: "medium" | "tiny" | "small" | "large" | "huge";
     movement: MovementProfile;
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: {
        physique: number;
        dodge: number;
        magick?: number;
        zealotry?: number;
     };
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     innateAttacks?: readonly AttackProfileTemplate[];
     passiveEffects?: readonly ActiveEffect[];
     tags?: readonly string[];
  };
  defaultLoadout: readonly [{
     ref: RegistryRef<"weapon">;
     quantity: 1;
  }];
  moraleProfile: {
     discipline: -2;
     breakThreshold: 1;
  };
}, {
  kind: "creature";
  id: Brand<string, "CreatureId">;
  name: "GOBLIN SHOOTER";
  slug: "goblin-shooter";
  summary: "Expendable firearm goblin. Printed statline: Twitch 2, Flesh 2, Mojo 1, Morale -2, equipment handgonne.";
  tags: readonly ["creature", "goblin", "firearm"];
  source: SourceTrace;
  species: "Goblin";
  challenge: 1;
  combatTemplate: {
     role: string;
     size: "medium" | "tiny" | "small" | "large" | "huge";
     movement: MovementProfile;
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: {
        physique: number;
        dodge: number;
        magick?: number;
        zealotry?: number;
     };
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     innateAttacks?: readonly AttackProfileTemplate[];
     passiveEffects?: readonly ActiveEffect[];
     tags?: readonly string[];
  };
  defaultLoadout: readonly [{
     ref: RegistryRef<"weapon">;
     quantity: 1;
  }];
  moraleProfile: {
     discipline: -2;
     breakThreshold: 1;
  };
}, {
  kind: "creature";
  id: Brand<string, "CreatureId">;
  name: "BEESTMAN CHAFF";
  slug: "beestman-chaff";
  summary: "Wildspawn shock trooper. Printed statline: Twitch 3, Flesh 3, Mojo 1, Morale 0, equipment hand-axe.";
  tags: readonly ["creature", "beestman"];
  source: SourceTrace;
  species: "Beestman";
  challenge: 2;
  combatTemplate: {
     role: string;
     size: "medium" | "tiny" | "small" | "large" | "huge";
     movement: MovementProfile;
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: {
        physique: number;
        dodge: number;
        magick?: number;
        zealotry?: number;
     };
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     innateAttacks?: readonly AttackProfileTemplate[];
     passiveEffects?: readonly ActiveEffect[];
     tags?: readonly string[];
  };
  defaultLoadout: readonly [{
     ref: RegistryRef<"weapon">;
     quantity: 1;
  }];
  moraleProfile: {
     discipline: 0;
     breakThreshold: 2;
  };
}, {
  kind: "creature";
  id: Brand<string, "CreatureId">;
  name: "BUZZ-BOY";
  slug: "buzz-boy";
  summary: "Winged mutant-gunner. Printed statline: Twitch 2, Flesh 2, Mojo 1, Morale 0, equipment laser gun, plus a random bionic beginning at d6 maintenance.";
  tags: readonly ["creature", "buzz-host", "mutant"];
  source: SourceTrace;
  species: "Mutant";
  challenge: 2;
  combatTemplate: {
     role: string;
     size: "medium" | "tiny" | "small" | "large" | "huge";
     movement: MovementProfile;
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: {
        physique: number;
        dodge: number;
        magick?: number;
        zealotry?: number;
     };
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     innateAttacks?: readonly AttackProfileTemplate[];
     passiveEffects?: readonly ActiveEffect[];
     tags?: readonly string[];
  };
  defaultMutationRefs: readonly [RegistryRef<"mutation">];
  defaultLoadout: readonly [{
     ref: RegistryRef<"weapon">;
     quantity: 1;
  }];
  moraleProfile: {
     discipline: 0;
     breakThreshold: 1;
  };
}, {
  kind: "creature";
  id: Brand<string, "CreatureId">;
  name: "SHYLOCK TERMINAL";
  slug: "shylock-terminal";
  summary: "Rooted machine-idol of greed. Printed statline: Twitch 0, Flesh 99, Mojo 99, Morale +99, with a 2d20-damage bite if provoked.";
  tags: readonly ["creature", "machine", "shylock"];
  source: SourceTrace;
  species: "Machine";
  challenge: 8;
  combatTemplate: {
     role: string;
     size: "medium" | "tiny" | "small" | "large" | "huge";
     movement: MovementProfile;
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: {
        physique: number;
        dodge: number;
        magick?: number;
        zealotry?: number;
     };
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     innateAttacks?: readonly AttackProfileTemplate[];
     passiveEffects?: readonly ActiveEffect[];
     tags?: readonly string[];
  };
  moraleProfile: {
     discipline: 99;
     breakThreshold: 99;
  };
}, {
  kind: "creature";
  id: Brand<string, "CreatureId">;
  name: "DRAGON";
  slug: "dragon";
  summary: "Greedy surviving son of the Golden Serpent. Printed statline: Twitch 4, Flesh 9, Mojo 3, Morale +3, 3 inherent soaks, bite for 1d6 big damage, and fiery breath.";
  tags: readonly ["creature", "dragon"];
  source: SourceTrace;
  species: "Dragon";
  challenge: 6;
  combatTemplate: {
     role: string;
     size: "medium" | "tiny" | "small" | "large" | "huge";
     movement: MovementProfile;
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: {
        physique: number;
        dodge: number;
        magick?: number;
        zealotry?: number;
     };
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     innateAttacks?: readonly AttackProfileTemplate[];
     passiveEffects?: readonly ActiveEffect[];
     tags?: readonly string[];
  };
  moraleProfile: {
     discipline: 3;
     breakThreshold: 4;
  };
}, {
  kind: "creature";
  id: Brand<string, "CreatureId">;
  name: "KOBOLD";
  slug: "kobold";
  summary: "Pathetic dog-thing scavenger. Printed statline: Twitch 1, Flesh 1, Mojo 1, Morale -2, equipment spear.";
  tags: readonly ["creature", "kobold"];
  source: SourceTrace;
  species: "Kobold";
  challenge: 0;
  combatTemplate: {
     role: string;
     size: "medium" | "tiny" | "small" | "large" | "huge";
     movement: MovementProfile;
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: {
        physique: number;
        dodge: number;
        magick?: number;
        zealotry?: number;
     };
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     innateAttacks?: readonly AttackProfileTemplate[];
     passiveEffects?: readonly ActiveEffect[];
     tags?: readonly string[];
  };
  defaultLoadout: readonly [{
     ref: RegistryRef<"weapon">;
     quantity: 1;
  }];
  moraleProfile: {
     discipline: -2;
     breakThreshold: 1;
  };
}];
```

Defined in: [data/imported/gm/creatures.ts:52](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/data/imported/gm/creatures.ts#L52)
