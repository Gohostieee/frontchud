[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [content](../index.md) / NpcLoadoutDefinition

# Interface: NpcLoadoutDefinition

Defined in: [content/gm.ts:29](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/gm.ts#L29)

Reusable NPC package that shares the same combat template language as creatures and players.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extends

- [`BaseTaggedDefinition`](BaseTaggedDefinition.md)\<`"npcLoadout"`\>

## Properties

| Property | Type | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-aliases"></a> `aliases?` | readonly `string`[] | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`aliases`](BaseTaggedDefinition.md#property-aliases) | [content/common.ts:248](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L248) |
| <a id="property-requirements"></a> `requirements?` | readonly [`RulePrerequisite`](../type-aliases/RulePrerequisite.md)[] | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`requirements`](BaseTaggedDefinition.md#property-requirements) | [content/common.ts:249](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L249) |
| <a id="property-grants"></a> `grants?` | readonly [`GrantedCapability`](../type-aliases/GrantedCapability.md)[] | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`grants`](BaseTaggedDefinition.md#property-grants) | [content/common.ts:250](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L250) |
| <a id="property-id"></a> `id` | [`NpcLoadoutId`](../../foundation/type-aliases/NpcLoadoutId.md) | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`id`](BaseTaggedDefinition.md#property-id) | - | [content/gm.ts:30](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/gm.ts#L30) |
| <a id="property-role"></a> `role` | `string` | - | - | [content/gm.ts:31](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/gm.ts#L31) |
| <a id="property-combattemplate"></a> `combatTemplate` | [`CombatantProfileTemplate`](CombatantProfileTemplate.md) | - | - | [content/gm.ts:32](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/gm.ts#L32) |
| <a id="property-gear"></a> `gear` | readonly [`OwnershipGrant`](OwnershipGrant.md)[] | - | - | [content/gm.ts:33](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/gm.ts#L33) |
| <a id="property-spellrefs"></a> `spellRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"spell"`\>[] | - | - | [content/gm.ts:34](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/gm.ts#L34) |
| <a id="property-faithrefs"></a> `faithRefs?` | readonly ( \| [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"relic"`\> \| [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"patron"`\> \| [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"boon"`\> \| [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"covenant"`\>)[] | - | - | [content/gm.ts:35](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/gm.ts#L35) |
| <a id="property-name"></a> `name` | `string` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`name`](BaseTaggedDefinition.md#property-name) | [foundation/meta.ts:60](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L60) |
| <a id="property-slug"></a> `slug` | `string` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`slug`](BaseTaggedDefinition.md#property-slug) | [foundation/meta.ts:61](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L61) |
| <a id="property-summary"></a> `summary` | `string` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`summary`](BaseTaggedDefinition.md#property-summary) | [foundation/meta.ts:62](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L62) |
| <a id="property-description"></a> `description?` | `string` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`description`](BaseTaggedDefinition.md#property-description) | [foundation/meta.ts:63](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L63) |
| <a id="property-tags"></a> `tags` | readonly `string`[] | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`tags`](BaseTaggedDefinition.md#property-tags) | [foundation/meta.ts:68](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L68) |
| <a id="property-source"></a> `source` | [`SourceTrace`](../../foundation/interfaces/SourceTrace.md) | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`source`](BaseTaggedDefinition.md#property-source) | [foundation/meta.ts:69](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L69) |
| <a id="property-kind"></a> `kind` | `"npcLoadout"` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`kind`](BaseTaggedDefinition.md#property-kind) | [foundation/meta.ts:73](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L73) |
