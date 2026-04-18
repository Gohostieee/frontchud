[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / CharacterInitializer

# Class: CharacterInitializer

Defined in: [character/initializer.ts:175](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L175)

Low-level character snapshot initializer used by the app-facing model layer.

## Constructors

### Constructor

```ts
new CharacterInitializer(ruleset): CharacterInitializer;
```

Defined in: [character/initializer.ts:176](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L176)

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

Defined in: [character/initializer.ts:179](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L179)

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

Defined in: [character/initializer.ts:294](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L294)

Static convenience wrapper around `initialize()`.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ruleset` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) |
| `input` | [`CharacterInitializationInput`](../../character/interfaces/CharacterInitializationInput.md) |

#### Returns

[`CharacterState`](../../state/interfaces/CharacterState.md)
