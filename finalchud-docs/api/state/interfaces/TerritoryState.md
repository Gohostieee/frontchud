[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / TerritoryState

# Interface: TerritoryState

Defined in: [state/campaign.ts:53](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L53)

Runtime territory control slice tying geography to faction and fortress state.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id` | `string` | [state/campaign.ts:54](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L54) |
| <a id="property-regionref"></a> `regionRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"region"`\> | [state/campaign.ts:55](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L55) |
| <a id="property-controllingfactionref"></a> `controllingFactionRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"faction"`\> | [state/campaign.ts:56](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L56) |
| <a id="property-fortressref"></a> `fortressRef?` | [`EntityRef`](../../foundation/interfaces/EntityRef.md)\<`"fortressState"`\> | [state/campaign.ts:57](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L57) |
| <a id="property-tags"></a> `tags?` | readonly `string`[] | [state/campaign.ts:58](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L58) |
