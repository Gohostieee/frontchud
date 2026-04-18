[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [foundation](../index.md) / ModifierTarget

# Type Alias: ModifierTarget

```ts
type ModifierTarget = 
  | `attribute:${AttributeKey}`
  | `derived:${DerivedStatKey}`
  | `save:${SaveType}`
  | "combat:initiative"
  | "combat:accuracy"
  | "combat:damage"
  | "combat:crit"
  | "combat:soak"
  | "combat:armor"
  | "combat:movement"
  | "combat:range"
  | "magic:castDifficulty"
  | "magic:manaDiceMax"
  | "magic:xomRisk"
  | "faith:zealotry"
  | "faith:miraclePower"
  | "body:healingRate"
  | "body:mutationResistance"
  | "inventory:carrySlots"
  | "campaign:morale"
  | "campaign:supply";
```

Defined in: [foundation/effects.ts:22](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L22)

Target keys that modifiers can point at.

These are stringly on purpose: they are easy to serialize, diff, and extend
without introducing a more complicated AST for every numeric change in the game.
