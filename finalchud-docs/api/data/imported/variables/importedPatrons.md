[**@bugchud/core API Reference v0.2.0**](../../../index.md)

***

[@bugchud/core API Reference](../../../index.md) / [data/imported](../index.md) / importedPatrons

# Variable: importedPatrons

```ts
const importedPatrons: readonly [{
  kind: "patron";
  id: Brand<string, "PatronId">;
  name: "ABYSSOR";
  slug: "abyssor";
  summary: "Immortal god of the sea, aquatic life, and deals.";
  tags: readonly ["faith", "patron", "sea"];
  source: SourceTrace;
  pantheonRef: RegistryRef<"pantheon">;
  titles: readonly ["Immortal God of the Sea", "Friend of Sailors"];
  portfolioTags: readonly ["sea", "aquatic-life", "deals", "storms", "salt"];
  relicRefs: readonly [RegistryRef<"relic">, RegistryRef<"relic">];
}, {
  kind: "patron";
  id: Brand<string, "PatronId">;
  name: "ASTRATA";
  slug: "astrata";
  summary: "Immortal goddess of virtue, nobility, tyranny, and the sun.";
  tags: readonly ["faith", "patron", "sun"];
  source: SourceTrace;
  pantheonRef: RegistryRef<"pantheon">;
  titles: readonly ["Leader of the Immortal Ten", "The Great Unifier"];
  portfolioTags: readonly ["virtue", "nobility", "tyranny", "sun", "gold"];
  relicRefs: readonly [RegistryRef<"relic">, RegistryRef<"relic">, RegistryRef<"relic">];
}, {
  kind: "patron";
  id: Brand<string, "PatronId">;
  name: "RAVOX";
  slug: "ravox";
  summary: "Immortal god of heroism, glory, combat, and redemption.";
  tags: readonly ["faith", "patron", "war"];
  source: SourceTrace;
  pantheonRef: RegistryRef<"pantheon">;
  titles: readonly ["Sword of Salvation", "Hero of Combat"];
  portfolioTags: readonly ["heroism", "glory", "combat", "redemption", "justice"];
  relicRefs: readonly [RegistryRef<"relic">, RegistryRef<"relic">, RegistryRef<"relic">];
}, {
  kind: "patron";
  id: Brand<string, "PatronId">;
  name: "DENDOR";
  slug: "dendor";
  summary: "Immortal god of the wild, animals, and unbound primalism.";
  tags: readonly ["faith", "patron", "wild"];
  source: SourceTrace;
  pantheonRef: RegistryRef<"pantheon">;
  titles: readonly ["The Good Dendor"];
  portfolioTags: readonly ["wild", "animals", "primalism", "forest", "hunting"];
  relicRefs: readonly [RegistryRef<"relic">, RegistryRef<"relic">, RegistryRef<"relic">];
}, {
  kind: "patron";
  id: Brand<string, "PatronId">;
  name: "PESTRA";
  slug: "pestra";
  summary: "Immortal goddess of treason, sickness, rot, and wisdom.";
  tags: readonly ["faith", "patron", "sickness"];
  source: SourceTrace;
  pantheonRef: RegistryRef<"pantheon">;
  titles: readonly ["Cocooned Traitor", "Goddess of Rot and Wisdom"];
  portfolioTags: readonly ["treason", "sickness", "rot", "wisdom", "medicine"];
  relicRefs: readonly [RegistryRef<"relic">];
}, {
  kind: "patron";
  id: Brand<string, "PatronId">;
  name: "EORA";
  slug: "eora";
  summary: "Immortal goddess of love, home, and memories.";
  tags: readonly ["faith", "patron", "love"];
  source: SourceTrace;
  pantheonRef: RegistryRef<"pantheon">;
  titles: readonly ["Merciful Sister", "Goddess of Home"];
  portfolioTags: readonly ["love", "home", "memories", "mercy", "family"];
  relicRefs: readonly [RegistryRef<"relic">, RegistryRef<"relic">, RegistryRef<"relic">];
}, {
  kind: "patron";
  id: Brand<string, "PatronId">;
  name: "MALUM";
  slug: "malum";
  summary: "Immortal god of craft, duty, and family; father of dwarf-kind.";
  tags: readonly ["faith", "patron", "craft"];
  source: SourceTrace;
  pantheonRef: RegistryRef<"pantheon">;
  titles: readonly ["Miracle-Worker", "Father of Dwarf-Kind"];
  portfolioTags: readonly ["craft", "duty", "family", "oaths", "labor"];
  relicRefs: readonly [RegistryRef<"relic">, RegistryRef<"relic">];
}, {
  kind: "patron";
  id: Brand<string, "PatronId">;
  name: "NOC";
  slug: "noc";
  summary: "Immortal god of censorship, secrets, prophecy, and history.";
  tags: readonly ["faith", "patron", "secrets"];
  source: SourceTrace;
  pantheonRef: RegistryRef<"pantheon">;
  titles: readonly ["Scroll-Father"];
  portfolioTags: readonly ["censorship", "secrets", "prophecy", "history", "obscurity"];
  relicRefs: readonly [RegistryRef<"relic">, RegistryRef<"relic">];
}, {
  kind: "patron";
  id: Brand<string, "PatronId">;
  name: "XYLIX";
  slug: "xylix";
  summary: "Immortal god of tricks, chaos, legends, and games; father of halfling-kind.";
  tags: readonly ["faith", "patron", "trickster"];
  source: SourceTrace;
  pantheonRef: RegistryRef<"pantheon">;
  titles: readonly ["Patron Saint of the Fool", "Father of Halfling-Kind"];
  portfolioTags: readonly ["tricks", "chaos", "legends", "games", "fate"];
}, {
  kind: "patron";
  id: Brand<string, "PatronId">;
  name: "NECRA";
  slug: "necra";
  summary: "Immortal goddess of death, burials, and the afterlife.";
  tags: readonly ["faith", "patron", "death"];
  source: SourceTrace;
  pantheonRef: RegistryRef<"pantheon">;
  titles: readonly ["Shepherd of Souls"];
  portfolioTags: readonly ["death", "burials", "afterlife", "mourning", "silence"];
  relicRefs: readonly [RegistryRef<"relic">, RegistryRef<"relic">, RegistryRef<"relic">];
}, {
  kind: "patron";
  id: Brand<string, "PatronId">;
  name: "PSYDON";
  slug: "psydon";
  summary: "True god-king of man, emissary of the pantokrator, and martyr of the godhead.";
  tags: readonly ["faith", "patron", "old-faith"];
  source: SourceTrace;
  pantheonRef: RegistryRef<"pantheon">;
  titles: readonly ["True God-King of Man", "Once-Eternal"];
  portfolioTags: readonly ["god-king", "law", "martyrdom", "empire", "restoration"];
  relicRefs: readonly [RegistryRef<"relic">, RegistryRef<"relic">, RegistryRef<"relic">];
}, {
  kind: "patron";
  id: Brand<string, "PatronId">;
  name: "GRAGGAR";
  slug: "graggar";
  summary: "Inhumen god of cruelty, murder, and insanity.";
  tags: readonly ["faith", "patron", "inhumen"];
  source: SourceTrace;
  pantheonRef: RegistryRef<"pantheon">;
  titles: readonly ["The Dark-Star"];
  portfolioTags: readonly ["cruelty", "murder", "insanity", "vengeance", "blood"];
  relicRefs: readonly [RegistryRef<"relic">, RegistryRef<"relic">, RegistryRef<"relic">];
}, {
  kind: "patron";
  id: Brand<string, "PatronId">;
  name: "COMRADE MATTHIOS";
  slug: "matthios";
  summary: "Inhumen god of revolution, the poor, and anarchy.";
  tags: readonly ["faith", "patron", "inhumen"];
  source: SourceTrace;
  pantheonRef: RegistryRef<"pantheon">;
  titles: readonly ["Bandit-Saint", "Comrade Matthios"];
  portfolioTags: readonly ["revolution", "poor", "anarchy", "banditry", "envy"];
  relicRefs: readonly [RegistryRef<"relic">, RegistryRef<"relic">, RegistryRef<"relic">];
}, {
  kind: "patron";
  id: Brand<string, "PatronId">;
  name: "ZIZO";
  slug: "zizo";
  summary: "Inhumen god of black magick, ambition, and the undead.";
  tags: readonly ["faith", "patron", "inhumen"];
  source: SourceTrace;
  pantheonRef: RegistryRef<"pantheon">;
  titles: readonly ["Lady of Violet Rays"];
  portfolioTags: readonly ["black-magick", "ambition", "undead", "dissolution", "moon"];
  relicRefs: readonly [RegistryRef<"relic">, RegistryRef<"relic">, RegistryRef<"relic">];
}];
```

Defined in: [data/imported/supernatural/faith.ts:83](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/data/imported/supernatural/faith.ts#L83)
