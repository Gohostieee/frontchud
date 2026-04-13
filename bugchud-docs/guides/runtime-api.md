# Runtime API Guide

## What This Is

This guide explains the application-facing runtime layer: `BugchudCore`, `RulesetCatalog`, model classes, thin wrappers, factories, serialization helpers, and validation helpers.

## When An App Should Use It

Use this guide when you want to know what the root package exports are for and how they fit together in day-to-day application code.

## Important Related Types And Classes

- `BugchudCore`
- `RulesetCatalog`
- `CharacterModel`
- `CreatureModel`
- `NpcModel`
- `EncounterModel`
- `CampaignModel`
- `WorldModel`
- `serializeSnapshot()`
- `deserializeSnapshot()`

## How It Connects To The Rest Of The Library

```mermaid
classDiagram
  class BugchudCore
  class RulesetCatalog
  class CharacterModel
  class CreatureModel
  class NpcModel
  class EncounterModel
  class CampaignModel
  class WorldModel

  BugchudCore --> RulesetCatalog : owns
  BugchudCore --> CharacterModel : creates
  BugchudCore --> CreatureModel : creates
  BugchudCore --> NpcModel : creates
  BugchudCore --> EncounterModel : creates
  BugchudCore --> CampaignModel : creates
  BugchudCore --> WorldModel : creates
  NpcModel --|> CreatureModel
```

Runtime surface summary:

- `BugchudCore`
  Main app entrypoint. Owns the ruleset, catalog, modules, validation helpers, and model factories.
- `RulesetCatalog`
  Indexed lookup layer over the immutable ruleset.
- `CharacterModel`
  Editing API over `CharacterState`.
- `CreatureModel`
  Base editing API over `CreatureState`.
- `NpcModel`
  `CreatureModel` plus NPC-specific module hook behavior.
- wrappers
  `EncounterModel`, `CampaignModel`, and `WorldModel` are thin convenience wrappers over plain snapshots.
- factories
  `createCharacterState`, `createNpcState`, `createEncounterState`, and related helpers produce plain snapshots directly.
- serialization
  `serializeSnapshot` and `deserializeSnapshot` wrap or unwrap plain state with schema metadata.
- validation
  `core.validate*()` and low-level validators produce structured `ValidationResult` objects.

## Example Usage

```ts
const core = new BugchudCore({ ruleset: importedRuleset });

const character = core.createCharacter({ name: "Selene Ash" });
const npc = core.createNpc({ name: "Roadfang", allegiance: "Raiders" });
const encounter = core.createEncounter({ label: "Road Ambush" });

const race = core.getRace(character.snapshot.identity.raceRef.id);
const options = core.catalog.getCreationOptions({
  originRef: character.snapshot.identity.originRef,
});
```

## Caveats Or Current Limitations

- The root package is focused on creation/edit/validation flows more than full simulation flows.
- Model classes are ergonomic wrappers, not a replacement for plain state persistence.
- Thin wrappers around campaign/world/encounter snapshots intentionally expose a smaller API today than character and NPC models.
