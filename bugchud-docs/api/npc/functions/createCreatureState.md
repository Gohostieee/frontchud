[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [npc](../index.md) / createCreatureState

# Function: createCreatureState()

```ts
function createCreatureState(ruleset, input?): CreatureState;
```

Defined in: npc/initializer.ts:199

Create a plain generic creature snapshot with the default actor kind set to `creature`.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `ruleset` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) |
| `input` | [`NpcInitializationInput`](../interfaces/NpcInitializationInput.md) |

## Returns

[`CreatureState`](../../state/interfaces/CreatureState.md)
