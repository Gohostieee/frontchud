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
  .setResource("focus", 1, 3);
```

### NPC Flow

```ts
const npc = core.createNpc({
  name: "Roadfang",
  allegiance: "Raiders",
});

const actor = npc.toEncounterActor("raiders", "zone.front");
```

## Caveats Or Current Limitations

- Character edits often affect derived state and resources, so the model layer should remain the default editing surface.
- NPCs and creatures share the same underlying runtime shape, so `NpcState` is currently an alias-style extension of `CreatureState`.
- `NpcModel` exists mostly to provide app-facing semantics and module hook separation, not a separate storage schema.
