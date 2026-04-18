[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / CombatResolver

# Interface: CombatResolver

Defined in: [contracts/resolvers.ts:33](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/resolvers.ts#L33)

Specialized resolver for tactical combat actions.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extends

- [`RuleResolver`](RuleResolver.md)\<`Extract`\<[`GameAction`](../type-aliases/GameAction.md), \{
  `kind`: `"makeAttack"` \| `"moveActor"`;
\}\>\>

## Properties

| Property | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-supports"></a> `supports` | readonly (`"makeAttack"` \| `"moveActor"`)[] | [`RuleResolver`](RuleResolver.md).[`supports`](RuleResolver.md#property-supports) | [contracts/resolvers.ts:18](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/resolvers.ts#L18) |

## Methods

### resolve()

```ts
resolve(action, context): ResolutionResult<unknown>;
```

Defined in: [contracts/resolvers.ts:19](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/resolvers.ts#L19)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `action` | \| [`MakeAttackAction`](MakeAttackAction.md) \| [`MoveActorAction`](MoveActorAction.md) |
| `context` | [`RuleContext`](RuleContext.md) |

#### Returns

[`ResolutionResult`](ResolutionResult.md)\<`unknown`\>

#### Inherited from

[`RuleResolver`](RuleResolver.md).[`resolve`](RuleResolver.md#resolve)

***

### resolveDamage()

```ts
resolveDamage(action, context): DamageResolution;
```

Defined in: [contracts/resolvers.ts:34](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/resolvers.ts#L34)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `action` | [`MakeAttackAction`](MakeAttackAction.md) |
| `context` | [`RuleContext`](RuleContext.md) |

#### Returns

[`DamageResolution`](DamageResolution.md)
