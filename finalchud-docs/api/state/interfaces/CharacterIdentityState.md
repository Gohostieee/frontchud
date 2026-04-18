[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / CharacterIdentityState

# Interface: CharacterIdentityState

Defined in: [state/character.ts:25](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/character.ts#L25)

Narrative identity slice stored directly on a player character.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-name"></a> `name` | `string` | [state/character.ts:26](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/character.ts#L26) |
| <a id="property-raceref"></a> `raceRef` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"race"`\> | [state/character.ts:27](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/character.ts#L27) |
| <a id="property-originref"></a> `originRef` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"origin"`\> | [state/character.ts:28](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/character.ts#L28) |
| <a id="property-backgroundrefs"></a> `backgroundRefs` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"background"`\>[] | [state/character.ts:29](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/character.ts#L29) |
| <a id="property-faithlabel"></a> `faithLabel?` | `string` | [state/character.ts:30](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/character.ts#L30) |
| <a id="property-epithet"></a> `epithet?` | `string` | [state/character.ts:31](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/character.ts#L31) |
