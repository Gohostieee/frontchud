[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / BodyState

# Interface: BodyState

Defined in: [state/common.ts:195](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L195)

Mutable body-layer state combining injuries, corruption, mutation, and bionics.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-injuries"></a> `injuries` | [`InjuryState`](InjuryState.md) | [state/common.ts:196](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L196) |
| <a id="property-anatomy"></a> `anatomy` | [`AnatomyState`](AnatomyState.md) | [state/common.ts:197](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L197) |
| <a id="property-xom"></a> `xom` | [`XomState`](XomState.md) | [state/common.ts:198](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L198) |
| <a id="property-mutationrefs"></a> `mutationRefs` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"mutation"`\>[] | [state/common.ts:199](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L199) |
| <a id="property-bionicrefs"></a> `bionicRefs` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"bionic"`\>[] | [state/common.ts:200](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L200) |
| <a id="property-activeconditions"></a> `activeConditions` | readonly [`ConditionState`](../../foundation/interfaces/ConditionState.md)[] | [state/common.ts:201](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L201) |
