[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / MagicState

# Interface: MagicState

Defined in: [state/common.ts:205](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L205)

Mutable black-magick state such as prepared spells and mana dice.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-cancast"></a> `canCast` | `boolean` | [state/common.ts:206](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L206) |
| <a id="property-manadicecurrent"></a> `manaDiceCurrent` | `number` | [state/common.ts:207](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L207) |
| <a id="property-manadicemaximum"></a> `manaDiceMaximum` | `number` | [state/common.ts:208](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L208) |
| <a id="property-grimoirerefs"></a> `grimoireRefs` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"grimoire"`\>[] | [state/common.ts:209](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L209) |
| <a id="property-knownspellrefs"></a> `knownSpellRefs` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"spell"`\>[] | [state/common.ts:210](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L210) |
| <a id="property-preparedspellrefs"></a> `preparedSpellRefs` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"spell"`\>[] | [state/common.ts:211](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L211) |
| <a id="property-activecasteffects"></a> `activeCastEffects?` | readonly [`ActiveEffect`](../../foundation/interfaces/ActiveEffect.md)[] | [state/common.ts:212](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L212) |
