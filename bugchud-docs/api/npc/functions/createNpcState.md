[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [npc](../index.md) / createNpcState

# Function: createNpcState()

```ts
function createNpcState(ruleset, input?): CreatureState;
```

Defined in: npc/initializer.ts:193

Create a plain NPC snapshot with the default actor kind set to `npc`.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `ruleset` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) |
| `input` | [`NpcInitializationInput`](../interfaces/NpcInitializationInput.md) |

## Returns

[`CreatureState`](../../state/interfaces/CreatureState.md)
