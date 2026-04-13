[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / NpcState

# Interface: NpcState

Defined in: [state/character.ts:89](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L89)

NPCs are represented by creature-shaped runtime state with editor-friendly semantics.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extends

- [`CreatureState`](CreatureState.md)

## Properties

| Property | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-id"></a> `id` | [`CreatureStateId`](../../foundation/type-aliases/CreatureStateId.md) | [`CreatureState`](CreatureState.md).[`id`](CreatureState.md#property-id) | [state/character.ts:70](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L70) |
| <a id="property-kind"></a> `kind` | `"creatureState"` | [`CreatureState`](CreatureState.md).[`kind`](CreatureState.md#property-kind) | [state/character.ts:71](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L71) |
| <a id="property-identity"></a> `identity` | [`CreatureIdentityState`](CreatureIdentityState.md) | [`CreatureState`](CreatureState.md).[`identity`](CreatureState.md#property-identity) | [state/character.ts:72](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L72) |
| <a id="property-actorkind"></a> `actorKind` | `"creature"` \| `"npc"` \| `"mount"` | [`CreatureState`](CreatureState.md).[`actorKind`](CreatureState.md#property-actorkind) | [state/character.ts:73](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L73) |
| <a id="property-attributes"></a> `attributes` | [`AttributeSet`](AttributeSet.md) | [`CreatureState`](CreatureState.md).[`attributes`](CreatureState.md#property-attributes) | [state/character.ts:74](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L74) |
| <a id="property-derivedstats"></a> `derivedStats` | [`DerivedStatSet`](DerivedStatSet.md) | [`CreatureState`](CreatureState.md).[`derivedStats`](CreatureState.md#property-derivedstats) | [state/character.ts:75](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L75) |
| <a id="property-savebonuses"></a> `saveBonuses` | [`SaveBonusSet`](../type-aliases/SaveBonusSet.md) | [`CreatureState`](CreatureState.md).[`saveBonuses`](CreatureState.md#property-savebonuses) | [state/character.ts:76](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L76) |
| <a id="property-body"></a> `body` | [`BodyState`](BodyState.md) | [`CreatureState`](CreatureState.md).[`body`](CreatureState.md#property-body) | [state/character.ts:77](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L77) |
| <a id="property-inventory"></a> `inventory` | [`InventoryState`](InventoryState.md) | [`CreatureState`](CreatureState.md).[`inventory`](CreatureState.md#property-inventory) | [state/character.ts:78](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L78) |
| <a id="property-loadout"></a> `loadout` | [`LoadoutState`](LoadoutState.md) | [`CreatureState`](CreatureState.md).[`loadout`](CreatureState.md#property-loadout) | [state/character.ts:79](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L79) |
| <a id="property-magic"></a> `magic` | [`MagicState`](MagicState.md) | [`CreatureState`](CreatureState.md).[`magic`](CreatureState.md#property-magic) | [state/character.ts:80](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L80) |
| <a id="property-faith"></a> `faith` | [`FaithState`](FaithState.md) | [`CreatureState`](CreatureState.md).[`faith`](CreatureState.md#property-faith) | [state/character.ts:81](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L81) |
| <a id="property-resources"></a> `resources` | [`ResourceStateMap`](../type-aliases/ResourceStateMap.md) | [`CreatureState`](CreatureState.md).[`resources`](CreatureState.md#property-resources) | [state/character.ts:82](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L82) |
| <a id="property-activeeffects"></a> `activeEffects` | readonly [`ActiveEffect`](../../foundation/interfaces/ActiveEffect.md)[] | [`CreatureState`](CreatureState.md).[`activeEffects`](CreatureState.md#property-activeeffects) | [state/character.ts:83](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L83) |
| <a id="property-tags"></a> `tags?` | readonly `string`[] | [`CreatureState`](CreatureState.md).[`tags`](CreatureState.md#property-tags) | [state/character.ts:84](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L84) |
| <a id="property-extensions"></a> `extensions?` | `Partial`\<`Record`\<`string`, [`JsonObject`](../../foundation/interfaces/JsonObject.md)\>\> | [`CreatureState`](CreatureState.md).[`extensions`](CreatureState.md#property-extensions) | [state/character.ts:85](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L85) |
