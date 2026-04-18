[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / serializeSnapshot

# Function: serializeSnapshot()

```ts
function serializeSnapshot<K>(kind, data): SerializedSnapshot<K>;
```

Defined in: [runtime/serialization.ts:48](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/serialization.ts#L48)

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
