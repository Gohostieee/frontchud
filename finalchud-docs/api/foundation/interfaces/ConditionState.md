[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [foundation](../index.md) / ConditionState

# Interface: ConditionState

Defined in: [foundation/effects.ts:84](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L84)

A live condition marker that can be carried on body state or an active effect.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-kind"></a> `kind` | \| `"bleeding"` \| `"burning"` \| `"poisoned"` \| `"stunned"` \| `"prone"` \| `"grappled"` \| `"hidden"` \| `"aiming"` \| `"mounted"` \| `"encumbered"` \| `"cursed"` \| `"blessed"` \| `"corrupted"` \| `"shaken"` \| `"routing"` \| `"restrained"` \| `"fatigued"` | [foundation/effects.ts:85](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L85) |
| <a id="property-source"></a> `source` | `string` | [foundation/effects.ts:86](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L86) |
| <a id="property-duration"></a> `duration?` | [`Duration`](Duration.md) | [foundation/effects.ts:87](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L87) |
| <a id="property-stacks"></a> `stacks?` | `number` | [foundation/effects.ts:88](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L88) |
| <a id="property-notes"></a> `notes?` | readonly `string`[] | [foundation/effects.ts:89](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L89) |
