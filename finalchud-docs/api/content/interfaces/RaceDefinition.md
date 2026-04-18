[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [content](../index.md) / RaceDefinition

# Interface: RaceDefinition

Defined in: [content/character.ts:22](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/character.ts#L22)

Authored race/ancestry entry used during character creation.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extends

- [`BaseTaggedDefinition`](BaseTaggedDefinition.md)\<`"race"`\>

## Properties

| Property | Type | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-id"></a> `id` | [`RaceId`](../../foundation/type-aliases/RaceId.md) | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`id`](BaseTaggedDefinition.md#property-id) | - | [content/character.ts:23](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/character.ts#L23) |
| <a id="property-size"></a> `size` | `"medium"` \| `"small"` | - | - | [content/character.ts:24](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/character.ts#L24) |
| <a id="property-baseattributes"></a> `baseAttributes` | `Partial`\<`Record`\<[`AttributeKey`](../../foundation/type-aliases/AttributeKey.md), `number`\>\> | - | - | [content/character.ts:25](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/character.ts#L25) |
| <a id="property-attributegeneration"></a> `attributeGeneration` | `object` | - | - | [content/character.ts:26](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/character.ts#L26) |
| `attributeGeneration.method` | `"rolled"` \| `"array"` \| `"choice"` | - | - | [content/character.ts:27](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/character.ts#L27) |
| `attributeGeneration.notes?` | readonly `string`[] | - | - | [content/character.ts:28](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/character.ts#L28) |
| <a id="property-racialtraits"></a> `racialTraits` | readonly `string`[] | - | - | [content/character.ts:30](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/character.ts#L30) |
| <a id="property-startinglanguages"></a> `startingLanguages` | readonly `string`[] | - | - | [content/character.ts:31](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/character.ts#L31) |
| <a id="property-startinggrants"></a> `startingGrants?` | readonly [`GrantedCapability`](../type-aliases/GrantedCapability.md)[] | - | - | [content/character.ts:32](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/character.ts#L32) |
| <a id="property-aliases"></a> `aliases?` | readonly `string`[] | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`aliases`](BaseTaggedDefinition.md#property-aliases) | [content/common.ts:248](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L248) |
| <a id="property-requirements"></a> `requirements?` | readonly [`RulePrerequisite`](../type-aliases/RulePrerequisite.md)[] | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`requirements`](BaseTaggedDefinition.md#property-requirements) | [content/common.ts:249](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L249) |
| <a id="property-grants"></a> `grants?` | readonly [`GrantedCapability`](../type-aliases/GrantedCapability.md)[] | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`grants`](BaseTaggedDefinition.md#property-grants) | [content/common.ts:250](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L250) |
| <a id="property-name"></a> `name` | `string` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`name`](BaseTaggedDefinition.md#property-name) | [foundation/meta.ts:60](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L60) |
| <a id="property-slug"></a> `slug` | `string` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`slug`](BaseTaggedDefinition.md#property-slug) | [foundation/meta.ts:61](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L61) |
| <a id="property-summary"></a> `summary` | `string` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`summary`](BaseTaggedDefinition.md#property-summary) | [foundation/meta.ts:62](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L62) |
| <a id="property-description"></a> `description?` | `string` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`description`](BaseTaggedDefinition.md#property-description) | [foundation/meta.ts:63](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L63) |
| <a id="property-tags"></a> `tags` | readonly `string`[] | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`tags`](BaseTaggedDefinition.md#property-tags) | [foundation/meta.ts:68](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L68) |
| <a id="property-source"></a> `source` | [`SourceTrace`](../../foundation/interfaces/SourceTrace.md) | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`source`](BaseTaggedDefinition.md#property-source) | [foundation/meta.ts:69](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L69) |
| <a id="property-kind"></a> `kind` | `"race"` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`kind`](BaseTaggedDefinition.md#property-kind) | [foundation/meta.ts:73](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L73) |
