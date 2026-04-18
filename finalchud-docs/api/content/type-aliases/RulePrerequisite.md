[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [content](../index.md) / RulePrerequisite

# Type Alias: RulePrerequisite

```ts
type RulePrerequisite = 
  | {
  kind: "attributeMinimum";
  attribute: AttributeKey;
  value: number;
}
  | {
  kind: "saveMinimum";
  save: SaveType;
  value: number;
}
  | {
  kind: "resourceMinimum";
  resource: ResourceKind;
  value: number;
}
  | {
  kind: "originGroup";
  group: OriginGroup;
}
  | {
  kind: "dreamGroup";
  group: DreamGroup;
  count?: number;
}
  | {
  kind: "ownsDefinition";
  ref:   | EquipmentRef
     | RegistryRef<"dream">
     | RegistryRef<"mutation">
     | RegistryRef<"bionic">;
  quantity?: number;
}
  | {
  kind: "faith";
  ref: FaithRef;
}
  | {
  kind: "tag";
  tag: Tag;
}
  | {
  kind: "custom";
  description: string;
};
```

Defined in: [content/common.ts:80](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/common.ts#L80)

General prerequisite language used by content definitions.

This gives authored entries a structured way to say "you need X before Y"
without implementing rule evaluation in the content layer itself.
