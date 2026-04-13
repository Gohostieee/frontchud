[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / NpcInitializer

# Class: NpcInitializer

Defined in: npc/initializer.ts:114

Low-level creature/NPC snapshot initializer used by the app-facing model layer.

## Constructors

### Constructor

```ts
new NpcInitializer(ruleset): NpcInitializer;
```

Defined in: npc/initializer.ts:115

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

Defined in: npc/initializer.ts:118

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

Defined in: npc/initializer.ts:187

Static convenience wrapper around `initialize()`.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ruleset` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) |
| `input` | [`NpcInitializationInput`](../../npc/interfaces/NpcInitializationInput.md) |

#### Returns

[`CreatureState`](../../state/interfaces/CreatureState.md)
