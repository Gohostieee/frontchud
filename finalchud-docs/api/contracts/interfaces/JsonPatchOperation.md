[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / JsonPatchOperation

# Interface: JsonPatchOperation

Defined in: [contracts/actions.ts:34](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L34)

Action/event/resolution contracts for the future rules engine.

The goal here is to define the language of simulation before implementing the
logic itself: what goes in, what comes out, and how state changes are described.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-op"></a> `op` | `"set"` \| `"merge"` \| `"remove"` \| `"append"` | [contracts/actions.ts:35](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L35) |
| <a id="property-path"></a> `path` | `string` | [contracts/actions.ts:36](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L36) |
| <a id="property-value"></a> `value?` | [`JsonValue`](../../foundation/type-aliases/JsonValue.md) | [contracts/actions.ts:37](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L37) |
