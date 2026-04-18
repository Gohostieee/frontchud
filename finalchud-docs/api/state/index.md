[**@bugchud/core API Reference v0.2.0**](../index.md)

***

[@bugchud/core API Reference](../index.md) / state

# state

## Interfaces

| Interface | Description |
| ------ | ------ |
| [VehicleState](interfaces/VehicleState.md) | Runtime vehicle instance with current hull, fuel, occupants, and cargo. |
| [FormationState](interfaces/FormationState.md) | Active formation state for a warband in campaign or battle play. |
| [WarbandState](interfaces/WarbandState.md) | Runtime warband state for campaign-scale movement and conflict. |
| [TerritoryState](interfaces/TerritoryState.md) | Runtime territory control slice tying geography to faction and fortress state. |
| [FortressState](interfaces/FortressState.md) | Runtime fortress/stronghold state. |
| [CampaignClockState](interfaces/CampaignClockState.md) | Long-term campaign clock state. |
| [CampaignState](interfaces/CampaignState.md) | Canonical campaign-scale runtime model. |
| [CharacterIdentityState](interfaces/CharacterIdentityState.md) | Narrative identity slice stored directly on a player character. |
| [CharacterState](interfaces/CharacterState.md) | Main player-facing runtime entity. |
| [CreatureIdentityState](interfaces/CreatureIdentityState.md) | Identity slice for GM actors and non-player creatures. |
| [CreatureState](interfaces/CreatureState.md) | Runtime creature/NPC state built to mirror player-facing combat hooks where practical. |
| [NpcState](interfaces/NpcState.md) | NPCs are represented by creature-shaped runtime state with editor-friendly semantics. |
| [AttributeSet](interfaces/AttributeSet.md) | Shared runtime-state helpers. |
| [DerivedStatSet](interfaces/DerivedStatSet.md) | Concrete calculated values stored on live state after creation or recomputation. |
| [ResourcePool](interfaces/ResourcePool.md) | One tracked resource pool such as health, mana dice, fate, or fuel. |
| [OwnedItemStack](interfaces/OwnedItemStack.md) | One owned stack in an inventory, including quantity and optional physical placement. |
| [InventoryContainerState](interfaces/InventoryContainerState.md) | Runtime container instance inside an inventory. |
| [InventoryState](interfaces/InventoryState.md) | Entire current inventory, separate from authored item definitions. |
| [LoadoutState](interfaces/LoadoutState.md) | What is actually equipped right now, as opposed to simply owned. |
| [InjuryState](interfaces/InjuryState.md) | Current wound/death pressure state carried by a living entity. |
| [BodyPartState](interfaces/BodyPartState.md) | One explicitly tracked body part or replacement. |
| [AnatomyState](interfaces/AnatomyState.md) | Explicit anatomy state covering both standard limbs and mutation-driven additions. |
| [XomState](interfaces/XomState.md) | Current corruption state and permanent Xom accumulation. |
| [BodyState](interfaces/BodyState.md) | Mutable body-layer state combining injuries, corruption, mutation, and bionics. |
| [MagicState](interfaces/MagicState.md) | Mutable black-magick state such as prepared spells and mana dice. |
| [AlchemyStockState](interfaces/AlchemyStockState.md) | Runtime stock entry for a crafted alchemical recipe. |
| [AlchemyState](interfaces/AlchemyState.md) | Mutable alchemy knowledge and current inventory of crafted brews. |
| [FaithState](interfaces/FaithState.md) | Mutable faith alignment, vows, relics, and granted benefits. |
| [FollowerState](interfaces/FollowerState.md) | Lightweight subordinate/follower state attached to characters or campaigns. |
| [SocialReligiousState](interfaces/SocialReligiousState.md) | Narrative/social identity state that changes over time during play. |
| [ProgressionState](interfaces/ProgressionState.md) | Mutable progression ledger for Fate, Dreams, and unlock state. |
| [TimelineStamp](interfaces/TimelineStamp.md) | Shared timeline stamp for history and event recording. |
| [ActionHistoryEntry](interfaces/ActionHistoryEntry.md) | History entry recorded by encounters or campaigns. |
| [EncounterZoneState](interfaces/EncounterZoneState.md) | Runtime encounter zone, using labeled bands rather than exact coordinate math. |
| [HazardState](interfaces/HazardState.md) | Runtime hazard state that can inject effects into an encounter. |
| [ActorPositionState](interfaces/ActorPositionState.md) | Current tactical position of an encounter actor. |
| [EncounterActorState](interfaces/EncounterActorState.md) | Flattened combat participant inside an encounter, regardless of source entity type. |
| [AmbushState](interfaces/AmbushState.md) | Surprise/ambush framing for encounter start state. |
| [TurnState](interfaces/TurnState.md) | Current turn tracker and initiative ordering for the encounter. |
| [EncounterState](interfaces/EncounterState.md) | Canonical tactical runtime model. |
| [WorldState](interfaces/WorldState.md) | Mutable world snapshot that can be shared across multiple encounters or campaigns. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [SaveBonusSet](type-aliases/SaveBonusSet.md) | - |
| [ResourceStateMap](type-aliases/ResourceStateMap.md) | Resource pools are sparse because not every actor or asset has every resource. |
| [ExtensionStateMap](type-aliases/ExtensionStateMap.md) | Namespaced extension payloads let downstream Bugchud projects attach extra runtime data without forking the base schemas. |
| [OwnedDefinitionRef](type-aliases/OwnedDefinitionRef.md) | Runtime inventory can own several different kinds of authored equipment. |
| [EquippedCoreCombatSlot](type-aliases/EquippedCoreCombatSlot.md) | Core combat slots that can physically hold equipped gear in inventory state. |
| [CoreAnatomyState](type-aliases/CoreAnatomyState.md) | Canonical anatomy map for the ordinary BUGCHUD humanoid body plan. |
| [CombatEntityRef](type-aliases/CombatEntityRef.md) | Common set of entity references that can participate in combat-facing views. |

## Functions

| Function | Description |
| ------ | ------ |
| [createDefaultAnatomyState](functions/createDefaultAnatomyState.md) | Default explicit anatomy snapshot used when a body has no bespoke mutations or amputations yet. |
