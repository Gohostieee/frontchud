[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [foundation](../index.md) / Modifier

# Interface: Modifier

Defined in: [foundation/effects.ts:60](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L60)

One atomic numeric or step-based modification.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-target"></a> `target` | [`ModifierTarget`](../type-aliases/ModifierTarget.md) | [foundation/effects.ts:61](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L61) |
| <a id="property-operation"></a> `operation` | \| `"add"` \| `"subtract"` \| `"multiply"` \| `"divide"` \| `"set"` \| `"stepUp"` \| `"stepDown"` \| `"capMin"` \| `"capMax"` | [foundation/effects.ts:62](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L62) |
| <a id="property-value"></a> `value` | `number` | [foundation/effects.ts:63](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L63) |
| <a id="property-source"></a> `source` | `string` | [foundation/effects.ts:64](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L64) |
| <a id="property-stackkey"></a> `stackKey?` | `string` | [foundation/effects.ts:65](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L65) |
| <a id="property-requirescondition"></a> `requiresCondition?` | \| `"bleeding"` \| `"burning"` \| `"poisoned"` \| `"stunned"` \| `"prone"` \| `"grappled"` \| `"hidden"` \| `"aiming"` \| `"mounted"` \| `"encumbered"` \| `"cursed"` \| `"blessed"` \| `"corrupted"` \| `"shaken"` \| `"routing"` \| `"restrained"` \| `"fatigued"` | [foundation/effects.ts:66](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L66) |
| <a id="property-notes"></a> `notes?` | readonly `string`[] | [foundation/effects.ts:67](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L67) |
