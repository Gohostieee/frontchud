[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / serializeSnapshot

# Function: serializeSnapshot()

```ts
function serializeSnapshot<K>(kind, data): SerializedSnapshot<K>;
```

Defined in: runtime/serialization.ts:48

Wrap a plain snapshot with schema metadata for safe storage or transport.

## Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* [`SnapshotKind`](../type-aliases/SnapshotKind.md) |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `kind` | `K` |
| `data` | [`SnapshotKindMap`](../interfaces/SnapshotKindMap.md)\[`K`\] |

## Returns

[`SerializedSnapshot`](../interfaces/SerializedSnapshot.md)\<`K`\>
