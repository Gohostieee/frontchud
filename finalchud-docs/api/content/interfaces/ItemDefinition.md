[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [content](../index.md) / ItemDefinition

# Interface: ItemDefinition

Defined in: [content/inventory.ts:55](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/inventory.ts#L55)

General non-weapon, non-armor inventory entry.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extends

- [`BaseTaggedDefinition`](BaseTaggedDefinition.md)\<`"item"`\>.[`CarriedItemDefinitionShape`](CarriedItemDefinitionShape.md)

## Properties

| Property | Type | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-aliases"></a> `aliases?` | readonly `string`[] | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`aliases`](BaseTaggedDefinition.md#property-aliases) | [content/common.ts:248](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L248) |
| <a id="property-requirements"></a> `requirements?` | readonly [`RulePrerequisite`](../type-aliases/RulePrerequisite.md)[] | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`requirements`](BaseTaggedDefinition.md#property-requirements) | [content/common.ts:249](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L249) |
| <a id="property-grants"></a> `grants?` | readonly [`GrantedCapability`](../type-aliases/GrantedCapability.md)[] | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`grants`](BaseTaggedDefinition.md#property-grants) | [content/common.ts:250](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L250) |
| <a id="property-itemkind"></a> `itemKind` | \| `"holy"` \| `"gear"` \| `"consumable"` \| `"tool"` \| `"medical"` \| `"ammo"` \| `"container"` \| `"currency"` \| `"weapon"` \| `"armor"` \| `"shield"` \| `"vehiclePart"` \| `"alchemyIngredient"` \| `"alchemyProduct"` \| `"relic"` \| `"grimoire"` | - | [`CarriedItemDefinitionShape`](CarriedItemDefinitionShape.md).[`itemKind`](CarriedItemDefinitionShape.md#property-itemkind) | [content/common.ts:319](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L319) |
| <a id="property-slotcost"></a> `slotCost` | [`SlotCost`](SlotCost.md) | - | [`CarriedItemDefinitionShape`](CarriedItemDefinitionShape.md).[`slotCost`](CarriedItemDefinitionShape.md#property-slotcost) | [content/common.ts:320](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L320) |
| <a id="property-stacklimit"></a> `stackLimit?` | `number` | - | [`CarriedItemDefinitionShape`](CarriedItemDefinitionShape.md).[`stackLimit`](CarriedItemDefinitionShape.md#property-stacklimit) | [content/common.ts:321](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L321) |
| <a id="property-economy"></a> `economy` | [`ItemEconomyProfile`](ItemEconomyProfile.md) | - | [`CarriedItemDefinitionShape`](CarriedItemDefinitionShape.md).[`economy`](CarriedItemDefinitionShape.md#property-economy) | [content/common.ts:322](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L322) |
| <a id="property-usableincombat"></a> `usableInCombat?` | `boolean` | - | [`CarriedItemDefinitionShape`](CarriedItemDefinitionShape.md).[`usableInCombat`](CarriedItemDefinitionShape.md#property-usableincombat) | [content/common.ts:323](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L323) |
| <a id="property-id"></a> `id` | [`ItemId`](../../foundation/type-aliases/ItemId.md) | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`id`](BaseTaggedDefinition.md#property-id) | - | [content/inventory.ts:56](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/inventory.ts#L56) |
| <a id="property-consumableeffects"></a> `consumableEffects?` | readonly [`ActiveEffect`](../../foundation/interfaces/ActiveEffect.md)[] | - | - | [content/inventory.ts:57](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/inventory.ts#L57) |
| <a id="property-ammotype"></a> `ammoType?` | `string` | - | - | [content/inventory.ts:58](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/inventory.ts#L58) |
| <a id="property-name"></a> `name` | `string` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`name`](BaseTaggedDefinition.md#property-name) | [foundation/meta.ts:60](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L60) |
| <a id="property-slug"></a> `slug` | `string` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`slug`](BaseTaggedDefinition.md#property-slug) | [foundation/meta.ts:61](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L61) |
| <a id="property-summary"></a> `summary` | `string` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`summary`](BaseTaggedDefinition.md#property-summary) | [foundation/meta.ts:62](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L62) |
| <a id="property-description"></a> `description?` | `string` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`description`](BaseTaggedDefinition.md#property-description) | [foundation/meta.ts:63](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L63) |
| <a id="property-tags"></a> `tags` | readonly `string`[] | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`tags`](BaseTaggedDefinition.md#property-tags) | [foundation/meta.ts:68](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L68) |
| <a id="property-source"></a> `source` | [`SourceTrace`](../../foundation/interfaces/SourceTrace.md) | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`source`](BaseTaggedDefinition.md#property-source) | [foundation/meta.ts:69](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L69) |
| <a id="property-kind"></a> `kind` | `"item"` | - | [`BaseTaggedDefinition`](BaseTaggedDefinition.md).[`kind`](BaseTaggedDefinition.md#property-kind) | [foundation/meta.ts:73](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/meta.ts#L73) |
