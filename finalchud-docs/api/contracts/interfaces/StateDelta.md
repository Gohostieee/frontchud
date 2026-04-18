[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / StateDelta

# Interface: StateDelta

Defined in: [contracts/actions.ts:41](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L41)

One state mutation applied to one runtime entity after an action resolves.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-entity"></a> `entity` | [`EntityRef`](../../foundation/interfaces/EntityRef.md)\< \| `"character"` \| `"campaign"` \| `"creatureState"` \| `"encounter"` \| `"vehicleState"` \| `"warbandState"` \| `"fortressState"` \| `"world"`\> | [contracts/actions.ts:42](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L42) |
| <a id="property-summary"></a> `summary` | `string` | [contracts/actions.ts:52](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L52) |
| <a id="property-patch"></a> `patch` | readonly [`JsonPatchOperation`](JsonPatchOperation.md)[] | [contracts/actions.ts:53](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L53) |
