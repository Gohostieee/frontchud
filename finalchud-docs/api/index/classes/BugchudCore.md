[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / BugchudCore

# Class: BugchudCore

Defined in: [runtime/core.ts:44](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L44)

Main application entrypoint for working with `@bugchud/core`.

`BugchudCore` owns the active ruleset catalog, optional extension modules,
validation helpers, and model/wrapper factories. Apps should generally keep
one shared instance per loaded ruleset and use it to create or reload models.

## Constructors

### Constructor

```ts
new BugchudCore(options): BugchudCore;
```

Defined in: [runtime/core.ts:48](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L48)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`BugchudCoreOptions`](../interfaces/BugchudCoreOptions.md) |

#### Returns

`BugchudCore`

## Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-catalog"></a> `catalog` | `readonly` | [`RulesetCatalog`](RulesetCatalog.md) | [runtime/core.ts:45](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L45) |
| <a id="property-modules"></a> `modules` | `readonly` | readonly [`BugchudModule`](../interfaces/BugchudModule.md)\<[`JsonObject`](../../foundation/interfaces/JsonObject.md)\>[] | [runtime/core.ts:46](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L46) |
| <a id="property-options"></a> `options` | `readonly` | [`BugchudCoreOptions`](../interfaces/BugchudCoreOptions.md) | [runtime/core.ts:48](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L48) |

## Accessors

### ruleset

#### Get Signature

```ts
get ruleset(): BugchudRuleset;
```

Defined in: [runtime/core.ts:54](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L54)

The immutable ruleset currently mounted into this runtime instance.

##### Returns

