[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / TurnState

# Interface: TurnState

Defined in: [state/encounter.ts:45](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/encounter.ts#L45)

Current turn tracker and initiative ordering for the encounter.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-round"></a> `round` | `number` | [state/encounter.ts:46](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/encounter.ts#L46) |
| <a id="property-turnindex"></a> `turnIndex` | `number` | [state/encounter.ts:47](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/encounter.ts#L47) |
| <a id="property-activeactorid"></a> `activeActorId?` | [`EncounterActorId`](../../foundation/type-aliases/EncounterActorId.md) | [state/encounter.ts:48](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/encounter.ts#L48) |
| <a id="property-initiativeorder"></a> `initiativeOrder` | readonly [`EncounterActorId`](../../foundation/type-aliases/EncounterActorId.md)[] | [state/encounter.ts:49](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/encounter.ts#L49) |
