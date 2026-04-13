[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / BrewAlchemyAction

# Interface: BrewAlchemyAction

Defined in: [contracts/actions.ts:198](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L198)

Crafting/brewing action for alchemy outputs.

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
| <a id="property-kind"></a> `kind` | `"brewAlchemy"` | [`BaseGameAction`](BaseGameAction.md).[`kind`](BaseGameAction.md#property-kind) | - | [contracts/actions.ts:199](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L199) |
| <a id="property-actor"></a> `actor` | [`EntityRef`](../../foundation/interfaces/EntityRef.md)\<`"character"`\> | [`BaseGameAction`](BaseGameAction.md).[`actor`](BaseGameAction.md#property-actor) | - | [contracts/actions.ts:200](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L200) |
| <a id="property-reciperef"></a> `recipeRef` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"alchemyRecipe"`\> | - | - | [contracts/actions.ts:201](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L201) |
| <a id="property-quantity"></a> `quantity` | `number` | - | - | [contracts/actions.ts:202](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L202) |
