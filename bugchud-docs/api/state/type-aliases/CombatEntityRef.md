[**@bugchud/core API Reference v0.1.0**](../../index.md)

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

Defined in: [state/common.ts:202](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L202)

Common set of entity references that can participate in combat-facing views.
