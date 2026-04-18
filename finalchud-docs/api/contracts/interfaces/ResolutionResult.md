[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / ResolutionResult

# Interface: ResolutionResult\<View\>

Defined in: [contracts/actions.ts:363](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L363)

Standard resolver return shape: patches, events, optional projections, and typed resolution info.

## Type Parameters

| Type Parameter |
| ------ |
| `View` |

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-deltas"></a> `deltas` | readonly [`StateDelta`](StateDelta.md)[] | [contracts/actions.ts:364](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L364) |
| <a id="property-effects"></a> `effects` | readonly [`GameEffect`](../type-aliases/GameEffect.md)[] | [contracts/actions.ts:365](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L365) |
| <a id="property-events"></a> `events` | readonly [`GameEvent`](../type-aliases/GameEvent.md)[] | [contracts/actions.ts:366](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L366) |
| <a id="property-views"></a> `views?` | readonly `View`[] | [contracts/actions.ts:367](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L367) |
| <a id="property-resolution"></a> `resolution?` | [`Resolution`](../type-aliases/Resolution.md) | [contracts/actions.ts:368](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L368) |
