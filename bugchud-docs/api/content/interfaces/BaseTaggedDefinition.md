[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [content](../index.md) / BaseTaggedDefinition

# Interface: BaseTaggedDefinition\<K\>

Defined in: [content/common.ts:247](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L247)

Base authored definition shape shared by most registries.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extends

- [`RegistryEntry`](../../foundation/interfaces/RegistryEntry.md)\<`K`\>

### Extended by

- [`RaceDefinition`](RaceDefinition.md)
- [`OriginDefinition`](OriginDefinition.md)
- [`BackgroundDefinition`](BackgroundDefinition.md)
- [`DreamDefinition`](DreamDefinition.md)
- [`BionicDefinition`](BionicDefinition.md)
- [`MutationDefinition`](MutationDefinition.md)
- [`ItemDefinition`](ItemDefinition.md)
- [`WeaponDefinition`](WeaponDefinition.md)
- [`ArmorDefinition`](ArmorDefinition.md)
- [`ShieldDefinition`](ShieldDefinition.md)
- [`VehicleDefinition`](VehicleDefinition.md)
- [`MountDefinition`](MountDefinition.md)
- [`GrimoireDefinition`](GrimoireDefinition.md)
- [`SpellDefinition`](SpellDefinition.md)
- [`AlchemyRecipeDefinition`](AlchemyRecipeDefinition.md)
- [`PantheonDefinition`](PantheonDefinition.md)
- [`PatronDefinition`](PatronDefinition.md)
- [`BoonDefinition`](BoonDefinition.md)
- [`CovenantDefinition`](CovenantDefinition.md)
- [`RelicDefinition`](RelicDefinition.md)
- [`FactionDefinition`](FactionDefinition.md)
- [`RegionDefinition`](RegionDefinition.md)
- [`CultureDefinition`](CultureDefinition.md)
- [`TerminologyDefinition`](TerminologyDefinition.md)
- [`WarbandDefinition`](WarbandDefinition.md)
- [`FortressDefinition`](FortressDefinition.md)
- [`CreatureDefinition`](CreatureDefinition.md)
- [`NpcLoadoutDefinition`](NpcLoadoutDefinition.md)

## Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* [`DefinitionKind`](../../foundation/type-aliases/DefinitionKind.md) |

## Properties

| Property | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-aliases"></a> `aliases?` | readonly `string`[] | - | [content/common.ts:248](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L248) |
| <a id="property-requirements"></a> `requirements?` | readonly [`RulePrerequisite`](../type-aliases/RulePrerequisite.md)[] | - | [content/common.ts:249](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L249) |
| <a id="property-grants"></a> `grants?` | readonly [`GrantedCapability`](../type-aliases/GrantedCapability.md)[] | - | [content/common.ts:250](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L250) |
| <a id="property-name"></a> `name` | `string` | [`RegistryEntry`](../../foundation/interfaces/RegistryEntry.md).[`name`](../../foundation/interfaces/RegistryEntry.md#property-name) | [foundation/meta.ts:60](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L60) |
| <a id="property-slug"></a> `slug` | `string` | [`RegistryEntry`](../../foundation/interfaces/RegistryEntry.md).[`slug`](../../foundation/interfaces/RegistryEntry.md#property-slug) | [foundation/meta.ts:61](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L61) |
| <a id="property-summary"></a> `summary` | `string` | [`RegistryEntry`](../../foundation/interfaces/RegistryEntry.md).[`summary`](../../foundation/interfaces/RegistryEntry.md#property-summary) | [foundation/meta.ts:62](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L62) |
| <a id="property-description"></a> `description?` | `string` | [`RegistryEntry`](../../foundation/interfaces/RegistryEntry.md).[`description`](../../foundation/interfaces/RegistryEntry.md#property-description) | [foundation/meta.ts:63](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L63) |
| <a id="property-tags"></a> `tags` | readonly `string`[] | [`RegistryEntry`](../../foundation/interfaces/RegistryEntry.md).[`tags`](../../foundation/interfaces/RegistryEntry.md#property-tags) | [foundation/meta.ts:68](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L68) |
| <a id="property-source"></a> `source` | [`SourceTrace`](../../foundation/interfaces/SourceTrace.md) | [`RegistryEntry`](../../foundation/interfaces/RegistryEntry.md).[`source`](../../foundation/interfaces/RegistryEntry.md#property-source) | [foundation/meta.ts:69](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L69) |
| <a id="property-kind"></a> `kind` | `K` | [`RegistryEntry`](../../foundation/interfaces/RegistryEntry.md).[`kind`](../../foundation/interfaces/RegistryEntry.md#property-kind) | [foundation/meta.ts:73](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L73) |
| <a id="property-id"></a> `id` | [`DefinitionIdByKind`](../../foundation/interfaces/DefinitionIdByKind.md)\[`K`\] | [`RegistryEntry`](../../foundation/interfaces/RegistryEntry.md).[`id`](../../foundation/interfaces/RegistryEntry.md#property-id) | [foundation/meta.ts:74](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/meta.ts#L74) |
