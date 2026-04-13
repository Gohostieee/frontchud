[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / validateCreatureState

# Function: validateCreatureState()

```ts
function validateCreatureState(state, ruleset?): ValidationResult;
```

Defined in: validation/state.ts:189

Validate a plain creature snapshot, optionally checking refs against a ruleset.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | [`CreatureState`](../../state/interfaces/CreatureState.md) |
| `ruleset?` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) |

## Returns

[`ValidationResult`](../interfaces/ValidationResult.md)
