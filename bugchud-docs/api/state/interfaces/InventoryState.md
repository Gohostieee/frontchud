[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [state](../index.md) / InventoryState

# Interface: InventoryState

Defined in: [state/common.ts:84](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L84)

Entire current inventory, separate from authored item definitions.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-carryslotstotal"></a> `carrySlotsTotal` | `number` | [state/common.ts:85](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L85) |
| <a id="property-carryslotsused"></a> `carrySlotsUsed` | `number` | [state/common.ts:86](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L86) |
| <a id="property-currency"></a> `currency` | `Record`\<`string`, `number`\> | [state/common.ts:87](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L87) |
| <a id="property-containers"></a> `containers` | readonly [`InventoryContainerState`](InventoryContainerState.md)[] | [state/common.ts:88](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L88) |
| <a id="property-items"></a> `items` | readonly [`OwnedItemStack`](OwnedItemStack.md)[] | [state/common.ts:89](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/state/common.ts#L89) |
