[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / OwnedDefinitionRef

# Type Alias: OwnedDefinitionRef

```ts
type OwnedDefinitionRef = 
  | RegistryRef<"item">
  | RegistryRef<"weapon">
  | RegistryRef<"armor">
  | RegistryRef<"shield">
  | RegistryRef<"grimoire">
| RegistryRef<"relic">;
```

Defined in: [state/common.ts:61](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L61)

Runtime inventory can own several different kinds of authored equipment.
