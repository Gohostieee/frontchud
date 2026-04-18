[**@bugchud/core API Reference v0.2.0**](../../../index.md)

***

[@bugchud/core API Reference](../../../index.md) / [data/imported](../index.md) / importedBionics

# Variable: importedBionics

```ts
const importedBionics: readonly [{
  kind: "bionic";
  id: Brand<string, "BionicId">;
  name: "BIONIC HEARING AID";
  slug: "bionic-hearing-aid";
  summary: "Ear implants that grant +2 to checks involving hearing.";
  tags: readonly ["bionic", "hearing"];
  source: SourceTrace;
  slot: "head";
  surgeryCode: "Minor (1d4 damage)";
  maintenanceDie: 10;
  malfunctionTriggers: readonly ["Daily maintenance degradation", "Activation wear"];
  grants: readonly [];
}, {
  kind: "bionic";
  id: Brand<string, "BionicId">;
  name: "DARKSIGHT SCANNERS";
  slug: "darksight-scanners";
  summary: "Eye replacements that allow perfect darkvision for 2d6 minutes when activated.";
  tags: readonly ["bionic", "eyes"];
  source: SourceTrace;
  slot: "eyes";
  surgeryCode: "Minor (1d4 damage)";
  maintenanceDie: 10;
  malfunctionTriggers: readonly ["Daily maintenance degradation", "Activation wear"];
  grants: readonly [];
}, {
  kind: "bionic";
  id: Brand<string, "BionicId">;
  name: "HUD-SIGHT";
  slug: "hud-sight";
  summary: "Analysis software in the eyes exposes hidden information about seen targets.";
  tags: readonly ["bionic", "eyes"];
  source: SourceTrace;
  slot: "eyes";
  surgeryCode: "Minor (1d4 damage)";
  maintenanceDie: 10;
  malfunctionTriggers: readonly ["Daily maintenance degradation", "Activation wear"];
  grants: readonly [];
}, {
  kind: "bionic";
  id: Brand<string, "BionicId">;
  name: "ELECTRO-CHEMISTRY ENHANCEMENT";
  slug: "electro-chemistry-enhancement";
  summary: "Brain implants that grant +1d3 Twitch for 1d6 hours when activated.";
  tags: readonly ["bionic", "neural"];
  source: SourceTrace;
  slot: "neural";
  surgeryCode: "Major (2d4 damage)";
  maintenanceDie: 10;
  malfunctionTriggers: readonly ["Daily maintenance degradation", "Activation wear"];
  grants: readonly [];
}, {
  kind: "bionic";
  id: Brand<string, "BionicId">;
  name: "BIONIC ORGANS";
  slug: "bionic-organs";
  summary: "Artificial organs that grant +1d3 Flesh for 1d6 hours when activated.";
  tags: readonly ["bionic", "internal"];
  source: SourceTrace;
  slot: "internal";
  surgeryCode: "Major (2d4 damage)";
  maintenanceDie: 10;
  malfunctionTriggers: readonly ["Daily maintenance degradation", "Activation wear"];
  grants: readonly [];
}, {
  kind: "bionic";
  id: Brand<string, "BionicId">;
  name: "POWER WIRES";
  slug: "power-wires";
  summary: "Back-mounted cables and plates that grant +1d3 Mojo for 1d6 hours when activated.";
  tags: readonly ["bionic", "spine", "magick"];
  source: SourceTrace;
  slot: "spine";
  surgeryCode: "Major (2d4 damage)";
  maintenanceDie: 10;
  malfunctionTriggers: readonly ["Daily maintenance degradation", "Activation wear"];
  grants: readonly [];
}, {
  kind: "bionic";
  id: Brand<string, "BionicId">;
  name: "LOBE-NAIL";
  slug: "lobe-nail";
  summary: "Critical brain implant that grants +2 to combat checks but causes migraines and death pressure if no violence is committed for 24 hours.";
  tags: readonly ["bionic", "neural", "graggar"];
  source: SourceTrace;
  slot: "neural";
  surgeryCode: "Critical (3d4 damage)";
  maintenanceDie: 10;
  malfunctionTriggers: readonly ["Daily maintenance degradation", "Activation wear", "No violence within 24 hours"];
  grants: readonly [{
     kind: "modifierSet";
     modifierSet: {
        modifiers: readonly [{
           target: "combat:accuracy";
           operation: "add";
           value: 2;
           source: "Lobe-Nail";
        }];
     };
  }];
}, {
  kind: "bionic";
  id: Brand<string, "BionicId">;
  name: "BIONIC LEG";
  slug: "bionic-leg";
  summary: "Robotic replacement for a leg, sometimes fitted with tools or weapons.";
  tags: readonly ["bionic", "legs"];
  source: SourceTrace;
  slot: "legs";
  surgeryCode: "Minor (1d4 damage)";
  maintenanceDie: 10;
  malfunctionTriggers: readonly ["Daily maintenance degradation", "Activation wear"];
  grants: readonly [];
}, {
  kind: "bionic";
  id: Brand<string, "BionicId">;
  name: "BIONIC ARM";
  slug: "bionic-arm";
  summary: "Robotic replacement for an arm, sometimes fitted with tools or weapons.";
  tags: readonly ["bionic", "arms"];
  source: SourceTrace;
  slot: "arms";
  surgeryCode: "Minor (1d4 damage)";
  maintenanceDie: 10;
  malfunctionTriggers: readonly ["Daily maintenance degradation", "Activation wear"];
  grants: readonly [];
}, {
  kind: "bionic";
  id: Brand<string, "BionicId">;
  name: "GUNK BOOSTERS";
  slug: "gunk-boosters";
  summary: "Waste-jet feet that can launch the user 10 feet once per day.";
  tags: readonly ["bionic", "legs", "mobility"];
  source: SourceTrace;
  slot: "legs";
  surgeryCode: "Major (2d4 damage)";
  maintenanceDie: 10;
  malfunctionTriggers: readonly ["Daily maintenance degradation", "Activation wear"];
  grants: readonly [];
}, {
  kind: "bionic";
  id: Brand<string, "BionicId">;
  name: "PSYCHOKINETIC FREQUENCY COILS";
  slug: "psychokinetic-frequency-coils";
  summary: "Skull-mounted coils that restore 1d6 Mana Dice when activated, but may also inflict the same amount of Wound Points on tails.";
  tags: readonly ["bionic", "neural", "magick"];
  source: SourceTrace;
  slot: "neural";
  surgeryCode: "Major (2d4 damage)";
  maintenanceDie: 10;
  malfunctionTriggers: readonly ["Daily maintenance degradation", "Activation wear"];
  grants: readonly [];
}, {
  kind: "bionic";
  id: Brand<string, "BionicId">;
  name: "DEADSWITCH";
  slug: "deadswitch";
  summary: "Abdominal explosive that detonates in a short-range 2d6 blast when the user dies.";
  tags: readonly ["bionic", "internal", "explosive"];
  source: SourceTrace;
  slot: "internal";
  surgeryCode: "Minor (1d4 damage)";
  maintenanceDie: 10;
  malfunctionTriggers: readonly ["Daily maintenance degradation"];
  grants: readonly [];
}, {
  kind: "bionic";
  id: Brand<string, "BionicId">;
  name: "NECROMANTIC SUBROUTINES";
  slug: "necromantic-subroutines";
  summary: "Arcane SCOM tech that leaves the user in perpetual unlife and unable to die.";
  tags: readonly ["bionic", "internal", "undead"];
  source: SourceTrace;
  slot: "internal";
  surgeryCode: "Critical (3d4 damage)";
  maintenanceDie: 10;
  malfunctionTriggers: readonly ["Daily maintenance degradation", "Activation wear"];
  grants: readonly [];
}];
```

Defined in: [data/imported/body/bionics.ts:7](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/data/imported/body/bionics.ts#L7)
