[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [foundation](../index.md) / ActiveEffect

# Interface: ActiveEffect

Defined in: [foundation/effects.ts:125](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L125)

Canonical effect shape shared across content, runtime, and event payloads.

Not every field is populated for every effect kind; the chosen `kind` tells
consumers which payload sections they should care about.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id` | `string` | [foundation/effects.ts:126](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L126) |
| <a id="property-kind"></a> `kind` | \| `"modifier"` \| `"condition"` \| `"damage"` \| `"healing"` \| `"resourceShift"` \| `"movement"` \| `"summon"` \| `"unlock"` \| `"narrativeFlag"` | [foundation/effects.ts:127](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L127) |
| <a id="property-label"></a> `label` | `string` | [foundation/effects.ts:128](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L128) |
| <a id="property-sourceentity"></a> `sourceEntity?` | [`EntityRef`](EntityRef.md)\<`"character"` \| `"creatureState"` \| `"encounterActor"` \| `"vehicleState"`\> | [foundation/effects.ts:129](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L129) |
| <a id="property-target"></a> `target` | [`TargetSelector`](TargetSelector.md) | [foundation/effects.ts:130](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L130) |
| <a id="property-duration"></a> `duration?` | [`Duration`](Duration.md) | [foundation/effects.ts:131](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L131) |
| <a id="property-modifierset"></a> `modifierSet?` | [`ModifierSet`](ModifierSet.md) | [foundation/effects.ts:132](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L132) |
| <a id="property-conditions"></a> `conditions?` | readonly [`ConditionState`](ConditionState.md)[] | [foundation/effects.ts:133](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L133) |
| <a id="property-resourceshifts"></a> `resourceShifts?` | readonly [`ResourceShift`](ResourceShift.md)[] | [foundation/effects.ts:134](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L134) |
| <a id="property-damage"></a> `damage?` | readonly [`DamagePacket`](DamagePacket.md)[] | [foundation/effects.ts:135](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L135) |
| <a id="property-movement"></a> `movement?` | [`MovementEffect`](MovementEffect.md) | [foundation/effects.ts:136](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L136) |
| <a id="property-unlock"></a> `unlock?` | [`UnlockEffect`](UnlockEffect.md) | [foundation/effects.ts:137](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L137) |
| <a id="property-narrativeflags"></a> `narrativeFlags?` | readonly [`NarrativeFlagEffect`](NarrativeFlagEffect.md)[] | [foundation/effects.ts:138](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L138) |
| <a id="property-tags"></a> `tags?` | readonly `string`[] | [foundation/effects.ts:139](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/foundation/effects.ts#L139) |
