[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / GameAction

# Type Alias: GameAction

```ts
type GameAction = 
  | PerformCheckAction
  | RollSaveAction
  | MakeAttackAction
  | MoveActorAction
  | CastSpellAction
  | BrewAlchemyAction
  | UseItemAction
  | ApplyEffectAction
  | ProgressCharacterAction
  | MutateCharacterAction
  | OperateVehicleAction
  | IssueWarbandOrderAction
  | AdvanceTurnAction
  | StartEncounterAction
  | EndEncounterAction;
```

Defined in: [contracts/actions.ts:277](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L277)

Full input union currently supported by the action contract layer.
