[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / BaseGameEvent

# Interface: BaseGameEvent

Defined in: [contracts/actions.ts:295](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L295)

Base event shape emitted by resolvers after actions are processed.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id` | `string` | [contracts/actions.ts:296](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L296) |
| <a id="property-kind"></a> `kind` | \| `"checkResolved"` \| `"saveResolved"` \| `"attackResolved"` \| `"damageApplied"` \| `"healingApplied"` \| `"effectApplied"` \| `"effectExpired"` \| `"resourceChanged"` \| `"characterProgressed"` \| `"mutationTriggered"` \| `"spellCast"` \| `"alchemyUsed"` \| `"vehicleOperated"` \| `"warbandOrdered"` \| `"turnAdvanced"` \| `"encounterStarted"` \| `"encounterEnded"` | [contracts/actions.ts:297](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L297) |
| <a id="property-actionid"></a> `actionId?` | `string` | [contracts/actions.ts:298](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L298) |
| <a id="property-summary"></a> `summary` | `string` | [contracts/actions.ts:299](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L299) |
