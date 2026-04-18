[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [content](../index.md) / CharacterCreationDefinition

# Interface: CharacterCreationDefinition

Defined in: [content/character.ts:65](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/character.ts#L65)

Ruleset-level configuration for the creation flow.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-source"></a> `source` | [`SourceTrace`](../../foundation/interfaces/SourceTrace.md) | [content/character.ts:66](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/character.ts#L66) |
| <a id="property-racerefs"></a> `raceRefs` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"race"`\>[] | [content/character.ts:67](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/character.ts#L67) |
| <a id="property-originrefs"></a> `originRefs` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"origin"`\>[] | [content/character.ts:68](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/character.ts#L68) |
| <a id="property-faithoptions"></a> `faithOptions` | readonly [`FaithRef`](../type-aliases/FaithRef.md)[] | [content/character.ts:69](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/character.ts#L69) |
| <a id="property-startingbudget"></a> `startingBudget` | [`CurrencyValue`](CurrencyValue.md) | [content/character.ts:70](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/character.ts#L70) |
| <a id="property-defaultcarryslots"></a> `defaultCarrySlots` | `number` | [content/character.ts:71](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/character.ts#L71) |
| <a id="property-starterslotprofile"></a> `starterSlotProfile?` | [`SlotCost`](SlotCost.md) | [content/character.ts:72](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/character.ts#L72) |
