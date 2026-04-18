[**@bugchud/core API Reference v0.2.0**](../../index.md)

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

Defined in: [contracts/actions.ts:277](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L277)

Full input union currently supported by the action contract layer.
