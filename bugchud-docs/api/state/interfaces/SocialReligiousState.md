[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / SocialReligiousState

# Interface: SocialReligiousState

Defined in: [state/common.ts:168](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L168)

Narrative/social identity state that changes over time during play.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-languages"></a> `languages` | readonly `string`[] | [state/common.ts:169](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L169) |
| <a id="property-factionrefs"></a> `factionRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"faction"`\>[] | [state/common.ts:170](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L170) |
| <a id="property-culturerefs"></a> `cultureRefs?` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"culture"`\>[] | [state/common.ts:171](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L171) |
| <a id="property-followers"></a> `followers` | readonly [`FollowerState`](FollowerState.md)[] | [state/common.ts:172](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L172) |
| <a id="property-reputationtags"></a> `reputationTags?` | readonly `string`[] | [state/common.ts:173](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L173) |
