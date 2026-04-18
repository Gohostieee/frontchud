[**@bugchud/core API Reference v0.2.0**](../../../index.md)

***

[@bugchud/core API Reference](../../../index.md) / [data/imported](../index.md) / importedDerivedStats

# Variable: importedDerivedStats

```ts
const importedDerivedStats: readonly [{
  key: "sprint";
  formula: {
     basedOn: readonly ["twitch"];
     notes: readonly ["Equal to half a character's Twitch, rounded down."];
  };
}, {
  key: "skill";
  formula: {
     basedOn: readonly ["twitch"];
     notes: readonly ["Equal to half a character's Twitch, rounded down.", "Spend one point of Skill before an attribute check to roll an extra d10 and choose the preferred result.", "Skill replenishes at the end of a game-session."];
  };
}, {
  key: "bones";
  formula: {
     basedOn: readonly ["flesh"];
     notes: readonly ["Equal to a character's Flesh.", "Bones lets a character ignore a number of Wound Points equal to the stat rather than reducing incoming damage directly."];
  };
}, {
  key: "manaDiceMax";
  formula: {
     basedOn: readonly ["mojo"];
     notes: readonly ["Equal to twice a character's Mojo attribute.", "Whenever Mojo is gained, the user also gains the Mana Dice granted by that Mojo increase."];
  };
}, {
  key: "focus";
  formula: {
     basedOn: readonly ["mojo"];
     notes: readonly ["Equal to half a character's Mojo, rounded up.", "When resting, receive temporary Fate equal to Focus; that Fate is lost after waking if unspent."];
  };
}];
```

Defined in: [data/imported/core/attributes.ts:28](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/data/imported/core/attributes.ts#L28)
