[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [foundation](../index.md) / toRefs

# Function: toRefs()

```ts
function toRefs<K, Entry>(entries): readonly RegistryRef<K>[];
```

Defined in: [foundation/builders.ts:52](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/builders.ts#L52)

Convert registry entries to typed refs in one pass.

## Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* [`DefinitionKind`](../type-aliases/DefinitionKind.md) |
| `Entry` *extends* [`RegistryEntry`](../interfaces/RegistryEntry.md)\<`K`\> |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `entries` | readonly `Entry`[] |

## Returns

readonly [`RegistryRef`](../interfaces/RegistryRef.md)\<`K`\>[]
