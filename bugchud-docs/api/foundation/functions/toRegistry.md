[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [foundation](../index.md) / toRegistry

# Function: toRegistry()

```ts
function toRegistry<K, Entry>(entries): Registry<K, Entry>;
```

Defined in: foundation/builders.ts:46

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
