[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / ResourceStateMap

# Type Alias: ResourceStateMap

```ts
type ResourceStateMap = Partial<Record<ResourceKind, ResourcePool>>;
```

Defined in: [state/common.ts:52](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L52)

Resource pools are sparse because not every actor or asset has every resource.
