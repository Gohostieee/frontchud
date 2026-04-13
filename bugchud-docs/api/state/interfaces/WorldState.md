[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / WorldState

# Interface: WorldState

Defined in: [state/world.ts:5](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/world.ts#L5)

Mutable world snapshot that can be shared across multiple encounters or campaigns.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id` | [`WorldId`](../../foundation/type-aliases/WorldId.md) | [state/world.ts:6](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/world.ts#L6) |
| <a id="property-kind"></a> `kind` | `"world"` | [state/world.ts:7](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/world.ts#L7) |
| <a id="property-activeregionref"></a> `activeRegionRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"region"`\> | [state/world.ts:8](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/world.ts#L8) |
| <a id="property-activefactionrefs"></a> `activeFactionRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"faction"`\>[] | [state/world.ts:9](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/world.ts#L9) |
| <a id="property-omentags"></a> `omenTags?` | readonly `string`[] | [state/world.ts:10](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/world.ts#L10) |
| <a id="property-discoveredterminologyrefs"></a> `discoveredTerminologyRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"terminology"`\>[] | [state/world.ts:11](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/world.ts#L11) |
| <a id="property-activeweather"></a> `activeWeather?` | `string` | [state/world.ts:12](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/world.ts#L12) |
| <a id="property-notes"></a> `notes?` | readonly `string`[] | [state/world.ts:13](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/world.ts#L13) |
| <a id="property-extensions"></a> `extensions?` | `Partial`\<`Record`\<`string`, [`JsonObject`](../../foundation/interfaces/JsonObject.md)\>\> | [state/world.ts:14](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/world.ts#L14) |
