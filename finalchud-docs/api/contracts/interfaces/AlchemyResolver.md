[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / AlchemyResolver

# Interface: AlchemyResolver

Defined in: [contracts/resolvers.ts:41](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/resolvers.ts#L41)

Specialized resolver for alchemy and item-use flows.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extends

- [`RuleResolver`](RuleResolver.md)\<`Extract`\<[`GameAction`](../type-aliases/GameAction.md), \{
  `kind`: `"brewAlchemy"` \| `"useItem"`;
\}\>\>

## Properties

| Property | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-supports"></a> `supports` | readonly (`"brewAlchemy"` \| `"useItem"`)[] | [`RuleResolver`](RuleResolver.md).[`supports`](RuleResolver.md#property-supports) | [contracts/resolvers.ts:18](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/resolvers.ts#L18) |

## Methods

### resolve()

```ts
resolve(action, context): ResolutionResult<unknown>;
```

Defined in: [contracts/resolvers.ts:19](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/resolvers.ts#L19)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `action` | \| [`BrewAlchemyAction`](BrewAlchemyAction.md) \| [`UseItemAction`](UseItemAction.md) |
| `context` | [`RuleContext`](RuleContext.md) |

#### Returns

[`ResolutionResult`](ResolutionResult.md)\<`unknown`\>

#### Inherited from

[`RuleResolver`](RuleResolver.md).[`resolve`](RuleResolver.md#resolve)
