[**@bugchud/core API Reference v0.2.0**](../index.md)

***

[@bugchud/core API Reference](../index.md) / foundation

# foundation

## Interfaces

| Interface | Description |
| ------ | ------ |
| [DiceTerm](interfaces/DiceTerm.md) | One atomic dice term inside a larger expression, such as `2d6!` or `1d10kh`. |
| [DiceExpression](interfaces/DiceExpression.md) | A full roll expression made from one or more terms plus optional bounds. |
| [StepDie](interfaces/StepDie.md) | Used for step-die mechanics such as degrading maintenance dice. |
| [RolledDie](interfaces/RolledDie.md) | Captures one actual die result after rolling. |
| [RollBreakdown](interfaces/RollBreakdown.md) | Explains how each term contributed to the final total. |
| [RollResult](interfaces/RollResult.md) | Canonical shape for a fully resolved roll and its breakdown. |
| [DifficultyBand](interfaces/DifficultyBand.md) | Named difficulty bands are useful for UI, content authoring, and fixture scenarios. |
| [Duration](interfaces/Duration.md) | Common timing shape shared by conditions and active effects. |
| [TargetSelector](interfaces/TargetSelector.md) | A broad selector rather than a hard reference to a specific entity. |
| [Modifier](interfaces/Modifier.md) | One atomic numeric or step-based modification. |
| [ModifierSet](interfaces/ModifierSet.md) | Bundles modifiers so a capability or effect can hand out multiple changes at once. |
| [ResourceShift](interfaces/ResourceShift.md) | Serializable resource delta used by healing, costs, drains, and recovery. |
| [ConditionState](interfaces/ConditionState.md) | A live condition marker that can be carried on body state or an active effect. |
| [DamagePacket](interfaces/DamagePacket.md) | Typed damage payload before rules such as soak or mitigation are applied. |
| [MovementEffect](interfaces/MovementEffect.md) | Positional movement payload for forced movement, repositioning, or travel effects. |
| [NarrativeFlagEffect](interfaces/NarrativeFlagEffect.md) | Generic narrative state change when a strict numeric model is not enough. |
| [UnlockEffect](interfaces/UnlockEffect.md) | Lets an effect open up capabilities without hard-coding the consumer system here. |
| [ActiveEffect](interfaces/ActiveEffect.md) | Canonical effect shape shared across content, runtime, and event payloads. |
| [EffectBundle](interfaces/EffectBundle.md) | Helper for systems that guarantee they will emit at least one effect. |
| [DefinitionIdByKind](interfaces/DefinitionIdByKind.md) | This map allows generic helpers to recover the right branded ID from a definition kind. |
| [EntityIdByKind](interfaces/EntityIdByKind.md) | Same idea as `DefinitionIdByKind`, but for live runtime entities. |
| [RegistryRef](interfaces/RegistryRef.md) | A typed pointer into one of the immutable content registries. |
| [EntityRef](interfaces/EntityRef.md) | A typed pointer into live mutable state. |
| [JsonObject](interfaces/JsonObject.md) | - |
| [SourcePageRange](interfaces/SourcePageRange.md) | Inclusive page range inside the original BUGCHUD! rulebook. |
| [SourceTrace](interfaces/SourceTrace.md) | Source traces keep content anchored to the rulebook during later data-entry passes. |
| [NamedNode](interfaces/NamedNode.md) | Minimal naming contract shared by most authored definitions. |
| [SourceTagged](interfaces/SourceTagged.md) | Registry entries are authored, immutable, and tagged with source information. |
| [RegistryEntry](interfaces/RegistryEntry.md) | Minimal naming contract shared by most authored definitions. |
| [ReferenceList](interfaces/ReferenceList.md) | A lightweight wrapper for models that naturally expose a list of content refs. |
| [ValueByTag](interfaces/ValueByTag.md) | Utility pair for small tag-weight tables. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [AttributeKey](type-aliases/AttributeKey.md) | - |
| [DerivedStatKey](type-aliases/DerivedStatKey.md) | - |
| [SaveType](type-aliases/SaveType.md) | - |
| [DamageType](type-aliases/DamageType.md) | - |
| [ItemKind](type-aliases/ItemKind.md) | - |
| [WeaponMode](type-aliases/WeaponMode.md) | - |
| [ArmorBehavior](type-aliases/ArmorBehavior.md) | - |
| [ShieldBehavior](type-aliases/ShieldBehavior.md) | - |
| [SpellDeliveryType](type-aliases/SpellDeliveryType.md) | - |
| [AlchemyDeliveryType](type-aliases/AlchemyDeliveryType.md) | - |
| [MutationCategory](type-aliases/MutationCategory.md) | - |
| [BionicSlot](type-aliases/BionicSlot.md) | - |
| [BodyLocationKey](type-aliases/BodyLocationKey.md) | - |
| [BodyPartKind](type-aliases/BodyPartKind.md) | - |
| [BodyPartStatus](type-aliases/BodyPartStatus.md) | - |
| [FaithBenefitKind](type-aliases/FaithBenefitKind.md) | - |
| [ConditionKind](type-aliases/ConditionKind.md) | - |
| [EffectKind](type-aliases/EffectKind.md) | - |
| [EncounterActorKind](type-aliases/EncounterActorKind.md) | - |
| [CampaignAssetKind](type-aliases/CampaignAssetKind.md) | - |
| [GameActionKind](type-aliases/GameActionKind.md) | - |
| [GameEventKind](type-aliases/GameEventKind.md) | - |
| [ResourceKind](type-aliases/ResourceKind.md) | - |
| [DurationUnit](type-aliases/DurationUnit.md) | - |
| [ModifierOperation](type-aliases/ModifierOperation.md) | - |
| [TargetScope](type-aliases/TargetScope.md) | - |
| [RangeBandLabel](type-aliases/RangeBandLabel.md) | - |
| [OriginGroup](type-aliases/OriginGroup.md) | - |
| [DreamGroup](type-aliases/DreamGroup.md) | - |
| [DieSize](type-aliases/DieSize.md) | - |
| [AdvantageState](type-aliases/AdvantageState.md) | - |
| [RollFlag](type-aliases/RollFlag.md) | - |
| [ModifierTarget](type-aliases/ModifierTarget.md) | Target keys that modifiers can point at. |
| [Brand](type-aliases/Brand.md) | Branded IDs are one of the most important safety tools in the package. |
| [DefinitionKind](type-aliases/DefinitionKind.md) | Definition kinds correspond to immutable registry entries stored in the ruleset. |
| [EntityKind](type-aliases/EntityKind.md) | Entity kinds correspond to live runtime state rather than authored content. |
| [RaceId](type-aliases/RaceId.md) | - |
| [OriginId](type-aliases/OriginId.md) | - |
| [BackgroundId](type-aliases/BackgroundId.md) | - |
| [DreamId](type-aliases/DreamId.md) | - |
| [ItemId](type-aliases/ItemId.md) | - |
| [WeaponId](type-aliases/WeaponId.md) | - |
| [ArmorId](type-aliases/ArmorId.md) | - |
| [ShieldId](type-aliases/ShieldId.md) | - |
| [VehicleId](type-aliases/VehicleId.md) | - |
| [MountId](type-aliases/MountId.md) | - |
| [BionicId](type-aliases/BionicId.md) | - |
| [MutationId](type-aliases/MutationId.md) | - |
| [GrimoireId](type-aliases/GrimoireId.md) | - |
| [SpellId](type-aliases/SpellId.md) | - |
| [AlchemyRecipeId](type-aliases/AlchemyRecipeId.md) | - |
| [PantheonId](type-aliases/PantheonId.md) | - |
| [PatronId](type-aliases/PatronId.md) | - |
| [BoonId](type-aliases/BoonId.md) | - |
| [CovenantId](type-aliases/CovenantId.md) | - |
| [RelicId](type-aliases/RelicId.md) | - |
| [FactionId](type-aliases/FactionId.md) | - |
| [RegionId](type-aliases/RegionId.md) | - |
| [CultureId](type-aliases/CultureId.md) | - |
| [TerminologyId](type-aliases/TerminologyId.md) | - |
| [CreatureId](type-aliases/CreatureId.md) | - |
| [NpcLoadoutId](type-aliases/NpcLoadoutId.md) | - |
| [WarbandId](type-aliases/WarbandId.md) | - |
| [FortressId](type-aliases/FortressId.md) | - |
| [CharacterId](type-aliases/CharacterId.md) | - |
| [CreatureStateId](type-aliases/CreatureStateId.md) | - |
| [EncounterId](type-aliases/EncounterId.md) | - |
| [EncounterActorId](type-aliases/EncounterActorId.md) | - |
| [VehicleStateId](type-aliases/VehicleStateId.md) | - |
| [WarbandStateId](type-aliases/WarbandStateId.md) | - |
| [FortressStateId](type-aliases/FortressStateId.md) | - |
| [CampaignId](type-aliases/CampaignId.md) | - |
| [WorldId](type-aliases/WorldId.md) | - |
| [DefinitionId](type-aliases/DefinitionId.md) | - |
| [EntityId](type-aliases/EntityId.md) | - |
| [Tag](type-aliases/Tag.md) | Broad metadata and serialization helpers used by registry entries and docs-facing schemas. |
| [Slug](type-aliases/Slug.md) | - |
| [JsonPrimitive](type-aliases/JsonPrimitive.md) | JSON helper types keep event payloads and patch payloads serializable by construction. |
| [JsonValue](type-aliases/JsonValue.md) | - |
| [JsonArray](type-aliases/JsonArray.md) | - |
| [NonEmptyArray](type-aliases/NonEmptyArray.md) | Used when a list must contain at least one element, such as effect bundles. |
| [RulebookChapter](type-aliases/RulebookChapter.md) | - |
| [Registry](type-aliases/Registry.md) | A registry is just a typed lookup table keyed by branded IDs. |
| [OptionalRegistry](type-aliases/OptionalRegistry.md) | - |

