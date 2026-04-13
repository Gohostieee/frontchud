[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / createValidationResult

# Function: createValidationResult()

```ts
function createValidationResult(issues): ValidationResult;
```

Defined in: validation/types.ts:62

Convert an issue list into the standard `ok` plus `issues` result shape.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `issues` | readonly [`ValidationIssue`](../interfaces/ValidationIssue.md)[] |

## Returns

[`ValidationResult`](../interfaces/ValidationResult.md)
