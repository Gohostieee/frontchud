[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [content](../index.md) / AttackProfileTemplate

# Interface: AttackProfileTemplate

Defined in: [content/common.ts:176](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L176)

Reusable attack template for weapons, spells, monsters, and warbands.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-label"></a> `label` | `string` | [content/common.ts:177](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L177) |
| <a id="property-mode"></a> `mode` | \| `"melee"` \| `"thrown"` \| `"pistol"` \| `"rifle"` \| `"heavy"` \| `"vehicleMounted"` \| `"grenade"` | [content/common.ts:178](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L178) |
| <a id="property-accuracybase"></a> `accuracyBase` | `number` | [content/common.ts:179](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L179) |
| <a id="property-damage"></a> `damage` | [`DiceExpression`](../../foundation/interfaces/DiceExpression.md) | [content/common.ts:180](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L180) |
| <a id="property-damagetype"></a> `damageType` | \| `"mundane"` \| `"piercing"` \| `"slashing"` \| `"bludgeoning"` \| `"fire"` \| `"cold"` \| `"shock"` \| `"toxic"` \| `"psychic"` \| `"holy"` \| `"profane"` \| `"xom"` | [content/common.ts:181](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L181) |
| <a id="property-rangeband"></a> `rangeBand?` | `"engaged"` \| `"close"` \| `"near"` \| `"far"` \| `"extreme"` \| `"siege"` | [content/common.ts:182](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L182) |
| <a id="property-saveonhit"></a> `saveOnHit?` | `"death"` \| `"physique"` \| `"dodge"` \| `"magick"` \| `"zealotry"` | [content/common.ts:183](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L183) |
| <a id="property-ammocost"></a> `ammoCost?` | `number` | [content/common.ts:184](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L184) |
| <a id="property-modifiers"></a> `modifiers?` | [`ModifierSet`](../../foundation/interfaces/ModifierSet.md) | [content/common.ts:185](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L185) |
| <a id="property-tags"></a> `tags?` | readonly `string`[] | [content/common.ts:186](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L186) |
