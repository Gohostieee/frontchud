[**@bugchud/core API Reference v0.2.0**](../../../index.md)

***

[@bugchud/core API Reference](../../../index.md) / [data/imported](../index.md) / importedFortresses

# Variable: importedFortresses

```ts
const importedFortresses: readonly [{
  kind: "fortress";
  id: Brand<string, "FortressId">;
  name: "FIELD FORT";
  slug: "field-fort";
  summary: "A basic campaign fortification assembled from simple lodgings, kitchens, and wooden walls.";
  tags: readonly ["fortress", "archetype"];
  source: SourceTrace;
  tier: 1;
  regionRef: RegistryRef<"region">;
  defenseRating: 10;
  supplyCapacity: 20;
  garrisonCapacity: 20;
  territoryFeatures: readonly [{
     label: "Wooden wall";
     value: 1;
   }, {
     label: "Lodgings";
     value: 1;
   }, {
     label: "Kitchen";
     value: 1;
  }];
}, {
  kind: "fortress";
  id: Brand<string, "FortressId">;
  name: "STONE REDOUBT";
  slug: "stone-redoubt";
  summary: "A sturdier hold with a proper guard tower and store-room suitable for contested frontiers.";
  tags: readonly ["fortress", "archetype"];
  source: SourceTrace;
  tier: 2;
  regionRef: RegistryRef<"region">;
  defenseRating: 12;
  supplyCapacity: 40;
  garrisonCapacity: 35;
  territoryFeatures: readonly [{
     label: "Stone wall";
     value: 2;
   }, {
     label: "Guard tower";
     value: 1;
   }, {
     label: "Store-room";
     value: 1;
  }];
}, {
  kind: "fortress";
  id: Brand<string, "FortressId">;
  name: "SHRINE REDOUBT";
  slug: "shrine-redoubt";
  summary: "A defensible religious outpost pairing fortification with a shrine and clinic infrastructure.";
  tags: readonly ["fortress", "archetype", "faith"];
  source: SourceTrace;
  tier: 2;
  regionRef: RegistryRef<"region">;
  defenseRating: 11;
  supplyCapacity: 30;
  garrisonCapacity: 25;
  territoryFeatures: readonly [{
     label: "Shrine";
     value: 2;
   }, {
     label: "Clinic";
     value: 1;
   }, {
     label: "Fortified cells";
     value: 1;
  }];
}, {
  kind: "fortress";
  id: Brand<string, "FortressId">;
  name: "WIZARD-TOWER";
  slug: "wizard-tower";
  summary: "A vertical stronghold whose value lies as much in magickal command and communications as in stone.";
  tags: readonly ["fortress", "archetype", "wizard"];
  source: SourceTrace;
  tier: 3;
  regionRef: RegistryRef<"region">;
  defenseRating: 13;
  supplyCapacity: 25;
  garrisonCapacity: 15;
  territoryFeatures: readonly [{
     label: "Wizard tower";
     value: 3;
   }, {
     label: "Radio tower";
     value: 1;
  }];
}, {
  kind: "fortress";
  id: Brand<string, "FortressId">;
  name: "DWARF HOLD";
  slug: "dwarf-hold";
  summary: "A deep-carved stronghold of stone, supply storage, and armories befitting the fortress races.";
  tags: readonly ["fortress", "archetype", "dwarf"];
  source: SourceTrace;
  tier: 4;
  defenseRating: 16;
  supplyCapacity: 100;
  garrisonCapacity: 80;
  territoryFeatures: readonly [{
     label: "Armory";
     value: 2;
   }, {
     label: "Store-room";
     value: 2;
   }, {
     label: "Stone wall";
     value: 2;
   }, {
     label: "Clinic";
     value: 1;
  }];
}, {
  kind: "fortress";
  id: Brand<string, "FortressId">;
  name: "MEGA FORT";
  slug: "mega-fort";
  summary: "A high-end domain complex combining factory, vault, and heavy fortification into a single oppressive seat of power.";
  tags: readonly ["fortress", "archetype", "industrial"];
  source: SourceTrace;
  tier: 5;
  regionRef: RegistryRef<"region">;
  defenseRating: 18;
  supplyCapacity: 150;
  garrisonCapacity: 120;
  territoryFeatures: readonly [{
     label: "Factory";
     value: 3;
   }, {
     label: "Shylock vault";
     value: 2;
   }, {
     label: "Guard towers";
     value: 2;
   }, {
     label: "Stone walls";
     value: 2;
  }];
}];
```

Defined in: [data/imported/gm/fortresses.ts:8](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/data/imported/gm/fortresses.ts#L8)
