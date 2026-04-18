[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [foundation](../index.md) / ATTRIBUTE\_KEYS

# Variable: ATTRIBUTE\_KEYS

```ts
const ATTRIBUTE_KEYS: readonly ["twitch", "flesh", "mojo", "glory"];
```

Defined in: [foundation/constants.ts:8](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/constants.ts#L8)

Canonical string unions used across the Bugchud engine.

These arrays serve two jobs at once:
1. They create strongly typed unions via `typeof ...[number]`.
2. They give us an easy runtime source of truth for exhaustiveness checks.
