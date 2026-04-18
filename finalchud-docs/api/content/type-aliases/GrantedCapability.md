[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [content](../index.md) / GrantedCapability

# Type Alias: GrantedCapability

```ts
type GrantedCapability = 
  | {
  kind: "modifierSet";
  modifierSet: ModifierSet;
}
  | {
  kind: "effect";
  effect: ActiveEffect;
}
  | {
  kind: "resource";
  resource: ResourceKind;
  amount: number;
}
  | {
  kind: "item";
  grant: OwnershipGrant;
}
  | {
  kind: "language";
  language: string;
}
  | {
  kind: "spellAccess";
  preparedSlots?: number;
  spellRefs?: readonly RegistryRef<"spell">[];
}
  | {
  kind: "alchemyAccess";
  recipeRefs?: readonly RegistryRef<"alchemyRecipe">[];
}
  | {
  kind: "follower";
  label: string;
  quantity: number;
}
  | {
  kind: "faithBenefit";
  benefitKind: FaithBenefitKind;
  ref: FaithRef;
}
  | {
  kind: "tag";
  tag: Tag;
};
```

Defined in: [content/common.ts:129](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L129)

Structured capability payloads that definitions can grant.

Dreams, bionics, relics, mutations, and other content can all use this
shared union to describe what they unlock or modify.
