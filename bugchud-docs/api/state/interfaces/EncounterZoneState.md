[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / EncounterZoneState

# Interface: EncounterZoneState

Defined in: [state/common.ts:210](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L210)

Runtime encounter zone, using labeled bands rather than exact coordinate math.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id` | `string` | [state/common.ts:211](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L211) |
| <a id="property-label"></a> `label` | `string` | [state/common.ts:212](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L212) |
| <a id="property-band"></a> `band` | `"engaged"` \| `"close"` \| `"near"` \| `"far"` \| `"extreme"` \| `"siege"` | [state/common.ts:213](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L213) |
| <a id="property-connectedzoneids"></a> `connectedZoneIds` | readonly `string`[] | [state/common.ts:214](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L214) |
| <a id="property-tags"></a> `tags?` | readonly `string`[] | [state/common.ts:215](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L215) |
