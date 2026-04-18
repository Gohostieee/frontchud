[**@bugchud/core API Reference v0.2.0**](../../../index.md)

***

[@bugchud/core API Reference](../../../index.md) / [data/imported](../index.md) / importedAlchemyRecipes

# Variable: importedAlchemyRecipes

```ts
const importedAlchemyRecipes: readonly [{
  kind: "alchemyRecipe";
  id: Brand<string, "AlchemyRecipeId">;
  name: "Potion of Healing";
  slug: "potion-of-healing";
  summary: "Example alchemical product used to explain potency: bottled healing that resolves like artificial Mana Dice and still risks Xom on 1s.";
  tags: readonly ["alchemy", "potion", "healing"];
  source: SourceTrace;
  recipeKind: "potion";
  delivery: "ingested";
  potency: {
     die: 0;
     notes: readonly ["The +X potency value is chosen or rolled at brew time rather than fixed by the rulebook entry."];
  };
  brewTime: "1d6 hours";
  ingredients: readonly [{
     label: "4 Zennies of alchemical materials";
     quantity: 1;
  }];
}, {
  kind: "alchemyRecipe";
  id: Brand<string, "AlchemyRecipeId">;
  name: "Potion of Fireball";
  slug: "potion-of-fireball";
  summary: "Example explosive brew used to clarify that bottled spells activate immediately rather than granting a free casting of the original spell.";
  tags: readonly ["alchemy", "potion", "fire"];
  source: SourceTrace;
  recipeKind: "potion";
  delivery: "ingested";
  potency: {
     die: 0;
     notes: readonly ["Potency remains a variable +X chosen by brewing results rather than a fixed authored die."];
  };
  brewTime: "1d6 hours";
  ingredients: readonly [{
     label: "4 Zennies of alchemical materials";
     quantity: 1;
  }];
}];
```

Defined in: [data/imported/supernatural/alchemy.ts:7](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/data/imported/supernatural/alchemy.ts#L7)
