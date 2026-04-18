[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / validateCharacterState

# Function: validateCharacterState()

```ts
function validateCharacterState(state, ruleset?): ValidationResult;
```

Defined in: [validation/state.ts:612](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/validation/state.ts#L612)

Validate a plain character snapshot, optionally checking refs against a ruleset.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | [`CharacterState`](../../state/interfaces/CharacterState.md) |
| `ruleset?` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) |

## Returns

[`ValidationResult`](../interfaces/ValidationResult.md)
