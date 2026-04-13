[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / EncounterModel

# Class: EncounterModel

Defined in: runtime/wrappers.ts:7

Lightweight runtime wrapper for encounter snapshots.

## Constructors

### Constructor

```ts
new EncounterModel(core, state): EncounterModel;
```

Defined in: runtime/wrappers.ts:8

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `state` | [`EncounterState`](../../state/interfaces/EncounterState.md) |

#### Returns

`EncounterModel`

## Methods

### fromState()

```ts
static fromState(core, state): EncounterModel;
```

Defined in: runtime/wrappers.ts:11

Rehydrate the wrapper from an existing plain encounter snapshot.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `state` | [`EncounterState`](../../state/interfaces/EncounterState.md) |

#### Returns

`EncounterModel`

***

### fromJSON()

```ts
static fromJSON(core, payload): EncounterModel;
```

Defined in: runtime/wrappers.ts:16

Rehydrate the wrapper from a serialized encounter envelope.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `payload` | `unknown` |

#### Returns

`EncounterModel`

***

### setLabel()

```ts
setLabel(label): EncounterModel;
```

Defined in: runtime/wrappers.ts:21

Update the encounter label in place.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `label` | `string` |

#### Returns

`EncounterModel`

***

### toState()

```ts
toState(): EncounterState;
```

Defined in: runtime/wrappers.ts:27

Return a detached plain snapshot suitable for persistence or transport.

#### Returns

[`EncounterState`](../../state/interfaces/EncounterState.md)

***

### toJSON()

```ts
toJSON(): SerializedSnapshot<"encounter">;
```

Defined in: runtime/wrappers.ts:32

Serialize the current encounter state into a tagged snapshot envelope.

#### Returns

[`SerializedSnapshot`](../interfaces/SerializedSnapshot.md)\<`"encounter"`\>

***

### validate()

```ts
validate(): ValidationResult;
```

Defined in: runtime/wrappers.ts:37

Run encounter validation. The wrapper is intentionally thin today.

#### Returns

[`ValidationResult`](../interfaces/ValidationResult.md)
