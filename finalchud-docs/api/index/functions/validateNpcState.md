[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / validateNpcState

# Function: validateNpcState()

```ts
function validateNpcState(state, ruleset?): ValidationResult;
```

Defined in: [validation/state.ts:725](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/validation/state.ts#L725)

Validate an NPC snapshot using the same rules as creature snapshots.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | [`NpcState`](../../state/interfaces/NpcState.md) |
| `ruleset?` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) |

## Returns

[`ValidationResult`](../interfaces/ValidationResult.md)
