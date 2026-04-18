[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / LoadoutState

# Interface: LoadoutState

Defined in: [state/common.ts:137](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L137)

What is actually equipped right now, as opposed to simply owned.

`primaryWeaponRef`, `secondaryWeaponRef`, `armorRef`, and `shieldRef` are
projected from the equipped combat stacks in `inventory.items` after every
mutation — do not write them manually. `equippedItemRefs` contains combat
slot refs in slot order (mainHand → offHand → twoHanded → armor) followed by
any legacy non-combat refs (grimoires, relics). Combat refs may repeat when
the same ref is equipped in multiple physical slots (e.g. dual-wielding).

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-primaryweaponref"></a> `primaryWeaponRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"weapon"`\> | [state/common.ts:138](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L138) |
| <a id="property-secondaryweaponref"></a> `secondaryWeaponRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"weapon"`\> | [state/common.ts:139](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L139) |
| <a id="property-armorref"></a> `armorRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"armor"`\> | [state/common.ts:140](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L140) |
| <a id="property-shieldref"></a> `shieldRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"shield"`\> | [state/common.ts:141](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L141) |
| <a id="property-equippeditemrefs"></a> `equippedItemRefs` | readonly [`OwnedDefinitionRef`](../type-aliases/OwnedDefinitionRef.md)[] | [state/common.ts:142](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L142) |
| <a id="property-preparedvehicleweaponrefs"></a> `preparedVehicleWeaponRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"weapon"`\>[] | [state/common.ts:143](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L143) |
