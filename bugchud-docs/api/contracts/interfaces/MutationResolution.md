[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / MutationResolution

# Interface: MutationResolution

Defined in: [contracts/actions.ts:121](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L121)

Result payload for Xom-driven or explicit mutation changes.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-kind"></a> `kind` | `"mutation"` | [contracts/actions.ts:122](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L122) |
| <a id="property-target"></a> `target` | [`EntityRef`](../../foundation/interfaces/EntityRef.md)\<`"character"` \| `"creatureState"`\> | [contracts/actions.ts:123](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L123) |
| <a id="property-xombefore"></a> `xomBefore` | `number` | [contracts/actions.ts:124](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L124) |
| <a id="property-xomafter"></a> `xomAfter` | `number` | [contracts/actions.ts:125](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L125) |
| <a id="property-gainedmutationrefs"></a> `gainedMutationRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"mutation"`\>[] | [contracts/actions.ts:126](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L126) |
| <a id="property-lostmutationrefs"></a> `lostMutationRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"mutation"`\>[] | [contracts/actions.ts:127](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L127) |
