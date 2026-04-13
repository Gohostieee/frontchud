import { BugchudCore } from "@bugchud/core";
import { importedRuleset } from "@bugchud/core/data";
import {
  CONDITION_KINDS,
  DAMAGE_TYPES,
  DURATION_UNITS,
  EFFECT_KINDS,
  MODIFIER_OPERATIONS,
  RESOURCE_KINDS,
  SAVE_TYPES,
  TARGET_SCOPES,
} from "@bugchud/core/foundation";
import type {
  CharacterInitializationInput,
  CharacterState,
  NpcInitializationInput,
  NpcState,
} from "@bugchud/core";
import type { ValidationResult } from "@bugchud/core/validation";
import { v } from "convex/values";
import type { MutationCtx, QueryCtx } from "./_generated/server";

const literalUnion = <T extends readonly string[]>(values: T) =>
  v.union(
    ...(values.map((value) => v.literal(value)) as unknown as [
      ReturnType<typeof v.literal>,
      ...ReturnType<typeof v.literal>[],
    ]),
  );

const definitionKinds = [
  "race",
  "origin",
  "background",
  "dream",
  "item",
  "weapon",
  "armor",
  "shield",
  "vehicle",
  "mount",
  "bionic",
  "mutation",
  "grimoire",
  "spell",
  "alchemyRecipe",
  "pantheon",
  "patron",
  "boon",
  "covenant",
  "relic",
  "faction",
  "region",
  "culture",
  "terminology",
  "creature",
  "npcLoadout",
  "warband",
  "fortress",
] as const;

const entityKinds = [
  "character",
  "creatureState",
  "encounter",
  "encounterActor",
  "vehicleState",
  "warbandState",
  "fortressState",
  "campaign",
  "world",
] as const;

const optionalNumberRecord = <T extends readonly string[]>(keys: T) =>
  v.object(
    Object.fromEntries(keys.map((key) => [key, v.optional(v.number())])),
  );

const jsonBlobValidator = v.record(v.string(), v.any());

export const bugchudCore = new BugchudCore({ ruleset: importedRuleset });

export const BUGCHUD_RULESET_ID = importedRuleset.id;
export const BUGCHUD_RULESET_VERSION = importedRuleset.version;
export const BUGCHUD_SCHEMA_VERSION = 1;

export const definitionKindValidator = literalUnion(definitionKinds);
export const entityKindValidator = literalUnion(entityKinds);
export const actorKindValidator = v.union(
  v.literal("creature"),
  v.literal("npc"),
  v.literal("mount"),
);
export const conditionKindValidator = literalUnion(CONDITION_KINDS);
export const damageTypeValidator = literalUnion(DAMAGE_TYPES);
export const durationUnitValidator = literalUnion(DURATION_UNITS);
export const effectKindValidator = literalUnion(EFFECT_KINDS);
export const modifierOperationValidator = literalUnion(MODIFIER_OPERATIONS);
export const targetScopeValidator = literalUnion(TARGET_SCOPES);

export const registryRefValidator = (kind?: string) =>
  kind
    ? v.object({
        kind: v.literal(kind),
        id: v.string(),
      })
    : v.object({
        kind: definitionKindValidator,
        id: v.string(),
      });

export const entityRefValidator = (kind?: string) =>
  kind
    ? v.object({
        kind: v.literal(kind),
        id: v.string(),
      })
    : v.object({
        kind: entityKindValidator,
        id: v.string(),
      });

export const attributeSetValidator = v.object({
  twitch: v.number(),
  flesh: v.number(),
  mojo: v.number(),
  glory: v.number(),
});

export const derivedStatSetValidator = v.object({
  sprint: v.number(),
  skill: v.number(),
  bones: v.number(),
  manaDiceMax: v.number(),
  focus: v.number(),
});

export const saveBonusSetValidator = optionalNumberRecord(SAVE_TYPES);

export const resourcePoolValidator = v.object({
  current: v.number(),
  maximum: v.number(),
  temporary: v.optional(v.number()),
  refresh: v.optional(v.string()),
});

export const resourceStateMapValidator = v.object(
  Object.fromEntries(
    RESOURCE_KINDS.map((kind) => [kind, v.optional(resourcePoolValidator)]),
  ),
);

export const ownedDefinitionRefValidator = v.union(
  registryRefValidator("item"),
  registryRefValidator("weapon"),
  registryRefValidator("armor"),
  registryRefValidator("shield"),
  registryRefValidator("grimoire"),
  registryRefValidator("relic"),
);

