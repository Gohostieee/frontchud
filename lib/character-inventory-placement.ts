import type {
  ArmorDefinition,
  ContainerDefinition,
  GrimoireDefinition,
  ItemDefinition,
  RelicDefinition,
  ShieldDefinition,
  WeaponDefinition,
} from "@bugchud/core/content";

type InventoryContainerLike = {
  id: string;
  label: string;
  capacity: number;
  occupiedSlots: number;
};

export type InventoryEquippedSlot = "mainHand" | "offHand" | "twoHanded" | "armor";

export type InventoryOwnedRef = {
  kind: string | number | boolean | bigint;
  id: string;
};

type InventoryStackLike = {
  ref: InventoryOwnedRef;
  quantity: number;
  charges?: number;
  containerId?: string;
  equippedSlot?: InventoryEquippedSlot;
  tags?: readonly string[];
};

type InventoryStateLike = {
  carrySlotsTotal: number;
  carrySlotsUsed: number;
  currency: Record<string, number>;
  containers: InventoryContainerLike[];
  items: InventoryStackLike[];
};

type LoadoutStateLike = {
  primaryWeaponRef?: InventoryOwnedRef;
  secondaryWeaponRef?: InventoryOwnedRef;
  armorRef?: InventoryOwnedRef;
  shieldRef?: InventoryOwnedRef;
  equippedItemRefs: InventoryOwnedRef[];
  preparedVehicleWeaponRefs?: readonly InventoryOwnedRef[];
};

export type CharacterInventoryPlacementState = {
  inventory: InventoryStateLike;
  loadout: LoadoutStateLike;
};

type ItemMeta = {
  itemKind: string;
  slotCost: number;
  handedness?: WeaponDefinition["handedness"];
};

export type InventoryPlacementCatalog = {
  containerDefinitions: readonly ContainerDefinition[];
  itemMetaByRefKey: Map<string, ItemMeta>;
};

const EQUIPPED_SLOT_ORDER: InventoryEquippedSlot[] = [
  "mainHand",
  "offHand",
  "twoHanded",
  "armor",
] as const;

const LEGACY_NON_COMBAT_KINDS = new Set(["grimoire", "relic"]);

type BuildCatalogInput = {
  items: ItemDefinition[];
  weapons: WeaponDefinition[];
  armors: ArmorDefinition[];
  shields: ShieldDefinition[];
  grimoires: GrimoireDefinition[];
  relics: RelicDefinition[];
  containerDefinitions: readonly ContainerDefinition[];
};

function refKey(refValue: Pick<InventoryOwnedRef, "kind" | "id"> | null | undefined) {
  return refValue ? `${String(refValue.kind)}:${refValue.id}` : "";
}

function isLegacyNonCombatRef(refValue: InventoryOwnedRef) {
  return LEGACY_NON_COMBAT_KINDS.has(String(refValue.kind));
}

function cloneStack(stack: InventoryStackLike): InventoryStackLike {
  return {
    ref: { ...stack.ref },
    quantity: stack.quantity,
    ...(stack.charges !== undefined ? { charges: stack.charges } : {}),
    ...(stack.containerId ? { containerId: stack.containerId } : {}),
    ...(stack.equippedSlot ? { equippedSlot: stack.equippedSlot } : {}),
    ...(stack.tags?.length ? { tags: [...stack.tags] } : {}),
  };
}

function getItemMeta(
  catalog: InventoryPlacementCatalog,
  refValue: InventoryOwnedRef,
): ItemMeta | undefined {
  return catalog.itemMetaByRefKey.get(refKey(refValue));
}

function getSlotCost(catalog: InventoryPlacementCatalog, stack: InventoryStackLike) {
  const meta = getItemMeta(catalog, stack.ref);
  return (meta?.slotCost ?? 0) * stack.quantity;
}

function isLooseStack(stack: InventoryStackLike) {
  return !stack.containerId && !stack.equippedSlot;
}

function isEquippedStack(stack: InventoryStackLike) {
  return Boolean(stack.equippedSlot);
}

function takeStackQuantity(
  items: InventoryStackLike[],
  index: number,
  quantity: number,
) {
  const source = items[index];
  if (!source) {
    throw new Error("Inventory stack not found.");
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("Quantity must be a positive whole number.");
  }
  if (quantity > source.quantity) {
    throw new Error("Requested quantity exceeds the selected stack.");
  }

  const nextItems = items.map((stack) => cloneStack(stack));
  const taken = cloneStack(source);
  taken.quantity = quantity;

  if (quantity === source.quantity) {
    nextItems.splice(index, 1);
    return { items: nextItems, taken, insertionIndex: index };
  }

  nextItems[index] = {
    ...nextItems[index],
    quantity: source.quantity - quantity,
  };

  return { items: nextItems, taken, insertionIndex: index + 1 };
}

