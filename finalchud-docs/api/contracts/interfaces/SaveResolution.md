[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / SaveResolution

# Interface: SaveResolution

Defined in: [contracts/actions.ts:93](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L93)

Result payload for a resolved saving throw.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-kind"></a> `kind` | `"save"` | [contracts/actions.ts:94](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L94) |
| <a id="property-savetype"></a> `saveType` | `"death"` \| `"physique"` \| `"dodge"` \| `"magick"` \| `"zealotry"` | [contracts/actions.ts:95](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L95) |
| <a id="property-difficulty"></a> `difficulty` | `number` | [contracts/actions.ts:96](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L96) |
| <a id="property-roll"></a> `roll` | [`RollResult`](../../foundation/interfaces/RollResult.md) | [contracts/actions.ts:97](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L97) |
| <a id="property-success"></a> `success` | `boolean` | [contracts/actions.ts:98](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L98) |
| <a id="property-preventedeffects"></a> `preventedEffects?` | readonly [`ActiveEffect`](../../foundation/interfaces/ActiveEffect.md)[] | [contracts/actions.ts:99](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L99) |
