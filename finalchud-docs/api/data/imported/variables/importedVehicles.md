[**@bugchud/core API Reference v0.2.0**](../../../index.md)

***

[@bugchud/core API Reference](../../../index.md) / [data/imported](../index.md) / importedVehicles

# Variable: importedVehicles

```ts
const importedVehicles: readonly [{
  kind: "vehicle";
  id: Brand<string, "VehicleId">;
  name: "Jeep";
  slug: "jeep";
  summary: "Exotic motor-carriage, rare outside of the Darklands.";
  tags: readonly ["vehicle", "transport"];
  source: SourceTrace;
  size: "medium";
  chassis: 3;
  fuelCapacity: 0;
  gasMileage: 1;
  occupants: 4;
  cargoSlots: 0;
  hardpoints: readonly [];
  movement: {
     land: 20;
  };
  economy: ItemEconomyProfile;
}, {
  kind: "vehicle";
  id: Brand<string, "VehicleId">;
  name: "Tank";
  slug: "tank";
  summary: "Treaded metal beast used by Darkland city-states and armed with a cannon plus emplacement gun.";
  tags: readonly ["vehicle", "armored"];
  source: SourceTrace;
  size: "large";
  chassis: 5;
  fuelCapacity: 0;
  gasMileage: 3;
  occupants: 5;
  cargoSlots: 0;
  hardpoints: readonly [{
     label: "Cannon";
     allowedWeaponModes: readonly ["vehicleMounted"];
     hardpointCost: 1;
   }, {
     label: "Emplacement gun";
     allowedWeaponModes: readonly ["vehicleMounted"];
     hardpointCost: 1;
  }];
  movement: {
     land: 15;
  };
  economy: ItemEconomyProfile;
  defaultWeaponRefs: readonly [RegistryRef<"weapon">, RegistryRef<"weapon">];
}];
```

Defined in: [data/imported/inventory/vehicles.ts:9](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/data/imported/inventory/vehicles.ts#L9)