export const ownedItemStackValidator = v.object({
  ref: ownedDefinitionRefValidator,
  quantity: v.number(),
  charges: v.optional(v.number()),
  containerId: v.optional(v.string()),
  tags: v.optional(v.array(v.string())),
});

export const inventoryContainerStateValidator = v.object({
  id: v.string(),
  label: v.string(),
  capacity: v.number(),
  occupiedSlots: v.number(),
});

export const inventoryStateValidator = v.object({
  carrySlotsTotal: v.number(),
  carrySlotsUsed: v.number(),
  currency: v.record(v.string(), v.number()),
  containers: v.array(inventoryContainerStateValidator),
  items: v.array(ownedItemStackValidator),
});

export const loadoutStateValidator = v.object({
  primaryWeaponRef: v.optional(registryRefValidator("weapon")),
  secondaryWeaponRef: v.optional(registryRefValidator("weapon")),
  armorRef: v.optional(registryRefValidator("armor")),
  shieldRef: v.optional(registryRefValidator("shield")),
  equippedItemRefs: v.array(ownedDefinitionRefValidator),
  preparedVehicleWeaponRefs: v.optional(v.array(registryRefValidator("weapon"))),
});

export const durationValidator = v.object({
  unit: durationUnitValidator,
  amount: v.number(),
  until: v.optional(v.string()),
});

export const targetSelectorValidator = v.object({
  scope: targetScopeValidator,
  quantity: v.optional(v.number()),
  tags: v.optional(v.array(v.string())),
});

export const modifierValidator = v.object({
  target: v.string(),
  operation: modifierOperationValidator,
  value: v.number(),
  source: v.string(),
  stackKey: v.optional(v.string()),
  requiresCondition: v.optional(conditionKindValidator),
  notes: v.optional(v.array(v.string())),
});

export const modifierSetValidator = v.object({
  modifiers: v.array(modifierValidator),
});

export const resourceShiftValidator = v.object({
  resource: literalUnion(RESOURCE_KINDS),
  amount: v.number(),
  minimum: v.optional(v.number()),
  maximum: v.optional(v.number()),
});

export const conditionStateValidator = v.object({
  kind: conditionKindValidator,
  source: v.string(),
  duration: v.optional(durationValidator),
  stacks: v.optional(v.number()),
  notes: v.optional(v.array(v.string())),
});

export const damagePacketValidator = v.object({
  type: damageTypeValidator,
  amount: v.number(),
  armorPiercing: v.optional(v.number()),
  source: v.optional(v.string()),
  tags: v.optional(v.array(v.string())),
});

export const movementEffectValidator = v.object({
  distance: v.number(),
  forced: v.optional(v.boolean()),
  destinationZoneId: v.optional(v.string()),
});

export const narrativeFlagEffectValidator = v.object({
  flag: v.string(),
  value: v.any(),
});

export const unlockEffectValidator = v.object({
  unlocks: v.array(v.string()),
});

export const activeEffectValidator = v.object({
  id: v.string(),
  kind: effectKindValidator,
  label: v.string(),
  sourceEntity: v.optional(
    v.union(
      entityRefValidator("character"),
      entityRefValidator("creatureState"),
      entityRefValidator("encounterActor"),
      entityRefValidator("vehicleState"),
    ),
  ),
  target: targetSelectorValidator,
  duration: v.optional(durationValidator),
  modifierSet: v.optional(modifierSetValidator),
  conditions: v.optional(v.array(conditionStateValidator)),
  resourceShifts: v.optional(v.array(resourceShiftValidator)),
  damage: v.optional(v.array(damagePacketValidator)),
  movement: v.optional(movementEffectValidator),
  unlock: v.optional(unlockEffectValidator),
  narrativeFlags: v.optional(v.array(narrativeFlagEffectValidator)),
  tags: v.optional(v.array(v.string())),
});

export const injuryStateValidator = v.object({
  currentWounds: v.number(),
  maximumWounds: v.number(),
  deathPressure: v.number(),
  healingTags: v.optional(v.array(v.string())),
});

export const xomStateValidator = v.object({
  current: v.number(),
  permanent: v.number(),
  thresholdsCrossed: v.array(v.number()),
});

export const bodyStateValidator = v.object({
  injuries: injuryStateValidator,
  xom: xomStateValidator,
  mutationRefs: v.array(registryRefValidator("mutation")),
  bionicRefs: v.array(registryRefValidator("bionic")),
  activeConditions: v.array(conditionStateValidator),
});

