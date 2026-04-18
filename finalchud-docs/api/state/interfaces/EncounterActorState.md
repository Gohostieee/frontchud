[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / EncounterActorState

# Interface: EncounterActorState

Defined in: [state/encounter.ts:26](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/encounter.ts#L26)

Flattened combat participant inside an encounter, regardless of source entity type.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id` | [`EncounterActorId`](../../foundation/type-aliases/EncounterActorId.md) | [state/encounter.ts:27](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/encounter.ts#L27) |
| <a id="property-kind"></a> `kind` | \| `"character"` \| `"creature"` \| `"npc"` \| `"vehicle"` \| `"mount"` \| `"warbandUnit"` \| `"fortressEmplacement"` | [state/encounter.ts:28](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/encounter.ts#L28) |
| <a id="property-source"></a> `source` | [`CombatEntityRef`](../type-aliases/CombatEntityRef.md) | [state/encounter.ts:29](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/encounter.ts#L29) |
| <a id="property-teamid"></a> `teamId` | `string` | [state/encounter.ts:30](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/encounter.ts#L30) |
| <a id="property-displayname"></a> `displayName` | `string` | [state/encounter.ts:31](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/encounter.ts#L31) |
| <a id="property-position"></a> `position` | [`ActorPositionState`](ActorPositionState.md) | [state/encounter.ts:32](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/encounter.ts#L32) |
| <a id="property-initiative"></a> `initiative` | `number` | [state/encounter.ts:33](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/encounter.ts#L33) |
| <a id="property-resources"></a> `resources` | [`ResourceStateMap`](../type-aliases/ResourceStateMap.md) | [state/encounter.ts:34](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/encounter.ts#L34) |
| <a id="property-engagedactorids"></a> `engagedActorIds?` | readonly [`EncounterActorId`](../../foundation/type-aliases/EncounterActorId.md)[] | [state/encounter.ts:35](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/encounter.ts#L35) |
