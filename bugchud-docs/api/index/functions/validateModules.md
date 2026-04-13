[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / validateModules

# Function: validateModules()

```ts
function validateModules(modules?): ValidationResult;
```

Defined in: validation/modules.ts:11

Validate extension module metadata such as namespace presence and uniqueness.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `modules` | readonly [`BugchudModule`](../interfaces/BugchudModule.md)\<[`JsonObject`](../../foundation/interfaces/JsonObject.md)\>[] |

## Returns

[`ValidationResult`](../interfaces/ValidationResult.md)