[`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md)

## Methods

### validateRuleset()

```ts
validateRuleset(): ValidationResult;
```

Defined in: [runtime/core.ts:59](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L59)

Validate the mounted ruleset plus registered module metadata.

#### Returns

[`ValidationResult`](../interfaces/ValidationResult.md)

***

### validateCharacter()

```ts
validateCharacter(state): ValidationResult;
```

Defined in: [runtime/core.ts:64](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L64)

Validate a plain character snapshot against the ruleset and module validators.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | [`CharacterState`](../../state/interfaces/CharacterState.md) |

#### Returns

[`ValidationResult`](../interfaces/ValidationResult.md)

***

### validateNpc()

```ts
validateNpc(state): ValidationResult;
```

Defined in: [runtime/core.ts:75](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L75)

Validate a plain NPC/creature snapshot against the ruleset and module validators.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | [`NpcState`](../../state/interfaces/NpcState.md) |

#### Returns

[`ValidationResult`](../interfaces/ValidationResult.md)

***

### getExtensionRegistry()

```ts
getExtensionRegistry(namespace, registryName): 
  | Readonly<Record<string, JsonObject>>
  | undefined;
```

Defined in: [runtime/core.ts:86](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L86)

Read a namespaced extension registry contributed by a registered module.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `namespace` | `string` |
| `registryName` | `string` |

#### Returns

  \| `Readonly`\<`Record`\<`string`, [`JsonObject`](../../foundation/interfaces/JsonObject.md)\>\>
  \| `undefined`

***

### select()

```ts
select(
   namespace, 
   selectorName, ...
   args): unknown;
```

Defined in: [runtime/core.ts:93](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L93)

Execute a module selector for project-specific derived data or lookup behavior.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `namespace` | `string` |
| `selectorName` | `string` |
| ...`args` | readonly `unknown`[] |

#### Returns

`unknown`

***

### applyCharacterModuleHooks()

```ts
applyCharacterModuleHooks(model): void;
```

Defined in: [runtime/core.ts:102](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L102)

Invoke character hooks declared by registered modules on a fresh model instance.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `model` | [`CharacterModel`](CharacterModel.md) |

#### Returns

`void`

***

### applyNpcModuleHooks()

```ts
applyNpcModuleHooks(model): void;
```

Defined in: [runtime/core.ts:109](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L109)

Invoke NPC hooks declared by registered modules on a fresh model instance.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `model` | [`NpcModel`](NpcModel.md) |

#### Returns

`void`

***

### createCharacter()

```ts
createCharacter(input?): CharacterModel;
```

Defined in: [runtime/core.ts:116](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L116)

Create a new editable character model from initialization input.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`CharacterInitializationInput`](../../character/interfaces/CharacterInitializationInput.md) |

#### Returns

[`CharacterModel`](CharacterModel.md)

***

### characterFromState()

```ts
characterFromState(state): CharacterModel;
```

Defined in: [runtime/core.ts:121](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L121)

Rehydrate a character model from an existing plain snapshot.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | [`CharacterState`](../../state/interfaces/CharacterState.md) |

#### Returns

[`CharacterModel`](CharacterModel.md)

***

### createNpc()

```ts
createNpc(input?): NpcModel;
```

Defined in: [runtime/core.ts:126](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L126)

Create a new editable NPC model from initialization input.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`NpcInitializationInput`](../../npc/interfaces/NpcInitializationInput.md) |

#### Returns

[`NpcModel`](NpcModel.md)

***

### npcFromState()

```ts
npcFromState(state): NpcModel;
```

Defined in: [runtime/core.ts:131](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L131)

Rehydrate an NPC model from an existing creature-shaped snapshot.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | [`CreatureState`](../../state/interfaces/CreatureState.md) |

#### Returns

[`NpcModel`](NpcModel.md)

***

### createCreature()

```ts
createCreature(input?): CreatureModel;
```

Defined in: [runtime/core.ts:136](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L136)

Create a generic creature model without NPC-specific hook behavior.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`NpcInitializationInput`](../../npc/interfaces/NpcInitializationInput.md) |

#### Returns

[`CreatureModel`](CreatureModel.md)

***

### creatureFromState()

```ts
creatureFromState(state): CreatureModel;
```

Defined in: [runtime/core.ts:141](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L141)

Rehydrate a generic creature model from a plain snapshot.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | [`CreatureState`](../../state/interfaces/CreatureState.md) |

#### Returns

[`CreatureModel`](CreatureModel.md)

***

### createEncounter()

```ts
createEncounter(input?): EncounterModel;
```

Defined in: [runtime/core.ts:146](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L146)

Create a lightweight encounter wrapper around a fresh encounter snapshot.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`EncounterInitializationInput`](../interfaces/EncounterInitializationInput.md) |

#### Returns

[`EncounterModel`](EncounterModel.md)

***

### createCampaign()

```ts
createCampaign(input?): CampaignModel;
```

Defined in: [runtime/core.ts:151](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L151)

Create a lightweight campaign wrapper around a fresh campaign snapshot.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`CampaignInitializationInput`](../interfaces/CampaignInitializationInput.md) |

#### Returns

[`CampaignModel`](CampaignModel.md)

***

### createWorld()

```ts
createWorld(input?): WorldModel;
```

Defined in: [runtime/core.ts:156](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L156)

Create a lightweight world wrapper around a fresh world snapshot.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`WorldInitializationInput`](../interfaces/WorldInitializationInput.md) |

#### Returns

[`WorldModel`](WorldModel.md)

***

### mustGetDefinition()

```ts
mustGetDefinition<K>(refValue): CatalogEntry<K>;
```

Defined in: [runtime/core.ts:161](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L161)

Resolve a registry ref and throw if the target definition is missing.

#### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof [`ContentRegistries`](../../content/interfaces/ContentRegistries.md) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `refValue` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`K`\> |

#### Returns

`CatalogEntry`\<`K`\>

***

### searchByTag()

```ts
searchByTag(tag): readonly AnyCatalogEntry[];
```

Defined in: [runtime/core.ts:168](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L168)

Search authored definitions by tag across all registries.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tag` | `string` |

#### Returns

readonly `AnyCatalogEntry`[]

***

### getRace()

```ts
getRace(id): 
  | RaceDefinition
  | undefined;
```

Defined in: [runtime/core.ts:173](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L173)

Convenience lookup for a race definition by branded id.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | [`RaceId`](../../foundation/type-aliases/RaceId.md) |

#### Returns

  \| [`RaceDefinition`](../../content/interfaces/RaceDefinition.md)
  \| `undefined`

***

### getBackground()

```ts
getBackground(id): 
  | BackgroundDefinition
  | undefined;
```

Defined in: [runtime/core.ts:178](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L178)

Convenience lookup for a background definition by branded id.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | [`BackgroundId`](../../foundation/type-aliases/BackgroundId.md) |

#### Returns

  \| [`BackgroundDefinition`](../../content/interfaces/BackgroundDefinition.md)
  \| `undefined`

***

### getCreature()

```ts
getCreature(id): 
  | CreatureDefinition
  | undefined;
```

Defined in: [runtime/core.ts:183](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L183)

Convenience lookup for a creature definition by branded id.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | [`CreatureId`](../../foundation/type-aliases/CreatureId.md) |

#### Returns

  \| [`CreatureDefinition`](../../content/interfaces/CreatureDefinition.md)
  \| `undefined`

***

### listDreams()

```ts
listDreams(): readonly DreamDefinition[];
```

Defined in: [runtime/core.ts:188](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/core.ts#L188)

List every dream definition in the active ruleset.

#### Returns

readonly [`DreamDefinition`](../../content/interfaces/DreamDefinition.md)[]
