[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / BodyPartState

# Interface: BodyPartState

Defined in: [state/common.ts:155](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L155)

One explicitly tracked body part or replacement.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id` | `string` | [state/common.ts:156](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L156) |
| <a id="property-label"></a> `label` | `string` | [state/common.ts:157](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L157) |
| <a id="property-kind"></a> `kind` | `"head"` \| `"torso"` \| `"arm"` \| `"leg"` \| `"appendage"` \| `"organ"` \| `"other"` | [state/common.ts:158](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L158) |
| <a id="property-status"></a> `status` | `"intact"` \| `"wounded"` \| `"impaired"` \| `"lost"` \| `"prosthetic"` | [state/common.ts:159](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L159) |
| <a id="property-woundcount"></a> `woundCount?` | `number` | [state/common.ts:160](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L160) |
| <a id="property-notes"></a> `notes?` | readonly `string`[] | [state/common.ts:161](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L161) |
| <a id="property-tags"></a> `tags?` | readonly `string`[] | [state/common.ts:162](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L162) |
