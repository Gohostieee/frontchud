[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / OwnedItemStack

# Interface: OwnedItemStack

Defined in: [state/common.ts:94](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L94)

One owned stack in an inventory, including quantity and optional physical placement.

Every stack has exactly one placement:
- **loose** — neither `containerId` nor `equippedSlot` is set; the stack
  occupies base carry slots.
- **contained** — `containerId` is set; the stack occupies capacity inside
  that container and is free for base carry.
- **equipped** — `equippedSlot` is set; the stack is in a core combat slot
  and is free for both base carry and container capacity.

Both `containerId` and `equippedSlot` must not be set at the same time.
Stacks with the same `ref` but different placements are kept as separate
entries and do not merge.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-ref"></a> `ref` | [`OwnedDefinitionRef`](../type-aliases/OwnedDefinitionRef.md) | [state/common.ts:95](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L95) |
| <a id="property-quantity"></a> `quantity` | `number` | [state/common.ts:96](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L96) |
| <a id="property-charges"></a> `charges?` | `number` | [state/common.ts:97](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L97) |
| <a id="property-containerid"></a> `containerId?` | `string` | [state/common.ts:98](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L98) |
| <a id="property-equippedslot"></a> `equippedSlot?` | [`EquippedCoreCombatSlot`](../type-aliases/EquippedCoreCombatSlot.md) | [state/common.ts:99](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L99) |
| <a id="property-tags"></a> `tags?` | readonly `string`[] | [state/common.ts:100](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L100) |