export const magicStateValidator = v.object({
  canCast: v.boolean(),
  manaDiceCurrent: v.number(),
  manaDiceMaximum: v.number(),
  grimoireRefs: v.array(registryRefValidator("grimoire")),
  knownSpellRefs: v.array(registryRefValidator("spell")),
  preparedSpellRefs: v.array(registryRefValidator("spell")),
  activeCastEffects: v.optional(v.array(activeEffectValidator)),
});

export const alchemyStockStateValidator = v.object({
  recipeRef: registryRefValidator("alchemyRecipe"),
  quantity: v.number(),
});

export const alchemyStateValidator = v.object({
  knownRecipeRefs: v.array(registryRefValidator("alchemyRecipe")),
  stock: v.array(alchemyStockStateValidator),
});

export const faithStateValidator = v.object({
  pantheonRef: v.optional(registryRefValidator("pantheon")),
  patronRef: v.optional(registryRefValidator("patron")),
  boonRefs: v.array(registryRefValidator("boon")),
  covenantRefs: v.array(registryRefValidator("covenant")),
  relicRefs: v.array(registryRefValidator("relic")),
  vowTags: v.optional(v.array(v.string())),
});

export const followerStateValidator = v.object({
  label: v.string(),
  quantity: v.number(),
  warbandRef: v.optional(registryRefValidator("warband")),
  tags: v.optional(v.array(v.string())),
});

export const socialReligiousStateValidator = v.object({
  languages: v.array(v.string()),
  factionRefs: v.optional(v.array(registryRefValidator("faction"))),
  cultureRefs: v.optional(v.array(registryRefValidator("culture"))),
  followers: v.array(followerStateValidator),
  reputationTags: v.optional(v.array(v.string())),
});

export const progressionStateValidator = v.object({
  currentFate: v.number(),
  totalFateEarned: v.number(),
  dreamRefs: v.array(registryRefValidator("dream")),
  unlockedTags: v.optional(v.array(v.string())),
  spellAccessUnlocked: v.boolean(),
});

export const characterIdentityStateValidator = v.object({
  name: v.string(),
  raceRef: registryRefValidator("race"),
  originRef: registryRefValidator("origin"),
  backgroundRefs: v.array(registryRefValidator("background")),
  faithLabel: v.optional(v.string()),
  epithet: v.optional(v.string()),
});

export const creatureIdentityStateValidator = v.object({
  name: v.string(),
  creatureRef: registryRefValidator("creature"),
  npcLoadoutRef: v.optional(registryRefValidator("npcLoadout")),
  allegiance: v.optional(v.string()),
});

export const characterStateValidator = v.object({
  id: v.string(),
  kind: v.literal("character"),
  identity: characterIdentityStateValidator,
  attributes: attributeSetValidator,
  derivedStats: derivedStatSetValidator,
  saveBonuses: saveBonusSetValidator,
  progression: progressionStateValidator,
  body: bodyStateValidator,
  inventory: inventoryStateValidator,
  loadout: loadoutStateValidator,
  magic: magicStateValidator,
  alchemy: alchemyStateValidator,
  faith: faithStateValidator,
  social: socialReligiousStateValidator,
  resources: resourceStateMapValidator,
  activeEffects: v.array(activeEffectValidator),
  tags: v.optional(v.array(v.string())),
  extensions: v.optional(jsonBlobValidator),
});

export const npcStateValidator = v.object({
  id: v.string(),
  kind: v.literal("creatureState"),
  identity: creatureIdentityStateValidator,
  actorKind: actorKindValidator,
  attributes: attributeSetValidator,
  derivedStats: derivedStatSetValidator,
  saveBonuses: saveBonusSetValidator,
  body: bodyStateValidator,
  inventory: inventoryStateValidator,
  loadout: loadoutStateValidator,
  magic: magicStateValidator,
  faith: faithStateValidator,
  resources: resourceStateMapValidator,
  activeEffects: v.array(activeEffectValidator),
  tags: v.optional(v.array(v.string())),
  extensions: v.optional(jsonBlobValidator),
});

export const characterInitializationInputValidator = v.object({
  id: v.optional(v.string()),
  name: v.optional(v.string()),
  raceRef: v.optional(registryRefValidator("race")),
  originRef: v.optional(registryRefValidator("origin")),
  backgroundRefs: v.optional(v.array(registryRefValidator("background"))),
  dreamRefs: v.optional(v.array(registryRefValidator("dream"))),
  patronRef: v.optional(registryRefValidator("patron")),
  boonRefs: v.optional(v.array(registryRefValidator("boon"))),
  covenantRefs: v.optional(v.array(registryRefValidator("covenant"))),
  relicRefs: v.optional(v.array(registryRefValidator("relic"))),
  startingItems: v.optional(v.array(ownedItemStackValidator)),
  tags: v.optional(v.array(v.string())),
  currentFate: v.optional(v.number()),
  totalFateEarned: v.optional(v.number()),
  extensions: v.optional(jsonBlobValidator),
});

