[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / createValidationResult

# Function: createValidationResult()

```ts
function createValidationResult(issues): ValidationResult;
```

Defined in: [validation/types.ts:62](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/validation/types.ts#L62)

Convert an issue list into the standard `ok` plus `issues` result shape.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `issues` | readonly [`ValidationIssue`](../interfaces/ValidationIssue.md)[] |

## Returns

[`ValidationResult`](../interfaces/ValidationResult.md)
