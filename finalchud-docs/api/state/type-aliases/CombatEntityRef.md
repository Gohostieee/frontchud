[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / CombatEntityRef

# Type Alias: CombatEntityRef

```ts
type CombatEntityRef = 
  | EntityRef<"character">
  | EntityRef<"creatureState">
  | EntityRef<"vehicleState">
  | EntityRef<"warbandState">
| EntityRef<"fortressState">;
```

Defined in: [state/common.ts:280](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L280)

Common set of entity references that can participate in combat-facing views.
