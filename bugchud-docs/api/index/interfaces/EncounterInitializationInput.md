[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / EncounterInitializationInput

# Interface: EncounterInitializationInput

Defined in: runtime/factories.ts:15

Initialization input for a fresh encounter snapshot.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id?` | [`EncounterId`](../../foundation/type-aliases/EncounterId.md) | runtime/factories.ts:16 |
| <a id="property-label"></a> `label?` | `string` | runtime/factories.ts:17 |
| <a id="property-actors"></a> `actors?` | readonly [`EncounterActorState`](../../state/interfaces/EncounterActorState.md)[] | runtime/factories.ts:18 |
| <a id="property-zoneids"></a> `zoneIds?` | readonly `string`[] | runtime/factories.ts:19 |
| <a id="property-extensions"></a> `extensions?` | `Partial`\<`Record`\<`string`, [`JsonObject`](../../foundation/interfaces/JsonObject.md)\>\> | runtime/factories.ts:20 |
