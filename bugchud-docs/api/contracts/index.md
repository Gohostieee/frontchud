[**@bugchud/core API Reference v0.1.0**](../index.md)

***

[@bugchud/core API Reference](../index.md) / contracts

# contracts

## Interfaces

| Interface | Description |
| ------ | ------ |
| [JsonPatchOperation](interfaces/JsonPatchOperation.md) | Action/event/resolution contracts for the future rules engine. |
| [StateDelta](interfaces/StateDelta.md) | One state mutation applied to one runtime entity after an action resolves. |
| [RuleContext](interfaces/RuleContext.md) | Shared runtime context every resolver needs in order to interpret an action. |
| [RollContext](interfaces/RollContext.md) | Narrow roll context passed to check/save resolvers. |
| [CheckResolution](interfaces/CheckResolution.md) | Result payload for a resolved attribute check. |
| [SaveResolution](interfaces/SaveResolution.md) | Result payload for a resolved saving throw. |
| [DamageResolution](interfaces/DamageResolution.md) | Result payload for applied damage after mitigation has been considered. |
| [ProgressionResolution](interfaces/ProgressionResolution.md) | Result payload for Fate spending and progression unlocks. |
| [MutationResolution](interfaces/MutationResolution.md) | Result payload for Xom-driven or explicit mutation changes. |
| [BaseGameAction](interfaces/BaseGameAction.md) | Base shape shared by every engine input action. |
| [PerformCheckAction](interfaces/PerformCheckAction.md) | Ask the engine to resolve a raw attribute check. |
| [RollSaveAction](interfaces/RollSaveAction.md) | Ask the engine to resolve a save against a specific threat. |
| [MakeAttackAction](interfaces/MakeAttackAction.md) | Ask the engine to resolve an attack from gear, spell, or similar offensive source. |
| [MoveActorAction](interfaces/MoveActorAction.md) | Tactical repositioning of an encounter actor between zones. |
| [CastSpellAction](interfaces/CastSpellAction.md) | Black-magick casting action. |
| [BrewAlchemyAction](interfaces/BrewAlchemyAction.md) | Crafting/brewing action for alchemy outputs. |
| [UseItemAction](interfaces/UseItemAction.md) | Generic item use action for consumables, grimoires, relics, and gear. |
| [ApplyEffectAction](interfaces/ApplyEffectAction.md) | Directly apply one or more effects without going through a more specific action kind. |
| [ProgressCharacterAction](interfaces/ProgressCharacterAction.md) | Spend Fate or similar progression resources to unlock new character capabilities. |
| [MutateCharacterAction](interfaces/MutateCharacterAction.md) | Trigger Xom/mutation flow on a character or creature. |
| [OperateVehicleAction](interfaces/OperateVehicleAction.md) | Campaign/encounter vehicle operation action. |
| [IssueWarbandOrderAction](interfaces/IssueWarbandOrderAction.md) | Campaign-scale order issued to a warband. |
| [AdvanceTurnAction](interfaces/AdvanceTurnAction.md) | Step encounter turn state forward. |
| [StartEncounterAction](interfaces/StartEncounterAction.md) | Initialize a new encounter state. |
| [EndEncounterAction](interfaces/EndEncounterAction.md) | Close out an encounter and record its outcome. |
| [BaseGameEvent](interfaces/BaseGameEvent.md) | Base event shape emitted by resolvers after actions are processed. |
| [ResolutionResult](interfaces/ResolutionResult.md) | Standard resolver return shape: patches, events, optional projections, and typed resolution info. |
| [RuleResolver](interfaces/RuleResolver.md) | Resolver interfaces define where concrete rule logic will eventually live. |
| [CheckResolver](interfaces/CheckResolver.md) | Specialized resolver for checks. |
| [SaveResolver](interfaces/SaveResolver.md) | Specialized resolver for saves. |
| [CombatResolver](interfaces/CombatResolver.md) | Specialized resolver for tactical combat actions. |
| [SpellResolver](interfaces/SpellResolver.md) | Specialized resolver for spellcasting. |
| [AlchemyResolver](interfaces/AlchemyResolver.md) | Specialized resolver for alchemy and item-use flows. |
| [ProgressionResolver](interfaces/ProgressionResolver.md) | Specialized resolver for Fate/Dream progression. |
| [MutationResolver](interfaces/MutationResolver.md) | Specialized resolver for Xom and mutation handling. |
| [EncounterResolver](interfaces/EncounterResolver.md) | Specialized resolver for encounter lifecycle actions. |
| [CampaignResolver](interfaces/CampaignResolver.md) | Specialized resolver for campaign-scale operational actions. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [Resolution](type-aliases/Resolution.md) | Union of the major typed resolution outcomes currently modeled. |
| [GameAction](type-aliases/GameAction.md) | Full input union currently supported by the action contract layer. |
| [GameEffect](type-aliases/GameEffect.md) | Active effect plus some provenance about how the engine produced it. |
| [GameEvent](type-aliases/GameEvent.md) | Full event union currently supported by the event contract layer. |
