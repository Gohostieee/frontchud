[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / MakeAttackAction

# Interface: MakeAttackAction

Defined in: [contracts/actions.ts:172](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L172)

Ask the engine to resolve an attack from gear, spell, or similar offensive source.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extends

- [`BaseGameAction`](BaseGameAction.md)

## Properties

| Property | Type | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-id"></a> `id` | `string` | - | [`BaseGameAction`](BaseGameAction.md).[`id`](BaseGameAction.md#property-id) | [contracts/actions.ts:140](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L140) |
| <a id="property-notes"></a> `notes?` | readonly `string`[] | - | [`BaseGameAction`](BaseGameAction.md).[`notes`](BaseGameAction.md#property-notes) | [contracts/actions.ts:152](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L152) |
| <a id="property-kind"></a> `kind` | `"makeAttack"` | [`BaseGameAction`](BaseGameAction.md).[`kind`](BaseGameAction.md#property-kind) | - | [contracts/actions.ts:173](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L173) |
| <a id="property-actor"></a> `actor` | [`EntityRef`](../../foundation/interfaces/EntityRef.md)\<`"character"` \| `"creatureState"` \| `"vehicleState"` \| `"warbandState"`\> | [`BaseGameAction`](BaseGameAction.md).[`actor`](BaseGameAction.md#property-actor) | - | [contracts/actions.ts:174](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L174) |
| <a id="property-target"></a> `target` | [`TargetSelector`](../../foundation/interfaces/TargetSelector.md) | [`BaseGameAction`](BaseGameAction.md).[`target`](BaseGameAction.md#property-target) | - | [contracts/actions.ts:175](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L175) |
| <a id="property-attacklabel"></a> `attackLabel` | `string` | - | - | [contracts/actions.ts:176](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L176) |
| <a id="property-weaponref"></a> `weaponRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"weapon"`\> | - | - | [contracts/actions.ts:177](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L177) |
| <a id="property-spellref"></a> `spellRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"spell"`\> | - | - | [contracts/actions.ts:178](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L178) |
