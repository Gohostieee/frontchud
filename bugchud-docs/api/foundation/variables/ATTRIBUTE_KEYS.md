[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [foundation](../index.md) / ATTRIBUTE\_KEYS

# Variable: ATTRIBUTE\_KEYS

```ts
const ATTRIBUTE_KEYS: readonly ["twitch", "flesh", "mojo", "glory"];
```

Defined in: [foundation/constants.ts:8](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/foundation/constants.ts#L8)

Canonical string unions used across the Bugchud engine.

These arrays serve two jobs at once:
1. They create strongly typed unions via `typeof ...[number]`.
2. They give us an easy runtime source of truth for exhaustiveness checks.
