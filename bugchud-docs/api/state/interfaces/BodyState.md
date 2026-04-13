[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / BodyState

# Interface: BodyState

Defined in: [state/common.ts:118](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L118)

Mutable body-layer state combining injuries, corruption, mutation, and bionics.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-injuries"></a> `injuries` | [`InjuryState`](InjuryState.md) | [state/common.ts:119](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L119) |
| <a id="property-xom"></a> `xom` | [`XomState`](XomState.md) | [state/common.ts:120](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L120) |
| <a id="property-mutationrefs"></a> `mutationRefs` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"mutation"`\>[] | [state/common.ts:121](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L121) |
| <a id="property-bionicrefs"></a> `bionicRefs` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"bionic"`\>[] | [state/common.ts:122](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L122) |
| <a id="property-activeconditions"></a> `activeConditions` | readonly [`ConditionState`](../../foundation/interfaces/ConditionState.md)[] | [state/common.ts:123](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L123) |
