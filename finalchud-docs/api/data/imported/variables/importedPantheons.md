[**@bugchud/core API Reference v0.2.0**](../../../index.md)

***

[@bugchud/core API Reference](../../../index.md) / [data/imported](../index.md) / importedPantheons

# Variable: importedPantheons

```ts
const importedPantheons: readonly [{
  kind: "pantheon";
  id: Brand<string, "PantheonId">;
  name: "THE IMMORTAL TEN";
  slug: "immortal-ten";
  summary: "The most common faith in Psydonia, sanctified by the Immortal Church and divided by internecine divine struggle.";
  tags: readonly ["faith", "pantheon", "immortal"];
  source: SourceTrace;
  patronRefs: readonly [RegistryRef<"patron">, RegistryRef<"patron">, RegistryRef<"patron">, RegistryRef<"patron">, RegistryRef<"patron">, RegistryRef<"patron">, RegistryRef<"patron">, RegistryRef<"patron">, RegistryRef<"patron">, RegistryRef<"patron">];
  doctrine: readonly ["Stand united against Inhumenity even while the gods struggle among themselves.", "Astrata presently leads the pantheon.", "The Immortal Church is the foundation of orthodox worship."];
}, {
  kind: "pantheon";
  id: Brand<string, "PantheonId">;
  name: "THE OLD FAITH";
  slug: "old-faith";
  summary: "Violent monotheists who reject both the Immortal Ten and the Inhumen as traitors and idols.";
  tags: readonly ["faith", "pantheon", "old-faith"];
  source: SourceTrace;
  patronRefs: readonly [RegistryRef<"patron">];
  doctrine: readonly ["The Immortal Church and Inhumen Pantheon will pay for their treason.", "Martyrdom in Psydon's honor is beautiful.", "The struggle ends only when Psydon is restored."];
}, {
  kind: "pantheon";
  id: Brand<string, "PantheonId">;
  name: "THE INHUMEN PANTHEON";
  slug: "inhumen-pantheon";
  summary: "Sinister faith of apostates and Darklands heathens who labor toward dissolution and the end of the world.";
  tags: readonly ["faith", "pantheon", "inhumen"];
  source: SourceTrace;
  patronRefs: readonly [RegistryRef<"patron">, RegistryRef<"patron">, RegistryRef<"patron">];
  doctrine: readonly ["Morality is a shackle rather than a virtue.", "The Dark-Star will deliver the world from its revolting condition.", "Profaning the idols of the false faiths of man is virtuous."];
}];
```

Defined in: [data/imported/supernatural/faith.ts:17](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/data/imported/supernatural/faith.ts#L17)
