[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / WarbandState

# Interface: WarbandState

Defined in: [state/campaign.ts:40](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L40)

Runtime warband state for campaign-scale movement and conflict.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id` | [`WarbandStateId`](../../foundation/type-aliases/WarbandStateId.md) | [state/campaign.ts:41](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L41) |
| <a id="property-kind"></a> `kind` | `"warbandState"` | [state/campaign.ts:42](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L42) |
| <a id="property-warbandref"></a> `warbandRef` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"warband"`\> | [state/campaign.ts:43](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L43) |
| <a id="property-formation"></a> `formation` | [`FormationState`](FormationState.md) | [state/campaign.ts:44](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L44) |
| <a id="property-unitcount"></a> `unitCount` | `number` | [state/campaign.ts:45](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L45) |
| <a id="property-morale"></a> `morale` | `number` | [state/campaign.ts:46](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L46) |
| <a id="property-supplies"></a> `supplies` | `number` | [state/campaign.ts:47](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L47) |
| <a id="property-vehiclerefs"></a> `vehicleRefs?` | readonly [`EntityRef`](../../foundation/interfaces/EntityRef.md)\<`"vehicleState"`\>[] | [state/campaign.ts:48](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L48) |
| <a id="property-extensions"></a> `extensions?` | `Partial`\<`Record`\<`string`, [`JsonObject`](../../foundation/interfaces/JsonObject.md)\>\> | [state/campaign.ts:49](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L49) |
