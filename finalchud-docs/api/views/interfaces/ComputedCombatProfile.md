[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [views](../index.md) / ComputedCombatProfile

# Interface: ComputedCombatProfile

Defined in: [views/computed.ts:53](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L53)

The most important computed view in the package.

This flattens whatever an actor is into what matters right now in combat:
movement, initiative, soak, attacks, active effects, and current resources.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-source"></a> `source` | [`CombatEntityRef`](../../state/type-aliases/CombatEntityRef.md) | [views/computed.ts:54](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L54) |
| <a id="property-actorkind"></a> `actorKind` | \| `"character"` \| `"creature"` \| `"npc"` \| `"vehicle"` \| `"mount"` \| `"warbandUnit"` \| `"fortressEmplacement"` | [views/computed.ts:55](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L55) |
| <a id="property-displayname"></a> `displayName` | `string` | [views/computed.ts:56](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L56) |
| <a id="property-size"></a> `size` | `"medium"` \| `"tiny"` \| `"small"` \| `"large"` \| `"huge"` | [views/computed.ts:57](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L57) |
| <a id="property-movement"></a> `movement` | [`MovementProfile`](../../content/interfaces/MovementProfile.md) | [views/computed.ts:58](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L58) |
| <a id="property-senses"></a> `senses?` | [`SensesProfile`](../../content/interfaces/SensesProfile.md) | [views/computed.ts:59](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L59) |
| <a id="property-initiative"></a> `initiative` | `number` | [views/computed.ts:60](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L60) |
| <a id="property-accuracy"></a> `accuracy` | `number` | [views/computed.ts:61](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L61) |
| <a id="property-damagebonus"></a> `damageBonus` | `number` | [views/computed.ts:62](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L62) |
| <a id="property-soak"></a> `soak` | `number` | [views/computed.ts:63](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L63) |
| <a id="property-saves"></a> `saves` | `Partial`\<`Record`\<[`SaveType`](../../foundation/type-aliases/SaveType.md), `number`\>\> | [views/computed.ts:64](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L64) |
| <a id="property-rangepreference"></a> `rangePreference?` | `"engaged"` \| `"close"` \| `"near"` \| `"far"` \| `"extreme"` \| `"siege"` | [views/computed.ts:65](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L65) |
| <a id="property-armorref"></a> `armorRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"armor"`\> | [views/computed.ts:66](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L66) |
| <a id="property-shieldref"></a> `shieldRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"shield"`\> | [views/computed.ts:67](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L67) |
| <a id="property-attackoptions"></a> `attackOptions` | readonly [`AttackOptionView`](AttackOptionView.md)[] | [views/computed.ts:68](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L68) |
| <a id="property-activeeffects"></a> `activeEffects` | readonly [`ActiveEffect`](../../foundation/interfaces/ActiveEffect.md)[] | [views/computed.ts:69](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L69) |
| <a id="property-conditions"></a> `conditions` | readonly [`ConditionState`](../../foundation/interfaces/ConditionState.md)[] | [views/computed.ts:70](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L70) |
| <a id="property-resourcesnapshot"></a> `resourceSnapshot` | readonly [`ResourceSnapshot`](ResourceSnapshot.md)[] | [views/computed.ts:71](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L71) |
| <a id="property-tags"></a> `tags?` | readonly `string`[] | [views/computed.ts:72](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/views/computed.ts#L72) |
