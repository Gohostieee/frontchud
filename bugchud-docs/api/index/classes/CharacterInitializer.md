[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / CharacterInitializer

# Class: CharacterInitializer

Defined in: character/initializer.ts:191

Low-level character snapshot initializer used by the app-facing model layer.

## Constructors

### Constructor

```ts
new CharacterInitializer(ruleset): CharacterInitializer;
```

Defined in: character/initializer.ts:192

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ruleset` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) |

#### Returns

`CharacterInitializer`

## Methods

### initialize()

```ts
initialize(input?): CharacterState;
```

Defined in: character/initializer.ts:195

Create a plain `CharacterState` from app-supplied creation input.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`CharacterInitializationInput`](../../character/interfaces/CharacterInitializationInput.md) |

#### Returns

[`CharacterState`](../../state/interfaces/CharacterState.md)

***

### createState()

```ts
static createState(ruleset, input?): CharacterState;
```

Defined in: character/initializer.ts:299

Static convenience wrapper around `initialize()`.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ruleset` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) |
| `input` | [`CharacterInitializationInput`](../../character/interfaces/CharacterInitializationInput.md) |

#### Returns

[`CharacterState`](../../state/interfaces/CharacterState.md)
