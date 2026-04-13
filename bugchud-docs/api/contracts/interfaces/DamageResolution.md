[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / DamageResolution

# Interface: DamageResolution

Defined in: [contracts/actions.ts:103](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L103)

Result payload for applied damage after mitigation has been considered.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-kind"></a> `kind` | `"damage"` | [contracts/actions.ts:104](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L104) |
| <a id="property-target"></a> `target` | [`EntityRef`](../../foundation/interfaces/EntityRef.md)\< \| `"character"` \| `"creatureState"` \| `"vehicleState"` \| `"warbandState"` \| `"fortressState"`\> | [contracts/actions.ts:105](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L105) |
| <a id="property-packets"></a> `packets` | readonly [`DamagePacket`](../../foundation/interfaces/DamagePacket.md)[] | [contracts/actions.ts:106](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L106) |
| <a id="property-totalapplied"></a> `totalApplied` | `number` | [contracts/actions.ts:107](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L107) |
| <a id="property-totalprevented"></a> `totalPrevented` | `number` | [contracts/actions.ts:108](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L108) |
