[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [content](../index.md) / EquipmentRef

# Type Alias: EquipmentRef

```ts
type EquipmentRef = 
  | RegistryRef<"item">
  | RegistryRef<"weapon">
  | RegistryRef<"armor">
  | RegistryRef<"shield">
  | RegistryRef<"grimoire">
| RegistryRef<"relic">;
```

Defined in: [content/common.ts:33](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L33)

Shared authored-content helpers.

These types sit underneath many content modules so we do not have to redefine
concepts like ownership grants, prerequisites, combat templates, and cost models.