export const npcInitializationInputValidator = v.object({
  id: v.optional(v.string()),
  name: v.optional(v.string()),
  creatureRef: v.optional(registryRefValidator("creature")),
  npcLoadoutRef: v.optional(registryRefValidator("npcLoadout")),
  allegiance: v.optional(v.string()),
  actorKind: v.optional(actorKindValidator),
  startingItems: v.optional(v.array(ownedItemStackValidator)),
  tags: v.optional(v.array(v.string())),
  extensions: v.optional(jsonBlobValidator),
});

const ensureRegistryRefsExist = (
  refs: ReadonlyArray<{ kind: string; id: string }> | undefined,
) => {
  for (const refValue of refs ?? []) {
    bugchudCore.catalog.mustResolveRef(refValue as never);
  }
};

export const assertCharacterInitializationRefs = (
  input: CharacterInitializationInput,
) => {
  if (input.raceRef) {
    bugchudCore.catalog.mustResolveRef(input.raceRef);
  }
  if (input.originRef) {
    bugchudCore.catalog.mustResolveRef(input.originRef);
  }
  if (input.patronRef) {
    bugchudCore.catalog.mustResolveRef(input.patronRef);
  }
  ensureRegistryRefsExist(input.backgroundRefs);
  ensureRegistryRefsExist(input.dreamRefs);
  ensureRegistryRefsExist(input.boonRefs);
  ensureRegistryRefsExist(input.covenantRefs);
  ensureRegistryRefsExist(input.relicRefs);
  ensureRegistryRefsExist(input.startingItems?.map((item) => item.ref));
};

export const assertNpcInitializationRefs = (input: NpcInitializationInput) => {
  if (input.creatureRef) {
    bugchudCore.catalog.mustResolveRef(input.creatureRef);
  }
  if (input.npcLoadoutRef) {
    bugchudCore.catalog.mustResolveRef(input.npcLoadoutRef);
  }
  ensureRegistryRefsExist(input.startingItems?.map((item) => item.ref));
};

export const normalizeSearchText = (value: string) =>
  value.trim().toLocaleLowerCase();

export const clampListLimit = (value: number | undefined) => {
  const defaultLimit = 20;
  if (value === undefined || Number.isNaN(value)) {
    return defaultLimit;
  }
  return Math.max(1, Math.min(Math.floor(value), 50));
};

export const requireViewerTokenIdentifier = async (
  ctx: QueryCtx | MutationCtx,
) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Authentication required.");
  }
  return identity.tokenIdentifier;
};

const validationIssueMessage = (result: ValidationResult) =>
  result.issues
    .map((issue) => `${issue.severity.toUpperCase()}: ${issue.path} ${issue.message}`)
    .join("\n");

export const assertCharacterStateIsValid = (state: CharacterState) => {
  const result = bugchudCore.validateCharacter(state);
  if (!result.ok) {
    throw new Error(validationIssueMessage(result));
  }
};

export const assertNpcStateIsValid = (state: NpcState) => {
  const result = bugchudCore.validateNpc(state);
  if (!result.ok) {
    throw new Error(validationIssueMessage(result));
  }
};

export const buildCharacterMetadata = (state: CharacterState) => ({
  bugchudId: state.id,
  name: state.identity.name,
  nameLower: normalizeSearchText(state.identity.name),
});

export const buildNpcMetadata = (state: NpcState) => ({
  bugchudId: state.id,
  name: state.identity.name,
  nameLower: normalizeSearchText(state.identity.name),
  actorKind: state.actorKind,
  allegiance: state.identity.allegiance,
});

export const toBugchudCharacterInput = (value: unknown) =>
  structuredClone(value) as CharacterInitializationInput;

export const toBugchudNpcInput = (value: unknown) =>
  structuredClone(value) as NpcInitializationInput;

export const toBugchudCharacterState = (value: unknown) =>
  structuredClone(value) as CharacterState;

export const toBugchudNpcState = (value: unknown) =>
  structuredClone(value) as NpcState;

export const toConvexCharacterState = (value: CharacterState) =>
  structuredClone(value);

export const toConvexNpcState = (value: NpcState) => structuredClone(value);
