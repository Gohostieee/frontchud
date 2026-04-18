[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [foundation](../index.md) / toRegistry

# Function: toRegistry()

```ts
function toRegistry<K, Entry>(entries): Registry<K, Entry>;
```

Defined in: [foundation/builders.ts:46](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/builders.ts#L46)

Convert a list of definitions into the canonical typed registry shape.

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

[`Registry`](../type-aliases/Registry.md)\<`K`, `Entry`\>
