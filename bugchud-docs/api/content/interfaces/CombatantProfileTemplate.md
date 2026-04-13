[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [content](../index.md) / CombatantProfileTemplate

# Interface: CombatantProfileTemplate

Defined in: [content/common.ts:214](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L214)

A generic combat template used by GM entities and campaign-scale units.

This keeps non-player actors compatible with the same encounter-facing view layer
used by player characters without forcing them into the exact same authored shape.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-role"></a> `role` | `string` | [content/common.ts:215](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L215) |
| <a id="property-size"></a> `size` | `"medium"` \| `"tiny"` \| `"small"` \| `"large"` \| `"huge"` | [content/common.ts:216](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L216) |
| <a id="property-movement"></a> `movement` | [`MovementProfile`](MovementProfile.md) | [content/common.ts:217](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L217) |
| <a id="property-baseinitiative"></a> `baseInitiative` | `number` | [content/common.ts:218](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L218) |
| <a id="property-baseaccuracy"></a> `baseAccuracy` | `number` | [content/common.ts:219](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L219) |
| <a id="property-basedamagebonus"></a> `baseDamageBonus` | `number` | [content/common.ts:220](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L220) |
| <a id="property-basesoak"></a> `baseSoak` | `number` | [content/common.ts:221](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L221) |
| <a id="property-savebonuses"></a> `saveBonuses` | `Partial`\<`Record`\<[`SaveType`](../../foundation/type-aliases/SaveType.md), `number`\>\> | [content/common.ts:222](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L222) |
| <a id="property-innateattacks"></a> `innateAttacks?` | readonly [`AttackProfileTemplate`](AttackProfileTemplate.md)[] | [content/common.ts:223](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L223) |
| <a id="property-defaultweaponrefs"></a> `defaultWeaponRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"weapon"`\>[] | [content/common.ts:224](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L224) |
| <a id="property-defaultarmorref"></a> `defaultArmorRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"armor"`\> | [content/common.ts:225](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L225) |
| <a id="property-defaultshieldref"></a> `defaultShieldRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"shield"`\> | [content/common.ts:226](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L226) |
| <a id="property-passiveeffects"></a> `passiveEffects?` | readonly [`ActiveEffect`](../../foundation/interfaces/ActiveEffect.md)[] | [content/common.ts:227](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L227) |
| <a id="property-senses"></a> `senses?` | [`SensesProfile`](SensesProfile.md) | [content/common.ts:228](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L228) |
| <a id="property-tags"></a> `tags?` | readonly `string`[] | [content/common.ts:229](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L229) |
