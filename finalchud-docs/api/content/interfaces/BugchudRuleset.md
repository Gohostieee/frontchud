[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [content](../index.md) / BugchudRuleset

# Interface: BugchudRuleset

Defined in: [content/index.ts:99](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/index.ts#L99)

Root immutable ruleset object.

This is the single package entry point a future loader, simulator, or UI can
depend on when it needs both the content registries and the higher-level rule metadata.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id` | `"bugchud"` | [content/index.ts:100](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/index.ts#L100) |
| <a id="property-version"></a> `version` | `string` | [content/index.ts:101](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/index.ts#L101) |
| <a id="property-source"></a> `source` | [`SourceTrace`](../../foundation/interfaces/SourceTrace.md) | [content/index.ts:102](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/index.ts#L102) |
| <a id="property-corerules"></a> `coreRules` | [`CoreRulesDefinition`](CoreRulesDefinition.md) | [content/index.ts:103](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/index.ts#L103) |
| <a id="property-attributes"></a> `attributes` | readonly [`AttributeDefinition`](AttributeDefinition.md)[] | [content/index.ts:104](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/index.ts#L104) |
| <a id="property-derivedstats"></a> `derivedStats` | readonly [`DerivedStatDefinition`](DerivedStatDefinition.md)[] | [content/index.ts:105](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/index.ts#L105) |
| <a id="property-charactercreation"></a> `characterCreation` | [`CharacterCreationDefinition`](CharacterCreationDefinition.md) | [content/index.ts:106](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/index.ts#L106) |
| <a id="property-characterlore"></a> `characterLore` | [`CharacterLoreDefinition`](CharacterLoreDefinition.md) | [content/index.ts:107](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/index.ts#L107) |
| <a id="property-progression"></a> `progression` | [`CharacterProgressionDefinition`](CharacterProgressionDefinition.md) | [content/index.ts:108](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/index.ts#L108) |
| <a id="property-bodyrules"></a> `bodyRules` | [`BodyRulesDefinition`](BodyRulesDefinition.md) | [content/index.ts:109](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/index.ts#L109) |
| <a id="property-inventoryandassets"></a> `inventoryAndAssets` | [`InventoryAndAssetsDefinition`](InventoryAndAssetsDefinition.md) | [content/index.ts:110](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/index.ts#L110) |
| <a id="property-supernatural"></a> `supernatural` | [`SupernaturalDefinition`](SupernaturalDefinition.md) | [content/index.ts:111](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/index.ts#L111) |
| <a id="property-world"></a> `world` | [`WorldDefinition`](WorldDefinition.md) | [content/index.ts:112](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/index.ts#L112) |
| <a id="property-gmcontent"></a> `gmContent` | [`GmContentDefinition`](GmContentDefinition.md) | [content/index.ts:113](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/index.ts#L113) |
| <a id="property-registries"></a> `registries` | [`ContentRegistries`](ContentRegistries.md) | [content/index.ts:114](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/content/index.ts#L114) |
