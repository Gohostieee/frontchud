[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / CastSpellAction

# Interface: CastSpellAction

Defined in: [contracts/actions.ts:190](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L190)

Black-magick casting action.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extends

- [`BaseGameAction`](BaseGameAction.md)

## Properties

| Property | Type | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-id"></a> `id` | `string` | - | [`BaseGameAction`](BaseGameAction.md).[`id`](BaseGameAction.md#property-id) | [contracts/actions.ts:140](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L140) |
| <a id="property-notes"></a> `notes?` | readonly `string`[] | - | [`BaseGameAction`](BaseGameAction.md).[`notes`](BaseGameAction.md#property-notes) | [contracts/actions.ts:152](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L152) |
| <a id="property-kind"></a> `kind` | `"castSpell"` | [`BaseGameAction`](BaseGameAction.md).[`kind`](BaseGameAction.md#property-kind) | - | [contracts/actions.ts:191](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L191) |
| <a id="property-actor"></a> `actor` | [`EntityRef`](../../foundation/interfaces/EntityRef.md)\<`"character"` \| `"creatureState"`\> | [`BaseGameAction`](BaseGameAction.md).[`actor`](BaseGameAction.md#property-actor) | - | [contracts/actions.ts:192](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L192) |
| <a id="property-spellref"></a> `spellRef` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"spell"`\> | - | - | [contracts/actions.ts:193](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L193) |
| <a id="property-target"></a> `target` | [`TargetSelector`](../../foundation/interfaces/TargetSelector.md) | [`BaseGameAction`](BaseGameAction.md).[`target`](BaseGameAction.md#property-target) | - | [contracts/actions.ts:194](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L194) |