function insertStack(
  items: InventoryStackLike[],
  stack: InventoryStackLike,
  insertionIndex: number,
) {
  const nextItems = items.map((entry) => cloneStack(entry));
  nextItems.splice(insertionIndex, 0, cloneStack(stack));
  return nextItems;
}

function moveStackPlacement(
  items: InventoryStackLike[],
  index: number,
  quantity: number,
  placement: Pick<InventoryStackLike, "containerId" | "equippedSlot">,
) {
  const split = takeStackQuantity(items, index, quantity);
  const moved = {
    ...split.taken,
    containerId: placement.containerId,
    equippedSlot: placement.equippedSlot,
  };
  return insertStack(split.items, moved, split.insertionIndex);
}

function getContainerOccupiedSlots(
  items: InventoryStackLike[],
  catalog: InventoryPlacementCatalog,
  containerId: string,
) {
  return items
    .filter((stack) => stack.containerId === containerId)
    .reduce((total, stack) => total + getSlotCost(catalog, stack), 0);
}

function getDesiredLegacySlots(
  loadout: LoadoutStateLike,
  catalog: InventoryPlacementCatalog,
) {
  const desired: Array<{ slot: InventoryEquippedSlot; ref: InventoryOwnedRef }> = [];

  if (loadout.armorRef) {
    desired.push({
      slot: "armor",
      ref: loadout.armorRef,
    });
  }

  const primaryWeaponMeta = loadout.primaryWeaponRef
    ? getItemMeta(catalog, loadout.primaryWeaponRef)
    : undefined;
  if (loadout.primaryWeaponRef && primaryWeaponMeta) {
    desired.push({
      slot:
        primaryWeaponMeta.handedness === "twoHanded"
          ? "twoHanded"
          : "mainHand",
      ref: loadout.primaryWeaponRef,
    });
  }

  const secondaryWeaponMeta = loadout.secondaryWeaponRef
    ? getItemMeta(catalog, loadout.secondaryWeaponRef)
    : undefined;
  if (loadout.secondaryWeaponRef && secondaryWeaponMeta?.handedness === "oneHanded") {
    desired.push({
      slot: "offHand",
      ref: loadout.secondaryWeaponRef,
    });
  }

  if (loadout.shieldRef) {
    if (!desired.some((entry) => entry.slot === "offHand")) {
      desired.push({
        slot: "offHand",
        ref: loadout.shieldRef,
      });
    } else if (!desired.some((entry) => entry.slot === "mainHand")) {
      desired.push({
        slot: "mainHand",
        ref: loadout.shieldRef,
      });
    }
  }

  return desired;
}

function getSlotStack(items: InventoryStackLike[], slot: InventoryEquippedSlot) {
  return items.find((stack) => stack.equippedSlot === slot);
}

function canPlaceLegacySlot(items: InventoryStackLike[], slot: InventoryEquippedSlot) {
  if (slot === "armor") {
    return !getSlotStack(items, "armor");
  }
  if (slot === "twoHanded") {
    return (
      !getSlotStack(items, "twoHanded") &&
      !getSlotStack(items, "mainHand") &&
      !getSlotStack(items, "offHand")
    );
  }

  return !getSlotStack(items, slot) && !getSlotStack(items, "twoHanded");
}

function applyLegacyCombatPlacements(
  items: InventoryStackLike[],
  loadout: LoadoutStateLike,
  catalog: InventoryPlacementCatalog,
) {
  if (items.some((stack) => stack.equippedSlot)) {
    return items.map((stack) => cloneStack(stack));
  }

  let nextItems = items.map((stack) => cloneStack(stack));
  for (const desired of getDesiredLegacySlots(loadout, catalog)) {
    if (!canPlaceLegacySlot(nextItems, desired.slot)) {
      continue;
    }

    const looseIndex = nextItems.findIndex(
      (stack) => isLooseStack(stack) && refKey(stack.ref) === refKey(desired.ref),
    );
    if (looseIndex === -1) {
      continue;
    }

    nextItems = moveStackPlacement(nextItems, looseIndex, 1, {
      equippedSlot: desired.slot,
    });
  }

  return nextItems;
}

