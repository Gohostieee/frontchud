[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [foundation](../index.md) / ref

# Function: ref()

```ts
function ref<K>(kind, id): RegistryRef<K>;
```

Defined in: [foundation/builders.ts:16](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/builders.ts#L16)

Create a typed reference into an immutable authored registry.

## Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* [`DefinitionKind`](../type-aliases/DefinitionKind.md) |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `kind` | `K` |
| `id` | [`DefinitionIdByKind`](../interfaces/DefinitionIdByKind.md)\[`K`\] |

## Returns

[`RegistryRef`](../interfaces/RegistryRef.md)\<`K`\>
