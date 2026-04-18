[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / validateCreatureState

# Function: validateCreatureState()

```ts
function validateCreatureState(state, ruleset?): ValidationResult;
```

Defined in: [validation/state.ts:690](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/validation/state.ts#L690)

Validate a plain creature snapshot, optionally checking refs against a ruleset.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | [`CreatureState`](../../state/interfaces/CreatureState.md) |
| `ruleset?` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) |

## Returns

[`ValidationResult`](../interfaces/ValidationResult.md)
