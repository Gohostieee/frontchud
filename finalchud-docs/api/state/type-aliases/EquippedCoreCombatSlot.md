[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / EquippedCoreCombatSlot

# Type Alias: EquippedCoreCombatSlot

```ts
type EquippedCoreCombatSlot = "mainHand" | "offHand" | "twoHanded" | "armor";
```

Defined in: [state/common.ts:77](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L77)

Core combat slots that can physically hold equipped gear in inventory state.

`mainHand` and `offHand` each accept one one-handed weapon or one shield.
`twoHanded` accepts only a two-handed weapon and requires both hand slots to
be free. `armor` holds exactly one armor stack. No slot accepts more than one
stack at a time, and equipped stacks must always have `quantity: 1`.
