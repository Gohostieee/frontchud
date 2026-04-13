[**@bugchud/core API Reference v0.1.0**](../../../index.md)

***

[@bugchud/core API Reference](../../../index.md) / [data/imported](../index.md) / importedBackgrounds

# Variable: importedBackgrounds

```ts
const importedBackgrounds: readonly [{
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "FIGHTER";
  slug: "fighter";
  summary: "Cold steel first; begins play with the Martial Prowess dream.";
  tags: readonly ["background", "pseudoCivilized", "martial"];
  source: SourceTrace;
  narrativeRole: "Pseudo-civilized frontline combatant";
  originGroups: readonly ["pseudoCivilized"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "ROGUE";
  slug: "rogue";
  summary: "A roguish opportunist often acquainted with destiny.";
  tags: readonly ["background", "pseudoCivilized", "rogue"];
  source: SourceTrace;
  narrativeRole: "Thief, infiltrator, or trickster";
  originGroups: readonly ["pseudoCivilized"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "LEARNED";
  slug: "learned";
  summary: "A scholar shaped by prophecy, history, and the sense that the end of days approaches.";
  tags: readonly ["background", "pseudoCivilized", "learned"];
  source: SourceTrace;
  narrativeRole: "Scholar or educated observer";
  originGroups: readonly ["pseudoCivilized"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "DEVOUT";
  slug: "devout";
  summary: "A believer defined by religious conviction and the weight of the gods.";
  tags: readonly ["background", "pseudoCivilized", "faith"];
  source: SourceTrace;
  narrativeRole: "Faithful adherent or lay zealot";
  originGroups: readonly ["pseudoCivilized"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "NOBLE-BORN";
  slug: "noble-born";
  summary: "Scion of a minor noble house whose blood is recognized by the Shylock cults.";
  tags: readonly ["background", "pseudoCivilized", "noble"];
  source: SourceTrace;
  narrativeRole: "Minor noble-house heir";
  originGroups: readonly ["pseudoCivilized"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "MONSTER-HUNTER";
  slug: "monster-hunter";
  summary: "A nite-creecher slayer steeped in grim omens and practical violence.";
  tags: readonly ["background", "pseudoCivilized", "hunter"];
  source: SourceTrace;
  narrativeRole: "Hunter of beests and nite-creechers";
  originGroups: readonly ["pseudoCivilized"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "DUELIST";
  slug: "duelist";
  summary: "A fencer of wit and reflex regarded as a good omen in troubled lands.";
  tags: readonly ["background", "pseudoCivilized", "duelist"];
  source: SourceTrace;
  narrativeRole: "One-handed melee specialist";
  originGroups: readonly ["pseudoCivilized"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "DOKTOR";
  slug: "doktor";
  summary: "A harm-first healer split from the Shylock cult proper.";
  tags: readonly ["background", "pseudoCivilized", "medical"];
  source: SourceTrace;
  narrativeRole: "Surgeon and battlefield doctor";
  originGroups: readonly ["pseudoCivilized"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "BERSERKER";
  slug: "berserker";
  summary: "A Northman of fury, spittle, and forgotten futures.";
  tags: readonly ["background", "barbaric", "berserker"];
  source: SourceTrace;
  narrativeRole: "Frenzied melee combatant";
  originGroups: readonly ["barbaric"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "SAVAGE";
  slug: "savage";
  summary: "A practitioner of the Way of Babes & Legends who trusts beauty and bare skin to cheat death.";
  tags: readonly ["background", "barbaric", "savage"];
  source: SourceTrace;
  narrativeRole: "Feral skirmisher or legend-seeker";
  originGroups: readonly ["barbaric"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "SKIRMISHER";
  slug: "skirmisher";
  summary: "A ranged hunter raised on troll and nite-creecher hunts.";
  tags: readonly ["background", "barbaric", "ranged"];
  source: SourceTrace;
  narrativeRole: "Bowman and ranging scout";
  originGroups: readonly ["barbaric"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "SHAMAN";
  slug: "shaman";
  summary: "A northern wyrdman who conflates the gods with the transient material of existence.";
  tags: readonly ["background", "barbaric", "shaman"];
  source: SourceTrace;
  narrativeRole: "Primitive wizard or spirit-worker";
  originGroups: readonly ["barbaric"];
  startingDreamRefs: readonly [];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "NOMAD";
  slug: "nomad";
  summary: "A child of the steppes loyal to blood and to a cruel homeland.";
  tags: readonly ["background", "barbaric", "mounted"];
  source: SourceTrace;
  narrativeRole: "Mounted wanderer and caravan rider";
  originGroups: readonly ["barbaric"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "RAIDER";
  slug: "raider";
  summary: "A tribal plunderer shaped by prestige raids and Southward violence.";
  tags: readonly ["background", "barbaric", "raider"];
  source: SourceTrace;
  narrativeRole: "Plunderer and aggressive warfighter";
  originGroups: readonly ["barbaric"];
  startingDreamRefs: readonly [];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "WENDIGO";
  slug: "wendigo";
  summary: "A hideous ritualist who sought beast-strength through spirits of blood and bone.";
  tags: readonly ["background", "barbaric", "bestial"];
  source: SourceTrace;
  narrativeRole: "Spirit-pact savage";
  originGroups: readonly ["barbaric"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "WIZARD";
  slug: "wizard";
  summary: "A Darklands spellcaster already marked by Arcyne Potential.";
  tags: readonly ["background", "darklands", "magick"];
  source: SourceTrace;
  narrativeRole: "Darklands black-magick user";
  originGroups: readonly ["darklands"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "VICIOUS";
  slug: "vicious";
  summary: "A cruel survivor shaped by the principle that only the monstrous endure.";
  tags: readonly ["background", "darklands", "cruel"];
  source: SourceTrace;
  narrativeRole: "Cruel melee specialist";
  originGroups: readonly ["darklands"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "MUTANT";
  slug: "mutant";
  summary: "A child of Zizo's stained earth and its mutagenic aftermath.";
  tags: readonly ["background", "darklands", "mutation"];
  source: SourceTrace;
  narrativeRole: "Mutation-shaped survivor";
  originGroups: readonly ["darklands"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "PERFUMER";
  slug: "perfumer";
  summary: "A secluded chem-worker innovating in Baothan Vice and chemical blisses.";
  tags: readonly ["background", "darklands", "alchemy"];
  source: SourceTrace;
  narrativeRole: "Alchemist and perfumer";
  originGroups: readonly ["darklands"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "ARCHON";
  slug: "archon";
  summary: "A title-bearing Inhumen loyalist who rules with pain and the touch of death.";
  tags: readonly ["background", "darklands", "noble"];
  source: SourceTrace;
  narrativeRole: "City-state elite and tyrant";
  originGroups: readonly ["darklands"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
  socialTags: readonly ["Inhumen worshippers only"];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "FORMER SLAVE";
  slug: "former-slave";
  summary: "A survivor of the city-states who knows human life is counted in squandering.";
  tags: readonly ["background", "darklands", "oppressed"];
  source: SourceTrace;
  narrativeRole: "Escaped laborer or survivor";
  originGroups: readonly ["darklands"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "CYBORG";
  slug: "cyborg";
  summary: "A bionically touched explorer of Zizo's forgotten engineerings.";
  tags: readonly ["background", "darklands", "bionic"];
  source: SourceTrace;
  narrativeRole: "Cybernetic soldier or survivor";
  originGroups: readonly ["darklands"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "INFANTRY";
  slug: "infantry";
  summary: "A common Darklands gunfighter from the raiding parties of Elf-kind.";
  tags: readonly ["background", "darklands", "firearms"];
  source: SourceTrace;
  narrativeRole: "Disciplined gunman";
  originGroups: readonly ["darklands"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}, {
  kind: "background";
  id: Brand<string, "BackgroundId">;
  name: "DREAD-TONGUED";
  slug: "dread-tongued";
  summary: "A keeper of the ancestral speech of Elf-kind and its sinister spell-lore.";
  tags: readonly ["background", "darklands", "language"];
  source: SourceTrace;
  narrativeRole: "Speaker of old sorcerous tongues";
  originGroups: readonly ["darklands"];
  startingDreamRefs: readonly [RegistryRef<"dream">];
  startingPackages: readonly [];
}];
```

Defined in: [data/imported/character/backgrounds.ts:8](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/data/imported/character/backgrounds.ts#L8)
