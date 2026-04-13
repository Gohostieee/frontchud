[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [content](../index.md) / OriginDefinition

# Interface: OriginDefinition

Defined in: [content/character.ts:36](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/character.ts#L36)

Authored homeland/origin entry that constrains background and dream flavor.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extends

- [`BaseTaggedDefinition`](BaseTaggedDefinition.md)\<`"origin"`\>

## Properties

| Property | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-group"></a> `group` | `"pseudoCivilized"` \| `"barbaric"` \| `"darklands"` | - | [content/character.ts:37](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/character.ts#L37) |
| <a id="property-startingdreamrefs"></a> `startingDreamRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"dream"`\>[] | - | [content/character.ts:38](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/character.ts#L38) |
| <a id="property-availablebackgroundrefs"></a> `availableBackgroundRefs` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"background"`\>[] | - | [content/character.ts:39](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/character.ts#L39) |
| <a id="property-homelandtags"></a> `homelandTags` | readonly `string`[] | - | [content/character.ts:40](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/character.ts#L40) |
| <a id="property-startinglanguages"></a> `startingLanguages?` | readonly `string`[] | - | [content/character.ts:41](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/character.ts#L41) |
| <a id="property-aliases"></a> `aliases?` | readonly `string`[] | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`aliases`](BaseTaggedDefinition.md#property-aliases) | [content/common.ts:248](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L248) |
| <a id="property-requirements"></a> `requirements?` | readonly [`RulePrerequisite`](../type-aliases/RulePrerequisite.md)[] | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`requirements`](BaseTaggedDefinition.md#property-requirements) | [content/common.ts:249](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L249) |
| <a id="property-grants"></a> `grants?` | readonly [`GrantedCapability`](../type-aliases/GrantedCapability.md)[] | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`grants`](BaseTaggedDefinition.md#property-grants) | [content/common.ts:250](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L250) |
| <a id="property-name"></a> `name` | `string` | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`name`](BaseTaggedDefinition.md#property-name) | [foundation/meta.ts:60](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L60) |
| <a id="property-slug"></a> `slug` | `string` | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`slug`](BaseTaggedDefinition.md#property-slug) | [foundation/meta.ts:61](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L61) |
| <a id="property-summary"></a> `summary` | `string` | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`summary`](BaseTaggedDefinition.md#property-summary) | [foundation/meta.ts:62](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L62) |
| <a id="property-description"></a> `description?` | `string` | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`description`](BaseTaggedDefinition.md#property-description) | [foundation/meta.ts:63](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L63) |
| <a id="property-tags"></a> `tags` | readonly `string`[] | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`tags`](BaseTaggedDefinition.md#property-tags) | [foundation/meta.ts:68](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L68) |
| <a id="property-source"></a> `source` | [`SourceTrace`](../../foundation/interfaces/SourceTrace.md) | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`source`](BaseTaggedDefinition.md#property-source) | [foundation/meta.ts:69](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L69) |
| <a id="property-kind"></a> `kind` | `"origin"` | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`kind`](BaseTaggedDefinition.md#property-kind) | [foundation/meta.ts:73](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L73) |
| <a id="property-id"></a> `id` | [`OriginId`](../../foundation/type-aliases/OriginId.md) | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`id`](BaseTaggedDefinition.md#property-id) | [foundation/meta.ts:74](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L74) |
