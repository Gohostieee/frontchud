[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / CampaignState

# Interface: CampaignState

Defined in: [state/campaign.ts:81](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/campaign.ts#L81)

Canonical campaign-scale runtime model.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id` | [`CampaignId`](../../foundation/type-aliases/CampaignId.md) | [state/campaign.ts:82](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/campaign.ts#L82) |
| <a id="property-kind"></a> `kind` | `"campaign"` | [state/campaign.ts:83](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/campaign.ts#L83) |
| <a id="property-label"></a> `label` | `string` | [state/campaign.ts:84](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/campaign.ts#L84) |
| <a id="property-followers"></a> `followers` | readonly [`FollowerState`](FollowerState.md)[] | [state/campaign.ts:85](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/campaign.ts#L85) |
| <a id="property-vehicles"></a> `vehicles` | `Readonly`\<`Record`\<[`VehicleStateId`](../../foundation/type-aliases/VehicleStateId.md), [`VehicleState`](VehicleState.md)\>\> | [state/campaign.ts:86](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/campaign.ts#L86) |
| <a id="property-warbands"></a> `warbands` | `Readonly`\<`Record`\<[`WarbandStateId`](../../foundation/type-aliases/WarbandStateId.md), [`WarbandState`](WarbandState.md)\>\> | [state/campaign.ts:87](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/campaign.ts#L87) |
| <a id="property-fortresses"></a> `fortresses` | `Readonly`\<`Record`\<[`FortressStateId`](../../foundation/type-aliases/FortressStateId.md), [`FortressState`](FortressState.md)\>\> | [state/campaign.ts:88](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/campaign.ts#L88) |
| <a id="property-territories"></a> `territories` | readonly [`TerritoryState`](TerritoryState.md)[] | [state/campaign.ts:89](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/campaign.ts#L89) |
| <a id="property-clocks"></a> `clocks` | [`CampaignClockState`](CampaignClockState.md) | [state/campaign.ts:90](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/campaign.ts#L90) |
| <a id="property-history"></a> `history` | readonly [`ActionHistoryEntry`](ActionHistoryEntry.md)[] | [state/campaign.ts:91](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/campaign.ts#L91) |
| <a id="property-extensions"></a> `extensions?` | `Partial`\<`Record`\<`string`, [`JsonObject`](../../foundation/interfaces/JsonObject.md)\>\> | [state/campaign.ts:92](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/campaign.ts#L92) |
