[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / SpellResolver

# Interface: SpellResolver

Defined in: [contracts/resolvers.ts:38](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/resolvers.ts#L38)

Specialized resolver for spellcasting.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extends

- [`RuleResolver`](RuleResolver.md)\<`Extract`\<[`GameAction`](../type-aliases/GameAction.md), \{
  `kind`: `"castSpell"`;
\}\>\>

## Properties

| Property | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-supports"></a> `supports` | readonly `"castSpell"`[] | [`RuleResolver`](RuleResolver.md).[`supports`](RuleResolver.md#property-supports) | [contracts/resolvers.ts:18](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/resolvers.ts#L18) |

## Methods

### resolve()

```ts
resolve(action, context): ResolutionResult<unknown>;
```

Defined in: [contracts/resolvers.ts:19](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/resolvers.ts#L19)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `action` | [`CastSpellAction`](CastSpellAction.md) |
| `context` | [`RuleContext`](RuleContext.md) |

#### Returns

[`ResolutionResult`](ResolutionResult.md)\<`unknown`\>

#### Inherited from

[`RuleResolver`](RuleResolver.md).[`resolve`](RuleResolver.md#resolve)
