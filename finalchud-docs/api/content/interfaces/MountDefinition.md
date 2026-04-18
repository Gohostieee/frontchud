[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [content](../index.md) / MountDefinition

# Interface: MountDefinition

Defined in: [content/inventory.ts:124](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/inventory.ts#L124)

Mount definition for living transport distinct from mechanized vehicles.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extends

- [`BaseTaggedDefinition`](BaseTaggedDefinition.md)\<`"mount"`\>

## Properties

| Property | Type | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-aliases"></a> `aliases?` | readonly `string`[] | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`aliases`](BaseTaggedDefinition.md#property-aliases) | [content/common.ts:248](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L248) |
| <a id="property-requirements"></a> `requirements?` | readonly [`RulePrerequisite`](../type-aliases/RulePrerequisite.md)[] | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`requirements`](BaseTaggedDefinition.md#property-requirements) | [content/common.ts:249](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L249) |
| <a id="property-grants"></a> `grants?` | readonly [`GrantedCapability`](../type-aliases/GrantedCapability.md)[] | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`grants`](BaseTaggedDefinition.md#property-grants) | [content/common.ts:250](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L250) |
| <a id="property-id"></a> `id` | [`MountId`](../../foundation/type-aliases/MountId.md) | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`id`](BaseTaggedDefinition.md#property-id) | - | [content/inventory.ts:125](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/inventory.ts#L125) |
| <a id="property-movement"></a> `movement` | [`MovementProfile`](MovementProfile.md) | - | - | [content/inventory.ts:126](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/inventory.ts#L126) |
| <a id="property-combatprofile"></a> `combatProfile` | `object` | - | - | [content/inventory.ts:127](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/inventory.ts#L127) |
| `combatProfile.initiative` | `number` | - | - | [content/inventory.ts:128](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/inventory.ts#L128) |
| `combatProfile.soak` | `number` | - | - | [content/inventory.ts:129](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/inventory.ts#L129) |
| `combatProfile.hitPoints` | `number` | - | - | [content/inventory.ts:130](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/inventory.ts#L130) |
| <a id="property-carryingcapacity"></a> `carryingCapacity` | `number` | - | - | [content/inventory.ts:132](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/inventory.ts#L132) |
| <a id="property-temperamenttags"></a> `temperamentTags?` | readonly `string`[] | - | - | [content/inventory.ts:133](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/inventory.ts#L133) |
| <a id="property-name"></a> `name` | `string` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`name`](BaseTaggedDefinition.md#property-name) | [foundation/meta.ts:60](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L60) |
| <a id="property-slug"></a> `slug` | `string` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`slug`](BaseTaggedDefinition.md#property-slug) | [foundation/meta.ts:61](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L61) |
| <a id="property-summary"></a> `summary` | `string` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`summary`](BaseTaggedDefinition.md#property-summary) | [foundation/meta.ts:62](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L62) |
| <a id="property-description"></a> `description?` | `string` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`description`](BaseTaggedDefinition.md#property-description) | [foundation/meta.ts:63](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L63) |
| <a id="property-tags"></a> `tags` | readonly `string`[] | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`tags`](BaseTaggedDefinition.md#property-tags) | [foundation/meta.ts:68](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L68) |
| <a id="property-source"></a> `source` | [`SourceTrace`](../../foundation/interfaces/SourceTrace.md) | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`source`](BaseTaggedDefinition.md#property-source) | [foundation/meta.ts:69](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L69) |
| <a id="property-kind"></a> `kind` | `"mount"` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`kind`](BaseTaggedDefinition.md#property-kind) | [foundation/meta.ts:73](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L73) |
