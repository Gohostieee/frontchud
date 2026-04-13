[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / CreatureModel

# Class: CreatureModel

Defined in: npc/model.ts:57

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

Defined in: npc/model.ts:60

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

Defined in: npc/model.ts:65

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

Defined in: npc/model.ts:70

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

Defined in: npc/model.ts:75

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

Defined in: npc/model.ts:80

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

Defined in: npc/model.ts:86

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

Defined in: npc/model.ts:92

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

Defined in: npc/model.ts:98

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

Defined in: npc/model.ts:104

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

Defined in: npc/model.ts:138

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

Defined in: npc/model.ts:145

Mark an owned item as equipped and update weapon/armor slots.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemRef` | [`OwnedDefinitionRef`](../../state/type-aliases/OwnedDefinitionRef.md) |

#### Returns

`this`

***

### setFaith()

```ts
setFaith(patch): this;
```

Defined in: npc/model.ts:164

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

Defined in: npc/model.ts:170

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

### applyMutation()

```ts
applyMutation(mutationRef): this;
```

Defined in: npc/model.ts:176

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

Defined in: npc/model.ts:182

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

Defined in: npc/model.ts:188

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

Defined in: npc/model.ts:197

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

Defined in: npc/model.ts:219

Compute a combat-facing read model from the current state plus ruleset.

#### Returns

[`ComputedCombatProfile`](../../views/interfaces/ComputedCombatProfile.md)

***

### toEncounterActor()

```ts
toEncounterActor(teamId, zoneId): EncounterActorState;
```

Defined in: npc/model.ts:224

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

Defined in: npc/model.ts:243

Run built-in and module-provided validation over the current snapshot.

#### Returns

[`ValidationResult`](../interfaces/ValidationResult.md)

***

### getIssues()

```ts
getIssues(): readonly ValidationIssue[];
```

Defined in: npc/model.ts:248

Convenience accessor for just the validation issues array.

#### Returns

readonly [`ValidationIssue`](../interfaces/ValidationIssue.md)[]

***

### toState()

```ts
toState(): CreatureState;
```

Defined in: npc/model.ts:253

Return a detached plain creature snapshot.

#### Returns

[`CreatureState`](../../state/interfaces/CreatureState.md)

***

### toJSON()

```ts
toJSON(): SerializedSnapshot<"creature" | "npc">;
```

Defined in: npc/model.ts:258

Serialize the current snapshot into a tagged snapshot envelope.

#### Returns

[`SerializedSnapshot`](../interfaces/SerializedSnapshot.md)\<`"creature"` \| `"npc"`\>

***

### clone()

```ts
clone(): CreatureModel;
```

Defined in: npc/model.ts:263

Create a new model instance from the current snapshot contents.

#### Returns

`CreatureModel`
