[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / Validator

# Type Alias: Validator\<T\>

```ts
type Validator<T> = (value, context) => readonly ValidationIssue[];
```

Defined in: validation/types.ts:41

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
