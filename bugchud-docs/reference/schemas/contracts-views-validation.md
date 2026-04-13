# Contracts, Views, And Validation

## What This Is

This page explains the public schema families that sit around the core content/state model: simulator contracts, computed views, and structured validation results.

## When An App Should Use It

Use this page when integrating a combat UI, drafting a simulator boundary, or handling validation feedback in tooling and persistence flows.

## Important Related Types And Classes

- `GameAction`
- `GameEvent`
- `RuleResolver`
- `ComputedCombatProfile`
- `AttackOptionView`
- `ValidationIssue`
- `ValidationResult`

## How It Connects To The Rest Of The Library

- `contracts`
  Describe actions, events, deltas, resolutions, and resolver interfaces for a future engine boundary.
- `views`
  Turn state plus ruleset into display-ready or combat-ready read models.
- `validation`
  Report issues with paths, severities, and suggestions.

Relationship rules:

- contracts are not the same as runtime editing models
- views are computed outputs, not persisted source of truth
- validation is orthogonal and can run over rulesets, state, or modules

## Example Usage

```ts
const draft = character.getCombatProfileDraft();
const validation = core.validateCharacter(character.toState());

if (!validation.ok) {
  console.log(validation.issues);
}
```

For engine work, a downstream system could implement resolver interfaces from `contracts` while still using the same content, state, and validation layers.

## Caveats Or Current Limitations

- `contracts` describe a simulator boundary, but the library does not yet ship a full concrete simulator.
- current view calculators focus on combat-facing draft projections and are intentionally lightweight.
- validation reports structure and integrity issues, but downstream apps may still want additional project-specific policy rules.
