[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [character](../index.md) / createCharacterState

# Function: createCharacterState()

```ts
function createCharacterState(ruleset, input?): CharacterState;
```

Defined in: [character/initializer.ts:300](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L300)

Create a plain character snapshot directly from a ruleset plus init input.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `ruleset` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) |
| `input` | [`CharacterInitializationInput`](../interfaces/CharacterInitializationInput.md) |

## Returns

[`CharacterState`](../../state/interfaces/CharacterState.md)
