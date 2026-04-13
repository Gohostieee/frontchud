[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / BaseGameAction

# Interface: BaseGameAction

Defined in: [contracts/actions.ts:139](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L139)

Base shape shared by every engine input action.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extended by

- [`PerformCheckAction`](PerformCheckAction.md)
- [`RollSaveAction`](RollSaveAction.md)
- [`MakeAttackAction`](MakeAttackAction.md)
- [`MoveActorAction`](MoveActorAction.md)
- [`CastSpellAction`](CastSpellAction.md)
- [`BrewAlchemyAction`](BrewAlchemyAction.md)
- [`UseItemAction`](UseItemAction.md)
- [`ApplyEffectAction`](ApplyEffectAction.md)
- [`ProgressCharacterAction`](ProgressCharacterAction.md)
- [`MutateCharacterAction`](MutateCharacterAction.md)
- [`OperateVehicleAction`](OperateVehicleAction.md)
- [`IssueWarbandOrderAction`](IssueWarbandOrderAction.md)
- [`AdvanceTurnAction`](AdvanceTurnAction.md)
- [`StartEncounterAction`](StartEncounterAction.md)
- [`EndEncounterAction`](EndEncounterAction.md)

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id` | `string` | [contracts/actions.ts:140](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L140) |
| <a id="property-kind"></a> `kind` | \| `"performCheck"` \| `"rollSave"` \| `"makeAttack"` \| `"moveActor"` \| `"castSpell"` \| `"brewAlchemy"` \| `"useItem"` \| `"applyEffect"` \| `"progressCharacter"` \| `"mutateCharacter"` \| `"operateVehicle"` \| `"issueWarbandOrder"` \| `"advanceTurn"` \| `"startEncounter"` \| `"endEncounter"` | [contracts/actions.ts:141](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L141) |
| <a id="property-actor"></a> `actor?` | [`EntityRef`](../../foundation/interfaces/EntityRef.md)\< \| `"character"` \| `"creatureState"` \| `"encounter"` \| `"encounterActor"` \| `"vehicleState"` \| `"warbandState"` \| `"fortressState"`\> | [contracts/actions.ts:142](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L142) |
| <a id="property-target"></a> `target?` | [`TargetSelector`](../../foundation/interfaces/TargetSelector.md) | [contracts/actions.ts:151](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L151) |
| <a id="property-notes"></a> `notes?` | readonly `string`[] | [contracts/actions.ts:152](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L152) |
