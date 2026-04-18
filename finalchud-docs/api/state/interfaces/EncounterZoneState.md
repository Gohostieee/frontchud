[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / EncounterZoneState

# Interface: EncounterZoneState

Defined in: [state/common.ts:288](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L288)

Runtime encounter zone, using labeled bands rather than exact coordinate math.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id` | `string` | [state/common.ts:289](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L289) |
| <a id="property-label"></a> `label` | `string` | [state/common.ts:290](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L290) |
| <a id="property-band"></a> `band` | `"engaged"` \| `"close"` \| `"near"` \| `"far"` \| `"extreme"` \| `"siege"` | [state/common.ts:291](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L291) |
| <a id="property-connectedzoneids"></a> `connectedZoneIds` | readonly `string`[] | [state/common.ts:292](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L292) |
| <a id="property-tags"></a> `tags?` | readonly `string`[] | [state/common.ts:293](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L293) |
