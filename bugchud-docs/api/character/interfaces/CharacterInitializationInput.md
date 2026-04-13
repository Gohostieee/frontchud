[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [character](../index.md) / CharacterInitializationInput

# Interface: CharacterInitializationInput

Defined in: character/initializer.ts:21

Input accepted by character creation helpers and `CharacterModel.create()`.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id?` | [`CharacterId`](../../foundation/type-aliases/CharacterId.md) | character/initializer.ts:22 |
| <a id="property-name"></a> `name?` | `string` | character/initializer.ts:23 |
| <a id="property-raceref"></a> `raceRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"race"`\> | character/initializer.ts:24 |
| <a id="property-originref"></a> `originRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"origin"`\> | character/initializer.ts:25 |
| <a id="property-backgroundrefs"></a> `backgroundRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"background"`\>[] | character/initializer.ts:26 |
| <a id="property-dreamrefs"></a> `dreamRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"dream"`\>[] | character/initializer.ts:27 |
| <a id="property-patronref"></a> `patronRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"patron"`\> | character/initializer.ts:28 |
| <a id="property-boonrefs"></a> `boonRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"boon"`\>[] | character/initializer.ts:29 |
| <a id="property-covenantrefs"></a> `covenantRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"covenant"`\>[] | character/initializer.ts:30 |
| <a id="property-relicrefs"></a> `relicRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"relic"`\>[] | character/initializer.ts:31 |
| <a id="property-startingitems"></a> `startingItems?` | readonly [`OwnedItemStack`](../../state/interfaces/OwnedItemStack.md)[] | character/initializer.ts:32 |
| <a id="property-tags"></a> `tags?` | readonly `string`[] | character/initializer.ts:33 |
| <a id="property-currentfate"></a> `currentFate?` | `number` | character/initializer.ts:34 |
| <a id="property-totalfateearned"></a> `totalFateEarned?` | `number` | character/initializer.ts:35 |
| <a id="property-extensions"></a> `extensions?` | `Partial`\<`Record`\<`string`, [`JsonObject`](../../foundation/interfaces/JsonObject.md)\>\> | character/initializer.ts:36 |
