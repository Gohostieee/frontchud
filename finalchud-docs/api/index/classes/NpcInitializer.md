[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / NpcInitializer

# Class: NpcInitializer

Defined in: [npc/initializer.ts:157](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/initializer.ts#L157)

Low-level creature/NPC snapshot initializer used by the app-facing model layer.

## Constructors

### Constructor

```ts
new NpcInitializer(ruleset): NpcInitializer;
```

Defined in: [npc/initializer.ts:158](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/initializer.ts#L158)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ruleset` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) |

#### Returns

`NpcInitializer`

## Methods

### initialize()

```ts
initialize(input?): CreatureState;
```

Defined in: [npc/initializer.ts:161](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/initializer.ts#L161)

Create a plain creature-shaped snapshot from app-supplied input.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`NpcInitializationInput`](../../npc/interfaces/NpcInitializationInput.md) |

#### Returns

[`CreatureState`](../../state/interfaces/CreatureState.md)

***

### createState()

```ts
static createState(ruleset, input?): CreatureState;
```

Defined in: [npc/initializer.ts:238](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/initializer.ts#L238)

Static convenience wrapper around `initialize()`.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ruleset` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) |
| `input` | [`NpcInitializationInput`](../../npc/interfaces/NpcInitializationInput.md) |

#### Returns

[`CreatureState`](../../state/interfaces/CreatureState.md)
