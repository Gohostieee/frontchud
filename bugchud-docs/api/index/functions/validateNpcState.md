[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / validateNpcState

# Function: validateNpcState()

```ts
function validateNpcState(state, ruleset?): ValidationResult;
```

Defined in: validation/state.ts:222

Validate an NPC snapshot using the same rules as creature snapshots.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | [`NpcState`](../../state/interfaces/NpcState.md) |
| `ruleset?` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) |

## Returns

[`ValidationResult`](../interfaces/ValidationResult.md)
