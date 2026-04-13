[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / ActionHistoryEntry

# Interface: ActionHistoryEntry

Defined in: [state/common.ts:194](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L194)

History entry recorded by encounters or campaigns.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-actionkind"></a> `actionKind` | \| `"performCheck"` \| `"rollSave"` \| `"makeAttack"` \| `"moveActor"` \| `"castSpell"` \| `"brewAlchemy"` \| `"useItem"` \| `"applyEffect"` \| `"progressCharacter"` \| `"mutateCharacter"` \| `"operateVehicle"` \| `"issueWarbandOrder"` \| `"advanceTurn"` \| `"startEncounter"` \| `"endEncounter"` | [state/common.ts:195](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L195) |
| <a id="property-eventkinds"></a> `eventKinds` | readonly ( \| `"checkResolved"` \| `"saveResolved"` \| `"attackResolved"` \| `"damageApplied"` \| `"healingApplied"` \| `"effectApplied"` \| `"effectExpired"` \| `"resourceChanged"` \| `"characterProgressed"` \| `"mutationTriggered"` \| `"spellCast"` \| `"alchemyUsed"` \| `"vehicleOperated"` \| `"warbandOrdered"` \| `"turnAdvanced"` \| `"encounterStarted"` \| `"encounterEnded"`)[] | [state/common.ts:196](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L196) |
| <a id="property-summary"></a> `summary` | `string` | [state/common.ts:197](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L197) |
| <a id="property-timestamp"></a> `timestamp` | [`TimelineStamp`](TimelineStamp.md) | [state/common.ts:198](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L198) |
