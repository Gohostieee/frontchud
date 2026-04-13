[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / NpcModel

# Class: NpcModel

Defined in: npc/model.ts:274

NPC-specialized creature model that participates in NPC module hooks.

## Hierarchy

[View Summary](../../hierarchy.md)

### Extends

- [`CreatureModel`](CreatureModel.md)

## Constructors

### Constructor

```ts
new NpcModel(core, state): NpcModel;
```

Defined in: npc/model.ts:275

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `state` | [`CreatureState`](../../state/interfaces/CreatureState.md) |

#### Returns

`NpcModel`

#### Overrides

[`CreatureModel`](CreatureModel.md).[`constructor`](CreatureModel.md#constructor)

## Methods

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

#### Inherited from

[`CreatureModel`](CreatureModel.md).[`setIdentity`](CreatureModel.md#setidentity)

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

#### Inherited from

[`CreatureModel`](CreatureModel.md).[`setName`](CreatureModel.md#setname)

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

#### Inherited from

[`CreatureModel`](CreatureModel.md).[`setActorKind`](CreatureModel.md#setactorkind)

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

#### Inherited from

[`CreatureModel`](CreatureModel.md).[`setAllegiance`](CreatureModel.md#setallegiance)

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

#### Inherited from

[`CreatureModel`](CreatureModel.md).[`assignLoadout`](CreatureModel.md#assignloadout)

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

#### Inherited from

[`CreatureModel`](CreatureModel.md).[`grantItem`](CreatureModel.md#grantitem)

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

#### Inherited from

[`CreatureModel`](CreatureModel.md).[`equip`](CreatureModel.md#equip)

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

#### Inherited from

[`CreatureModel`](CreatureModel.md).[`setFaith`](CreatureModel.md#setfaith)

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

#### Inherited from

[`CreatureModel`](CreatureModel.md).[`setResource`](CreatureModel.md#setresource)

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

#### Inherited from

[`CreatureModel`](CreatureModel.md).[`applyMutation`](CreatureModel.md#applymutation)

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

#### Inherited from

[`CreatureModel`](CreatureModel.md).[`installBionic`](CreatureModel.md#installbionic)

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

#### Inherited from

[`CreatureModel`](CreatureModel.md).[`setExtension`](CreatureModel.md#setextension)

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

#### Inherited from

[`CreatureModel`](CreatureModel.md).[`mergeTemplate`](CreatureModel.md#mergetemplate)

***

### getCombatProfileDraft()

```ts
getCombatProfileDraft(): ComputedCombatProfile;
```

Defined in: npc/model.ts:219

Compute a combat-facing read model from the current state plus ruleset.

#### Returns

[`ComputedCombatProfile`](../../views/interfaces/ComputedCombatProfile.md)

#### Inherited from

[`CreatureModel`](CreatureModel.md).[`getCombatProfileDraft`](CreatureModel.md#getcombatprofiledraft)

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

#### Inherited from

[`CreatureModel`](CreatureModel.md).[`toEncounterActor`](CreatureModel.md#toencounteractor)

***

### validate()

```ts
validate(): ValidationResult;
```

Defined in: npc/model.ts:243

Run built-in and module-provided validation over the current snapshot.

#### Returns

[`ValidationResult`](../interfaces/ValidationResult.md)

#### Inherited from

[`CreatureModel`](CreatureModel.md).[`validate`](CreatureModel.md#validate)

***

### getIssues()

```ts
getIssues(): readonly ValidationIssue[];
```

Defined in: npc/model.ts:248

Convenience accessor for just the validation issues array.

#### Returns

readonly [`ValidationIssue`](../interfaces/ValidationIssue.md)[]

#### Inherited from

[`CreatureModel`](CreatureModel.md).[`getIssues`](CreatureModel.md#getissues)

***

### toState()

```ts
toState(): CreatureState;
```

Defined in: npc/model.ts:253

Return a detached plain creature snapshot.

#### Returns

[`CreatureState`](../../state/interfaces/CreatureState.md)

#### Inherited from

[`CreatureModel`](CreatureModel.md).[`toState`](CreatureModel.md#tostate)

***

### toJSON()

```ts
toJSON(): SerializedSnapshot<"creature" | "npc">;
```

Defined in: npc/model.ts:258

Serialize the current snapshot into a tagged snapshot envelope.

#### Returns

[`SerializedSnapshot`](../interfaces/SerializedSnapshot.md)\<`"creature"` \| `"npc"`\>

#### Inherited from

[`CreatureModel`](CreatureModel.md).[`toJSON`](CreatureModel.md#tojson)

***

### create()

```ts
static create(core, input?): NpcModel;
```

Defined in: npc/model.ts:281

Create a fresh NPC model from initialization input.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `input` | \{ \} |

#### Returns

`NpcModel`

#### Overrides

[`CreatureModel`](CreatureModel.md).[`create`](CreatureModel.md#create)

***

### fromState()

```ts
static fromState(core, state): NpcModel;
```

Defined in: npc/model.ts:286

Rehydrate an NPC model from an existing plain creature-shaped snapshot.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `state` | [`CreatureState`](../../state/interfaces/CreatureState.md) |

#### Returns

`NpcModel`

#### Overrides

[`CreatureModel`](CreatureModel.md).[`fromState`](CreatureModel.md#fromstate)

***

### fromJSON()

```ts
static fromJSON(core, payload): NpcModel;
```

Defined in: npc/model.ts:291

Rehydrate an NPC model from a serialized NPC snapshot envelope or JSON string.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `payload` | `unknown` |

#### Returns

`NpcModel`

#### Overrides

[`CreatureModel`](CreatureModel.md).[`fromJSON`](CreatureModel.md#fromjson)

***

### clone()

```ts
clone(): NpcModel;
```

Defined in: npc/model.ts:296

Create a new NPC model instance from the current snapshot contents.

#### Returns

`NpcModel`

#### Overrides

[`CreatureModel`](CreatureModel.md).[`clone`](CreatureModel.md#clone)
