[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / LoadoutState

# Interface: LoadoutState

Defined in: [state/common.ts:93](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L93)

What is actually equipped right now, as opposed to simply owned.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-primaryweaponref"></a> `primaryWeaponRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"weapon"`\> | [state/common.ts:94](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L94) |
| <a id="property-secondaryweaponref"></a> `secondaryWeaponRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"weapon"`\> | [state/common.ts:95](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L95) |
| <a id="property-armorref"></a> `armorRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"armor"`\> | [state/common.ts:96](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L96) |
| <a id="property-shieldref"></a> `shieldRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"shield"`\> | [state/common.ts:97](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L97) |
| <a id="property-equippeditemrefs"></a> `equippedItemRefs` | readonly [`OwnedDefinitionRef`](../type-aliases/OwnedDefinitionRef.md)[] | [state/common.ts:98](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L98) |
| <a id="property-preparedvehicleweaponrefs"></a> `preparedVehicleWeaponRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"weapon"`\>[] | [state/common.ts:99](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L99) |
