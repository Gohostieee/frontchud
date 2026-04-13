[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / deserializeSnapshot

# Function: deserializeSnapshot()

```ts
function deserializeSnapshot<K>(kind, payload): SnapshotKindMap[K];
```

Defined in: runtime/serialization.ts:64

Parse and validate a serialized snapshot envelope.

The helper accepts either a raw object or a JSON string and throws if the
schema id, kind, version, or payload shape boundary is invalid.

## Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* [`SnapshotKind`](../type-aliases/SnapshotKind.md) |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `kind` | `K` |
| `payload` | `unknown` |

## Returns

[`SnapshotKindMap`](../interfaces/SnapshotKindMap.md)\[`K`\]
