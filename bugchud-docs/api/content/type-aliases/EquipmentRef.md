[**@bugchud/core API Reference v0.1.0**](../../index.md)

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

Defined in: [content/common.ts:33](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/common.ts#L33)

Shared authored-content helpers.

These types sit underneath many content modules so we do not have to redefine
concepts like ownership grants, prerequisites, combat templates, and cost models.
