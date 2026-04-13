[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / SerializedSnapshot

# Interface: SerializedSnapshot\<K\>

Defined in: runtime/serialization.ts:40

Envelope written to disk or transport boundaries.

Model classes never cross persistence boundaries directly; they round-trip
through this wrapper so applications can validate schema and version before loading.

## Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* [`SnapshotKind`](../type-aliases/SnapshotKind.md) |

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-schema"></a> `schema` | `"@bugchud/core"` | runtime/serialization.ts:41 |
| <a id="property-kind"></a> `kind` | `K` | runtime/serialization.ts:42 |
| <a id="property-version"></a> `version` | `1` | runtime/serialization.ts:43 |
| <a id="property-data"></a> `data` | [`SnapshotKindMap`](SnapshotKindMap.md)\[`K`\] | runtime/serialization.ts:44 |
