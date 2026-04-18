[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [character](../index.md) / CharacterInitializationInput

# Interface: CharacterInitializationInput

Defined in: [character/initializer.ts:21](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L21)

Input accepted by character creation helpers and `CharacterModel.create()`.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id?` | [`CharacterId`](../../foundation/type-aliases/CharacterId.md) | [character/initializer.ts:22](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L22) |
| <a id="property-name"></a> `name?` | `string` | [character/initializer.ts:23](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L23) |
| <a id="property-raceref"></a> `raceRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"race"`\> | [character/initializer.ts:24](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L24) |
| <a id="property-originref"></a> `originRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"origin"`\> | [character/initializer.ts:25](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L25) |
| <a id="property-backgroundrefs"></a> `backgroundRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"background"`\>[] | [character/initializer.ts:26](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L26) |
| <a id="property-dreamrefs"></a> `dreamRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"dream"`\>[] | [character/initializer.ts:27](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L27) |
| <a id="property-patronref"></a> `patronRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"patron"`\> | [character/initializer.ts:28](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L28) |
| <a id="property-boonrefs"></a> `boonRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"boon"`\>[] | [character/initializer.ts:29](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L29) |
| <a id="property-covenantrefs"></a> `covenantRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"covenant"`\>[] | [character/initializer.ts:30](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L30) |
| <a id="property-relicrefs"></a> `relicRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"relic"`\>[] | [character/initializer.ts:31](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L31) |
| <a id="property-startingitems"></a> `startingItems?` | readonly [`OwnedItemStack`](../../state/interfaces/OwnedItemStack.md)[] | [character/initializer.ts:32](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L32) |
| <a id="property-tags"></a> `tags?` | readonly `string`[] | [character/initializer.ts:33](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L33) |
| <a id="property-currentfate"></a> `currentFate?` | `number` | [character/initializer.ts:34](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L34) |
| <a id="property-totalfateearned"></a> `totalFateEarned?` | `number` | [character/initializer.ts:35](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L35) |
| <a id="property-extensions"></a> `extensions?` | `Partial`\<`Record`\<`string`, [`JsonObject`](../../foundation/interfaces/JsonObject.md)\>\> | [character/initializer.ts:36](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/initializer.ts#L36) |
