[**@bugchud/core API Reference v0.2.0**](../index.md)

***

[@bugchud/core API Reference](../index.md) / content

# content

## Interfaces

| Interface | Description |
| ------ | ------ |
| [BionicDefinition](interfaces/BionicDefinition.md) | Cybernetic upgrade definition with installation and maintenance hooks. |
| [MutationDefinition](interfaces/MutationDefinition.md) | One authored mutation outcome that can be granted by Xom or scenario logic. |
| [MutationRemovalRuleDefinition](interfaces/MutationRemovalRuleDefinition.md) | High-level rule metadata for how mutations can be removed or managed. |
| [XomDefinition](interfaces/XomDefinition.md) | Ruleset-level corruption track metadata. |
| [BodyRulesDefinition](interfaces/BodyRulesDefinition.md) | Aggregated body-system metadata linking bionics, mutation, and Xom. |
| [RaceDefinition](interfaces/RaceDefinition.md) | Authored race/ancestry entry used during character creation. |
| [OriginDefinition](interfaces/OriginDefinition.md) | Authored homeland/origin entry that constrains background and dream flavor. |
| [BackgroundDefinition](interfaces/BackgroundDefinition.md) | Authored background/upbringing entry that grants narrative and starting gear hooks. |
| [DreamDefinition](interfaces/DreamDefinition.md) | One purchasable or unlockable progression perk in the Dream system. |
| [CharacterCreationDefinition](interfaces/CharacterCreationDefinition.md) | Ruleset-level configuration for the creation flow. |
| [DerivedStatDefinition](interfaces/DerivedStatDefinition.md) | Named derived stat and the attributes it conceptually depends on. |
| [FateDefinition](interfaces/FateDefinition.md) | Author-facing metadata for the Fate economy. |
| [SpellAccessDefinition](interfaces/SpellAccessDefinition.md) | Describes how spellcasting access plugs into progression rather than being universal. |
| [CharacterProgressionDefinition](interfaces/CharacterProgressionDefinition.md) | Ruleset-level progression metadata and dream registry entrypoints. |
| [AttributeDefinition](interfaces/AttributeDefinition.md) | Lightweight authored attribute metadata for display and docs. |
| [CharacterLoreDefinition](interfaces/CharacterLoreDefinition.md) | Lore-oriented linkage between identity systems used during creation and play. |
| [StatFormula](interfaces/StatFormula.md) | Formula hint for a derived stat. This is descriptive, not executable logic. |
| [CurrencyValue](interfaces/CurrencyValue.md) | Simple currency amount used across purchasing, upkeep, and recruitment costs. |
| [SlotCost](interfaces/SlotCost.md) | Slot cost keeps inventory authoring separate from live inventory usage. |
| [OwnershipGrant](interfaces/OwnershipGrant.md) | Grant an owned piece of gear during creation, dreams, or NPC templates. |
| [AttackProfileTemplate](interfaces/AttackProfileTemplate.md) | Reusable attack template for weapons, spells, monsters, and warbands. |
| [MovementProfile](interfaces/MovementProfile.md) | Movement block shared by actors, vehicles, mounts, and formation templates. |
| [SensesProfile](interfaces/SensesProfile.md) | Optional sense package for content that perceives the world in unusual ways. |
| [CombatantProfileTemplate](interfaces/CombatantProfileTemplate.md) | A generic combat template used by GM entities and campaign-scale units. |
| [CraftingIngredient](interfaces/CraftingIngredient.md) | Ingredient line item used by alchemy recipes and future crafting systems. |
| [DeliveryProfile](interfaces/DeliveryProfile.md) | Small helper for content that can be delivered by multiple subsystems. |
| [BaseTaggedDefinition](interfaces/BaseTaggedDefinition.md) | Base authored definition shape shared by most registries. |
| [CheckRulesDefinition](interfaces/CheckRulesDefinition.md) | High-level authored check rules from the core system chapter. |
| [SaveRulesDefinition](interfaces/SaveRulesDefinition.md) | High-level authored save rules from the core system chapter. |
| [ProgressionRulesDefinition](interfaces/ProgressionRulesDefinition.md) | Progression metadata that explains how Fate-driven advancement is framed. |
| [XomRulesDefinition](interfaces/XomRulesDefinition.md) | Authored corruption metadata for Xom escalation. |
| [CombatRulesDefinition](interfaces/CombatRulesDefinition.md) | Global combat procedures and assumptions, not per-actor combat state. |
| [InventoryRulesDefinition](interfaces/InventoryRulesDefinition.md) | High-level inventory rules such as carry slots and container support. |
| [CoreRulesDefinition](interfaces/CoreRulesDefinition.md) | Aggregated core-rules metadata stored directly on the ruleset. |
| [ItemEconomyProfile](interfaces/ItemEconomyProfile.md) | Economy information attached to authored items and assets. |
| [CarriedItemDefinitionShape](interfaces/CarriedItemDefinitionShape.md) | Shared shape for authored items before specializing into weapon/armor/etc. |
| [ArmorMitigationProfile](interfaces/ArmorMitigationProfile.md) | Common mitigation block for armor definitions. |
| [ShieldMitigationProfile](interfaces/ShieldMitigationProfile.md) | Common mitigation block for shield definitions. |
| [CreatureDefinition](interfaces/CreatureDefinition.md) | Monster/creature definition that can project directly into encounter views. |
| [NpcLoadoutDefinition](interfaces/NpcLoadoutDefinition.md) | Reusable NPC package that shares the same combat template language as creatures and players. |
| [GmContentDefinition](interfaces/GmContentDefinition.md) | Grouped GM-facing registry references stored on the root ruleset. |
| [ContentRegistries](interfaces/ContentRegistries.md) | Every concrete content registry keyed by the correct branded ID family. |
| [BugchudRuleset](interfaces/BugchudRuleset.md) | Root immutable ruleset object. |
| [EconomyDefinition](interfaces/EconomyDefinition.md) | Currency system metadata for the broader economy chapter. |
| [ContainerDefinition](interfaces/ContainerDefinition.md) | Authored container archetype for inventory/carry-slot rules. |
| [CarrySlotRulesDefinition](interfaces/CarrySlotRulesDefinition.md) | Ruleset-level carry-slot configuration. |
| [ItemDefinition](interfaces/ItemDefinition.md) | General non-weapon, non-armor inventory entry. |
| [WeaponAmmoProfile](interfaces/WeaponAmmoProfile.md) | Firearm/ammo metadata separated from the attack profile itself. |
| [WeaponDefinition](interfaces/WeaponDefinition.md) | Weapon definition used by characters, creatures, vehicles, and warbands alike. |
| [ArmorDefinition](interfaces/ArmorDefinition.md) | Armor definition with mitigation behavior and covered body regions. |
| [ShieldDefinition](interfaces/ShieldDefinition.md) | Shield definition separated from armor because its behavior is often reactive. |
| [VehicleWeaponMount](interfaces/VehicleWeaponMount.md) | Vehicle mount point for attaching heavy or mounted weapons. |
| [VehicleDefinition](interfaces/VehicleDefinition.md) | Vehicle definition for travel, transport, and encounter participation. |
| [MountDefinition](interfaces/MountDefinition.md) | Mount definition for living transport distinct from mechanized vehicles. |
| [InventoryAndAssetsDefinition](interfaces/InventoryAndAssetsDefinition.md) | Grouped authored inventory subsystem references stored on the root ruleset. |
| [GrimoireDefinition](interfaces/GrimoireDefinition.md) | Spellbook/grimoire entry that bundles spells and copying risk. |
| [SpellDefinition](interfaces/SpellDefinition.md) | Black-magick spell definition used by authored content and runtime refs. |
| [PotionPotencyProfile](interfaces/PotionPotencyProfile.md) | Potency metadata for alchemical outputs. |
| [AlchemyRecipeDefinition](interfaces/AlchemyRecipeDefinition.md) | Recipe definition for potions, powders, toxins, bombs, and similar brews. |
| [PantheonDefinition](interfaces/PantheonDefinition.md) | Pantheon groups patrons into a larger religious family. |
| [PatronDefinition](interfaces/PatronDefinition.md) | Patron/god entry tying together boons, covenants, and relics. |
| [BoonDefinition](interfaces/BoonDefinition.md) | Faith boon or miracle definition that grants explicit capabilities. |
| [CovenantDefinition](interfaces/CovenantDefinition.md) | Covenant definition that combines vows, benefits, and possible penalties. |
| [RelicDefinition](interfaces/RelicDefinition.md) | Relic definition for sacred equipment or portable divine power sources. |
| [SupernaturalDefinition](interfaces/SupernaturalDefinition.md) | Grouped supernatural registry references stored on the root ruleset. |
| [FactionDefinition](interfaces/FactionDefinition.md) | World faction entry used by identity, territory, and campaign context. |
| [RegionDefinition](interfaces/RegionDefinition.md) | Geographic region entry for campaigns and world-state context. |
| [CultureDefinition](interfaces/CultureDefinition.md) | Culture entry used for language, lore, and social identity. |
| [TerminologyDefinition](interfaces/TerminologyDefinition.md) | Glossary or setting terminology entry from the world chapter. |
| [FormationTemplate](interfaces/FormationTemplate.md) | Default combat formation for a warband entry. |
| [WarbandDefinition](interfaces/WarbandDefinition.md) | Campaign-scale military unit definition. |
| [TerritoryFeature](interfaces/TerritoryFeature.md) | Small typed payload for describing territory benefits or strategic value. |
| [FortressDefinition](interfaces/FortressDefinition.md) | Fortress/stronghold definition for campaign-scale play. |
| [WorldDefinition](interfaces/WorldDefinition.md) | Grouped world registry references stored on the root ruleset. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [EquipmentRef](type-aliases/EquipmentRef.md) | Shared authored-content helpers. |
| [FaithRef](type-aliases/FaithRef.md) | - |
| [RulePrerequisite](type-aliases/RulePrerequisite.md) | General prerequisite language used by content definitions. |
| [GrantedCapability](type-aliases/GrantedCapability.md) | Structured capability payloads that definitions can grant. |
