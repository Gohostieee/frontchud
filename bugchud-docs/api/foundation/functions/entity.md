[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [foundation](../index.md) / entity

# Function: entity()

```ts
function entity<K>(kind, id): EntityRef<K>;
```

Defined in: foundation/builders.ts:22

Create a typed reference into a live runtime entity snapshot.

## Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* [`EntityKind`](../type-aliases/EntityKind.md) |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `kind` | `K` |
| `id` | [`EntityIdByKind`](../interfaces/EntityIdByKind.md)\[`K`\] |

## Returns

[`EntityRef`](../interfaces/EntityRef.md)\<`K`\>
