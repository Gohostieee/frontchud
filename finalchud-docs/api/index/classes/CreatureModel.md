[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / CreatureModel

# Class: CreatureModel

Defined in: [npc/model.ts:59](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L59)

Editable runtime wrapper for `CreatureState`.

This is the common base class for non-player actors. `NpcModel` extends it
with the same snapshot shape but receives NPC-specific module hooks.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extended by

- [`NpcModel`](NpcModel.md)

## Constructors

### Constructor

```ts
new CreatureModel(core, state): CreatureModel;
```

Defined in: [npc/model.ts:62](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L62)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `state` | [`CreatureState`](../../state/interfaces/CreatureState.md) |

#### Returns

`CreatureModel`

## Methods

### create()

```ts
static create(core, input?): CreatureModel;
```

Defined in: [npc/model.ts:73](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L73)

Create a fresh creature model from initialization input.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `input` | \{ \} |

#### Returns

`CreatureModel`

***

### fromState()

```ts
static fromState(core, state): CreatureModel;
```

Defined in: [npc/model.ts:78](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L78)

Rehydrate a model from an existing plain `CreatureState`.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `state` | [`CreatureState`](../../state/interfaces/CreatureState.md) |

#### Returns

`CreatureModel`

***

### fromJSON()

```ts
static fromJSON(core, payload): CreatureModel;
```

Defined in: [npc/model.ts:83](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L83)

Rehydrate a model from a serialized creature snapshot envelope or JSON string.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `payload` | `unknown` |

#### Returns

`CreatureModel`

***

### setIdentity()

```ts
setIdentity(patch): this;
```

Defined in: [npc/model.ts:88](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L88)

Patch the creature identity slice.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `patch` | `Partial`\<[`CreatureIdentityState`](../../state/interfaces/CreatureIdentityState.md)\> |

#### Returns

`this`

***

### setName()

```ts
setName(name): this;
```

Defined in: [npc/model.ts:94](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L94)

Set the display name for the creature.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |

#### Returns

`this`

***

### setActorKind()

```ts
setActorKind(actorKind): this;
```

Defined in: [npc/model.ts:100](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L100)

Set the encounter actor kind for this creature-shaped snapshot.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `actorKind` | `"creature"` \| `"npc"` \| `"mount"` |

#### Returns

`this`

***

### setAllegiance()

```ts
setAllegiance(allegiance): this;
```

Defined in: [npc/model.ts:106](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L106)

Set or replace the creature's allegiance label.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `allegiance` | `string` |

#### Returns

`this`

***

### assignLoadout()

```ts
assignLoadout(npcLoadoutRef): this;
```

Defined in: [npc/model.ts:112](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L112)

Apply an authored NPC loadout, including gear, spells, and faith refs.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `npcLoadoutRef` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"npcLoadout"`\> |

#### Returns

`this`

***

### grantItem()

```ts
grantItem(stack): this;
```

Defined in: [npc/model.ts:156](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L156)

Add or merge an owned item stack into inventory.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `stack` | [`OwnedItemStack`](../../state/interfaces/OwnedItemStack.md) |

#### Returns

`this`

***

### equip()

```ts
equip(itemRef): this;
```

Defined in: [npc/model.ts:168](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L168)

Mark an owned item as equipped and update weapon/armor slots.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemRef` | [`OwnedDefinitionRef`](../../state/type-aliases/OwnedDefinitionRef.md) |

#### Returns

`this`

***

### revokeItem()

```ts
revokeItem(itemRef, quantity?): this;
```

Defined in: [npc/model.ts:180](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L180)

Remove quantity from an owned item stack, preferring loose and contained copies first.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemRef` | [`OwnedDefinitionRef`](../../state/type-aliases/OwnedDefinitionRef.md) |
| `quantity` | `number` |

#### Returns

`this`

***

### unequip()

```ts
unequip(itemRef): this;
```

Defined in: [npc/model.ts:193](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L193)

Unequip a matching combat stack or clear a legacy non-combat equipped ref.

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

Defined in: [npc/model.ts:205](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L205)

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

Defined in: [npc/model.ts:218](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L218)

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

Defined in: [npc/model.ts:231](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L231)

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

Defined in: [npc/model.ts:244](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L244)

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

Defined in: [npc/model.ts:257](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L257)

Stow the currently equipped main-hand item.

#### Returns

`this`

***

### unequipFromOffHand()

```ts
unequipFromOffHand(): this;
```

Defined in: [npc/model.ts:269](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L269)

Stow the currently equipped off-hand item.

#### Returns

`this`

***

### unequipArmor()

```ts
unequipArmor(): this;
```

Defined in: [npc/model.ts:281](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L281)

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

Defined in: [npc/model.ts:293](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L293)

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

Defined in: [npc/model.ts:311](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L311)

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

Defined in: [npc/model.ts:329](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L329)

Stow equipped combat gear of the requested ref back into loose inventory.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemRef` | [`OwnedDefinitionRef`](../../state/type-aliases/OwnedDefinitionRef.md) |
| `quantity` | `number` |

#### Returns

`this`

***

### setFaith()

```ts
setFaith(patch): this;
```

Defined in: [npc/model.ts:342](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L342)

Patch the faith slice.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `patch` | `Partial`\<[`FaithState`](../../state/interfaces/FaithState.md)\> |

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

Defined in: [npc/model.ts:348](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L348)

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

Defined in: [npc/model.ts:354](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L354)

Update aggregate wound totals for this creature snapshot.

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

Defined in: [npc/model.ts:370](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L370)

Patch one core body part without resolving any combat logic.

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

Defined in: [npc/model.ts:382](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L382)

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

Defined in: [npc/model.ts:397](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L397)

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

Defined in: [npc/model.ts:405](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L405)

Add a mutation ref if it is not already present.

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

Defined in: [npc/model.ts:411](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L411)

Add a bionic ref if it is not already present.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `bionicRef` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"bionic"`\> |

#### Returns

`this`

***

### setExtension()

```ts
setExtension(namespace, payload): this;
```

Defined in: [npc/model.ts:417](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L417)

Store namespaced extension data on the snapshot.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `namespace` | `string` |
| `payload` | [`JsonObject`](../../foundation/interfaces/JsonObject.md) \| `undefined` |

#### Returns

`this`

***

### mergeTemplate()

```ts
mergeTemplate(input?): this;
```

Defined in: [npc/model.ts:426](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L426)

Rebuild the snapshot from authored creature/loadout templates plus overrides.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`NpcInitializationInput`](../../npc/interfaces/NpcInitializationInput.md) |

#### Returns

`this`

***

### getCombatProfileDraft()

```ts
getCombatProfileDraft(): ComputedCombatProfile;
```

Defined in: [npc/model.ts:448](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L448)

Compute a combat-facing read model from the current state plus ruleset.

#### Returns

[`ComputedCombatProfile`](../../views/interfaces/ComputedCombatProfile.md)

***

### toEncounterActor()

```ts
toEncounterActor(teamId, zoneId): EncounterActorState;
```

Defined in: [npc/model.ts:453](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L453)

Convert the current creature into an encounter actor snapshot.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `teamId` | `string` |
| `zoneId` | `string` |

#### Returns

[`EncounterActorState`](../../state/interfaces/EncounterActorState.md)

***

### validate()

```ts
validate(): ValidationResult;
```

Defined in: [npc/model.ts:472](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L472)

Run built-in and module-provided validation over the current snapshot.

#### Returns

[`ValidationResult`](../interfaces/ValidationResult.md)

***

### getIssues()

```ts
getIssues(): readonly ValidationIssue[];
```

Defined in: [npc/model.ts:477](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L477)

Convenience accessor for just the validation issues array.

#### Returns

readonly [`ValidationIssue`](../interfaces/ValidationIssue.md)[]

***

### toState()

```ts
toState(): CreatureState;
```

Defined in: [npc/model.ts:482](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L482)

Return a detached plain creature snapshot.

#### Returns

[`CreatureState`](../../state/interfaces/CreatureState.md)

***

### toJSON()

```ts
toJSON(): SerializedSnapshot<"creature" | "npc">;
```

Defined in: [npc/model.ts:487](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L487)

Serialize the current snapshot into a tagged snapshot envelope.

#### Returns

[`SerializedSnapshot`](../interfaces/SerializedSnapshot.md)\<`"creature"` \| `"npc"`\>

***

### clone()

```ts
clone(): CreatureModel;
```

Defined in: [npc/model.ts:492](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/model.ts#L492)

Create a new model instance from the current snapshot contents.

#### Returns

`CreatureModel`
