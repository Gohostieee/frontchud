/// <reference types="vite/client" />

import { importedRuleset } from "@bugchud/core/data";
import { convexTest } from "convex-test";
import { expect, test } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");

const createIdentity = (tokenIdentifier: string) => ({
  tokenIdentifier,
  subject: tokenIdentifier,
  issuer: "https://clerk.test",
});

const firstOneHandedWeapon = Object.values(importedRuleset.registries.weapon).find(
  (weapon) => weapon.handedness === "oneHanded",
);
const firstArmor = Object.values(importedRuleset.registries.armor)[0];
const firstCarryItem = Object.values(importedRuleset.registries.item).find(
  (item) => item.itemKind !== "container" && item.slotCost.slots > 0,
);

test("previewDraft and saveDraft preserve equipped stacks and project loadout refs", async () => {
  const t = convexTest(schema, modules);
  const owner = t.withIdentity(createIdentity("user|owner"));

  expect(firstOneHandedWeapon).toBeDefined();

  const created = await owner.mutation(api.characters.createDraft, {
    input: { name: "Placement Test" },
  });
  const staleState = structuredClone(created!.state);
  staleState.inventory = {
    carrySlotsTotal: staleState.inventory.carrySlotsTotal,
    carrySlotsUsed: 99,
    currency: {},
    containers: [],
    items: [
      {
        ref: { kind: "weapon", id: firstOneHandedWeapon!.id },
        quantity: 1,
        equippedSlot: "mainHand",
      },
    ],
  };
  staleState.loadout = {
    equippedItemRefs: [],
  };

  const preview = await owner.query(api.characters.previewDraft, {
    state: staleState,
  });

  expect(preview.normalizedState.inventory.items).toEqual([
    expect.objectContaining({
      ref: { kind: "weapon", id: firstOneHandedWeapon!.id },
      quantity: 1,
      equippedSlot: "mainHand",
    }),
  ]);
  expect(preview.normalizedState.inventory.carrySlotsUsed).toBe(0);
  expect(preview.normalizedState.loadout.primaryWeaponRef).toEqual({
    kind: "weapon",
    id: firstOneHandedWeapon!.id,
  });
  expect(preview.normalizedState.loadout.equippedItemRefs).toEqual([
    {
      kind: "weapon",
      id: firstOneHandedWeapon!.id,
    },
  ]);

  const saved = await owner.mutation(api.characters.saveDraft, {
    bugchudId: created!.bugchudId,
    state: staleState,
    currentStep: "gear",
  });

  expect(saved?.state.inventory.items).toEqual([
    expect.objectContaining({
      ref: { kind: "weapon", id: firstOneHandedWeapon!.id },
      quantity: 1,
      equippedSlot: "mainHand",
    }),
  ]);
  expect(saved?.state.loadout.primaryWeaponRef).toEqual({
    kind: "weapon",
    id: firstOneHandedWeapon!.id,
  });
});

test("legacy loadout refs backfill into equipped stack placement on preview and save", async () => {
  const t = convexTest(schema, modules);
  const owner = t.withIdentity(createIdentity("user|owner"));

  expect(firstOneHandedWeapon).toBeDefined();
  expect(firstArmor).toBeDefined();

  const created = await owner.mutation(api.characters.createDraft, {
    input: { name: "Legacy Placement Test" },
  });
  const staleState = structuredClone(created!.state);
  staleState.inventory = {
    carrySlotsTotal: staleState.inventory.carrySlotsTotal,
    carrySlotsUsed: 99,
    currency: {},
    containers: [],
    items: [
      {
        ref: { kind: "weapon", id: firstOneHandedWeapon!.id },
        quantity: 1,
      },
      {
        ref: { kind: "armor", id: firstArmor!.id },
        quantity: 1,
      },
    ],
  };
  staleState.loadout = {
    primaryWeaponRef: { kind: "weapon", id: firstOneHandedWeapon!.id },
    armorRef: { kind: "armor", id: firstArmor!.id },
    equippedItemRefs: [
      { kind: "weapon", id: firstOneHandedWeapon!.id },
      { kind: "armor", id: firstArmor!.id },
    ],
  };

  const preview = await owner.query(api.characters.previewDraft, {
    state: staleState,
  });

  expect(preview.normalizedState.inventory.items).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        ref: { kind: "weapon", id: firstOneHandedWeapon!.id },
        equippedSlot: "mainHand",
      }),
      expect.objectContaining({
        ref: { kind: "armor", id: firstArmor!.id },
        equippedSlot: "armor",
      }),
    ]),
  );

  const saved = await owner.mutation(api.characters.saveDraft, {
    bugchudId: created!.bugchudId,
    state: staleState,
    currentStep: "gear",
  });

  expect(saved?.state.inventory.items).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        ref: { kind: "weapon", id: firstOneHandedWeapon!.id },
        equippedSlot: "mainHand",
      }),
      expect.objectContaining({
        ref: { kind: "armor", id: firstArmor!.id },
        equippedSlot: "armor",
      }),
    ]),
  );
});

test("previewDraft and saveDraft preserve duplicate refs across loose and contained stacks", async () => {
  const t = convexTest(schema, modules);
  const owner = t.withIdentity(createIdentity("user|owner"));

  expect(firstCarryItem).toBeDefined();

  const created = await owner.mutation(api.characters.createDraft, {
    input: { name: "Duplicate Placement Test" },
  });
  const slotCost = firstCarryItem!.slotCost.slots;
  const staleState = structuredClone(created!.state);
  staleState.inventory = {
    carrySlotsTotal: staleState.inventory.carrySlotsTotal,
    carrySlotsUsed: 999,
    currency: {},
    containers: [
      {
        id: "container.pack",
        label: "Pack",
        capacity: 10,
        occupiedSlots: 0,
      },
    ],
    items: [
      {
        ref: { kind: "item", id: firstCarryItem!.id },
        quantity: 1,
      },
      {
        ref: { kind: "item", id: firstCarryItem!.id },
        quantity: 1,
        containerId: "container.pack",
      },
    ],
  };
  staleState.loadout = {
    equippedItemRefs: [],
  };

  const preview = await owner.query(api.characters.previewDraft, {
    state: staleState,
  });

  expect(preview.normalizedState.inventory.items).toHaveLength(2);
  expect(preview.normalizedState.inventory.items).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        ref: { kind: "item", id: firstCarryItem!.id },
      }),
      expect.objectContaining({
        ref: { kind: "item", id: firstCarryItem!.id },
        containerId: "container.pack",
      }),
    ]),
  );
  expect(preview.normalizedState.inventory.carrySlotsUsed).toBe(slotCost);
  expect(preview.normalizedState.inventory.containers).toEqual([
    expect.objectContaining({
      id: "container.pack",
      occupiedSlots: slotCost,
    }),
  ]);

  const saved = await owner.mutation(api.characters.saveDraft, {
    bugchudId: created!.bugchudId,
    state: staleState,
    currentStep: "gear",
  });

  expect(saved?.state.inventory.items).toHaveLength(2);
  expect(saved?.state.inventory.carrySlotsUsed).toBe(slotCost);
  expect(saved?.state.inventory.containers).toEqual([
    expect.objectContaining({
      id: "container.pack",
      occupiedSlots: slotCost,
    }),
  ]);
});
