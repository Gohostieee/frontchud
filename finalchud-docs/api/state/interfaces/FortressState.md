[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / FortressState

# Interface: FortressState

Defined in: [state/campaign.ts:62](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L62)

Runtime fortress/stronghold state.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id` | [`FortressStateId`](../../foundation/type-aliases/FortressStateId.md) | [state/campaign.ts:63](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L63) |
| <a id="property-kind"></a> `kind` | `"fortressState"` | [state/campaign.ts:64](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L64) |
| <a id="property-fortressref"></a> `fortressRef` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"fortress"`\> | [state/campaign.ts:65](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L65) |
| <a id="property-garrisonsize"></a> `garrisonSize` | `number` | [state/campaign.ts:66](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L66) |
| <a id="property-durability"></a> `durability` | `number` | [state/campaign.ts:67](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L67) |
| <a id="property-supplies"></a> `supplies` | `number` | [state/campaign.ts:68](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L68) |
| <a id="property-territoryids"></a> `territoryIds` | readonly `string`[] | [state/campaign.ts:69](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L69) |
| <a id="property-extensions"></a> `extensions?` | `Partial`\<`Record`\<`string`, [`JsonObject`](../../foundation/interfaces/JsonObject.md)\>\> | [state/campaign.ts:70](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/campaign.ts#L70) |
