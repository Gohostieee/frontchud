[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / RulesetCatalog

# Class: RulesetCatalog

Defined in: runtime/catalog.ts:60

Indexed lookup facade over an immutable [BugchudRuleset](../../content/interfaces/BugchudRuleset.md).

Apps should prefer this class over repeated ad hoc registry traversal when
resolving refs, querying by tag/slug/name, or presenting creation-flow options.

## Constructors

### Constructor

```ts
new RulesetCatalog(ruleset): RulesetCatalog;
```

Defined in: runtime/catalog.ts:65

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ruleset` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) |

#### Returns

`RulesetCatalog`

## Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-ruleset"></a> `ruleset` | `readonly` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) | runtime/catalog.ts:65 |

## Methods

### validate()

```ts
validate(): ValidationResult;
```

Defined in: runtime/catalog.ts:81

Run structural ruleset validation without needing a `BugchudCore` instance.

#### Returns

[`ValidationResult`](../interfaces/ValidationResult.md)

***

### listByKind()

```ts
listByKind<K>(kind): readonly CatalogEntry<K>[];
```

Defined in: runtime/catalog.ts:86

List every definition currently stored in one registry family.

#### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof [`ContentRegistries`](../../content/interfaces/ContentRegistries.md) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `kind` | `K` |

#### Returns

readonly `CatalogEntry`\<`K`\>[]

***

### getByKind()

```ts
getByKind<K>(kind, id): CatalogEntry<K> | undefined;
```

Defined in: runtime/catalog.ts:91

Look up a definition by registry kind and branded id.

#### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof [`ContentRegistries`](../../content/interfaces/ContentRegistries.md) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `kind` | `K` |
| `id` | `string` |

#### Returns

`CatalogEntry`\<`K`\> \| `undefined`

***

### mustGetByKind()

```ts
mustGetByKind<K>(kind, id): CatalogEntry<K>;
```

Defined in: runtime/catalog.ts:96

Look up a definition by kind/id and throw if it does not exist.

#### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof [`ContentRegistries`](../../content/interfaces/ContentRegistries.md) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `kind` | `K` |
| `id` | `string` |

#### Returns

`CatalogEntry`\<`K`\>

***

### resolveRef()

```ts
resolveRef<K>(refValue): CatalogEntry<K> | undefined;
```

Defined in: runtime/catalog.ts:106

Resolve a typed registry ref into its authored definition.

#### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof [`ContentRegistries`](../../content/interfaces/ContentRegistries.md) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `refValue` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`K`\> |

#### Returns

`CatalogEntry`\<`K`\> \| `undefined`

***

### mustResolveRef()

```ts
mustResolveRef<K>(refValue): CatalogEntry<K>;
```

Defined in: runtime/catalog.ts:111

Resolve a typed registry ref and throw if it is invalid.

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

### findBySlug()

```ts
findBySlug<K>(kind, slug): CatalogEntry<K> | undefined;
```

Defined in: runtime/catalog.ts:116

Find a definition by its registry-scoped slug.

#### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof [`ContentRegistries`](../../content/interfaces/ContentRegistries.md) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `kind` | `K` |
| `slug` | `string` |

#### Returns

`CatalogEntry`\<`K`\> \| `undefined`

***

### findByName()

```ts
findByName<K>(kind, name): CatalogEntry<K> | undefined;
```

Defined in: runtime/catalog.ts:121

Find a definition by its registry-scoped display name.

#### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof [`ContentRegistries`](../../content/interfaces/ContentRegistries.md) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `kind` | `K` |
| `name` | `string` |

#### Returns

`CatalogEntry`\<`K`\> \| `undefined`

***

### searchByTag()

```ts
searchByTag(tag, kind?): readonly AnyCatalogEntry[];
```

Defined in: runtime/catalog.ts:126

Search indexed definitions by tag, optionally narrowed to one registry kind.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tag` | `string` |
| `kind?` | keyof ContentRegistries |

#### Returns

readonly `AnyCatalogEntry`[]

***

### getCreationOptions()

```ts
getCreationOptions(query?): object;
```

Defined in: runtime/catalog.ts:137

Return app-friendly options for character creation.

The background list is filtered by the chosen origin when possible so UI
flows can avoid duplicating ruleset traversal logic.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `query` | [`CreationOptionsQuery`](../interfaces/CreationOptionsQuery.md) |

#### Returns

`object`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `races` | readonly [`RaceDefinition`](../../content/interfaces/RaceDefinition.md)[] | runtime/catalog.ts:147 |
| `origins` | readonly [`OriginDefinition`](../../content/interfaces/OriginDefinition.md)[] | runtime/catalog.ts:148 |
| `backgrounds` | readonly [`BackgroundDefinition`](../../content/interfaces/BackgroundDefinition.md)[] | runtime/catalog.ts:149 |
| `faithOptions` | readonly [`FaithRef`](../../content/type-aliases/FaithRef.md)[] | runtime/catalog.ts:150 |

***

### getRace()

```ts
getRace(id): 
  | RaceDefinition
  | undefined;
```

Defined in: runtime/catalog.ts:155

Convenience lookup for a race definition by id.

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

Defined in: runtime/catalog.ts:160

Convenience lookup for a background definition by id.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | [`BackgroundId`](../../foundation/type-aliases/BackgroundId.md) |

#### Returns

  \| [`BackgroundDefinition`](../../content/interfaces/BackgroundDefinition.md)
  \| `undefined`

***

### getDream()

```ts
getDream(id): 
  | DreamDefinition
  | undefined;
```

Defined in: runtime/catalog.ts:165

Convenience lookup for a dream definition by id.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | [`DreamId`](../../foundation/type-aliases/DreamId.md) |

#### Returns

  \| [`DreamDefinition`](../../content/interfaces/DreamDefinition.md)
  \| `undefined`

***

### getCreature()

```ts
getCreature(id): 
  | CreatureDefinition
  | undefined;
```

Defined in: runtime/catalog.ts:170

Convenience lookup for a creature definition by id.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | [`CreatureId`](../../foundation/type-aliases/CreatureId.md) |

#### Returns

  \| [`CreatureDefinition`](../../content/interfaces/CreatureDefinition.md)
  \| `undefined`

***

### getNpcLoadout()

```ts
getNpcLoadout(id): 
  | NpcLoadoutDefinition
  | undefined;
```

Defined in: runtime/catalog.ts:175

Convenience lookup for an NPC loadout definition by id.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | [`NpcLoadoutId`](../../foundation/type-aliases/NpcLoadoutId.md) |

#### Returns

  \| [`NpcLoadoutDefinition`](../../content/interfaces/NpcLoadoutDefinition.md)
  \| `undefined`

***

### getWeapon()

```ts
getWeapon(id): 
  | WeaponDefinition
  | undefined;
```

Defined in: runtime/catalog.ts:180

Convenience lookup for a weapon definition by id.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | [`WeaponId`](../../foundation/type-aliases/WeaponId.md) |

#### Returns

  \| [`WeaponDefinition`](../../content/interfaces/WeaponDefinition.md)
  \| `undefined`
