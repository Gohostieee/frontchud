[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / EncounterInitializationInput

# Interface: EncounterInitializationInput

Defined in: [runtime/factories.ts:15](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/factories.ts#L15)

Initialization input for a fresh encounter snapshot.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id?` | [`EncounterId`](../../foundation/type-aliases/EncounterId.md) | [runtime/factories.ts:16](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/factories.ts#L16) |
| <a id="property-label"></a> `label?` | `string` | [runtime/factories.ts:17](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/factories.ts#L17) |
| <a id="property-actors"></a> `actors?` | readonly [`EncounterActorState`](../../state/interfaces/EncounterActorState.md)[] | [runtime/factories.ts:18](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/factories.ts#L18) |
| <a id="property-zoneids"></a> `zoneIds?` | readonly `string`[] | [runtime/factories.ts:19](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/factories.ts#L19) |
| <a id="property-extensions"></a> `extensions?` | `Partial`\<`Record`\<`string`, [`JsonObject`](../../foundation/interfaces/JsonObject.md)\>\> | [runtime/factories.ts:20](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/factories.ts#L20) |
