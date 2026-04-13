[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / MagicState

# Interface: MagicState

Defined in: [state/common.ts:127](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L127)

Mutable black-magick state such as prepared spells and mana dice.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-cancast"></a> `canCast` | `boolean` | [state/common.ts:128](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L128) |
| <a id="property-manadicecurrent"></a> `manaDiceCurrent` | `number` | [state/common.ts:129](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L129) |
| <a id="property-manadicemaximum"></a> `manaDiceMaximum` | `number` | [state/common.ts:130](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L130) |
| <a id="property-grimoirerefs"></a> `grimoireRefs` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"grimoire"`\>[] | [state/common.ts:131](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L131) |
| <a id="property-knownspellrefs"></a> `knownSpellRefs` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"spell"`\>[] | [state/common.ts:132](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L132) |
| <a id="property-preparedspellrefs"></a> `preparedSpellRefs` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"spell"`\>[] | [state/common.ts:133](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L133) |
| <a id="property-activecasteffects"></a> `activeCastEffects?` | readonly [`ActiveEffect`](../../foundation/interfaces/ActiveEffect.md)[] | [state/common.ts:134](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L134) |
