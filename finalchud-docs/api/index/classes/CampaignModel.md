[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / CampaignModel

# Class: CampaignModel

Defined in: [runtime/wrappers.ts:43](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/wrappers.ts#L43)

Lightweight runtime wrapper for campaign snapshots.

## Constructors

### Constructor

```ts
new CampaignModel(core, state): CampaignModel;
```

Defined in: [runtime/wrappers.ts:44](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/wrappers.ts#L44)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `state` | [`CampaignState`](../../state/interfaces/CampaignState.md) |

#### Returns

`CampaignModel`

## Methods

### fromState()

```ts
static fromState(core, state): CampaignModel;
```

Defined in: [runtime/wrappers.ts:47](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/wrappers.ts#L47)

Rehydrate the wrapper from an existing plain campaign snapshot.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `state` | [`CampaignState`](../../state/interfaces/CampaignState.md) |

#### Returns

`CampaignModel`

***

### fromJSON()

```ts
static fromJSON(core, payload): CampaignModel;
```

Defined in: [runtime/wrappers.ts:52](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/wrappers.ts#L52)

Rehydrate the wrapper from a serialized campaign envelope.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `payload` | `unknown` |

#### Returns

`CampaignModel`

***

### setLabel()

```ts
setLabel(label): CampaignModel;
```

Defined in: [runtime/wrappers.ts:57](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/wrappers.ts#L57)

Update the campaign label in place.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `label` | `string` |

#### Returns

`CampaignModel`

***

### toState()

```ts
toState(): CampaignState;
```

Defined in: [runtime/wrappers.ts:63](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/wrappers.ts#L63)

Return a detached plain snapshot suitable for persistence or transport.

#### Returns

[`CampaignState`](../../state/interfaces/CampaignState.md)

***

### toJSON()

```ts
toJSON(): SerializedSnapshot<"campaign">;
```

Defined in: [runtime/wrappers.ts:68](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/wrappers.ts#L68)

Serialize the current campaign state into a tagged snapshot envelope.

#### Returns

[`SerializedSnapshot`](../interfaces/SerializedSnapshot.md)\<`"campaign"`\>

***

### validate()

```ts
validate(): ValidationResult;
```

Defined in: [runtime/wrappers.ts:73](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/wrappers.ts#L73)

Run campaign validation. The wrapper is intentionally thin today.

#### Returns

[`ValidationResult`](../interfaces/ValidationResult.md)
