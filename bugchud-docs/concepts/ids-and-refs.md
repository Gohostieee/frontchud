# IDs And Refs

## What This Is

This page explains the nominal id and typed reference system in `foundation`, which is one of the main safety features in the package.

## When An App Should Use It

Use this page when creating ruleset data, storing references between systems, or passing ids and refs through application code.

## Important Related Types And Classes

- `Brand`
- `RegistryRef`
- `EntityRef`
- `DefinitionKind`
- `EntityKind`
- `brand()`
- `ref()`
- `entity()`

## How It Connects To The Rest Of The Library

The package separates two categories of identifiers:

- definition ids
  For immutable authored content such as races, weapons, dreams, creatures, and factions.
- entity ids
  For live runtime state such as characters, creature states, encounters, and campaigns.

Typed refs are small objects that point at those ids with their family attached:

- `RegistryRef<"race">`
- `RegistryRef<"weapon">`
- `EntityRef<"character">`

That means application code can preserve intent without passing around raw strings that could be mixed up.

## Example Usage

```ts
import { brand, entity, ref } from "@bugchud/core/foundation";

const raceRef = ref("race", brand<"RaceId">("race.roachborn"));
const actorRef = entity("character", brand<"CharacterId">("character.marta.ab12cd"));
```

In normal application usage you rarely need to mint ids by hand. Most apps will receive ids and refs from:

- ruleset content in `@bugchud/core/data`
- model factories such as `createCharacter()`
- plain snapshots loaded from storage

## Caveats Or Current Limitations

- Branding is a TypeScript safety feature; ids are still strings at runtime.
- Refs are not self-validating. Use the catalog or validation helpers to confirm they resolve.
- Apps should prefer keeping refs intact instead of flattening them to untyped string ids.
