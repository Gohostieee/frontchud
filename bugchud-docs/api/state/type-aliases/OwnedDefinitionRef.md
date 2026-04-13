[**@bugchud/core API Reference v0.1.0**](../../index.md)

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

Defined in: [state/common.ts:58](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L58)

Runtime inventory can own several different kinds of authored equipment.
