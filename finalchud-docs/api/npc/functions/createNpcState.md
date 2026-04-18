[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [npc](../index.md) / createNpcState

# Function: createNpcState()

```ts
function createNpcState(ruleset, input?): CreatureState;
```

Defined in: [npc/initializer.ts:244](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/initializer.ts#L244)

Create a plain NPC snapshot with the default actor kind set to `npc`.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `ruleset` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) |
| `input` | [`NpcInitializationInput`](../interfaces/NpcInitializationInput.md) |

## Returns

[`CreatureState`](../../state/interfaces/CreatureState.md)
