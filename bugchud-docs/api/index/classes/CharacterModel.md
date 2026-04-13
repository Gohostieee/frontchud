[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / CharacterModel

# Class: CharacterModel

Defined in: character/model.ts:74

Editable runtime wrapper for `CharacterState`.

Use this class in application code when you want ergonomic mutator methods,
draft combat projections, validation, and safe serialization while keeping
the underlying source of truth as a plain snapshot.

## Constructors

### Constructor

```ts
new CharacterModel(core, state): CharacterModel;
```

Defined in: character/model.ts:77

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `state` | [`CharacterState`](../../state/interfaces/CharacterState.md) |

#### Returns

`CharacterModel`

## Accessors

### snapshot

#### Get Signature

```ts
get snapshot(): CharacterState;
```

Defined in: character/model.ts:98

Detached clone of the current plain snapshot.

##### Returns

[`CharacterState`](../../state/interfaces/CharacterState.md)

***

### id

#### Get Signature

```ts
get id(): CharacterId;
```

Defined in: character/model.ts:103

Branded id of the current character snapshot.

##### Returns

[`CharacterId`](../../foundation/type-aliases/CharacterId.md)

## Methods

### create()

```ts
static create(core, input?): CharacterModel;
```

Defined in: character/model.ts:83

Create a fresh character model from initialization input.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `input` | \{ \} |

#### Returns

`CharacterModel`

***

### fromState()

```ts
static fromState(core, state): CharacterModel;
```

Defined in: character/model.ts:88

Rehydrate a model from an existing plain `CharacterState`.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `state` | [`CharacterState`](../../state/interfaces/CharacterState.md) |

#### Returns

`CharacterModel`

***

### fromJSON()

```ts
static fromJSON(core, payload): CharacterModel;
```

Defined in: character/model.ts:93

Rehydrate a model from a serialized snapshot envelope or JSON string.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `payload` | `unknown` |

#### Returns

`CharacterModel`

***

### assignIdentity()

```ts
assignIdentity(patch): this;
```

Defined in: character/model.ts:108

Patch the identity slice, deduplicating background refs.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `patch` | `Partial`\<[`CharacterIdentityState`](../../state/interfaces/CharacterIdentityState.md)\> |

#### Returns

`this`

***

### setName()

```ts
setName(name): this;
```

Defined in: character/model.ts:118

Set the displayed character name.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |

#### Returns

`this`

***

### setRace()

```ts
setRace(raceRef): this;
```

Defined in: character/model.ts:124

Replace the current race ref.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `raceRef` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"race"`\> |

#### Returns

`this`

***

### setOrigin()

```ts
setOrigin(originRef): this;
```

Defined in: character/model.ts:130

Replace the current origin ref.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `originRef` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"origin"`\> |

#### Returns

`this`

***

### addBackground()

```ts
addBackground(backgroundRef): this;
```

Defined in: character/model.ts:136

Add a background if it is not already present.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `backgroundRef` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"background"`\> |

#### Returns

`this`

***

### removeBackground()

```ts
removeBackground(backgroundId): this;
```

Defined in: character/model.ts:142

Remove a background by branded id.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `backgroundId` | [`BackgroundId`](../../foundation/type-aliases/BackgroundId.md) |

#### Returns

`this`

***

### addDream()

```ts
addDream(dreamRef): this;
```

Defined in: character/model.ts:150

Add a dream and recompute derived state that depends on progression.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `dreamRef` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"dream"`\> |

#### Returns

`this`

***

### removeDream()

```ts
removeDream(dreamRef): this;
```

Defined in: character/model.ts:157

Remove a dream and recompute derived state that depends on progression.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `dreamRef` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"dream"`\> |

#### Returns

`this`

***

### grantItem()

```ts
grantItem(stack): this;
```

Defined in: character/model.ts:166

Add or merge an owned item stack into inventory.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `stack` | [`OwnedItemStack`](../../state/interfaces/OwnedItemStack.md) |

#### Returns

`this`

***

### revokeItem()

```ts
revokeItem(itemRef, quantity?): this;
```

Defined in: character/model.ts:173

Remove quantity from an owned item stack and unequip it if needed.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemRef` | [`OwnedDefinitionRef`](../../state/type-aliases/OwnedDefinitionRef.md) |
| `quantity` | `number` |

#### Returns

`this`

***

### equip()

```ts
equip(itemRef): this;
```

Defined in: character/model.ts:181

Mark an owned item as equipped and update weapon/armor slots.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemRef` | [`OwnedDefinitionRef`](../../state/type-aliases/OwnedDefinitionRef.md) |

#### Returns

`this`

***

### unequip()

```ts
unequip(itemRef): this;
```

Defined in: character/model.ts:204

Unequip an item and clear any slot-specific references that point at it.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemRef` | [`OwnedDefinitionRef`](../../state/type-aliases/OwnedDefinitionRef.md) |

#### Returns

`this`

***

### setResource()

```ts
setResource(
   kind, 
   current, 
   maximum?): this;
```

Defined in: character/model.ts:229

Set or replace a tracked resource pool.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `kind` | \| `"focus"` \| `"xom"` \| `"ammo"` \| `"currency"` \| `"health"` \| `"manaDice"` \| `"fate"` \| `"fuel"` \| `"morale"` \| `"supplies"` \| `"durability"` \| `"shieldIntegrity"` |
| `current` | `number` |
| `maximum` | `number` |

#### Returns

`this`

***

### setWounds()

```ts
setWounds(currentWounds, maximumWounds?): this;
```

Defined in: character/model.ts:235

Update wound totals and recompute dependent derived state.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `currentWounds` | `number` |
| `maximumWounds` | `number` |

#### Returns

`this`

***

### applyMutation()

```ts
applyMutation(mutationRef): this;
```

Defined in: character/model.ts:243

Add a mutation ref if it is not already present.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `mutationRef` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"mutation"`\> |

#### Returns

`this`

***

### removeMutation()

```ts
removeMutation(mutationRef): this;
```

Defined in: character/model.ts:249

Remove a mutation ref.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `mutationRef` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"mutation"`\> |

#### Returns

`this`

***

### installBionic()

```ts
installBionic(bionicRef): this;
```

Defined in: character/model.ts:257

Add a bionic ref if it is not already present.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `bionicRef` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"bionic"`\> |

#### Returns

`this`

***

### removeBionic()

```ts
removeBionic(bionicRef): this;
```

Defined in: character/model.ts:263

Remove a bionic ref.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `bionicRef` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"bionic"`\> |

#### Returns

`this`

***

### setFaith()

```ts
setFaith(patch): this;
```

Defined in: character/model.ts:271

Patch the faith slice.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `patch` | `Partial`\<[`FaithState`](../../state/interfaces/FaithState.md)\> |

#### Returns

`this`

***

### setSocial()

```ts
setSocial(patch): this;
```

Defined in: character/model.ts:277

Patch the social and religious narrative slice.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `patch` | `Partial`\<[`SocialReligiousState`](../../state/interfaces/SocialReligiousState.md)\> |

#### Returns

`this`

***

### setExtension()

```ts
setExtension(namespace, payload): this;
```

Defined in: character/model.ts:283

Store namespaced extension data on the snapshot.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `namespace` | `string` |
| `payload` | [`JsonObject`](../../foundation/interfaces/JsonObject.md) \| `undefined` |

#### Returns

`this`

***

### getEquippedWeapon()

```ts
getEquippedWeapon(): 
  | WeaponDefinition
  | undefined;
```

Defined in: character/model.ts:292

Resolve the currently equipped primary weapon definition, if any.

#### Returns

  \| [`WeaponDefinition`](../../content/interfaces/WeaponDefinition.md)
  \| `undefined`

***

### getKnownDreams()

```ts
getKnownDreams(): DreamDefinition[];
```

Defined in: character/model.ts:299

Resolve the authored dream definitions currently known by the character.

#### Returns

[`DreamDefinition`](../../content/interfaces/DreamDefinition.md)[]

***

### getAvailableBackgrounds()

```ts
getAvailableBackgrounds(): readonly BackgroundDefinition[];
```

Defined in: character/model.ts:307

Query the catalog for backgrounds valid for the character's current origin.

#### Returns

readonly [`BackgroundDefinition`](../../content/interfaces/BackgroundDefinition.md)[]

***

### getCombatProfileDraft()

```ts
getCombatProfileDraft(): ComputedCombatProfile;
```

Defined in: character/model.ts:314

Compute a combat-facing read model from the current state plus ruleset.

#### Returns

[`ComputedCombatProfile`](../../views/interfaces/ComputedCombatProfile.md)

***

### validate()

```ts
validate(): ValidationResult;
```

Defined in: character/model.ts:319

Run built-in and module-provided validation over the current snapshot.

#### Returns

[`ValidationResult`](../interfaces/ValidationResult.md)

***

### getIssues()

```ts
getIssues(): readonly ValidationIssue[];
```

Defined in: character/model.ts:324

Convenience accessor for just the validation issues array.

#### Returns

readonly [`ValidationIssue`](../interfaces/ValidationIssue.md)[]

***

### refreshDerivedState()

```ts
refreshDerivedState(): this;
```

Defined in: character/model.ts:329

Recompute derived stats, unlocked tags, and resource pools in place.

#### Returns

`this`

***

### toState()

```ts
toState(): CharacterState;
```

Defined in: character/model.ts:335

Return a detached plain character snapshot.

#### Returns

[`CharacterState`](../../state/interfaces/CharacterState.md)

***

### toJSON()

```ts
toJSON(): SerializedSnapshot<"character">;
```

Defined in: character/model.ts:340

Serialize the current snapshot into a tagged snapshot envelope.

#### Returns

[`SerializedSnapshot`](../interfaces/SerializedSnapshot.md)\<`"character"`\>

***

### clone()

```ts
clone(): CharacterModel;
```

Defined in: character/model.ts:345

Create a new model instance from the current snapshot contents.

#### Returns

`CharacterModel`
