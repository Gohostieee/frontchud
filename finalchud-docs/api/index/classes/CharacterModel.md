[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / CharacterModel

# Class: CharacterModel

Defined in: [character/model.ts:54](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L54)

Editable runtime wrapper for `CharacterState`.

Use this class in application code when you want ergonomic mutator methods,
draft combat projections, validation, and safe serialization while keeping
the underlying source of truth as a plain snapshot.

## Constructors

### Constructor

```ts
new CharacterModel(core, state): CharacterModel;
```

Defined in: [character/model.ts:57](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L57)

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

Defined in: [character/model.ts:84](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L84)

Detached clone of the current plain snapshot.

##### Returns

[`CharacterState`](../../state/interfaces/CharacterState.md)

***

### id

#### Get Signature

```ts
get id(): CharacterId;
```

Defined in: [character/model.ts:89](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L89)

Branded id of the current character snapshot.

##### Returns

[`CharacterId`](../../foundation/type-aliases/CharacterId.md)

## Methods

### create()

```ts
static create(core, input?): CharacterModel;
```

Defined in: [character/model.ts:69](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L69)

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

Defined in: [character/model.ts:74](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L74)

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

Defined in: [character/model.ts:79](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L79)

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

Defined in: [character/model.ts:94](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L94)

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

Defined in: [character/model.ts:104](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L104)

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

Defined in: [character/model.ts:110](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L110)

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

Defined in: [character/model.ts:116](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L116)

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

Defined in: [character/model.ts:122](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L122)

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

Defined in: [character/model.ts:128](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L128)

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

Defined in: [character/model.ts:136](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L136)

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

Defined in: [character/model.ts:143](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L143)

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

Defined in: [character/model.ts:152](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L152)

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

Defined in: [character/model.ts:164](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L164)

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

Defined in: [character/model.ts:177](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L177)

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

Defined in: [character/model.ts:189](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L189)

Unequip an item and clear any slot-specific references that point at it.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemRef` | [`OwnedDefinitionRef`](../../state/type-aliases/OwnedDefinitionRef.md) |

#### Returns

`this`

***

### equipToMainHand()

```ts
equipToMainHand(itemRef): this;
```

Defined in: [character/model.ts:201](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L201)

Equip a one-handed weapon or shield into the main hand without auto-swapping.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemRef` | [`OwnedDefinitionRef`](../../state/type-aliases/OwnedDefinitionRef.md) |

#### Returns

`this`

***

### equipToOffHand()

```ts
equipToOffHand(itemRef): this;
```

Defined in: [character/model.ts:214](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L214)

Equip a one-handed weapon or shield into the off hand without auto-swapping.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemRef` | [`OwnedDefinitionRef`](../../state/type-aliases/OwnedDefinitionRef.md) |

#### Returns

`this`

***

### equipTwoHanded()

```ts
equipTwoHanded(itemRef): this;
```

Defined in: [character/model.ts:227](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L227)

Equip a two-handed weapon when both hands are free.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemRef` | [`OwnedDefinitionRef`](../../state/type-aliases/OwnedDefinitionRef.md) |

#### Returns

`this`

***

### equipArmor()

```ts
equipArmor(itemRef): this;
```

Defined in: [character/model.ts:240](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L240)

Equip armor when the armor slot is free.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemRef` | [`OwnedDefinitionRef`](../../state/type-aliases/OwnedDefinitionRef.md) |

#### Returns

`this`

***

### unequipFromMainHand()

```ts
unequipFromMainHand(): this;
```

Defined in: [character/model.ts:253](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L253)

Stow the currently equipped main-hand item.

#### Returns

`this`

***

### unequipFromOffHand()

```ts
unequipFromOffHand(): this;
```

Defined in: [character/model.ts:265](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L265)

Stow the currently equipped off-hand item.

#### Returns

`this`

***

### unequipArmor()

```ts
unequipArmor(): this;
```

Defined in: [character/model.ts:277](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L277)

Stow the currently equipped armor stack.

#### Returns

`this`

***

### moveToContainer()

```ts
moveToContainer(
   itemRef, 
   quantity, 
   containerId): this;
```

Defined in: [character/model.ts:289](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L289)

Move a loose stack into an existing container.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemRef` | [`OwnedDefinitionRef`](../../state/type-aliases/OwnedDefinitionRef.md) |
| `quantity` | `number` |
| `containerId` | `string` |

#### Returns

`this`

***

### removeFromContainer()

```ts
removeFromContainer(
   itemRef, 
   quantity, 
   containerId): this;
```

Defined in: [character/model.ts:307](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L307)

Remove a contained stack back into loose inventory.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemRef` | [`OwnedDefinitionRef`](../../state/type-aliases/OwnedDefinitionRef.md) |
| `quantity` | `number` |
| `containerId` | `string` |

#### Returns

`this`

***

### stowEquipped()

```ts
stowEquipped(itemRef, quantity?): this;
```

Defined in: [character/model.ts:325](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L325)

Stow equipped combat gear of the requested ref back into loose inventory.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemRef` | [`OwnedDefinitionRef`](../../state/type-aliases/OwnedDefinitionRef.md) |
| `quantity` | `number` |

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

Defined in: [character/model.ts:338](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L338)

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

Defined in: [character/model.ts:344](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L344)

Update wound totals and recompute dependent derived state.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `currentWounds` | `number` |
| `maximumWounds` | `number` |

#### Returns

`this`

***

### patchBodyPart()

```ts
patchBodyPart(location, patch): this;
```

Defined in: [character/model.ts:352](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L352)

Patch one core body part without attaching any combat behavior to it.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `location` | `"head"` \| `"torso"` \| `"rightArm"` \| `"leftArm"` \| `"rightLeg"` \| `"leftLeg"` |
| `patch` | `Partial`\<`Omit`\<[`BodyPartState`](../../state/interfaces/BodyPartState.md), `"id"`\>\> |

#### Returns

`this`

***

### upsertAdditionalBodyPart()

```ts
upsertAdditionalBodyPart(part): this;
```

Defined in: [character/model.ts:364](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L364)

Add or replace an extra tracked body part such as a tail, wing, or extra arm.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `part` | [`BodyPartState`](../../state/interfaces/BodyPartState.md) |

#### Returns

`this`

***

### removeAdditionalBodyPart()

```ts
removeAdditionalBodyPart(partId): this;
```

Defined in: [character/model.ts:379](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L379)

Remove one additional tracked body part by id.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `partId` | `string` |

#### Returns

`this`

***

### applyMutation()

```ts
applyMutation(mutationRef): this;
```

Defined in: [character/model.ts:387](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L387)

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

Defined in: [character/model.ts:393](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L393)

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

Defined in: [character/model.ts:401](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L401)

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

Defined in: [character/model.ts:407](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L407)

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

Defined in: [character/model.ts:415](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L415)

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

Defined in: [character/model.ts:421](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L421)

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

Defined in: [character/model.ts:427](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L427)

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

Defined in: [character/model.ts:436](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L436)

Resolve the currently equipped primary weapon definition, if any.

#### Returns

  \| [`WeaponDefinition`](../../content/interfaces/WeaponDefinition.md)
  \| `undefined`

***

### getKnownDreams()

```ts
getKnownDreams(): DreamDefinition[];
```

Defined in: [character/model.ts:443](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L443)

Resolve the authored dream definitions currently known by the character.

#### Returns

[`DreamDefinition`](../../content/interfaces/DreamDefinition.md)[]

***

### getAvailableBackgrounds()

```ts
getAvailableBackgrounds(): readonly BackgroundDefinition[];
```

Defined in: [character/model.ts:451](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L451)

Query the catalog for backgrounds valid for the character's current origin.

#### Returns

readonly [`BackgroundDefinition`](../../content/interfaces/BackgroundDefinition.md)[]

***

### getCombatProfileDraft()

```ts
getCombatProfileDraft(): ComputedCombatProfile;
```

Defined in: [character/model.ts:458](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L458)

Compute a combat-facing read model from the current state plus ruleset.

#### Returns

[`ComputedCombatProfile`](../../views/interfaces/ComputedCombatProfile.md)

***

### validate()

```ts
validate(): ValidationResult;
```

Defined in: [character/model.ts:463](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L463)

Run built-in and module-provided validation over the current snapshot.

#### Returns

[`ValidationResult`](../interfaces/ValidationResult.md)

***

### getIssues()

```ts
getIssues(): readonly ValidationIssue[];
```

Defined in: [character/model.ts:468](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L468)

Convenience accessor for just the validation issues array.

#### Returns

readonly [`ValidationIssue`](../interfaces/ValidationIssue.md)[]

***

### refreshDerivedState()

```ts
refreshDerivedState(): this;
```

Defined in: [character/model.ts:473](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L473)

Recompute derived stats, unlocked tags, and resource pools in place.

#### Returns

`this`

***

### toState()

```ts
toState(): CharacterState;
```

Defined in: [character/model.ts:479](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L479)

Return a detached plain character snapshot.

#### Returns

[`CharacterState`](../../state/interfaces/CharacterState.md)

***

### toJSON()

```ts
toJSON(): SerializedSnapshot<"character">;
```

Defined in: [character/model.ts:484](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L484)

Serialize the current snapshot into a tagged snapshot envelope.

#### Returns

[`SerializedSnapshot`](../interfaces/SerializedSnapshot.md)\<`"character"`\>

***

### clone()

```ts
clone(): CharacterModel;
```

Defined in: [character/model.ts:489](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/character/model.ts#L489)

Create a new model instance from the current snapshot contents.

#### Returns

`CharacterModel`
