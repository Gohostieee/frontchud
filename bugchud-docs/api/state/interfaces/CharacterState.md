[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / CharacterState

# Interface: CharacterState

Defined in: [state/character.ts:39](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L39)

Main player-facing runtime entity.

This is the closest thing to a serializable character sheet plus current status.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id` | [`CharacterId`](../../foundation/type-aliases/CharacterId.md) | [state/character.ts:40](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L40) |
| <a id="property-kind"></a> `kind` | `"character"` | [state/character.ts:41](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L41) |
| <a id="property-identity"></a> `identity` | [`CharacterIdentityState`](CharacterIdentityState.md) | [state/character.ts:42](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L42) |
| <a id="property-attributes"></a> `attributes` | [`AttributeSet`](AttributeSet.md) | [state/character.ts:43](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L43) |
| <a id="property-derivedstats"></a> `derivedStats` | [`DerivedStatSet`](DerivedStatSet.md) | [state/character.ts:44](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L44) |
| <a id="property-savebonuses"></a> `saveBonuses` | [`SaveBonusSet`](../type-aliases/SaveBonusSet.md) | [state/character.ts:45](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L45) |
| <a id="property-progression"></a> `progression` | [`ProgressionState`](ProgressionState.md) | [state/character.ts:46](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L46) |
| <a id="property-body"></a> `body` | [`BodyState`](BodyState.md) | [state/character.ts:47](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L47) |
| <a id="property-inventory"></a> `inventory` | [`InventoryState`](InventoryState.md) | [state/character.ts:48](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L48) |
| <a id="property-loadout"></a> `loadout` | [`LoadoutState`](LoadoutState.md) | [state/character.ts:49](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L49) |
| <a id="property-magic"></a> `magic` | [`MagicState`](MagicState.md) | [state/character.ts:50](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L50) |
| <a id="property-alchemy"></a> `alchemy` | [`AlchemyState`](AlchemyState.md) | [state/character.ts:51](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L51) |
| <a id="property-faith"></a> `faith` | [`FaithState`](FaithState.md) | [state/character.ts:52](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L52) |
| <a id="property-social"></a> `social` | [`SocialReligiousState`](SocialReligiousState.md) | [state/character.ts:53](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L53) |
| <a id="property-resources"></a> `resources` | [`ResourceStateMap`](../type-aliases/ResourceStateMap.md) | [state/character.ts:54](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L54) |
| <a id="property-activeeffects"></a> `activeEffects` | readonly [`ActiveEffect`](../../foundation/interfaces/ActiveEffect.md)[] | [state/character.ts:55](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L55) |
| <a id="property-tags"></a> `tags?` | readonly `string`[] | [state/character.ts:56](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L56) |
| <a id="property-extensions"></a> `extensions?` | `Partial`\<`Record`\<`string`, [`JsonObject`](../../foundation/interfaces/JsonObject.md)\>\> | [state/character.ts:57](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/character.ts#L57) |
