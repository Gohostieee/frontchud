[**@bugchud/core API Reference v0.2.0**](../../../index.md)

***

[@bugchud/core API Reference](../../../index.md) / [data/imported](../index.md) / importedRaces

# Variable: importedRaces

```ts
const importedRaces: readonly [{
  kind: "race";
  id: Brand<string, "RaceId">;
  name: "HUMEN";
  slug: "humen";
  summary: "The preeminent race of Psydonia, made in Psydon's image to wage war upon Elf-kind.";
  tags: readonly ["race", "character", "humen"];
  source: SourceTrace;
  size: "medium";
  baseAttributes: {
  };
  attributeGeneration: {
     method: "rolled";
     notes: readonly ["Twitch: 3d6, take median, add +1.", "Flesh: 3d6, take median, add +1.", "Mojo: 3d6, take median, add +1."];
  };
  racialTraits: readonly ["Created in Psydon's image.", "Lives anywhere that can support life."];
  startingLanguages: readonly ["Psydish Uncommon"];
}, {
  kind: "race";
  id: Brand<string, "RaceId">;
  name: "DWARF";
  slug: "dwarf";
  summary: "Kin-bound fortress folk whose promises are ironclad and whose bodies skew toward hardiness.";
  tags: readonly ["race", "character", "dwarf"];
  source: SourceTrace;
  size: "medium";
  baseAttributes: {
  };
  attributeGeneration: {
     method: "rolled";
     notes: readonly ["Twitch: 3d6, take lowest.", "Flesh: 3d6, take highest, add +2.", "Mojo: 3d6, take lowest."];
  };
  racialTraits: readonly ["Bound by kith and kin.", "Fashioned from rock and stone by Malum."];
  startingLanguages: readonly ["Psydish Uncommon"];
}, {
  kind: "race";
  id: Brand<string, "RaceId">;
  name: "ELF";
  slug: "elf";
  summary: "Darklands-born descendants of the old world who carry strong Mojo and a strange relation to Xom.";
  tags: readonly ["race", "character", "elf"];
  source: SourceTrace;
  size: "medium";
  baseAttributes: {
  };
  attributeGeneration: {
     method: "rolled";
     notes: readonly ["Twitch: 3d6, take median, add +1.", "Flesh: 3d6, take lowest.", "Mojo: 3d6, take highest, add +2."];
  };
  racialTraits: readonly ["Do not receive Xom points from contaminated areas.", "Born outside Psydon's grace in a world before time."];
  startingLanguages: readonly ["Psydish Uncommon", "The Black Tongue"];
}, {
  kind: "race";
  id: Brand<string, "RaceId">;
  name: "HALFLING";
  slug: "halfling";
  summary: "Trashy wanderers and notorious thieves with excellent reflexes and weak Flesh.";
  tags: readonly ["race", "character", "halfling"];
  source: SourceTrace;
  size: "small";
  baseAttributes: {
  };
  attributeGeneration: {
     method: "rolled";
     notes: readonly ["Twitch: 3d6, take highest, add +2.", "Flesh: 3d6, take lowest.", "Mojo: 3d6, take median, add +1."];
  };
  racialTraits: readonly ["Fashioned by Xylix as a parody of dwarf-kind.", "Stereotyped as vagrants and thieves."];
  startingLanguages: readonly ["Psydish Uncommon"];
}, {
  kind: "race";
  id: Brand<string, "RaceId">;
  name: "HALF-BREED";
  slug: "half-breed";
  summary: "A dysgenic blend of two parent races that inherits only the lower stat dice from each lineage.";
  tags: readonly ["race", "character", "mixed"];
  source: SourceTrace;
  size: "medium";
  baseAttributes: {
  };
  attributeGeneration: {
     method: "choice";
     notes: readonly ["Choose two parent races.", "For each attribute, take the lower dice method between the chosen parents."];
  };
  racialTraits: readonly ["Inherits only the worst qualities from their parents."];
  startingLanguages: readonly ["Psydish Uncommon"];
}];
```

Defined in: [data/imported/character/races.ts:6](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/data/imported/character/races.ts#L6)
