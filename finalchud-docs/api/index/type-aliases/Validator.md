[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / Validator

# Type Alias: Validator\<T\>

```ts
type Validator<T> = (value, context) => readonly ValidationIssue[];
```

Defined in: [validation/types.ts:41](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/validation/types.ts#L41)

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`ValidationTarget`](ValidationTarget.md) |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `T` |
| `context` | [`ValidationContext`](../interfaces/ValidationContext.md) |

## Returns

readonly [`ValidationIssue`](../interfaces/ValidationIssue.md)[]
