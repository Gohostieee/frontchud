[**@bugchud/core API Reference v0.1.0**](../../../index.md)

***

[@bugchud/core API Reference](../../../index.md) / [data/imported](../index.md) / importedWarbands

# Variable: importedWarbands

```ts
const importedWarbands: readonly [{
  kind: "warband";
  id: Brand<string, "WarbandId">;
  name: "LIGHT INFANTRY";
  slug: "light-infantry";
  summary: "Untrained conscripts, peasants, archers, and gunmen forming the most fragile foot levy.";
  tags: readonly ["warband", "formation", "infantry"];
  source: SourceTrace;
  unitRole: "light infantry";
  defaultFormation: {
     label: string;
     rankCount: number;
     frontage: number;
     moraleBase: number;
     attackBonus: number;
  };
  combatTemplate: {
     role: string;
     size: "large";
     movement: {
        land: number;
     };
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: {
     };
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     defaultArmorRef?: RegistryRef<"armor">;
     tags?: readonly string[];
  };
  recruitmentCost: {
     amount: 0;
     denomination: "zennies";
  };
  defaultEquipment: readonly [{
     ref: RegistryRef<"weapon">;
     quantity: 20;
   }, {
     ref: RegistryRef<"weapon">;
     quantity: 10;
  }];
}, {
  kind: "warband";
  id: Brand<string, "WarbandId">;
  name: "MEDIUM INFANTRY";
  slug: "medium-infantry";
  summary: "Mercenaries, trained warriors, and beefy creatures like orks occupying the middle weight of foot warfare.";
  tags: readonly ["warband", "formation", "infantry"];
  source: SourceTrace;
  unitRole: "medium infantry";
  defaultFormation: {
     label: string;
     rankCount: number;
     frontage: number;
     moraleBase: number;
     attackBonus: number;
  };
  combatTemplate: {
     role: string;
     size: "large";
     movement: {
        land: number;
     };
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: {
     };
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     defaultArmorRef?: RegistryRef<"armor">;
     tags?: readonly string[];
  };
  recruitmentCost: {
     amount: 0;
     denomination: "zennies";
  };
  defaultEquipment: readonly [{
     ref: RegistryRef<"weapon">;
     quantity: 20;
   }, {
     ref: RegistryRef<"armor">;
     quantity: 20;
  }];
}, {
  kind: "warband";
  id: Brand<string, "WarbandId">;
  name: "HEAVY INFANTRY";
  slug: "heavy-infantry";
  summary: "Armored knights, ogres, trolls, and power-armor squads forming the toughest foot formations in the chapter.";
  tags: readonly ["warband", "formation", "infantry"];
  source: SourceTrace;
  unitRole: "heavy infantry";
  defaultFormation: {
     label: string;
     rankCount: number;
     frontage: number;
     moraleBase: number;
     attackBonus: number;
  };
  combatTemplate: {
     role: string;
     size: "large";
     movement: {
        land: number;
     };
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: {
     };
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     defaultArmorRef?: RegistryRef<"armor">;
     tags?: readonly string[];
  };
  recruitmentCost: {
     amount: 0;
     denomination: "zennies";
  };
  defaultEquipment: readonly [{
     ref: RegistryRef<"weapon">;
     quantity: 20;
   }, {
     ref: RegistryRef<"armor">;
     quantity: 20;
  }];
}, {
  kind: "warband";
  id: Brand<string, "WarbandId">;
  name: "LIGHT CAVALRY";
  slug: "light-cavalry";
  summary: "Unarmored horsemen, motorcycles, and unarmored jeeps constituting the fastest formation class in the chapter.";
  tags: readonly ["warband", "formation", "cavalry"];
  source: SourceTrace;
  unitRole: "light cavalry";
  defaultFormation: {
     label: string;
     rankCount: number;
     frontage: number;
     moraleBase: number;
     attackBonus: number;
  };
  combatTemplate: {
     role: string;
     size: "large";
     movement: {
        land: number;
     };
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: {
     };
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     defaultArmorRef?: RegistryRef<"armor">;
     tags?: readonly string[];
  };
  recruitmentCost: {
     amount: 0;
     denomination: "zennies";
  };
  defaultEquipment: readonly [{
     ref: RegistryRef<"weapon">;
     quantity: 10;
  }];
  mountedVehicleRefs: readonly [RegistryRef<"vehicle">];
}, {
  kind: "warband";
  id: Brand<string, "WarbandId">;
  name: "MEDIUM CAVALRY";
  slug: "medium-cavalry";
  summary: "Semi-armored horsemen and semi-armored vehicles sitting between speed and staying power.";
  tags: readonly ["warband", "formation", "cavalry"];
  source: SourceTrace;
  unitRole: "medium cavalry";
  defaultFormation: {
     label: string;
     rankCount: number;
     frontage: number;
     moraleBase: number;
     attackBonus: number;
  };
  combatTemplate: {
     role: string;
     size: "large";
     movement: {
        land: number;
     };
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: {
     };
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     defaultArmorRef?: RegistryRef<"armor">;
     tags?: readonly string[];
  };
  recruitmentCost: {
     amount: 0;
     denomination: "zennies";
  };
  defaultEquipment: readonly [{
     ref: RegistryRef<"weapon">;
     quantity: 10;
   }, {
     ref: RegistryRef<"armor">;
     quantity: 10;
  }];
  mountedVehicleRefs: readonly [RegistryRef<"vehicle">];
}, {
  kind: "warband";
  id: Brand<string, "WarbandId">;
  name: "HEAVY CAVALRY";
  slug: "heavy-cavalry";
  summary: "Mounted knights and tanks representing the most punishing cavalry weight in the chapter.";
  tags: readonly ["warband", "formation", "cavalry"];
  source: SourceTrace;
  unitRole: "heavy cavalry";
  defaultFormation: {
     label: string;
     rankCount: number;
     frontage: number;
     moraleBase: number;
     attackBonus: number;
  };
  combatTemplate: {
     role: string;
     size: "large";
     movement: {
        land: number;
     };
     baseInitiative: number;
     baseAccuracy: number;
     baseDamageBonus: number;
     baseSoak: number;
     saveBonuses: {
     };
     defaultWeaponRefs?: readonly RegistryRef<"weapon">[];
     defaultArmorRef?: RegistryRef<"armor">;
     tags?: readonly string[];
  };
  recruitmentCost: {
     amount: 0;
     denomination: "zennies";
  };
  defaultEquipment: readonly [{
     ref: RegistryRef<"weapon">;
     quantity: 2;
   }, {
     ref: RegistryRef<"weapon">;
     quantity: 2;
  }];
  mountedVehicleRefs: readonly [RegistryRef<"vehicle">];
}];
```

Defined in: [data/imported/gm/warbands.ts:49](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/data/imported/gm/warbands.ts#L49)
