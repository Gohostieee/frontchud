# Getting Started

## What This Is

This guide shows the recommended first integration for an application using `@bugchud/core`.

## When An App Should Use It

Use this guide when bootstrapping a new project, wiring the package into a UI, or deciding which imports should be your default starting point.

## Important Related Types And Classes

- `BugchudCore`
- `importedRuleset`
- `CharacterModel`
- `NpcModel`
- `ValidationResult`

## How It Connects To The Rest Of The Library

The fastest path into the library is:

1. import a ruleset
2. create one `BugchudCore`
3. create or rehydrate models through that core
4. persist plain snapshots, not class instances

## Example Usage

```ts
import { BugchudCore } from "@bugchud/core";
import { importedRuleset } from "@bugchud/core/data";

const core = new BugchudCore({ ruleset: importedRuleset });

const character = core.createCharacter({
  name: "Selene Ash",
  currentFate: 1,
});

const npc = core.createNpc({
  name: "Roadfang",
  allegiance: "Raiders",
});

const combatDraft = character.getCombatProfileDraft();
const issues = character.getIssues();
```

Recommended app defaults:

- keep one shared `BugchudCore` per loaded ruleset
- use model classes for editing
- use `toState()` or `toJSON()` when crossing persistence boundaries
- use `RulesetCatalog` through `core.catalog` for lookup/query work

## Caveats Or Current Limitations

- The imported data package is intentionally heavy. If you ship a custom ruleset loader, you do not have to depend on `@bugchud/core/data`.
- Not every simulator-facing interface is fully implemented yet; the runtime editing layer is more complete than the engine layer.
