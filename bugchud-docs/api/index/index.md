[**@bugchud/core API Reference v0.1.0**](../index.md)

***

[@bugchud/core API Reference](../index.md) / index

# index

## Classes

| Class | Description |
| ------ | ------ |
| [CharacterInitializer](classes/CharacterInitializer.md) | Low-level character snapshot initializer used by the app-facing model layer. |
| [CharacterModel](classes/CharacterModel.md) | Editable runtime wrapper for `CharacterState`. |
| [NpcInitializer](classes/NpcInitializer.md) | Low-level creature/NPC snapshot initializer used by the app-facing model layer. |
| [CreatureModel](classes/CreatureModel.md) | Editable runtime wrapper for `CreatureState`. |
| [NpcModel](classes/NpcModel.md) | NPC-specialized creature model that participates in NPC module hooks. |
| [RulesetCatalog](classes/RulesetCatalog.md) | Indexed lookup facade over an immutable [BugchudRuleset](../content/interfaces/BugchudRuleset.md). |
| [BugchudCore](classes/BugchudCore.md) | Main application entrypoint for working with `@bugchud/core`. |
| [EncounterModel](classes/EncounterModel.md) | Lightweight runtime wrapper for encounter snapshots. |
| [CampaignModel](classes/CampaignModel.md) | Lightweight runtime wrapper for campaign snapshots. |
| [WorldModel](classes/WorldModel.md) | Lightweight runtime wrapper for world snapshots. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [CreationOptionsQuery](interfaces/CreationOptionsQuery.md) | - |
| [BugchudCoreOptions](interfaces/BugchudCoreOptions.md) | Configuration used to boot a single application-facing Bugchud runtime instance. |
| [EncounterInitializationInput](interfaces/EncounterInitializationInput.md) | Initialization input for a fresh encounter snapshot. |
| [CampaignInitializationInput](interfaces/CampaignInitializationInput.md) | Initialization input for a fresh campaign snapshot. |
| [WorldInitializationInput](interfaces/WorldInitializationInput.md) | Initialization input for a fresh world snapshot. |
| [ModuleSelectorContext](interfaces/ModuleSelectorContext.md) | - |
| [BugchudModule](interfaces/BugchudModule.md) | Supported extension surface for downstream applications. |
| [SnapshotKindMap](interfaces/SnapshotKindMap.md) | Maps snapshot kinds to their plain JSON-friendly data shape. |
| [SerializedSnapshot](interfaces/SerializedSnapshot.md) | Envelope written to disk or transport boundaries. |
| [ValidationIssue](interfaces/ValidationIssue.md) | - |
| [ValidationResult](interfaces/ValidationResult.md) | - |
| [ValidationContext](interfaces/ValidationContext.md) | - |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [SnapshotKind](type-aliases/SnapshotKind.md) | Supported plain snapshot payload families that can be serialized by the runtime helpers. |
| [ValidationSeverity](type-aliases/ValidationSeverity.md) | - |
| [ValidationTarget](type-aliases/ValidationTarget.md) | - |
| [Validator](type-aliases/Validator.md) | - |

## Variables

| Variable | Description |
| ------ | ------ |
| [SNAPSHOT\_SCHEMA](variables/SNAPSHOT_SCHEMA.md) | - |
| [SNAPSHOT\_VERSION](variables/SNAPSHOT_VERSION.md) | - |
| [VALIDATION\_SEVERITIES](variables/VALIDATION_SEVERITIES.md) | - |

## Functions

| Function | Description |
| ------ | ------ |
| [recomputeCharacterDerivedState](functions/recomputeCharacterDerivedState.md) | Recompute derived tags, spell access, and resources after character edits. |
| [createEncounterState](functions/createEncounterState.md) | Create a new encounter snapshot without wrapping it in a model class. |
| [createCampaignState](functions/createCampaignState.md) | Create a new campaign snapshot without wrapping it in a model class. |
| [createWorldState](functions/createWorldState.md) | Create a new world snapshot without wrapping it in a model class. |
| [serializeSnapshot](functions/serializeSnapshot.md) | Wrap a plain snapshot with schema metadata for safe storage or transport. |
| [deserializeSnapshot](functions/deserializeSnapshot.md) | Parse and validate a serialized snapshot envelope. |
| [validateModules](functions/validateModules.md) | Validate extension module metadata such as namespace presence and uniqueness. |
| [validateRuleset](functions/validateRuleset.md) | Validate the structural integrity of an authored `BugchudRuleset`. |
| [validateCharacterState](functions/validateCharacterState.md) | Validate a plain character snapshot, optionally checking refs against a ruleset. |
| [validateCreatureState](functions/validateCreatureState.md) | Validate a plain creature snapshot, optionally checking refs against a ruleset. |
| [validateNpcState](functions/validateNpcState.md) | Validate an NPC snapshot using the same rules as creature snapshots. |
| [createValidationIssue](functions/createValidationIssue.md) | Build one structured validation issue in the shared result format. |
| [createValidationResult](functions/createValidationResult.md) | Convert an issue list into the standard `ok` plus `issues` result shape. |
| [mergeValidationResults](functions/mergeValidationResults.md) | Merge several validation runs into a single combined result. |
| [isRegistryKind](functions/isRegistryKind.md) | Narrow a string to a supported content registry kind. |
| [resolveRefExists](functions/resolveRefExists.md) | Check whether a typed ref resolves inside the provided ruleset. |
