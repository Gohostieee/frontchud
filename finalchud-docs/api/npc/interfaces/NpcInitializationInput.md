[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [npc](../index.md) / NpcInitializationInput

# Interface: NpcInitializationInput

Defined in: [npc/initializer.ts:28](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/initializer.ts#L28)

Input accepted by creature/NPC creation helpers and model factory methods.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id?` | [`CreatureStateId`](../../foundation/type-aliases/CreatureStateId.md) | [npc/initializer.ts:29](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/initializer.ts#L29) |
| <a id="property-name"></a> `name?` | `string` | [npc/initializer.ts:30](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/initializer.ts#L30) |
| <a id="property-creatureref"></a> `creatureRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"creature"`\> | [npc/initializer.ts:31](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/initializer.ts#L31) |
| <a id="property-npcloadoutref"></a> `npcLoadoutRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"npcLoadout"`\> | [npc/initializer.ts:32](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/initializer.ts#L32) |
| <a id="property-allegiance"></a> `allegiance?` | `string` | [npc/initializer.ts:33](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/initializer.ts#L33) |
| <a id="property-actorkind"></a> `actorKind?` | `"creature"` \| `"npc"` \| `"mount"` | [npc/initializer.ts:34](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/initializer.ts#L34) |
| <a id="property-startingitems"></a> `startingItems?` | readonly [`OwnedItemStack`](../../state/interfaces/OwnedItemStack.md)[] | [npc/initializer.ts:35](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/initializer.ts#L35) |
| <a id="property-tags"></a> `tags?` | readonly `string`[] | [npc/initializer.ts:36](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/initializer.ts#L36) |
| <a id="property-extensions"></a> `extensions?` | `Partial`\<`Record`\<`string`, [`JsonObject`](../../foundation/interfaces/JsonObject.md)\>\> | [npc/initializer.ts:37](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/npc/initializer.ts#L37) |