function projectLoadout(
  items: InventoryStackLike[],
  loadout: LoadoutStateLike,
) {
  const mainHand = getSlotStack(items, "mainHand");
  const offHand = getSlotStack(items, "offHand");
  const twoHanded = getSlotStack(items, "twoHanded");
  const armor = getSlotStack(items, "armor");
  const seenLegacyKeys = new Set<string>();

  const projectedEquippedRefs: InventoryOwnedRef[] = EQUIPPED_SLOT_ORDER.flatMap((slot) =>
    items
      .filter((stack) => stack.equippedSlot === slot)
      .map((stack) => ({ ...stack.ref })),
  );

  for (const refValue of loadout.equippedItemRefs) {
    if (!isLegacyNonCombatRef(refValue)) {
      continue;
    }

    const key = refKey(refValue);
    if (seenLegacyKeys.has(key)) {
      continue;
    }

    const isOwned = items.some((stack) => refKey(stack.ref) === key);
    if (!isOwned) {
      continue;
    }

    seenLegacyKeys.add(key);
    projectedEquippedRefs.push({ ...refValue });
  }

  return {
    primaryWeaponRef:
      twoHanded?.ref.kind === "weapon"
        ? { ...twoHanded.ref }
        : mainHand?.ref.kind === "weapon"
          ? { ...mainHand.ref }
          : offHand?.ref.kind === "weapon"
            ? { ...offHand.ref }
            : undefined,
    secondaryWeaponRef:
      mainHand?.ref.kind === "weapon" && offHand?.ref.kind === "weapon"
        ? { ...offHand.ref }
        : undefined,
    shieldRef:
      mainHand?.ref.kind === "shield"
        ? { ...mainHand.ref }
        : offHand?.ref.kind === "shield"
          ? { ...offHand.ref }
          : undefined,
    armorRef:
      armor?.ref.kind === "armor"
        ? { ...armor.ref }
        : undefined,
    equippedItemRefs: projectedEquippedRefs,
    ...(loadout.preparedVehicleWeaponRefs
      ? {
          preparedVehicleWeaponRefs: loadout.preparedVehicleWeaponRefs.map((refValue) => ({
            ...refValue,
          })),
        }
      : {}),
  } satisfies LoadoutStateLike;
}

function assertLooseStack(stack: InventoryStackLike) {
  if (!isLooseStack(stack)) {
    throw new Error("Only loose stacks can be used for this action.");
  }
}

