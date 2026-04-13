[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / OperateVehicleAction

# Interface: OperateVehicleAction

Defined in: [contracts/actions.ts:242](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L242)

Campaign/encounter vehicle operation action.

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
| <a id="property-kind"></a> `kind` | `"operateVehicle"` | [`BaseGameAction`](BaseGameAction.md).[`kind`](BaseGameAction.md#property-kind) | - | [contracts/actions.ts:243](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L243) |
| <a id="property-actor"></a> `actor` | [`EntityRef`](../../foundation/interfaces/EntityRef.md)\<`"vehicleState"`\> | [`BaseGameAction`](BaseGameAction.md).[`actor`](BaseGameAction.md#property-actor) | - | [contracts/actions.ts:244](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L244) |
| <a id="property-operator"></a> `operator` | [`EntityRef`](../../foundation/interfaces/EntityRef.md)\<`"character"` \| `"creatureState"`\> | - | - | [contracts/actions.ts:245](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L245) |
| <a id="property-maneuver"></a> `maneuver` | `string` | - | - | [contracts/actions.ts:246](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L246) |
