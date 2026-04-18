[**@bugchud/core API Reference v0.2.0**](../../../index.md)

***

[@bugchud/core API Reference](../../../index.md) / [data/imported](../index.md) / importedMutations

# Variable: importedMutations

```ts
const importedMutations: readonly [{
  kind: "mutation";
  id: Brand<string, "MutationId">;
  name: "AGILITY";
  slug: "agility";
  summary: "Enhanced reflexes and reaction-speed. +1 Twitch.";
  tags: readonly ["mutation", "beneficial"];
  source: SourceTrace;
  category: "bestial";
  severity: 1;
  xomThreshold: 1;
  randomWeight: 5;
  grants: readonly [{
     kind: "modifierSet";
     modifierSet: {
        modifiers: readonly [{
           target: "attribute:twitch";
           operation: "add";
           value: 1;
           source: "Agility";
        }];
     };
  }];
}, {
  kind: "mutation";
  id: Brand<string, "MutationId">;
  name: "MAGICK SIGHT";
  slug: "magick-sight";
  summary: "Eyes leak green mist and perceive enchantments, Xom radiation, and magick as a glow. +1 Mojo.";
  tags: readonly ["mutation", "magick"];
  source: SourceTrace;
  category: "arcane";
  severity: 1;
  xomThreshold: 1;
  randomWeight: 5;
  grants: readonly [{
     kind: "modifierSet";
     modifierSet: {
        modifiers: readonly [{
           target: "attribute:mojo";
           operation: "add";
           value: 1;
           source: "Magick Sight";
        }];
     };
  }];
}, {
  kind: "mutation";
  id: Brand<string, "MutationId">;
  name: "BURNING BODY";
  slug: "burning-body";
  summary: "Body becomes wreathed in hellish flames, gaining fire immunity and igniting those who touch it unless they save vs Dodge.";
  tags: readonly ["mutation", "fire"];
  source: SourceTrace;
  category: "arcane";
  severity: 3;
  xomThreshold: 1;
  randomWeight: 5;
  grants: readonly [];
}, {
  kind: "mutation";
  id: Brand<string, "MutationId">;
  name: "Magic Immunity";
  slug: "magic-immunity";
  summary: "Damage and effects of magical origin do not work on the mutant, including positive effects.";
  tags: readonly ["mutation", "magick"];
  source: SourceTrace;
  category: "arcane";
  severity: 4;
  xomThreshold: 1;
  randomWeight: 5;
  grants: readonly [];
}, {
  kind: "mutation";
  id: Brand<string, "MutationId">;
  name: "Crystalline Body";
  slug: "crystalline-body";
  summary: "Body becomes crystal-like and grants the benefits of Medium armor while unarmored.";
  tags: readonly ["mutation", "dermal"];
  source: SourceTrace;
  category: "dermal";
  severity: 2;
  xomThreshold: 1;
  randomWeight: 5;
  grants: readonly [{
     kind: "modifierSet";
     modifierSet: {
        modifiers: readonly [{
           target: "combat:soak";
           operation: "add";
           value: 4;
           source: "Crystalline Body";
        }];
     };
  }];
}, {
  kind: "mutation";
  id: Brand<string, "MutationId">;
  name: "Enormously Fat";
  slug: "enormously-fat";
  summary: "Grotesque obesity grants +1 Flesh and -2 Twitch.";
  tags: readonly ["mutation", "body"];
  source: SourceTrace;
  category: "metabolic";
  severity: 2;
  xomThreshold: 1;
  randomWeight: 5;
  grants: readonly [{
     kind: "modifierSet";
     modifierSet: {
        modifiers: readonly [{
           target: "attribute:flesh";
           operation: "add";
           value: 1;
           source: "Enormously Fat";
         }, {
           target: "attribute:twitch";
           operation: "subtract";
           value: 2;
           source: "Enormously Fat";
        }];
     };
  }];
}, {
  kind: "mutation";
  id: Brand<string, "MutationId">;
  name: "Extremely Thin";
  slug: "extremely-thin";
  summary: "Grotesque weight loss grants +1 Twitch and -2 Flesh.";
  tags: readonly ["mutation", "body"];
  source: SourceTrace;
  category: "metabolic";
  severity: 2;
  xomThreshold: 1;
  randomWeight: 5;
  grants: readonly [{
     kind: "modifierSet";
     modifierSet: {
        modifiers: readonly [{
           target: "attribute:twitch";
           operation: "add";
           value: 1;
           source: "Extremely Thin";
         }, {
           target: "attribute:flesh";
           operation: "subtract";
           value: 2;
           source: "Extremely Thin";
        }];
     };
  }];
}, {
  kind: "mutation";
  id: Brand<string, "MutationId">;
  name: "Growth";
  slug: "growth";
  summary: "The mutant becomes Large, granting +1 Flesh and making ranged attacks against them gain +4.";
  tags: readonly ["mutation", "body"];
  source: SourceTrace;
  category: "bestial";
  severity: 3;
  xomThreshold: 1;
  randomWeight: 5;
  grants: readonly [{
     kind: "modifierSet";
     modifierSet: {
        modifiers: readonly [{
           target: "attribute:flesh";
           operation: "add";
           value: 1;
           source: "Growth";
        }];
     };
  }];
}, {
  kind: "mutation";
  id: Brand<string, "MutationId">;
  name: "Multiple Arms";
  slug: "multiple-arms";
  summary: "1d4 extra arms emerge from the body.";
  tags: readonly ["mutation", "body"];
  source: SourceTrace;
  category: "limb";
  severity: 3;
  xomThreshold: 1;
  randomWeight: 10;
  grants: readonly [];
}, {
  kind: "mutation";
  id: Brand<string, "MutationId">;
  name: "Prehensile Tail";
  slug: "prehensile-tail";
  summary: "A tail emerges that can hold weapons and shields, though torso hits can sever it.";
  tags: readonly ["mutation", "body"];
  source: SourceTrace;
  category: "limb";
  severity: 2;
  xomThreshold: 1;
  randomWeight: 5;
  grants: readonly [];
}, {
  kind: "mutation";
  id: Brand<string, "MutationId">;
  name: "Regeneration";
  slug: "regeneration";
  summary: "Heal 1d4 Wound Points every hour and regrow lost limbs in 1d6 hours.";
  tags: readonly ["mutation", "healing"];
  source: SourceTrace;
  category: "metabolic";
  severity: 4;
  xomThreshold: 1;
  randomWeight: 5;
  grants: readonly [{
     kind: "modifierSet";
     modifierSet: {
        modifiers: readonly [{
           target: "body:healingRate";
           operation: "add";
           value: 4;
           source: "Regeneration";
           notes: readonly ["Expressed as a rough imported healing-rate proxy; the rulebook uses 1d4 Wound Points per hour."];
        }];
     };
  }];
}, {
  kind: "mutation";
  id: Brand<string, "MutationId">;
  name: "Razor Sharp Claws";
  slug: "razor-sharp-claws";
  summary: "Fingers elongate into knife-like bones; unarmed attacks count as the Claw weapon.";
  tags: readonly ["mutation", "combat"];
  source: SourceTrace;
  category: "limb";
  severity: 2;
  xomThreshold: 1;
  randomWeight: 5;
  grants: readonly [];
}, {
  kind: "mutation";
  id: Brand<string, "MutationId">;
  name: "Resilient";
  slug: "resilient";
  summary: "Biology strengthens, skin hardens, muscles bulk. +1 Flesh.";
  tags: readonly ["mutation", "beneficial"];
  source: SourceTrace;
  category: "dermal";
  severity: 1;
  xomThreshold: 1;
  randomWeight: 5;
  grants: readonly [{
     kind: "modifierSet";
     modifierSet: {
        modifiers: readonly [{
           target: "attribute:flesh";
           operation: "add";
           value: 1;
           source: "Resilient";
        }];
     };
  }];
}, {
  kind: "mutation";
  id: Brand<string, "MutationId">;
  name: "Scorpion Tail";
  slug: "scorpion-tail";
  summary: "Large spiked tail usable as a Medium weapon, with a 25% chance of lethal poison.";
  tags: readonly ["mutation", "combat"];
  source: SourceTrace;
  category: "bestial";
  severity: 3;
  xomThreshold: 1;
  randomWeight: 5;
  grants: readonly [];
}, {
  kind: "mutation";
  id: Brand<string, "MutationId">;
  name: "Strong";
  slug: "strong";
  summary: "Muscles ripple and bulk. +1 Flesh.";
  tags: readonly ["mutation", "beneficial"];
  source: SourceTrace;
  category: "metabolic";
  severity: 1;
  xomThreshold: 1;
  randomWeight: 5;
  grants: readonly [{
     kind: "modifierSet";
     modifierSet: {
        modifiers: readonly [{
           target: "attribute:flesh";
           operation: "add";
           value: 1;
           source: "Strong";
        }];
     };
  }];
}, {
  kind: "mutation";
  id: Brand<string, "MutationId">;
  name: "Darkvision";
  slug: "darkvision";
  summary: "Eyes glow yellow and can perfectly see in the dark.";
  tags: readonly ["mutation", "senses"];
  source: SourceTrace;
  category: "sensory";
  severity: 1;
  xomThreshold: 1;
  randomWeight: 5;
  grants: readonly [];
}, {
  kind: "mutation";
  id: Brand<string, "MutationId">;
  name: "Wings";
  slug: "wings";
  summary: "Wings sprout from the back and allow short periods of flight.";
  tags: readonly ["mutation", "flight"];
  source: SourceTrace;
  category: "bestial";
  severity: 3;
  xomThreshold: 1;
  randomWeight: 5;
  grants: readonly [];
}, {
  kind: "mutation";
  id: Brand<string, "MutationId">;
  name: "Extra pockets";
  slug: "extra-pockets";
  summary: "Fleshy pouches all over the body grant +1d4 Carry.";
  tags: readonly ["mutation", "inventory"];
  source: SourceTrace;
  category: "dermal";
  severity: 1;
  xomThreshold: 1;
  randomWeight: 5;
  grants: readonly [{
     kind: "modifierSet";
     modifierSet: {
        modifiers: readonly [{
           target: "inventory:carrySlots";
           operation: "add";
           value: 2;
           source: "Extra pockets";
           notes: readonly ["The rulebook grants +1d4 Carry; this import uses a conservative +2 placeholder for compile-time assembly only."];
        }];
     };
  }];
}];
```

Defined in: [data/imported/body/mutations.ts:11](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/data/imported/body/mutations.ts#L11)
