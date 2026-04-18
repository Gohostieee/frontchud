[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / InventoryState

# Interface: InventoryState

Defined in: [state/common.ts:119](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L119)

Entire current inventory, separate from authored item definitions.

`carrySlotsUsed` is a derived value recomputed by the placement engine from
loose stacks only — do not write it manually. Each container's `occupiedSlots`
is likewise derived from the stacks assigned to that container. Both fields
are always recomputed after every inventory mutation.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-carryslotstotal"></a> `carrySlotsTotal` | `number` | [state/common.ts:120](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L120) |
| <a id="property-carryslotsused"></a> `carrySlotsUsed` | `number` | [state/common.ts:121](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L121) |
| <a id="property-currency"></a> `currency` | `Record`\<`string`, `number`\> | [state/common.ts:122](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L122) |
| <a id="property-containers"></a> `containers` | readonly [`InventoryContainerState`](InventoryContainerState.md)[] | [state/common.ts:123](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L123) |
| <a id="property-items"></a> `items` | readonly [`OwnedItemStack`](OwnedItemStack.md)[] | [state/common.ts:124](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/state/common.ts#L124) |
