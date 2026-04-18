[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / resolveRefExists

# Function: resolveRefExists()

```ts
function resolveRefExists(ruleset, refValue): boolean;
```

Defined in: [validation/types.ts:106](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/validation/types.ts#L106)

Check whether a typed ref resolves inside the provided ruleset.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `ruleset` | \| [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) \| `undefined` |
| `refValue` | \| [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<keyof [`ContentRegistries`](../../content/interfaces/ContentRegistries.md)\> \| `undefined` |

## Returns

`boolean`
