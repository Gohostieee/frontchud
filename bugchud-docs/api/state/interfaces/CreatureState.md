[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / CreatureState

# Interface: CreatureState

Defined in: [state/character.ts:69](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L69)

Runtime creature/NPC state built to mirror player-facing combat hooks where practical.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extended by

- [`NpcState`](NpcState.md)

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id` | [`CreatureStateId`](../../foundation/type-aliases/CreatureStateId.md) | [state/character.ts:70](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L70) |
| <a id="property-kind"></a> `kind` | `"creatureState"` | [state/character.ts:71](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L71) |
| <a id="property-identity"></a> `identity` | [`CreatureIdentityState`](CreatureIdentityState.md) | [state/character.ts:72](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L72) |
| <a id="property-actorkind"></a> `actorKind` | `"creature"` \| `"npc"` \| `"mount"` | [state/character.ts:73](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L73) |
| <a id="property-attributes"></a> `attributes` | [`AttributeSet`](AttributeSet.md) | [state/character.ts:74](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L74) |
| <a id="property-derivedstats"></a> `derivedStats` | [`DerivedStatSet`](DerivedStatSet.md) | [state/character.ts:75](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L75) |
| <a id="property-savebonuses"></a> `saveBonuses` | [`SaveBonusSet`](../type-aliases/SaveBonusSet.md) | [state/character.ts:76](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L76) |
| <a id="property-body"></a> `body` | [`BodyState`](BodyState.md) | [state/character.ts:77](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L77) |
| <a id="property-inventory"></a> `inventory` | [`InventoryState`](InventoryState.md) | [state/character.ts:78](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L78) |
| <a id="property-loadout"></a> `loadout` | [`LoadoutState`](LoadoutState.md) | [state/character.ts:79](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L79) |
| <a id="property-magic"></a> `magic` | [`MagicState`](MagicState.md) | [state/character.ts:80](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L80) |
| <a id="property-faith"></a> `faith` | [`FaithState`](FaithState.md) | [state/character.ts:81](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L81) |
| <a id="property-resources"></a> `resources` | [`ResourceStateMap`](../type-aliases/ResourceStateMap.md) | [state/character.ts:82](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L82) |
| <a id="property-activeeffects"></a> `activeEffects` | readonly [`ActiveEffect`](../../foundation/interfaces/ActiveEffect.md)[] | [state/character.ts:83](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L83) |
| <a id="property-tags"></a> `tags?` | readonly `string`[] | [state/character.ts:84](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L84) |
| <a id="property-extensions"></a> `extensions?` | `Partial`\<`Record`\<`string`, [`JsonObject`](../../foundation/interfaces/JsonObject.md)\>\> | [state/character.ts:85](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L85) |
