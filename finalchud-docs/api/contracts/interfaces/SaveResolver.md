[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / SaveResolver

# Interface: SaveResolver

Defined in: [contracts/resolvers.ts:28](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/resolvers.ts#L28)

Specialized resolver for saves.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extends

- [`RuleResolver`](RuleResolver.md)\<`Extract`\<[`GameAction`](../type-aliases/GameAction.md), \{
  `kind`: `"rollSave"`;
\}\>\>

## Properties

| Property | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-supports"></a> `supports` | readonly `"rollSave"`[] | [`RuleResolver`](RuleResolver.md).[`supports`](RuleResolver.md#property-supports) | [contracts/resolvers.ts:18](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/resolvers.ts#L18) |

## Methods

### resolve()

```ts
resolve(action, context): ResolutionResult<unknown>;
```

Defined in: [contracts/resolvers.ts:19](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/resolvers.ts#L19)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `action` | [`RollSaveAction`](RollSaveAction.md) |
| `context` | [`RuleContext`](RuleContext.md) |

#### Returns

[`ResolutionResult`](ResolutionResult.md)\<`unknown`\>

#### Inherited from

[`RuleResolver`](RuleResolver.md).[`resolve`](RuleResolver.md#resolve)

***

### resolveSave()

```ts
resolveSave(context, rules): SaveResolution;
```

Defined in: [contracts/resolvers.ts:29](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/resolvers.ts#L29)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | [`RollContext`](RollContext.md) |
| `rules` | [`RuleContext`](RuleContext.md) |

#### Returns

[`SaveResolution`](SaveResolution.md)
