[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / createValidationIssue

# Function: createValidationIssue()

```ts
function createValidationIssue(
   code, 
   severity, 
   message, 
   path, 
   suggestion?): ValidationIssue;
```

Defined in: [validation/types.ts:47](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/validation/types.ts#L47)

Build one structured validation issue in the shared result format.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `code` | `string` |
| `severity` | `"error"` \| `"warning"` \| `"info"` |
| `message` | `string` |
| `path` | `string` |
| `suggestion?` | `string` |

## Returns

[`ValidationIssue`](../interfaces/ValidationIssue.md)
