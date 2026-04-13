[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / validateCharacterState

# Function: validateCharacterState()

```ts
function validateCharacterState(state, ruleset?): ValidationResult;
```

Defined in: validation/state.ts:105

Validate a plain character snapshot, optionally checking refs against a ruleset.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | [`CharacterState`](../../state/interfaces/CharacterState.md) |
| `ruleset?` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) |

## Returns

[`ValidationResult`](../interfaces/ValidationResult.md)
