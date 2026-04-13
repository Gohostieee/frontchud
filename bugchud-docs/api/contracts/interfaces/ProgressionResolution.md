[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / ProgressionResolution

# Interface: ProgressionResolution

Defined in: [contracts/actions.ts:112](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L112)

Result payload for Fate spending and progression unlocks.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-kind"></a> `kind` | `"progression"` | [contracts/actions.ts:113](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L113) |
| <a id="property-character"></a> `character` | [`EntityRef`](../../foundation/interfaces/EntityRef.md)\<`"character"`\> | [contracts/actions.ts:114](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L114) |
| <a id="property-fatespent"></a> `fateSpent` | `number` | [contracts/actions.ts:115](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L115) |
| <a id="property-unlockeddreamrefs"></a> `unlockedDreamRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"dream"`\>[] | [contracts/actions.ts:116](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L116) |
| <a id="property-unlockedspellrefs"></a> `unlockedSpellRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"spell"`\>[] | [contracts/actions.ts:117](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L117) |
