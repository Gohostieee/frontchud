[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / ActionHistoryEntry

# Interface: ActionHistoryEntry

Defined in: [state/common.ts:272](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L272)

History entry recorded by encounters or campaigns.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-actionkind"></a> `actionKind` | \| `"performCheck"` \| `"rollSave"` \| `"makeAttack"` \| `"moveActor"` \| `"castSpell"` \| `"brewAlchemy"` \| `"useItem"` \| `"applyEffect"` \| `"progressCharacter"` \| `"mutateCharacter"` \| `"operateVehicle"` \| `"issueWarbandOrder"` \| `"advanceTurn"` \| `"startEncounter"` \| `"endEncounter"` | [state/common.ts:273](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L273) |
| <a id="property-eventkinds"></a> `eventKinds` | readonly ( \| `"checkResolved"` \| `"saveResolved"` \| `"attackResolved"` \| `"damageApplied"` \| `"healingApplied"` \| `"effectApplied"` \| `"effectExpired"` \| `"resourceChanged"` \| `"characterProgressed"` \| `"mutationTriggered"` \| `"spellCast"` \| `"alchemyUsed"` \| `"vehicleOperated"` \| `"warbandOrdered"` \| `"turnAdvanced"` \| `"encounterStarted"` \| `"encounterEnded"`)[] | [state/common.ts:274](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L274) |
| <a id="property-summary"></a> `summary` | `string` | [state/common.ts:275](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L275) |
| <a id="property-timestamp"></a> `timestamp` | [`TimelineStamp`](TimelineStamp.md) | [state/common.ts:276](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L276) |
