[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / WorldModel

# Class: WorldModel

Defined in: runtime/wrappers.ts:79

Lightweight runtime wrapper for world snapshots.

## Constructors

### Constructor

```ts
new WorldModel(core, state): WorldModel;
```

Defined in: runtime/wrappers.ts:80

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `state` | [`WorldState`](../../state/interfaces/WorldState.md) |

#### Returns

`WorldModel`

## Methods

### fromState()

```ts
static fromState(core, state): WorldModel;
```

Defined in: runtime/wrappers.ts:83

Rehydrate the wrapper from an existing plain world snapshot.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `state` | [`WorldState`](../../state/interfaces/WorldState.md) |

#### Returns

`WorldModel`

***

### fromJSON()

```ts
static fromJSON(core, payload): WorldModel;
```

Defined in: runtime/wrappers.ts:88

Rehydrate the wrapper from a serialized world envelope.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `core` | [`BugchudCore`](BugchudCore.md) |
| `payload` | `unknown` |

#### Returns

`WorldModel`

***

### setWeather()

```ts
setWeather(activeWeather): WorldModel;
```

Defined in: runtime/wrappers.ts:93

Update the active world weather marker.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `activeWeather` | `string` |

#### Returns

`WorldModel`

***

### toState()

```ts
toState(): WorldState;
```

Defined in: runtime/wrappers.ts:99

Return a detached plain snapshot suitable for persistence or transport.

#### Returns

[`WorldState`](../../state/interfaces/WorldState.md)

***

### toJSON()

```ts
toJSON(): SerializedSnapshot<"world">;
```

Defined in: runtime/wrappers.ts:104

Serialize the current world state into a tagged snapshot envelope.

#### Returns

[`SerializedSnapshot`](../interfaces/SerializedSnapshot.md)\<`"world"`\>

***

### validate()

```ts
validate(): ValidationResult;
```

Defined in: runtime/wrappers.ts:109

Run world validation. The wrapper is intentionally thin today.

#### Returns

[`ValidationResult`](../interfaces/ValidationResult.md)
