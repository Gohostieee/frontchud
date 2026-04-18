# Using The Library In An Application

## What This Is

This guide answers the practical question: which part of the library should application code use for each job?

## When An App Should Use It

Use this page when choosing imports for UI code, persistence code, editor flows, or engine-facing integrations.

## Important Related Types And Classes

- `BugchudCore`
- `RulesetCatalog`
- `CharacterModel`
- `NpcModel`
- `CharacterState`
- `ComputedCombatProfile`
- `ValidationResult`

## How It Connects To The Rest Of The Library

Use this decision matrix as the default:

| Task | Recommended Surface | Why |
| --- | --- | --- |
| Boot the library for an app | `BugchudCore` | It wires ruleset, catalog, modules, validation, and model creation together. |
| Look up authored definitions | `core.catalog` / `RulesetCatalog` | It centralizes typed resolution and indexed queries. |
| Edit characters | `CharacterModel` | It provides mutators, recomputation helpers, validation, and serialization. |
| Edit NPCs and creatures | `NpcModel` / `CreatureModel` | They wrap creature-shaped state and template/loadout behavior. |
| Persist data | `CharacterState`, `CreatureState`, other state interfaces | Plain snapshots are the storage and transport boundary. |
| Compute UI/combat read models | `views` calculators or model helper methods | They derive display/combat data from state plus ruleset. |
| Validate imports or saves | `validation` helpers or `core.validate*()` | They produce structured issues with paths and severities. |
| Build a simulator layer | `contracts` | The contracts package defines action/event/resolution shapes. |
| Ship canonical BUGCHUD content | `@bugchud/core/data` | It provides the imported ruleset and registries. |

Preferred usage rules:

- prefer `BugchudCore` over manually instantiating helper classes all over the app
- prefer `RulesetCatalog` over ad hoc `ruleset.registries.*` traversal
- use models for edits, but plain state for persistence and transport
- use views for projections, not as stored source of truth
- validate before persistence, import, or sync boundaries

## Example Usage

```ts
const core = new BugchudCore({ ruleset: importedRuleset });
const character = core.createCharacter({ name: "Marta Rust" });

character.addDream(importedRuleset.progression.dreamRefs[0]);

const snapshot = character.toState();
const validation = core.validateCharacter(snapshot);
const draft = character.getCombatProfileDraft();
```

## Caveats Or Current Limitations

- `EncounterModel`, `CampaignModel`, and `WorldModel` are intentionally lightweight right now.
- `contracts` define an engine boundary, but they are not a finished combat or spell-resolution engine.
- Some advanced applications may still inspect raw `ruleset.registries`, but the catalog should remain the default integration path.
