[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [foundation](../index.md) / EntityRef

# Interface: EntityRef\<K\>

Defined in: [foundation/ids.ts:148](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/ids.ts#L148)

A typed pointer into live mutable state.

## Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* [`EntityKind`](../type-aliases/EntityKind.md) |

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-kind"></a> `kind` | `K` | [foundation/ids.ts:149](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/ids.ts#L149) |
| <a id="property-id"></a> `id` | [`EntityIdByKind`](EntityIdByKind.md)\[`K`\] | [foundation/ids.ts:150](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/ids.ts#L150) |
