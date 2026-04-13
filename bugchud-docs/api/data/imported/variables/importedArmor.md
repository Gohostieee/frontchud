[**@bugchud/core API Reference v0.1.0**](../../../index.md)

***

[@bugchud/core API Reference](../../../index.md) / [data/imported](../index.md) / importedArmor

# Variable: importedArmor

```ts
const importedArmor: readonly [{
  kind: "armor";
  id: Brand<string, "ArmorId">;
  name: "Gambeson";
  slug: "gambeson";
  summary: "Thick wool and cloth that offer a surprising degree of protection.";
  tags: readonly ["armor", "body"];
  source: SourceTrace;
  itemKind: "armor";
  slotCost: SlotCost;
  economy: ItemEconomyProfile;
  usableInCombat: true;
  coverage: readonly ["body", "arms", "legs"];
  mitigation: {
     behavior: "light";
     soak: 2;
     dodgePenalty: 2;
  };
}, {
  kind: "armor";
  id: Brand<string, "ArmorId">;
  name: "Chainmail";
  slug: "chainmail";
  summary: "Linked chains protecting the soft flesh underneath.";
  tags: readonly ["armor", "body"];
  source: SourceTrace;
  itemKind: "armor";
  slotCost: SlotCost;
  economy: ItemEconomyProfile;
  usableInCombat: true;
  coverage: readonly ["body", "arms", "legs"];
  mitigation: {
     behavior: "medium";
     soak: 4;
     dodgePenalty: 0;
  };
}, {
  kind: "armor";
  id: Brand<string, "ArmorId">;
  name: "Panoply Plate";
  slug: "panoply-plate";
  summary: "Primitive plate with few moving parts. Cumbersome but strong.";
  tags: readonly ["armor", "body", "plate"];
  source: SourceTrace;
  itemKind: "armor";
  slotCost: SlotCost;
  economy: ItemEconomyProfile;
  usableInCombat: true;
  coverage: readonly ["body", "arms", "legs"];
  mitigation: {
     behavior: "heavy";
     soak: 4;
     dodgePenalty: -4;
  };
}, {
  kind: "armor";
  id: Brand<string, "ArmorId">;
  name: "True Plate Armor";
  slug: "true-plate-armor";
  summary: "Advanced plate that grants heavy protection with medium penalties.";
  tags: readonly ["armor", "body", "plate"];
  source: SourceTrace;
  itemKind: "armor";
  slotCost: SlotCost;
  economy: ItemEconomyProfile;
  usableInCombat: true;
  coverage: readonly ["body", "arms", "legs"];
  mitigation: {
     behavior: "medium";
     soak: 4;
     dodgePenalty: 0;
  };
}, {
  kind: "armor";
  id: Brand<string, "ArmorId">;
  name: "Anti-Ballistic Suit";
  slug: "anti-ballistic-suit";
  summary: "Ceramic-plated suit that has a 50% chance to ignore all ranged damage except Big Damage.";
  tags: readonly ["armor", "body", "ballistic"];
  source: SourceTrace;
  itemKind: "armor";
  slotCost: SlotCost;
  economy: ItemEconomyProfile;
  usableInCombat: true;
  coverage: readonly ["body", "arms", "legs"];
  mitigation: {
     behavior: "medium";
     soak: 4;
     dodgePenalty: 0;
     protectedDamageTypes: readonly ["piercing"];
     tags: readonly ["50% ignore ranged damage except Big Damage"];
  };
}, {
  kind: "armor";
  id: Brand<string, "ArmorId">;
  name: "Slave-Harness";
  slug: "slave-harness";
  summary: "Binding straps and uncomfortable collars that award no protection despite heavy weight-class.";
  tags: readonly ["armor", "body", "slave"];
  source: SourceTrace;
  itemKind: "armor";
  slotCost: SlotCost;
  economy: ItemEconomyProfile;
  usableInCombat: true;
  coverage: readonly ["body", "arms", "legs"];
  mitigation: {
     behavior: "heavy";
     soak: 0;
     dodgePenalty: -4;
  };
}, {
  kind: "armor";
  id: Brand<string, "ArmorId">;
  name: "Mail Coif";
  slug: "mail-coif";
  summary: "Chainmail for the head, chin, and neck.";
  tags: readonly ["armor", "head"];
  source: SourceTrace;
  itemKind: "armor";
  slotCost: SlotCost;
  economy: ItemEconomyProfile;
  usableInCombat: true;
  coverage: readonly ["head"];
  mitigation: {
     behavior: "light";
     soak: 2;
     dodgePenalty: 0;
  };
}, {
  kind: "armor";
  id: Brand<string, "ArmorId">;
  name: "Infantry Helmet";
  slug: "infantry-helmet";
  summary: "Mass-produced helmet that has a 50% chance to ignore ranged damage except Big Damage.";
  tags: readonly ["armor", "head"];
  source: SourceTrace;
  itemKind: "armor";
  slotCost: SlotCost;
  economy: ItemEconomyProfile;
  usableInCombat: true;
  coverage: readonly ["head"];
  mitigation: {
     behavior: "light";
     soak: 2;
     dodgePenalty: 0;
     protectedDamageTypes: readonly ["piercing"];
     tags: readonly ["50% ignore ranged damage except Big Damage"];
  };
}, {
  kind: "armor";
  id: Brand<string, "ArmorId">;
  name: "Metal Helmet";
  slug: "metal-helmet";
  summary: "A generic melee helmet such as a skull cap, kettle hat, or bascinet.";
  tags: readonly ["armor", "head"];
  source: SourceTrace;
  itemKind: "armor";
  slotCost: SlotCost;
  economy: ItemEconomyProfile;
  usableInCombat: true;
  coverage: readonly ["head"];
  mitigation: {
     behavior: "medium";
     soak: 4;
     dodgePenalty: 0;
  };
}, {
  kind: "armor";
  id: Brand<string, "ArmorId">;
  name: "Great Helmet";
  slug: "great-helmet";
  summary: "A single-plate face-covering helmet with tiny vision slits.";
  tags: readonly ["armor", "head"];
  source: SourceTrace;
  itemKind: "armor";
  slotCost: SlotCost;
  economy: ItemEconomyProfile;
  usableInCombat: true;
  coverage: readonly ["head"];
  mitigation: {
     behavior: "heavy";
     soak: 4;
     dodgePenalty: 0;
  };
}, {
  kind: "armor";
  id: Brand<string, "ArmorId">;
  name: "True Plate Helmet";
  slug: "true-plate-helmet";
  summary: "Advanced headgear that grants heavy protection with only medium discomfort.";
  tags: readonly ["armor", "head"];
  source: SourceTrace;
  itemKind: "armor";
  slotCost: SlotCost;
  economy: ItemEconomyProfile;
  usableInCombat: true;
  coverage: readonly ["head"];
  mitigation: {
     behavior: "medium";
     soak: 4;
     dodgePenalty: 0;
  };
}];
```

Defined in: [data/imported/inventory/armor.ts:6](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/data/imported/inventory/armor.ts#L6)
