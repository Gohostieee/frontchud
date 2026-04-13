[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [content](../index.md) / CarriedItemDefinitionShape

# Interface: CarriedItemDefinitionShape

Defined in: [content/common.ts:318](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L318)

Shared shape for authored items before specializing into weapon/armor/etc.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extended by

- [`ItemDefinition`](ItemDefinition.md)

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-itemkind"></a> `itemKind` | \| `"holy"` \| `"gear"` \| `"consumable"` \| `"tool"` \| `"medical"` \| `"ammo"` \| `"container"` \| `"currency"` \| `"weapon"` \| `"armor"` \| `"shield"` \| `"vehiclePart"` \| `"alchemyIngredient"` \| `"alchemyProduct"` \| `"relic"` \| `"grimoire"` | [content/common.ts:319](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L319) |
| <a id="property-slotcost"></a> `slotCost` | [`SlotCost`](SlotCost.md) | [content/common.ts:320](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L320) |
| <a id="property-stacklimit"></a> `stackLimit?` | `number` | [content/common.ts:321](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L321) |
| <a id="property-economy"></a> `economy` | [`ItemEconomyProfile`](ItemEconomyProfile.md) | [content/common.ts:322](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L322) |
| <a id="property-usableincombat"></a> `usableInCombat?` | `boolean` | [content/common.ts:323](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L323) |
