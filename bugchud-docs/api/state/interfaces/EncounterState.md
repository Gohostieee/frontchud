[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / EncounterState

# Interface: EncounterState

Defined in: [state/encounter.ts:53](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/encounter.ts#L53)

Canonical tactical runtime model.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id` | [`EncounterId`](../../foundation/type-aliases/EncounterId.md) | [state/encounter.ts:54](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/encounter.ts#L54) |
| <a id="property-kind"></a> `kind` | `"encounter"` | [state/encounter.ts:55](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/encounter.ts#L55) |
| <a id="property-label"></a> `label` | `string` | [state/encounter.ts:56](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/encounter.ts#L56) |
| <a id="property-actors"></a> `actors` | `Readonly`\<`Record`\<[`EncounterActorId`](../../foundation/type-aliases/EncounterActorId.md), [`EncounterActorState`](EncounterActorState.md)\>\> | [state/encounter.ts:57](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/encounter.ts#L57) |
| <a id="property-zones"></a> `zones` | readonly [`EncounterZoneState`](EncounterZoneState.md)[] | [state/encounter.ts:58](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/encounter.ts#L58) |
| <a id="property-hazards"></a> `hazards` | readonly [`HazardState`](HazardState.md)[] | [state/encounter.ts:59](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/encounter.ts#L59) |
| <a id="property-turn"></a> `turn` | [`TurnState`](TurnState.md) | [state/encounter.ts:60](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/encounter.ts#L60) |
| <a id="property-ambush"></a> `ambush` | [`AmbushState`](AmbushState.md) | [state/encounter.ts:61](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/encounter.ts#L61) |
| <a id="property-history"></a> `history` | readonly [`ActionHistoryEntry`](ActionHistoryEntry.md)[] | [state/encounter.ts:62](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/encounter.ts#L62) |
| <a id="property-extensions"></a> `extensions?` | `Partial`\<`Record`\<`string`, [`JsonObject`](../../foundation/interfaces/JsonObject.md)\>\> | [state/encounter.ts:63](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/encounter.ts#L63) |
