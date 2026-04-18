[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [views](../index.md) / AttackOptionView

# Interface: AttackOptionView

Defined in: [views/computed.ts:32](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L32)

One concrete attack option currently available to an actor.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-label"></a> `label` | `string` | [views/computed.ts:33](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L33) |
| <a id="property-profile"></a> `profile` | [`AttackProfileTemplate`](../../content/interfaces/AttackProfileTemplate.md) | [views/computed.ts:34](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L34) |
| <a id="property-sourceref"></a> `sourceRef?` | \| [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"weapon"`\> \| [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"spell"`\> | [views/computed.ts:35](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L35) |
| <a id="property-usable"></a> `usable` | `boolean` | [views/computed.ts:36](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L36) |
| <a id="property-reasonsdisabled"></a> `reasonsDisabled?` | readonly `string`[] | [views/computed.ts:37](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L37) |
