[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [foundation](../index.md) / OptionalRegistry

# Type Alias: OptionalRegistry\<K, Entry\>

```ts
type OptionalRegistry<K, Entry> = Readonly<Partial<Record<DefinitionIdByKind[K], Entry>>>;
```

Defined in: [foundation/meta.ts:82](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L82)

## Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* [`DefinitionKind`](DefinitionKind.md) |
| `Entry` *extends* [`RegistryEntry`](../interfaces/RegistryEntry.md)\<`K`\> |
