# Character And NPC Workflows

## What This Is

This guide covers the main editing flows for player characters, creatures, and NPCs.

## When An App Should Use It

Use this page when building character creation, loadout editors, NPC management tools, encounter setup flows, or editor UIs around character and creature data.

## Important Related Types And Classes

- `CharacterModel`
- `CreatureModel`
- `NpcModel`
- `CharacterInitializationInput`
- `NpcInitializationInput`
- `EncounterActorState`

## How It Connects To The Rest Of The Library

Characters and NPCs share some concepts, but they do not have identical state:

- characters use `CharacterState`
- NPCs use `CreatureState`/`NpcState`
- `NpcModel` extends `CreatureModel`
- both can produce combat-facing read models
- creatures/NPCs can become encounter actors with `toEncounterActor()`
- both now carry explicit `body.anatomy` state in addition to aggregate wound totals

## Example Usage

### Character Flow

```ts
const character = core.createCharacter({
  name: "Selene Ash",
  currentFate: 1,
});

character
  .addDream(importedRuleset.progression.dreamRefs[0])
  .setWounds(1)
  .patchBodyPart("leftArm", {
    status: "impaired",
    woundCount: 1,
    notes: ["Splinted after the tunnel collapse."],
  })
  .setResource("focus", 1, 3);
```

### NPC Flow

```ts
const npc = core.createNpc({
  name: "Roadfang",
  allegiance: "Raiders",
});

npc.patchBodyPart("rightLeg", {
  status: "lost",
  notes: ["Bitten off before the encounter began."],
});

const actor = npc.toEncounterActor("raiders", "zone.front");
```

## Explicit Body State

The runtime body model now separates two related ideas:

- `body.injuries`
  Aggregate wound totals and death pressure.
- `body.anatomy`
  Explicit tracked body parts such as head, torso, arms, legs, and any mutation-driven additions.

Use aggregate wound totals when you need a broad current-health number for UI, rules summaries, or compatibility with older flows. Use `body.anatomy` when the app needs to remember concrete state such as:

- a torn-off arm
- a crippled leg
- a prosthetic replacement
- an extra mutation-grown appendage
- long-term notes attached to a specific body part

### Body mutator methods

| Method | Description |
|--------|-------------|
| `setWounds(current, maximum?)` | Update aggregate wound totals. Characters recompute dependent derived resources; creatures update health if present. |
| `patchBodyPart(location, patch)` | Update one core body part such as `head`, `torso`, `rightArm`, `leftArm`, `rightLeg`, or `leftLeg`. |
| `upsertAdditionalBodyPart(part)` | Add or replace an extra tracked part such as a tail, wing, graft, or extra arm. |
| `removeAdditionalBodyPart(id)` | Remove an extra tracked body part by id. |

Example:

```ts
character
  .patchBodyPart("leftArm", {
    status: "lost",
    notes: ["Taken by a chain trap in the slag tunnels."],
  })
  .upsertAdditionalBodyPart({
    id: "tail.mutation.1",
    label: "Mutation Tail",
    kind: "appendage",
    status: "intact",
    woundCount: 0,
  });
```

These mutations are intentionally state-only. They do not yet imply combat resolution, limb penalties, or simulator rules by themselves.

## Inventory And Equipment

Use the model's inventory mutator methods rather than patching `inventory` or
`loadout` directly. Every mutator runs through the shared placement engine, which
keeps `carrySlotsUsed`, container `occupiedSlots`, and all `LoadoutState`
projection fields (`primaryWeaponRef`, `armorRef`, etc.) synchronized
automatically. See the [Inventory Placement guide](./inventory-placement.md) for
the full ruleset.

### Inventory mutator methods

| Method | Description |
|--------|-------------|
| `grantItem(stack)` | Add or merge an owned item stack into inventory. |
| `revokeItem(ref, quantity?)` | Remove quantity from inventory; consumes loose stacks first, then contained, then equipped. |
| `equip(ref)` | Compatibility wrapper — routes to the correct slot by item kind and handedness. |
| `unequip(ref)` | Compatibility wrapper — stows combat gear or removes a legacy non-combat ref. |
| `equipToMainHand(ref)` | Equip a one-handed weapon or shield to the main hand. Throws if the slot is occupied. |
| `equipToOffHand(ref)` | Equip a one-handed weapon or shield to the off hand. Throws if the slot is occupied. |
| `equipTwoHanded(ref)` | Equip a two-handed weapon. Both hands must be free. |
| `equipArmor(ref)` | Equip armor. The armor slot must be free. |
| `unequipFromMainHand()` | Stow the main-hand item back to loose inventory. |
| `unequipFromOffHand()` | Stow the off-hand item back to loose inventory. |
| `unequipArmor()` | Stow the equipped armor back to loose inventory. |
| `stowEquipped(ref, quantity?)` | Stow equipped combat stacks of a ref back to loose inventory (slot order). |
| `moveToContainer(ref, quantity, containerId)` | Move a loose stack into an existing container. |
| `removeFromContainer(ref, quantity, containerId)` | Return a contained stack to loose inventory. |

All equip methods are strict — they throw on slot conflicts rather than
auto-swapping. Unequip first if a slot needs to change.

## Caveats Or Current Limitations

- Character edits often affect derived state and resources, so the model layer should remain the default editing surface.
- NPCs and creatures share the same underlying runtime shape, so `NpcState` is currently an alias-style extension of `CreatureState`.
- `NpcModel` exists mostly to provide app-facing semantics and module hook separation, not a separate storage schema.
- `body.anatomy` is explicit persistence state, not a finished injury engine. Apps can now record amputations and replacements cleanly, but the package does not yet resolve combat outcomes from those records automatically.
