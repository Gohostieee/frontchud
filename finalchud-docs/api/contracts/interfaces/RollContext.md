[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / RollContext

# Interface: RollContext

Defined in: [contracts/actions.ts:72](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L72)

Narrow roll context passed to check/save resolvers.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-actor"></a> `actor` | [`EntityRef`](../../foundation/interfaces/EntityRef.md)\<`"character"` \| `"creatureState"` \| `"vehicleState"` \| `"warbandState"`\> | [contracts/actions.ts:73](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L73) |
| <a id="property-purpose"></a> `purpose` | `string` | [contracts/actions.ts:74](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L74) |
| <a id="property-targetnumber"></a> `targetNumber?` | `number` | [contracts/actions.ts:75](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L75) |
| <a id="property-attribute"></a> `attribute?` | `"twitch"` \| `"flesh"` \| `"mojo"` \| `"glory"` | [contracts/actions.ts:76](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L76) |
| <a id="property-savetype"></a> `saveType?` | `"death"` \| `"physique"` \| `"dodge"` \| `"magick"` \| `"zealotry"` | [contracts/actions.ts:77](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L77) |
| <a id="property-expressiondescription"></a> `expressionDescription` | `string` | [contracts/actions.ts:78](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L78) |
| <a id="property-advantagestate"></a> `advantageState?` | `"advantage"` \| `"disadvantage"` \| `"normal"` | [contracts/actions.ts:79](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L79) |
