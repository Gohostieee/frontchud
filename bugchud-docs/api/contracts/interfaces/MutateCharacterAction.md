[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / MutateCharacterAction

# Interface: MutateCharacterAction

Defined in: [contracts/actions.ts:234](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L234)

Trigger Xom/mutation flow on a character or creature.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extends

- [`BaseGameAction`](BaseGameAction.md)

## Properties

| Property | Type | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-id"></a> `id` | `string` | - | [`BaseGameAction`](BaseGameAction.md).[`id`](BaseGameAction.md#property-id) | [contracts/actions.ts:140](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L140) |
| <a id="property-target"></a> `target?` | [`TargetSelector`](../../foundation/interfaces/TargetSelector.md) | - | [`BaseGameAction`](BaseGameAction.md).[`target`](BaseGameAction.md#property-target) | [contracts/actions.ts:151](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L151) |
| <a id="property-notes"></a> `notes?` | readonly `string`[] | - | [`BaseGameAction`](BaseGameAction.md).[`notes`](BaseGameAction.md#property-notes) | [contracts/actions.ts:152](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L152) |
| <a id="property-kind"></a> `kind` | `"mutateCharacter"` | [`BaseGameAction`](BaseGameAction.md).[`kind`](BaseGameAction.md#property-kind) | - | [contracts/actions.ts:235](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L235) |
| <a id="property-actor"></a> `actor` | [`EntityRef`](../../foundation/interfaces/EntityRef.md)\<`"character"` \| `"creatureState"`\> | [`BaseGameAction`](BaseGameAction.md).[`actor`](BaseGameAction.md#property-actor) | - | [contracts/actions.ts:236](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L236) |
| <a id="property-xomincrease"></a> `xomIncrease` | `number` | - | - | [contracts/actions.ts:237](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L237) |
| <a id="property-forcedmutationref"></a> `forcedMutationRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"mutation"`\> | - | - | [contracts/actions.ts:238](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L238) |
