[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / isRegistryKind

# Function: isRegistryKind()

```ts
function isRegistryKind(kind): kind is keyof ContentRegistries;
```

Defined in: [validation/types.ts:73](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/validation/types.ts#L73)

Narrow a string to a supported content registry kind.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `kind` | `string` |

## Returns

`kind is keyof ContentRegistries`
