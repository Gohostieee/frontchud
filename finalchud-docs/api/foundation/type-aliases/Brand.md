[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [foundation](../index.md) / Brand

# Type Alias: Brand\<Value, Token\>

```ts
type Brand<Value, Token> = Value & object;
```

Defined in: [foundation/ids.ts:7](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/ids.ts#L7)

Branded IDs are one of the most important safety tools in the package.

Even though every ID is just a string at runtime, branding stops TypeScript
from mixing up things like `RaceId`, `WeaponId`, and `CharacterId`.

## Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `__brand` | `Token` | [foundation/ids.ts:8](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/ids.ts#L8) |

## Type Parameters

| Type Parameter |
| ------ |
| `Value` |
| `Token` *extends* `string` |
