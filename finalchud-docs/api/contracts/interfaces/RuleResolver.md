[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / RuleResolver

# Interface: RuleResolver\<Action, View\>

Defined in: [contracts/resolvers.ts:17](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/resolvers.ts#L17)

Resolver interfaces define where concrete rule logic will eventually live.

The package does not implement these yet; it only fixes the shape of the work
each subsystem resolver is expected to perform.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extended by

- [`CheckResolver`](CheckResolver.md)
- [`SaveResolver`](SaveResolver.md)
- [`CombatResolver`](CombatResolver.md)
- [`SpellResolver`](SpellResolver.md)
- [`AlchemyResolver`](AlchemyResolver.md)
- [`ProgressionResolver`](ProgressionResolver.md)
- [`MutationResolver`](MutationResolver.md)
- [`EncounterResolver`](EncounterResolver.md)
- [`CampaignResolver`](CampaignResolver.md)

## Type Parameters

| Type Parameter |
| ------ |
| `Action` *extends* [`GameAction`](../type-aliases/GameAction.md) |
| `View` |

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-supports"></a> `supports` | readonly `Action`\[`"kind"`\][] | [contracts/resolvers.ts:18](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/resolvers.ts#L18) |

## Methods

### resolve()

```ts
resolve(action, context): ResolutionResult<View>;
```

Defined in: [contracts/resolvers.ts:19](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/resolvers.ts#L19)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `action` | `Action` |
| `context` | [`RuleContext`](RuleContext.md) |

#### Returns

[`ResolutionResult`](ResolutionResult.md)\<`View`\>
