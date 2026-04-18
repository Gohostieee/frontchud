[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [foundation](../index.md) / RegistryEntry

# Interface: RegistryEntry\<K\>

Defined in: [foundation/meta.ts:72](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L72)

Minimal naming contract shared by most authored definitions.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extends

- [`NamedNode`](NamedNode.md).[`SourceTagged`](SourceTagged.md)

### Extended by

- [`BaseTaggedDefinition`](../../content/interfaces/BaseTaggedDefinition.md)

## Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* [`DefinitionKind`](../type-aliases/DefinitionKind.md) |

## Properties

| Property | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-name"></a> `name` | `string` | [`NamedNode`](NamedNode.md).[`name`](NamedNode.md#property-name) | [foundation/meta.ts:60](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L60) |
| <a id="property-slug"></a> `slug` | `string` | [`NamedNode`](NamedNode.md).[`slug`](NamedNode.md#property-slug) | [foundation/meta.ts:61](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L61) |
| <a id="property-summary"></a> `summary` | `string` | [`NamedNode`](NamedNode.md).[`summary`](NamedNode.md#property-summary) | [foundation/meta.ts:62](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L62) |
| <a id="property-description"></a> `description?` | `string` | [`NamedNode`](NamedNode.md).[`description`](NamedNode.md#property-description) | [foundation/meta.ts:63](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L63) |
| <a id="property-tags"></a> `tags` | readonly `string`[] | [`SourceTagged`](SourceTagged.md).[`tags`](SourceTagged.md#property-tags) | [foundation/meta.ts:68](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L68) |
| <a id="property-source"></a> `source` | [`SourceTrace`](SourceTrace.md) | [`SourceTagged`](SourceTagged.md).[`source`](SourceTagged.md#property-source) | [foundation/meta.ts:69](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L69) |
| <a id="property-kind"></a> `kind` | `K` | - | [foundation/meta.ts:73](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L73) |
| <a id="property-id"></a> `id` | [`DefinitionIdByKind`](DefinitionIdByKind.md)\[`K`\] | - | [foundation/meta.ts:74](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L74) |
