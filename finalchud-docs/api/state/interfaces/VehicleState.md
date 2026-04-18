[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / VehicleState

# Interface: VehicleState

Defined in: [state/campaign.ts:19](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L19)

Runtime vehicle instance with current hull, fuel, occupants, and cargo.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id` | [`VehicleStateId`](../../foundation/type-aliases/VehicleStateId.md) | [state/campaign.ts:20](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L20) |
| <a id="property-kind"></a> `kind` | `"vehicleState"` | [state/campaign.ts:21](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L21) |
| <a id="property-vehicleref"></a> `vehicleRef` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"vehicle"`\> | [state/campaign.ts:22](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L22) |
| <a id="property-mountedweaponrefs"></a> `mountedWeaponRefs` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"weapon"`\>[] | [state/campaign.ts:23](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L23) |
| <a id="property-currentfuel"></a> `currentFuel` | `number` | [state/campaign.ts:24](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L24) |
| <a id="property-currentchassis"></a> `currentChassis` | `number` | [state/campaign.ts:25](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L25) |
| <a id="property-occupants"></a> `occupants` | readonly [`EntityRef`](../../foundation/interfaces/EntityRef.md)\<`"character"` \| `"creatureState"`\>[] | [state/campaign.ts:26](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L26) |
| <a id="property-cargo"></a> `cargo` | [`InventoryState`](InventoryState.md) | [state/campaign.ts:27](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L27) |
| <a id="property-extensions"></a> `extensions?` | `Partial`\<`Record`\<`string`, [`JsonObject`](../../foundation/interfaces/JsonObject.md)\>\> | [state/campaign.ts:28](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L28) |