function assertPositiveWholeNumber(value: number, label: string) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${label} must be a positive whole number.`);
  }
}

function assertContainerCapacity(
  items: InventoryStackLike[],
  catalog: InventoryPlacementCatalog,
  containerId: string,
  capacity: number,
  stack: InventoryStackLike,
) {
  const nextOccupied =
    getContainerOccupiedSlots(items, catalog, containerId) + getSlotCost(catalog, stack);
  if (nextOccupied > capacity) {
    throw new Error("That container does not have enough remaining capacity.");
  }
}

function assertNotNestedContainer(
  stack: InventoryStackLike,
  catalog: InventoryPlacementCatalog,
) {
  const meta = getItemMeta(catalog, stack.ref);
  if (stack.ref.kind === "item" && meta?.itemKind === "container") {
    throw new Error("Container items cannot be placed inside another container.");
  }
}

function assertSlotCompatibility(
  stack: InventoryStackLike,
  slot: InventoryEquippedSlot,
  catalog: InventoryPlacementCatalog,
) {
  const meta = getItemMeta(catalog, stack.ref);

  if (slot === "armor") {
    if (stack.ref.kind !== "armor") {
      throw new Error("Only armor can be placed in the armor slot.");
    }
    return;
  }

  if (slot === "twoHanded") {
    if (stack.ref.kind !== "weapon" || meta?.handedness !== "twoHanded") {
      throw new Error("Only two-handed weapons can occupy the two-handed slot.");
    }
    return;
  }

  if (stack.ref.kind === "shield") {
    return;
  }

  if (stack.ref.kind !== "weapon" || meta?.handedness !== "oneHanded") {
    throw new Error("Hand slots only accept one-handed weapons or shields.");
  }
}

function assertSlotAvailability(
  items: InventoryStackLike[],
  slot: InventoryEquippedSlot,
  ignoreIndex: number,
) {
  const otherTwoHanded = items.findIndex(
    (stack, index) => index !== ignoreIndex && stack.equippedSlot === "twoHanded",
  );
  const otherMainHand = items.findIndex(
    (stack, index) => index !== ignoreIndex && stack.equippedSlot === "mainHand",
  );
  const otherOffHand = items.findIndex(
    (stack, index) => index !== ignoreIndex && stack.equippedSlot === "offHand",
  );
  const directConflict = items.findIndex(
    (stack, index) => index !== ignoreIndex && stack.equippedSlot === slot,
  );

  if (slot === "twoHanded") {
    if (directConflict !== -1 || otherMainHand !== -1 || otherOffHand !== -1) {
      throw new Error("Both hand slots must be clear before equipping a two-handed weapon.");
    }
    return;
  }

  if (slot === "mainHand" || slot === "offHand") {
    if (directConflict !== -1 || otherTwoHanded !== -1) {
      throw new Error("That hand slot is blocked by currently equipped gear.");
    }
    return;
  }

  if (directConflict !== -1) {
    throw new Error("That slot is already occupied.");
  }
}

export function buildInventoryPlacementCatalog({
  items,
  weapons,
  armors,
  shields,
  grimoires,
  relics,
  containerDefinitions,
}: BuildCatalogInput): InventoryPlacementCatalog {
  const itemMetaByRefKey = new Map<string, ItemMeta>();

  for (const item of items) {
    itemMetaByRefKey.set(refKey({ kind: "item", id: item.id }), {
      itemKind: item.itemKind,
      slotCost: item.slotCost.slots,
    });
  }
  for (const weapon of weapons) {
    itemMetaByRefKey.set(refKey({ kind: "weapon", id: weapon.id }), {
      itemKind: weapon.itemKind,
      slotCost: weapon.slotCost.slots,
      handedness: weapon.handedness,
    });
  }
  for (const armor of armors) {
    itemMetaByRefKey.set(refKey({ kind: "armor", id: armor.id }), {
      itemKind: armor.itemKind,
      slotCost: armor.slotCost.slots,
    });
  }
  for (const shield of shields) {
    itemMetaByRefKey.set(refKey({ kind: "shield", id: shield.id }), {
      itemKind: shield.itemKind,
      slotCost: shield.slotCost.slots,
    });
  }
  for (const grimoire of grimoires) {
    itemMetaByRefKey.set(refKey({ kind: "grimoire", id: grimoire.id }), {
      itemKind: "grimoire",
      slotCost: 0,
    });
  }
  for (const relic of relics) {
    itemMetaByRefKey.set(refKey({ kind: "relic", id: relic.id }), {
      itemKind: "relic",
      slotCost: 0,
    });
  }

  return {
    containerDefinitions,
    itemMetaByRefKey,
  };
}

export function buildInventoryStackKey(stack: InventoryStackLike, index: number) {
  return [
    index,
    refKey(stack.ref),
    stack.quantity,
    stack.charges ?? "",
    stack.containerId ?? "",
    stack.equippedSlot ?? "",
    stack.tags?.join("|") ?? "",
  ].join("::");
}

export function syncInventoryPlacementState(
  state: CharacterInventoryPlacementState,
  catalog: InventoryPlacementCatalog,
) {
  const nextItems = applyLegacyCombatPlacements(state.inventory.items, state.loadout, catalog);

  state.inventory.items = nextItems;
  state.inventory.carrySlotsUsed = nextItems
    .filter((stack) => isLooseStack(stack))
    .reduce((total, stack) => total + getSlotCost(catalog, stack), 0);
  state.inventory.containers = state.inventory.containers.map((container) => ({
    ...container,
    occupiedSlots: getContainerOccupiedSlots(nextItems, catalog, container.id),
  }));
  state.loadout = projectLoadout(nextItems, state.loadout);
}

export function appendInventoryStack(
  state: CharacterInventoryPlacementState,
  refValue: InventoryOwnedRef,
  catalog: InventoryPlacementCatalog,
) {
  state.inventory.items = [
    ...state.inventory.items,
    {
      ref: { ...refValue },
      quantity: 1,
    },
  ];
  syncInventoryPlacementState(state, catalog);
}

export function updateInventoryStackQuantity(
  state: CharacterInventoryPlacementState,
  index: number,
  quantity: number,
  catalog: InventoryPlacementCatalog,
) {
  assertPositiveWholeNumber(quantity, "Stack quantity");
  const stack = state.inventory.items[index];
  if (!stack) {
    throw new Error("Inventory stack not found.");
  }
  if (isEquippedStack(stack) && quantity !== 1) {
    throw new Error("Equipped stacks must always have quantity 1.");
  }

  state.inventory.items[index] = {
    ...cloneStack(stack),
    quantity,
  };
  syncInventoryPlacementState(state, catalog);
}

export function updateInventoryStackCharges(
  state: CharacterInventoryPlacementState,
  index: number,
  charges: number | undefined,
  catalog: InventoryPlacementCatalog,
) {
  const stack = state.inventory.items[index];
  if (!stack) {
    throw new Error("Inventory stack not found.");
  }
  if (charges !== undefined) {
    assertPositiveWholeNumber(charges, "Charges");
  }

  state.inventory.items[index] = {
    ...cloneStack(stack),
    charges,
  };
  syncInventoryPlacementState(state, catalog);
}

export function removeInventoryStackAtIndex(
  state: CharacterInventoryPlacementState,
  index: number,
  catalog: InventoryPlacementCatalog,
) {
  if (!state.inventory.items[index]) {
    throw new Error("Inventory stack not found.");
  }

  state.inventory.items = state.inventory.items
    .filter((_, itemIndex) => itemIndex !== index)
    .map((stack) => cloneStack(stack));
  syncInventoryPlacementState(state, catalog);
}

export function equipInventoryStackAtIndex(
  state: CharacterInventoryPlacementState,
  index: number,
  slot: InventoryEquippedSlot,
  catalog: InventoryPlacementCatalog,
) {
  const stack = state.inventory.items[index];
  if (!stack) {
    throw new Error("Inventory stack not found.");
  }

  assertLooseStack(stack);
  assertSlotCompatibility(stack, slot, catalog);
  assertSlotAvailability(state.inventory.items, slot, index);

  state.inventory.items = moveStackPlacement(state.inventory.items, index, 1, {
    equippedSlot: slot,
  });
  syncInventoryPlacementState(state, catalog);
}

export function stowEquippedInventoryStackAtIndex(
  state: CharacterInventoryPlacementState,
  index: number,
  catalog: InventoryPlacementCatalog,
) {
  const stack = state.inventory.items[index];
  if (!stack || !stack.equippedSlot) {
    throw new Error("Only equipped stacks can be stowed.");
  }

  state.inventory.items = state.inventory.items.map((entry, itemIndex) =>
    itemIndex === index
      ? {
          ...cloneStack(entry),
          equippedSlot: undefined,
        }
      : cloneStack(entry),
  );
  syncInventoryPlacementState(state, catalog);
}

export function moveInventoryStackToContainerAtIndex(
  state: CharacterInventoryPlacementState,
  index: number,
  containerId: string,
  catalog: InventoryPlacementCatalog,
) {
  const stack = state.inventory.items[index];
  if (!stack) {
    throw new Error("Inventory stack not found.");
  }

  assertLooseStack(stack);
  const container = state.inventory.containers.find((entry) => entry.id === containerId);
  if (!container) {
    throw new Error("Target container not found.");
  }

  assertNotNestedContainer(stack, catalog);
  assertContainerCapacity(
    state.inventory.items,
    catalog,
    containerId,
    container.capacity,
    {
      ...cloneStack(stack),
      quantity: 1,
      containerId,
    },
  );

  state.inventory.items = moveStackPlacement(state.inventory.items, index, 1, {
    containerId,
  });
  syncInventoryPlacementState(state, catalog);
}

export function removeInventoryStackFromContainerAtIndex(
  state: CharacterInventoryPlacementState,
  index: number,
  catalog: InventoryPlacementCatalog,
) {
  const stack = state.inventory.items[index];
  if (!stack?.containerId) {
    throw new Error("Only contained stacks can be removed from a container.");
  }

  state.inventory.items = moveStackPlacement(state.inventory.items, index, 1, {
    containerId: undefined,
    equippedSlot: undefined,
  });
  syncInventoryPlacementState(state, catalog);
}

export function setLegacyNonCombatEquippedRefs(
  state: CharacterInventoryPlacementState,
  refs: InventoryOwnedRef[],
  catalog: InventoryPlacementCatalog,
) {
  const uniqueRefs: InventoryOwnedRef[] = [];
  const seen = new Set<string>();

  for (const refValue of refs) {
    if (!isLegacyNonCombatRef(refValue)) {
      continue;
    }

    const key = refKey(refValue);
    if (seen.has(key)) {
      continue;
    }
    if (!state.inventory.items.some((stack) => refKey(stack.ref) === key)) {
      continue;
    }

    seen.add(key);
    uniqueRefs.push({ ...refValue });
  }

  state.loadout.equippedItemRefs = uniqueRefs;
  syncInventoryPlacementState(state, catalog);
}

export function getInventoryPlacementLabel(stack: InventoryStackLike) {
  if (stack.equippedSlot) {
    return `Equipped: ${stack.equippedSlot}`;
  }
  if (stack.containerId) {
    return `Contained: ${stack.containerId}`;
  }
  return "Loose";
}

export function isLegacyEquippableRef(refValue: InventoryOwnedRef) {
  return isLegacyNonCombatRef(refValue);
}
