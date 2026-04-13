[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [npc](../index.md) / NpcInitializationInput

# Interface: NpcInitializationInput

Defined in: npc/initializer.ts:20

Input accepted by creature/NPC creation helpers and model factory methods.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-id"></a> `id?` | [`CreatureStateId`](../../foundation/type-aliases/CreatureStateId.md) | npc/initializer.ts:21 |
| <a id="property-name"></a> `name?` | `string` | npc/initializer.ts:22 |
| <a id="property-creatureref"></a> `creatureRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"creature"`\> | npc/initializer.ts:23 |
| <a id="property-npcloadoutref"></a> `npcLoadoutRef?` | [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"npcLoadout"`\> | npc/initializer.ts:24 |
| <a id="property-allegiance"></a> `allegiance?` | `string` | npc/initializer.ts:25 |
| <a id="property-actorkind"></a> `actorKind?` | `"creature"` \| `"npc"` \| `"mount"` | npc/initializer.ts:26 |
| <a id="property-startingitems"></a> `startingItems?` | readonly [`OwnedItemStack`](../../state/interfaces/OwnedItemStack.md)[] | npc/initializer.ts:27 |
| <a id="property-tags"></a> `tags?` | readonly `string`[] | npc/initializer.ts:28 |
| <a id="property-extensions"></a> `extensions?` | `Partial`\<`Record`\<`string`, [`JsonObject`](../../foundation/interfaces/JsonObject.md)\>\> | npc/initializer.ts:29 |
