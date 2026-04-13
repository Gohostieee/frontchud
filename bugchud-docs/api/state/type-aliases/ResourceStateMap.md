[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / ResourceStateMap

# Type Alias: ResourceStateMap

```ts
type ResourceStateMap = Partial<Record<ResourceKind, ResourcePool>>;
```

Defined in: [state/common.ts:49](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L49)

Resource pools are sparse because not every actor or asset has every resource.
