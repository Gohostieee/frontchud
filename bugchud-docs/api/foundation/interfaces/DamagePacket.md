[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [foundation](../index.md) / DamagePacket

# Interface: DamagePacket

Defined in: [foundation/effects.ts:93](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/effects.ts#L93)

Typed damage payload before rules such as soak or mitigation are applied.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-type"></a> `type` | \| `"mundane"` \| `"piercing"` \| `"slashing"` \| `"bludgeoning"` \| `"fire"` \| `"cold"` \| `"shock"` \| `"toxic"` \| `"psychic"` \| `"holy"` \| `"profane"` \| `"xom"` | [foundation/effects.ts:94](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/effects.ts#L94) |
| <a id="property-amount"></a> `amount` | `number` | [foundation/effects.ts:95](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/effects.ts#L95) |
| <a id="property-armorpiercing"></a> `armorPiercing?` | `number` | [foundation/effects.ts:96](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/effects.ts#L96) |
| <a id="property-source"></a> `source?` | `string` | [foundation/effects.ts:97](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/effects.ts#L97) |
| <a id="property-tags"></a> `tags?` | readonly `string`[] | [foundation/effects.ts:98](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/effects.ts#L98) |
