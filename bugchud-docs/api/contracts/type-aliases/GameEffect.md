[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / GameEffect

# Type Alias: GameEffect

```ts
type GameEffect = ActiveEffect & object;
```

Defined in: [contracts/actions.ts:303](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L303)

Active effect plus some provenance about how the engine produced it.

## Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `appliedBy?` | [`GameAction`](GameAction.md)\[`"kind"`\] | [contracts/actions.ts:304](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L304) |
| `originatingEventId?` | `string` | [contracts/actions.ts:305](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/contracts/actions.ts#L305) |
