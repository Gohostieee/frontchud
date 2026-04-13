[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / resolveRefExists

# Function: resolveRefExists()

```ts
function resolveRefExists(ruleset, refValue): boolean;
```

Defined in: validation/types.ts:106

Check whether a typed ref resolves inside the provided ruleset.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `ruleset` | \| [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) \| `undefined` |
| `refValue` | \| [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<keyof [`ContentRegistries`](../../content/interfaces/ContentRegistries.md)\> \| `undefined` |

## Returns

`boolean`