## Variables

| Variable | Description |
| ------ | ------ |
| [ATTRIBUTE\_KEYS](variables/ATTRIBUTE_KEYS.md) | Canonical string unions used across the Bugchud engine. |
| [DERIVED\_STAT\_KEYS](variables/DERIVED_STAT_KEYS.md) | Derived stats are computed from attributes and commonly recalculated into views. |
| [SAVE\_TYPES](variables/SAVE_TYPES.md) | - |
| [DAMAGE\_TYPES](variables/DAMAGE_TYPES.md) | Damage types are intentionally broad enough to cover gear, magick, faith, and corruption. |
| [ITEM\_KINDS](variables/ITEM_KINDS.md) | Item families are used by authored definitions, inventory state, and fixture coverage. |
| [WEAPON\_MODES](variables/WEAPON_MODES.md) | Weapon modes distinguish how an attack is delivered, not just what item caused it. |
| [ARMOR\_BEHAVIORS](variables/ARMOR_BEHAVIORS.md) | Armor behavior models broad defense patterns before exact rules are implemented. |
| [SHIELD\_BEHAVIORS](variables/SHIELD_BEHAVIORS.md) | Shield behavior stays separate from armor because shields often involve reactions or coverage. |
| [SPELL\_DELIVERY\_TYPES](variables/SPELL_DELIVERY_TYPES.md) | Spell delivery tells the simulator how a spell reaches or affects its target. |
| [ALCHEMY\_DELIVERY\_TYPES](variables/ALCHEMY_DELIVERY_TYPES.md) | Alchemy delivery parallels spell delivery, but reflects consumables and throwables instead. |
| [MUTATION\_CATEGORIES](variables/MUTATION_CATEGORIES.md) | Mutation categories make it possible to group corruption outcomes by body/system impact. |
| [BIONIC\_SLOTS](variables/BIONIC_SLOTS.md) | Bionic slots prevent impossible loadouts and support body-state validation later. |
| [BODY\_LOCATION\_KEYS](variables/BODY_LOCATION_KEYS.md) | Canonical core body locations used by explicit anatomy state. |
| [BODY\_PART\_KINDS](variables/BODY_PART_KINDS.md) | Broad body-part families shared by core anatomy and mutation-driven additions. |
| [BODY\_PART\_STATUSES](variables/BODY_PART_STATUSES.md) | Explicit integrity states for limbs and body parts tracked in runtime state. |
| [FAITH\_BENEFIT\_KINDS](variables/FAITH_BENEFIT_KINDS.md) | Faith benefits cover both blessings gained and obligations imposed by religion. |
| [CONDITION\_KINDS](variables/CONDITION_KINDS.md) | Conditions are combat-facing or narrative-facing status markers that can sit on live state. |
| [EFFECT\_KINDS](variables/EFFECT_KINDS.md) | Effect kinds are the main "payload categories" an action or rule can emit. |
| [ENCOUNTER\_ACTOR\_KINDS](variables/ENCOUNTER_ACTOR_KINDS.md) | Encounter actor kinds flatten characters, creatures, vehicles, and campaign assets into one battlefield model. |
| [CAMPAIGN\_ASSET\_KINDS](variables/CAMPAIGN_ASSET_KINDS.md) | Campaign asset kinds let long-term play model things that are not single combatants. |
| [GAME\_ACTION\_KINDS](variables/GAME_ACTION_KINDS.md) | Game actions are the input language the future simulation engine will consume. |
| [GAME\_EVENT\_KINDS](variables/GAME_EVENT_KINDS.md) | Game events are the emitted output language produced after actions resolve. |
| [RESOURCE\_KINDS](variables/RESOURCE_KINDS.md) | Resources are intentionally shared between character, encounter, and campaign layers. |
| [DURATION\_UNITS](variables/DURATION_UNITS.md) | Duration units keep effects serializable without committing to implementation logic yet. |
| [MODIFIER\_OPERATIONS](variables/MODIFIER_OPERATIONS.md) | Modifier operations define how a modifier changes a target value when applied. |
| [TARGET\_SCOPES](variables/TARGET_SCOPES.md) | Target scopes are broad selectors used by both actions and effects. |
| [RANGE\_BAND\_LABELS](variables/RANGE_BAND_LABELS.md) | Range bands stay label-based so encounter rules can use zones instead of strict distance math. |
| [ORIGIN\_GROUPS](variables/ORIGIN_GROUPS.md) | Origin groups mirror the rulebook's broad homeland buckets. |
| [DREAM\_GROUPS](variables/DREAM_GROUPS.md) | Dream groups let progression content cluster by advancement family. |
| [DIE\_SIZES](variables/DIE_SIZES.md) | Dice modeling primitives. |
| [RULEBOOK\_CHAPTERS](variables/RULEBOOK_CHAPTERS.md) | Known rulebook chapter labels used for source tracing back into the PDF. |

## Functions

| Function | Description |
| ------ | ------ |
| [brand](functions/brand.md) | Brand a string with one of the package's nominal ID marker types. |
| [ref](functions/ref.md) | Create a typed reference into an immutable authored registry. |
| [entity](functions/entity.md) | Create a typed reference into a live runtime entity snapshot. |
| [trace](functions/trace.md) | Construct a rulebook source trace while keeping optional metadata optional. |
| [toRegistry](functions/toRegistry.md) | Convert a list of definitions into the canonical typed registry shape. |
| [toRefs](functions/toRefs.md) | Convert registry entries to typed refs in one pass. |
