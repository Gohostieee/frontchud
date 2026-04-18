[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [npc](../index.md) / createCreatureState

# Function: createCreatureState()

```ts
function createCreatureState(ruleset, input?): CreatureState;
```

Defined in: [npc/initializer.ts:250](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/initializer.ts#L250)

Create a plain generic creature snapshot with the default actor kind set to `creature`.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `ruleset` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) |
| `input` | [`NpcInitializationInput`](../interfaces/NpcInitializationInput.md) |

## Returns

[`CreatureState`](../../state/interfaces/CreatureState.md)
