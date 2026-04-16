"use client";

import {
  startTransition,
  type ComponentType,
  type ReactNode,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BookOpenIcon,
  BroadcastIcon,
  CheckCircleIcon,
  DiceFiveIcon,
  FloppyDiskIcon,
  MagicWandIcon,
  PackageIcon,
  ShieldCheckIcon,
  ShieldChevronIcon,
  SignInIcon,
  SparkleIcon,
  TargetIcon,
  UserCirclePlusIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import type { ComputedCombatProfile } from "@bugchud/core";
import type {
  ArmorDefinition,
  BackgroundDefinition,
  BionicDefinition,
  ContainerDefinition,
  CovenantDefinition,
  CultureDefinition,
  DreamDefinition,
  FactionDefinition,
  GrimoireDefinition,
  ItemDefinition,
  MutationDefinition,
  OriginDefinition,
  PantheonDefinition,
  PatronDefinition,
  RaceDefinition,
  RelicDefinition,
  ShieldDefinition,
  SpellDefinition,
  WeaponDefinition,
} from "@bugchud/core/content";
import type { RegistryRef } from "@bugchud/core/foundation";
import type { ValidationIssue } from "@bugchud/core/validation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import {
  buildBackgroundSelectionState,
  getOriginBackgroundIds,
  normalizeBackgroundSelection,
  type BackgroundOriginMapping,
  MAX_BACKGROUND_SELECTIONS,
} from "@/lib/character-background-rules";
import { getDreadTonguedAutoGrants } from "@/lib/character-background-special-steps";
import {
  ARCYNE_PREPARED_SLOT_TOTAL,
  CHARACTER_CREATOR_EXTENSION_NAMESPACE,
  applyResolvedArcyneSpellSelectionToState,
  getArcyneSpellSelectionIssues,
  getPreparedSlotsBySpellIdFromState,
  hasArcynePotential,
  resolveArcyneSpellSelection,
} from "@/lib/character-spell-preparation";
import {
  appendInventoryStack,
  buildInventoryPlacementCatalog,
  buildInventoryStackKey,
  getInventoryPlacementLabel,
  isLegacyEquippableRef,
  moveInventoryStackToContainerAtIndex,
  removeInventoryStackAtIndex,
  removeInventoryStackFromContainerAtIndex,
  setLegacyNonCombatEquippedRefs,
  stowEquippedInventoryStackAtIndex,
  syncInventoryPlacementState,
  type CharacterInventoryPlacementState,
  type InventoryOwnedRef,
  type InventoryPlacementCatalog,
  updateInventoryStackCharges,
  updateInventoryStackQuantity,
  equipInventoryStackAtIndex,
} from "@/lib/character-inventory-placement";
import { cn } from "@/lib/utils";
import {
  CompactTextField,
  CompactTextareaField,
  SearchableMultiSelect,
  SearchableSingleSelect,
  type SearchOption,
} from "./character-editor-controls";
import { ArcyneSpellSelector } from "./character-spell-selector";

const WIZARD_STEPS = [
  "identity",
  "lineage",
  "background",
  "path",
  "faith",
  "gear",
  "review",
] as const;

type WizardStep = (typeof WIZARD_STEPS)[number];
type CharacterStatus = "draft" | "complete";
type SaveState = "idle" | "saving" | "saved" | "error";
type AnyRegistryRef = { kind: string | number | boolean | bigint; id: string };
type CharacterDraft = Doc<"characters">["state"];
type ResourcePool = NonNullable<CharacterDraft["resources"][keyof CharacterDraft["resources"]]>;
type CharacterDoc = Doc<"characters">;
type CharacterPreview = {
  normalizedState: CharacterDraft;
  validation: {
    ok: boolean;
    issues: ValidationIssue[];
  };
  combatProfile: ComputedCombatProfile;
};
type JsonEditorState = {
  activeConditions: string;
  activeEffects: string;
  extensions: string;
};
type RollAttributeKey = "twitch" | "flesh" | "mojo";
type RollSelection = "lowest" | "median" | "highest";
type AttributeRollTriplet = [number, number, number];
type AttributeRollPools = Record<RollAttributeKey, AttributeRollTriplet>;
type StoredAttributeRolls = {
  version: 1;
  usedAt: number;
  raceIdAtRoll: string;
  pools: AttributeRollPools;
};
type CharacterEditorOptions = {
  rulesetId: string;
  rulesetVersion: string;
  characterCreation: {
    raceRefs: RegistryRef<"race">[];
    originRefs: RegistryRef<"origin">[];
    defaultCarrySlots: number;
    faithOptions: {
      all: Array<{
        kind: "pantheon" | "patron";
        ref: { kind: "pantheon" | "patron"; id: string };
        definition: PantheonDefinition | PatronDefinition;
      }>;
      pantheons: Array<{
        kind: "pantheon";
        ref: { kind: "pantheon"; id: string };
        definition: PantheonDefinition;
      }>;
      patrons: Array<{
        kind: "patron";
        ref: { kind: "patron"; id: string };
        definition: PatronDefinition;
      }>;
    };
  };
  characterLore: {
    generationNotes?: string[];
  };
  characterProgression: {
    dreamRefs: RegistryRef<"dream">[];
    advancementTracks: string[];
  };
  inventoryRules: {
    defaultCarrySlots: number;
    containerDefinitions: ContainerDefinition[];
  };
  steps: {
    lineage: {
      races: RaceDefinition[];
      origins: OriginDefinition[];
    };
    background: {
      backgrounds: BackgroundDefinition[];
      backgroundsByOrigin: BackgroundOriginMapping[];
    };
    path: {
      dreams: DreamDefinition[];
      mutations: MutationDefinition[];
      bionics: BionicDefinition[];
      grimoires: GrimoireDefinition[];
      spells: SpellDefinition[];
      alchemyRecipes: Array<{
        id: string;
        name: string;
        summary: string;
        recipeKind: string;
        brewTime: string;
      }>;
    };
    faith: {
      pantheons: PantheonDefinition[];
      patrons: PatronDefinition[];
      boons: Array<{ id: string; name: string; summary: string }>;
      covenants: CovenantDefinition[];
      relics: RelicDefinition[];
    };
    gear: {
      items: ItemDefinition[];
      weapons: WeaponDefinition[];
      armors: ArmorDefinition[];
      shields: ShieldDefinition[];
      containerDefinitions: ContainerDefinition[];
      denominations: string[];
      defaultCurrency: string;
    };
    social: {
      factions: FactionDefinition[];
      cultures: CultureDefinition[];
    };
  };
};

const RESOURCE_KEYS = [
  "focus",
  "xom",
  "ammo",
  "currency",
  "health",
  "manaDice",
  "fate",
  "fuel",
  "morale",
  "supplies",
  "durability",
  "shieldIntegrity",
] as const;
const ROLL_ATTRIBUTE_KEYS = ["twitch", "flesh", "mojo"] as const;
const STEP_META: Record<
  WizardStep,
  {
    label: string;
    sequence: string;
    description: string;
    icon: ComponentType<{ className?: string; weight?: "fill" | "regular" }>;
  }
> = {
  identity: {
    label: "Identity",
    sequence: "Seed the subject file",
    description: "Establish nameplates and the core identity frame.",
    icon: UserCirclePlusIcon,
  },
  lineage: {
    label: "Lineage",
    sequence: "Bind race and origin",
    description: "Choose the ancestry anchors that shape your starting profile.",
    icon: SparkleIcon,
  },
  background: {
    label: "Background",
    sequence: "Assemble formative records",
    description: "Layer in up to three background packages while keeping off-origin picks capped at one.",
    icon: BookOpenIcon,
  },
  path: {
    label: "Path",
    sequence: "Shape progression and body-state",
    description: "Tune progression, dreams, spell access, and advanced runtime values.",
    icon: TargetIcon,
  },
  faith: {
    label: "Faith",
    sequence: "Resolve pantheon and relic chain",
    description: "Pick faith anchors, vows, boons, and divine attachments.",
    icon: MagicWandIcon,
  },
  gear: {
    label: "Gear",
    sequence: "Load inventory and equipment",
    description: "Assign wealth, inventory, loadout slots, and container details.",
    icon: PackageIcon,
  },
  review: {
    label: "Review",
    sequence: "Validate and finalize the draft",
    description: "Confirm the normalized runtime, validation state, and combat profile.",
    icon: ShieldChevronIcon,
  },
};

function cloneState<T>(value: T): T {
  return structuredClone(value);
}

function refKey(refValue: AnyRegistryRef | undefined | null) {
  return refValue ? `${String(refValue.kind)}:${refValue.id}` : "";
}

function parseCommaList(value: string) {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function stringifyJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

function parseJsonValue<T>(value: string): T {
  return JSON.parse(value) as T;
}

function findById<T extends { id: string }>(items: readonly T[], id: string | undefined) {
  return id ? items.find((item) => item.id === id) ?? null : null;
}

function findByRef<T extends { id: string }>(items: readonly T[], refValue: AnyRegistryRef | undefined) {
  return refValue ? findById(items, refValue.id) : null;
}

function sortByName<T extends { name: string }>(items: readonly T[]) {
  return [...items].sort((left, right) => left.name.localeCompare(right.name));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function rollDieFace() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollAttributeTriplet(): AttributeRollTriplet {
  return [rollDieFace(), rollDieFace(), rollDieFace()];
}

function rollAttributePools(): AttributeRollPools {
  return {
    twitch: rollAttributeTriplet(),
    flesh: rollAttributeTriplet(),
    mojo: rollAttributeTriplet(),
  };
}

function pickRollValue(values: AttributeRollTriplet, selection: RollSelection) {
  const sorted = [...values].sort((left, right) => left - right);
  if (selection === "lowest") {
    return sorted[0];
  }
  if (selection === "highest") {
    return sorted[2];
  }
  return sorted[1];
}

function formatRollAttributeLabel(key: RollAttributeKey) {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

function formatRollTriplet(values: AttributeRollTriplet) {
  return values.join(" / ");
}

function parseRaceRollRule(note: string) {
  const match = note.match(
    /^(Twitch|Flesh|Mojo):\s*3d6,\s*take\s+(lowest|median|highest)(?:,\s*add\s+\+?(-?\d+))?\.?$/i,
  );

  if (!match) {
    return null;
  }

  return {
    attribute: match[1].toLowerCase() as RollAttributeKey,
    selection: match[2].toLowerCase() as RollSelection,
    bonus: match[3] ? Number(match[3]) : 0,
  };
}

function getRaceRollProfile(race: RaceDefinition | null | undefined) {
  if (!race) {
    return {
      supported: false,
      reason: "Pick a race to inspect its starting attribute profile.",
      notes: [] as string[],
    };
  }

  const notes = [...(race.attributeGeneration.notes ?? [])];
  if (race.attributeGeneration.method !== "rolled") {
    return {
      supported: false,
      reason:
        race.attributeGeneration.method === "choice"
          ? "This race uses a special profile choice, so automatic attribute resolution is not wired for it yet."
          : "This race does not use the standard rolled attribute profile.",
      notes,
    };
  }

  const rules: Partial<Record<RollAttributeKey, { selection: RollSelection; bonus: number }>> = {};
  for (const note of notes) {
    const parsed = parseRaceRollRule(note);
    if (!parsed) {
      continue;
    }
    rules[parsed.attribute] = {
      selection: parsed.selection,
      bonus: parsed.bonus,
    };
  }

  if (ROLL_ATTRIBUTE_KEYS.every((key) => Boolean(rules[key]))) {
    return {
      supported: true,
      reason: null,
      notes,
      rules: rules as Record<RollAttributeKey, { selection: RollSelection; bonus: number }>,
    };
  }

  return {
    supported: false,
    reason: "This race's roll notes are present, but they are not in an executable format yet.",
    notes,
  };
}

function computeRolledAttributesForRace(
  race: RaceDefinition,
  pools: AttributeRollPools,
  currentGlory: number,
) {
  const profile = getRaceRollProfile(race);
  if (!profile.supported || !profile.rules) {
    return null;
  }

  return {
    twitch:
      pickRollValue(pools.twitch, profile.rules.twitch.selection) + profile.rules.twitch.bonus,
    flesh:
      pickRollValue(pools.flesh, profile.rules.flesh.selection) + profile.rules.flesh.bonus,
    mojo: pickRollValue(pools.mojo, profile.rules.mojo.selection) + profile.rules.mojo.bonus,
    glory: race.baseAttributes.glory ?? currentGlory,
  };
}

function getStoredAttributeRolls(state: CharacterDraft): StoredAttributeRolls | null {
  if (!isRecord(state.extensions)) {
    return null;
  }

  const namespace = state.extensions[CHARACTER_CREATOR_EXTENSION_NAMESPACE];
  if (!isRecord(namespace)) {
    return null;
  }

  const payload = namespace.attributeRolls;
  if (!isRecord(payload) || payload.version !== 1 || typeof payload.raceIdAtRoll !== "string") {
    return null;
  }

  const pools = payload.pools;
  if (!isRecord(pools)) {
    return null;
  }

  const triplets = {} as AttributeRollPools;
  for (const key of ROLL_ATTRIBUTE_KEYS) {
    const value = pools[key];
    if (
      !Array.isArray(value) ||
      value.length !== 3 ||
      value.some((entry) => typeof entry !== "number")
    ) {
      return null;
    }
    triplets[key] = [value[0], value[1], value[2]];
  }

  return {
    version: 1,
    usedAt: typeof payload.usedAt === "number" ? payload.usedAt : 0,
    raceIdAtRoll: payload.raceIdAtRoll,
    pools: triplets,
  };
}

function setStoredAttributeRolls(state: CharacterDraft, payload: StoredAttributeRolls) {
  const nextExtensions = isRecord(state.extensions)
    ? { ...(state.extensions as Record<string, unknown>) }
    : {};
  const namespace = isRecord(nextExtensions[CHARACTER_CREATOR_EXTENSION_NAMESPACE])
    ? {
        ...(nextExtensions[
          CHARACTER_CREATOR_EXTENSION_NAMESPACE
        ] as Record<string, unknown>),
      }
    : {};

  namespace.attributeRolls = payload;
  nextExtensions[CHARACTER_CREATOR_EXTENSION_NAMESPACE] = namespace;
  state.extensions = nextExtensions as CharacterDraft["extensions"];
}

function stepIndex(step: WizardStep) {
  return WIZARD_STEPS.indexOf(step);
}

function describeIssue(issue: ValidationIssue) {
  return `${issue.severity.toUpperCase()} :: ${issue.path} :: ${issue.message}`;
}

function arraysEqual(left: readonly string[], right: readonly string[]) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function getBackgroundsForOrigin(
  options: CharacterEditorOptions,
  originRef: AnyRegistryRef,
) {
  const originBackgroundIds = getOriginBackgroundIds(
    options.steps.background.backgroundsByOrigin,
    originRef.id,
  );
  if (originBackgroundIds.size === 0) {
    return [];
  }

  return [...options.steps.background.backgrounds].sort((left, right) => {
    const leftRank = originBackgroundIds.has(left.id) ? 0 : 1;
    const rightRank = originBackgroundIds.has(right.id) ? 0 : 1;
    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }
    return left.name.localeCompare(right.name);
  });
}

function getSuggestedDreams(options: CharacterEditorOptions, state: CharacterDraft) {
  const dreamIds = new Set<string>(state.progression.dreamRefs.map((refValue) => refValue.id));
  const backgroundIds = new Set(state.identity.backgroundRefs.map((refValue) => refValue.id));

  for (const background of options.steps.background.backgrounds) {
    if (!backgroundIds.has(background.id)) {
      continue;
    }
    for (const dreamRef of background.startingDreamRefs ?? []) {
      dreamIds.add(dreamRef.id);
    }
  }

  const originEntry = options.steps.background.backgroundsByOrigin.find(
    (entry) => entry.originId === state.identity.originRef.id,
  );
  for (const dreamId of originEntry?.startingDreamIds ?? []) {
    dreamIds.add(dreamId);
  }

  return sortByName(
    options.steps.path.dreams.filter((dream) => dreamIds.has(dream.id)),
  );
}

function buildJsonState(state: CharacterDraft): JsonEditorState {
  return {
    activeConditions: stringifyJson(state.body.activeConditions),
    activeEffects: stringifyJson(state.activeEffects),
    extensions: stringifyJson(state.extensions ?? {}),
  };
}

function setPoolValue(
  state: CharacterDraft,
  key: (typeof RESOURCE_KEYS)[number],
  field: keyof ResourcePool,
  value: number,
) {
  const current = state.resources[key] ?? {
    current: 0,
    maximum: 0,
  };
  state.resources[key] = {
    ...current,
    [field]: value,
  };
}

function serializeDraftSignature(state: CharacterDraft, step: WizardStep) {
  return JSON.stringify({ step, state });
}

function toSearchOption(
  value: string,
  label: string,
  description?: string,
  group?: string,
  keywords?: string[],
): SearchOption {
  return {
    value,
    label,
    description,
    group,
    keywords,
  };
}

function renderOptionalSummary(summary: string | undefined) {
  return summary?.trim() ? summary : "No summary provided.";
}

function inventoryLabelFromRef(options: CharacterEditorOptions, refValue: AnyRegistryRef) {
  return (
    findById(options.steps.gear.items, refValue.id)?.name ??
    findById(options.steps.gear.weapons, refValue.id)?.name ??
    findById(options.steps.gear.armors, refValue.id)?.name ??
    findById(options.steps.gear.shields, refValue.id)?.name ??
    findById(options.steps.path.grimoires, refValue.id)?.name ??
    findById(options.steps.faith.relics, refValue.id)?.name ??
    refValue.id
  );
}

function getSaveTone(saveState: SaveState) {
  switch (saveState) {
    case "saving":
      return "outline";
    case "saved":
      return "default";
    case "error":
      return "destructive";
    default:
      return "outline";
  }
}

function SaveStatusBadge({
  saveState,
  saveMessage,
}: {
  saveState: SaveState;
  saveMessage: string;
}) {
  const Icon =
    saveState === "saving"
      ? FloppyDiskIcon
      : saveState === "saved"
        ? CheckCircleIcon
        : saveState === "error"
          ? WarningCircleIcon
          : BroadcastIcon;

  return (
    <Badge variant={getSaveTone(saveState)} className="h-auto gap-2 px-3 py-1.5">
      <Icon />
      <span className="uppercase tracking-[0.18em]">{saveMessage}</span>
    </Badge>
  );
}

function LoadingState({
  title,
  detail,
  action,
}: {
  title: string;
  detail: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-[20rem] items-center justify-center px-4 py-8">
      <Card className="w-full max-w-2xl border border-border/20 bg-background/70">
        <CardHeader className="gap-3 border-b border-border/20 pb-5">
          <Badge variant="outline" className="w-fit">
            Character editor
          </Badge>
          <CardTitle className="font-display text-4xl font-black tracking-[-0.06em] text-primary sm:text-5xl">
            {title}
          </CardTitle>
          <CardDescription className="max-w-xl text-sm leading-7 text-muted-foreground">
            {detail}
          </CardDescription>
        </CardHeader>
        {action ? <CardFooter className="justify-start">{action}</CardFooter> : null}
      </Card>
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  min,
  description,
  badge,
  disabled,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  description?: string;
  badge?: ReactNode;
  disabled?: boolean;
}) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>
        {label}
        {badge ? badge : null}
      </FieldLabel>
      <Input
        id={id}
        type="number"
        min={min}
        value={Number.isFinite(value) ? value : 0}
        onChange={(event) => onChange(Number(event.target.value || 0))}
        disabled={disabled}
      />
      {description ? <FieldDescription>{description}</FieldDescription> : null}
    </Field>
  );
}

function EmptyRegistryNotice({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) {
  return (
    <Card size="sm" className="border border-border/20 bg-card/55">
      <CardHeader className="gap-2">
        <CardTitle className="font-sans text-xs uppercase tracking-[0.28em] text-muted-foreground">
          {title}
        </CardTitle>
        <CardDescription className="text-xs leading-6 text-muted-foreground">
          {detail}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card size="sm" className="border border-border/20 bg-card/55">
      <CardHeader className="gap-1">
        <CardDescription className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
          {label}
        </CardDescription>
        <CardTitle className="font-display text-2xl font-black uppercase tracking-[-0.04em] text-primary">
          {value}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

function AttributeRollDie({
  value,
  rolling,
  delayMs = 0,
}: {
  value: number;
  rolling: boolean;
  delayMs?: number;
}) {
  return (
    <div
      className={cn(
        "flex size-12 items-center justify-center border border-border/30 bg-background/70 font-display text-xl font-black text-primary transition-transform",
        rolling && "dice-tumble dice-flare",
      )}
      style={rolling ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {value}
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
        {label}
      </span>
      <span className="text-right text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {value}
      </span>
    </div>
  );
}

function CheckboxRow({
  id,
  title,
  description,
  checked,
  onCheckedChange,
}: {
  id: string;
  title: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <Field orientation="horizontal">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value === true)}
      />
      <FieldContent>
        <FieldLabel htmlFor={id} className="font-normal">
          {title}
        </FieldLabel>
        {description ? <FieldDescription>{description}</FieldDescription> : null}
      </FieldContent>
    </Field>
  );
}

function SectionIntro({
  step,
  summary,
}: {
  step: WizardStep;
  summary: string;
}) {
  const meta = STEP_META[step];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline">
          Step {stepIndex(step) + 1} / {WIZARD_STEPS.length}
        </Badge>
        <Badge variant="ghost">{meta.sequence}</Badge>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-3xl font-black tracking-[-0.05em] text-primary sm:text-4xl">
          {meta.label}
        </h2>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
          {meta.description}
        </p>
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-accent">
          {summary}
        </p>
      </div>
    </div>
  );
}

function SectionTriggerSummary({
  step,
  summary,
  status,
}: {
  step: WizardStep;
  summary: string;
  status: CharacterStatus;
}) {
  const meta = STEP_META[step];
  const Icon = meta.icon;

  return (
    <div className="flex min-w-0 flex-1 items-start gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center border border-border/30 bg-card/70 text-primary">
        <Icon weight="fill" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent">
            {meta.label}
          </span>
          {step === "review" && status === "complete" ? (
            <Badge variant="default">finalized</Badge>
          ) : null}
        </div>
        <span className="truncate font-mono text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
          {summary}
        </span>
      </div>
    </div>
  );
}

function SummaryPanel({
  className,
  draft,
  preview,
  options,
  validationIssues,
}: {
  className?: string;
  draft: CharacterDraft;
  preview: CharacterPreview | undefined;
  options: CharacterEditorOptions;
  validationIssues: ValidationIssue[];
}) {
  const state = preview?.normalizedState ?? draft;
  const hasIssues = validationIssues.length > 0;
  const selectedRace = findByRef(options.steps.lineage.races, state.identity.raceRef);
  const selectedOrigin = findByRef(options.steps.lineage.origins, state.identity.originRef);
  const selectedBackgrounds = sortByName(
    options.steps.background.backgrounds.filter((background) =>
      state.identity.backgroundRefs.some((refValue) => refValue.id === background.id),
    ),
  );
  const selectedDreams = getSuggestedDreams(options, state);
  const selectedPatron = findByRef(options.steps.faith.patrons, state.faith.patronRef);

  return (
    <aside className={cn("min-w-0", className)}>
      <Card className="sticky top-4 border border-border/20 bg-background/65">
        <CardHeader className="gap-4 border-b border-border/20 pb-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-2">
              <Badge variant="outline" className="w-fit">
                Live dossier
              </Badge>
              <CardTitle className="font-display text-3xl font-black tracking-[-0.05em] text-secondary">
                {state.identity.name || "Untitled Subject"}
              </CardTitle>
              <CardDescription className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {state.identity.epithet || "Draft runtime snapshot"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex max-h-[calc(100svh-8rem)] flex-col gap-5 overflow-y-auto py-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <MetricCard label="Validation" value={hasIssues ? "Attention" : "OK"} />
            <MetricCard label="Inventory" value={String(state.inventory.items.length)} />
            <MetricCard label="Dreams" value={String(state.progression.dreamRefs.length)} />
            <MetricCard label="Status" value={hasIssues ? "Draft" : "Ready"} />
          </div>

          <Separator className="ghost-divider opacity-40" />

          <div className="flex flex-col gap-3">
            <SummaryRow label="Race" value={selectedRace?.name ?? "Pending"} />
            <SummaryRow label="Origin" value={selectedOrigin?.name ?? "Pending"} />
            <SummaryRow
              label="Backgrounds"
              value={selectedBackgrounds.length ? `${selectedBackgrounds.length} loaded` : "Pending"}
            />
            <SummaryRow
              label="Faith"
              value={selectedPatron?.name ?? state.identity.faithLabel ?? "Unbound"}
            />
          </div>

          <Separator className="ghost-divider opacity-40" />

          <div className="flex flex-col gap-2">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
              Trait stream
            </p>
            {selectedDreams.length ? (
              <div className="flex flex-col gap-2">
                {selectedDreams.slice(0, 4).map((dream) => (
                  <Card key={dream.id} size="sm" className="border border-primary/15 bg-card/60">
                    <CardHeader className="gap-1">
                      <CardTitle className="text-xs uppercase tracking-[0.18em] text-primary">
                        {dream.name}
                      </CardTitle>
                      <CardDescription className="text-xs leading-5 text-muted-foreground">
                        {renderOptionalSummary(dream.summary)}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyRegistryNotice
                title="No traits loaded"
                detail="Dreams, mutations, and spell choices will appear here as the build takes shape."
              />
            )}
          </div>

          <Separator className="ghost-divider opacity-40" />

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
              Validation
            </p>
            {validationIssues.length ? (
              <div className="flex flex-col gap-2">
                {validationIssues.slice(0, 3).map((issue, index) => (
                  <Card key={`${issue.path}-${index}`} size="sm" className="border border-secondary/30 bg-secondary/8">
                    <CardHeader className="gap-1">
                      <CardTitle className="text-xs uppercase tracking-[0.18em] text-secondary">
                        {issue.severity}
                      </CardTitle>
                      <CardDescription className="text-xs leading-5 text-muted-foreground">
                        {issue.message}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-xs leading-6 text-muted-foreground">
                No validation issues detected. The draft is ready to finalize once the remaining choices feel right.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

export function CharacterEditor({ bugchudId }: { bugchudId: string }) {
  const { isLoaded, isSignedIn } = useAuth();
  const saveDraft = useMutation(api.characters.saveDraft);
  const completeDraft = useMutation(api.characters.completeDraft);

  const [draft, setDraft] = useState<CharacterDraft | null>(null);
  const [status, setStatus] = useState<CharacterStatus>("draft");
  const [currentStep, setCurrentStep] = useState<WizardStep>("identity");
  const [surfaceError, setSurfaceError] = useState<string | null>(null);
  const [jsonEditors, setJsonEditors] = useState<JsonEditorState | null>(null);
  const [jsonErrors, setJsonErrors] = useState<Record<string, string | null>>({});
  const [inventoryCatalogSelection, setInventoryCatalogSelection] = useState<
    string | undefined
  >();
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveMessage, setSaveMessage] = useState("Draft not yet loaded");
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [isRollingAttributes, setIsRollingAttributes] = useState(false);
  const [rollingAttributePreview, setRollingAttributePreview] =
    useState<AttributeRollPools | null>(null);

  const loadedVersionRef = useRef<string | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const attributeRollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPersistedSignatureRef = useRef<string | null>(null);
  const draftRef = useRef<CharacterDraft | null>(null);
  const currentStepRef = useRef<WizardStep>("identity");
  const signatureRef = useRef<string | null>(null);

  const activeBugchudId = bugchudId;
  const character = useQuery(
    api.characters.getMine,
    isSignedIn && activeBugchudId ? { bugchudId: activeBugchudId } : "skip",
  ) as CharacterDoc | null | undefined;
  const editorOptions = useQuery(
    api.ruleset.getCharacterEditorOptions,
    isSignedIn ? {} : "skip",
  ) as CharacterEditorOptions | undefined;

  const deferredDraft = useDeferredValue(draft);
  const preview = useQuery(
    api.characters.previewDraft,
    isSignedIn && deferredDraft ? { state: deferredDraft } : "skip",
  ) as CharacterPreview | undefined;

  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    if (!isRollingAttributes) {
      setRollingAttributePreview(null);
      return;
    }

    setRollingAttributePreview(rollAttributePools());
    const intervalId = setInterval(() => {
      setRollingAttributePreview(rollAttributePools());
    }, 120);

    return () => {
      clearInterval(intervalId);
    };
  }, [isRollingAttributes]);

  useEffect(() => {
    return () => {
      if (attributeRollTimeoutRef.current) {
        clearTimeout(attributeRollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!character) {
      return;
    }

    const loadKey = `${character._id}:${character.updatedAt}`;
    if (loadedVersionRef.current === loadKey) {
      return;
    }

    loadedVersionRef.current = loadKey;
    setDraft(cloneState(character.state));
    setStatus(character.status);
    setCurrentStep(character.currentStep as WizardStep);
    setJsonEditors(buildJsonState(character.state));
    setJsonErrors({});
    setSurfaceError(null);
    setPendingAction(null);

    const persistedSignature = serializeDraftSignature(
      character.state,
      character.currentStep as WizardStep,
    );
    lastPersistedSignatureRef.current = persistedSignature;
    signatureRef.current = persistedSignature;
    setSaveState("saved");
    setSaveMessage("All changes saved");
  }, [character]);

  const serializedDraft = useMemo(() => {
    if (!draft) {
      return null;
    }
    return serializeDraftSignature(draft, currentStep);
  }, [draft, currentStep]);

  useEffect(() => {
    signatureRef.current = serializedDraft;
  }, [serializedDraft]);

  useEffect(() => {
    if (!activeBugchudId || !draft || !serializedDraft) {
      return;
    }
    if (serializedDraft === lastPersistedSignatureRef.current) {
      return;
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    setSaveState("idle");
    setSaveMessage("Unsaved changes");

    const draftSnapshot = cloneState(draft);
    const stepSnapshot = currentStep;
    const signatureSnapshot = serializedDraft;

    saveTimeoutRef.current = setTimeout(() => {
      setSaveState("saving");
      setSaveMessage("Saving draft");

      void saveDraft({
        bugchudId: activeBugchudId,
        state: draftSnapshot,
        currentStep: stepSnapshot,
      })
        .then((saved) => {
          if (!saved) {
            return;
          }

          const persistedSignature = serializeDraftSignature(
            saved.state,
            saved.currentStep as WizardStep,
          );
          lastPersistedSignatureRef.current = persistedSignature;

          if (signatureRef.current === signatureSnapshot) {
            setDraft(cloneState(saved.state));
            setStatus(saved.status);
            startTransition(() => {
              setCurrentStep(saved.currentStep as WizardStep);
            });
            setJsonEditors(buildJsonState(saved.state));
          }

          if (signatureRef.current === persistedSignature) {
            setSaveState("saved");
            setSaveMessage("All changes saved");
          } else {
            setSaveState("idle");
            setSaveMessage("Unsaved changes");
          }
        })
        .catch((error) => {
          setSurfaceError(error instanceof Error ? error.message : "Draft save failed.");
          setSaveState("error");
          setSaveMessage("Autosave failed");
        });
    }, 700);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }
    };
  }, [activeBugchudId, currentStep, draft, saveDraft, serializedDraft]);

  const previewState = preview?.normalizedState ?? draft;
  const validationIssues = useMemo(
    () => preview?.validation.issues ?? [],
    [preview?.validation.issues],
  );
  const currentPreviewState = draft && previewState ? previewState : null;
  const suggestedDreams = useMemo(
    () => (editorOptions && draft ? getSuggestedDreams(editorOptions, draft) : []),
    [draft, editorOptions],
  );
  const combinedDreamRefs = useMemo(() => {
    if (!draft) {
      return [];
    }

    const combined = new Map(
      draft.progression.dreamRefs.map((dreamRef) => [dreamRef.id, dreamRef]),
    );
    for (const dream of suggestedDreams) {
      combined.set(dream.id, {
        kind: "dream",
        id: dream.id,
      });
    }
    return [...combined.values()];
  }, [draft, suggestedDreams]);
  const hasEditorArcynePotential = useMemo(
    () => hasArcynePotential(combinedDreamRefs),
    [combinedDreamRefs],
  );
  const dreadTonguedAutoGrants = useMemo(
    () =>
      editorOptions
        ? getDreadTonguedAutoGrants(editorOptions.steps.path.dreams, combinedDreamRefs)
        : { active: false, languages: [], spellIds: [] as string[] },
    [combinedDreamRefs, editorOptions],
  );
  const validSpellIds = useMemo(
    () => new Set((editorOptions?.steps.path.spells ?? []).map((spell) => spell.id)),
    [editorOptions],
  );
  const inventoryPlacementCatalog = useMemo<InventoryPlacementCatalog | null>(() => {
    if (!editorOptions) {
      return null;
    }

    return buildInventoryPlacementCatalog({
      items: editorOptions.steps.gear.items,
      weapons: editorOptions.steps.gear.weapons,
      armors: editorOptions.steps.gear.armors,
      shields: editorOptions.steps.gear.shields,
      grimoires: editorOptions.steps.path.grimoires,
      relics: editorOptions.steps.faith.relics,
      containerDefinitions: editorOptions.steps.gear.containerDefinitions,
    });
  }, [editorOptions]);
  const arcyneSpellSelection = useMemo(() => {
    if (!draft) {
      return resolveArcyneSpellSelection({
        selectedKnownSpellIds: [],
        preparedSlotsBySpellId: {},
        validSpellIds,
      });
    }

    const lockedKnownSpellIds = dreadTonguedAutoGrants.spellIds;
    const lockedKnownSet = new Set(lockedKnownSpellIds);

    return resolveArcyneSpellSelection({
      selectedKnownSpellIds: draft.magic.knownSpellRefs
        .map((spellRef) => spellRef.id)
        .filter((spellId) => !lockedKnownSet.has(spellId)),
      lockedKnownSpellIds,
      preparedSlotsBySpellId: getPreparedSlotsBySpellIdFromState(draft),
      validSpellIds,
    });
  }, [draft, dreadTonguedAutoGrants.spellIds, validSpellIds]);
  const arcyneValidationIssues = useMemo(() => {
    if (!hasEditorArcynePotential) {
      return [];
    }

    return getArcyneSpellSelectionIssues(arcyneSpellSelection).map(
      (message) =>
        ({
          severity: "error",
          path: "magic.preparedSpellRefs",
          message,
        }) as ValidationIssue,
    );
  }, [arcyneSpellSelection, hasEditorArcynePotential]);
  const allValidationIssues = useMemo(
    () => [...validationIssues, ...arcyneValidationIssues],
    [arcyneValidationIssues, validationIssues],
  );
  const isEditorValid =
    Boolean(preview?.validation.ok) && arcyneValidationIssues.length === 0;

  const availableBackgrounds = useMemo(() => {
    if (!editorOptions || !draft) {
      return [];
    }
    return getBackgroundsForOrigin(editorOptions, draft.identity.originRef);
  }, [draft, editorOptions]);
  const backgroundSelection = useMemo(
    () =>
      editorOptions && draft
        ? buildBackgroundSelectionState({
            originId: draft.identity.originRef.id,
            selectedBackgroundIds: draft.identity.backgroundRefs.map((refValue) => refValue.id),
            backgroundsByOrigin: editorOptions.steps.background.backgroundsByOrigin,
            allBackgroundIds: editorOptions.steps.background.backgrounds.map(
              (background) => background.id,
            ),
          })
        : null,
    [draft, editorOptions],
  );

  useEffect(() => {
    if (!backgroundSelection) {
      return;
    }

    setDraft((current) => {
      if (!current) {
        return current;
      }

      const currentBackgroundIds = current.identity.backgroundRefs.map((refValue) => refValue.id);
      if (
        arraysEqual(
          currentBackgroundIds,
          backgroundSelection.normalizedSelectedBackgroundIds,
        )
      ) {
        return current;
      }

      const nextState = cloneState(current);
      nextState.identity.backgroundRefs =
        backgroundSelection.normalizedSelectedBackgroundIds.map((id) => ({
          kind: "background",
          id,
        }));
      return nextState;
    });
  }, [backgroundSelection]);

  useEffect(() => {
    if (!inventoryPlacementCatalog) {
      return;
    }

    setDraft((current) => {
      if (!current) {
        return current;
      }

      const nextState = cloneState(current);
      syncInventoryPlacementState(
        nextState as unknown as CharacterInventoryPlacementState,
        inventoryPlacementCatalog,
      );

      const currentPlacementSignature = JSON.stringify({
        inventory: current.inventory,
        loadout: current.loadout,
      });
      const nextPlacementSignature = JSON.stringify({
        inventory: nextState.inventory,
        loadout: nextState.loadout,
      });

      return currentPlacementSignature === nextPlacementSignature ? current : nextState;
    });
  }, [inventoryPlacementCatalog]);

  const inventoryCatalog = useMemo(() => {
    if (!editorOptions) {
      return [];
    }

    return [
      ...sortByName(editorOptions.steps.gear.items).map((item) => ({
        value: refKey({ kind: "item", id: item.id }),
        label: item.name,
        description: renderOptionalSummary(item.summary),
        group: "Items",
        ref: { kind: "item", id: item.id } as AnyRegistryRef,
      })),
      ...sortByName(editorOptions.steps.gear.weapons).map((item) => ({
        value: refKey({ kind: "weapon", id: item.id }),
        label: item.name,
        description: renderOptionalSummary(item.summary),
        group: "Weapons",
        ref: { kind: "weapon", id: item.id } as AnyRegistryRef,
      })),
      ...sortByName(editorOptions.steps.gear.armors).map((item) => ({
        value: refKey({ kind: "armor", id: item.id }),
        label: item.name,
        description: renderOptionalSummary(item.summary),
        group: "Armor",
        ref: { kind: "armor", id: item.id } as AnyRegistryRef,
      })),
      ...sortByName(editorOptions.steps.gear.shields).map((item) => ({
        value: refKey({ kind: "shield", id: item.id }),
        label: item.name,
        description: renderOptionalSummary(item.summary),
        group: "Shields",
        ref: { kind: "shield", id: item.id } as AnyRegistryRef,
      })),
    ];
  }, [editorOptions]);

  const inventoryOptionMap = useMemo(
    () =>
      new Map(
        inventoryCatalog.map((option) => [
          option.value,
          { ref: option.ref, summary: option.description },
        ]),
      ),
    [inventoryCatalog],
  );

  const sectionSummaries = useMemo(() => {
    if (!editorOptions || !draft || !currentPreviewState) {
      return {} as Record<WizardStep, string>;
    }

    const race = findByRef(editorOptions.steps.lineage.races, currentPreviewState.identity.raceRef);
    const origin = findByRef(editorOptions.steps.lineage.origins, currentPreviewState.identity.originRef);
    const patron = findByRef(editorOptions.steps.faith.patrons, currentPreviewState.faith.patronRef);

    return {
      identity: currentPreviewState.identity.name
        ? `${currentPreviewState.identity.name} // ${currentPreviewState.identity.epithet ?? "Epithet pending"}`
        : "Name, epithet, and faith label",
      lineage: `${race?.name ?? "Race pending"} // ${origin?.name ?? "Origin pending"}`,
      background: currentPreviewState.identity.backgroundRefs.length
        ? `${currentPreviewState.identity.backgroundRefs.length} backgrounds // ${(currentPreviewState.social.languages ?? []).length} languages`
        : "Background packages and social ties",
      path: `${currentPreviewState.progression.dreamRefs.length} dreams // ${currentPreviewState.magic.knownSpellRefs.length} spells`,
      faith: patron?.name
        ? `${patron.name} // ${currentPreviewState.faith.relicRefs.length} relics`
        : "Pantheon, patron, and vows",
      gear: `${currentPreviewState.inventory.items.length} inventory entries // ${Object.values(currentPreviewState.inventory.currency).reduce((total, amount) => total + amount, 0)} wealth`,
      review: isEditorValid
        ? "Validation clear // ready to finalize"
        : `${allValidationIssues.length} issues require attention`,
    };
  }, [allValidationIssues.length, currentPreviewState, draft, editorOptions, isEditorValid]);

  function mutateDraft(mutator: (nextState: CharacterDraft) => void) {
    setDraft((current) => {
      if (!current) {
        return current;
      }
      const nextState = cloneState(current);
      mutator(nextState);
      return nextState;
    });
  }

  function applyInventoryMutation(
    mutator: (
      nextState: CharacterDraft & CharacterInventoryPlacementState,
      catalog: InventoryPlacementCatalog,
    ) => void,
  ) {
    if (!draft || !inventoryPlacementCatalog) {
      return;
    }

    try {
      const nextState = cloneState(draft) as unknown as CharacterDraft &
        CharacterInventoryPlacementState;
      mutator(nextState, inventoryPlacementCatalog);
      syncInventoryPlacementState(nextState, inventoryPlacementCatalog);
      setDraft(nextState);
      setSurfaceError(null);
    } catch (error) {
      setSurfaceError(
        error instanceof Error ? error.message : "Inventory update failed.",
      );
    }
  }

  function handleAttributeRoll() {
    if (!draft || !selectedRace || storedAttributeRolls || !selectedRaceRollProfile.supported) {
      return;
    }

    setSurfaceError(null);
    setPendingAction("Rolling attribute profile");
    setIsRollingAttributes(true);

    if (attributeRollTimeoutRef.current) {
      clearTimeout(attributeRollTimeoutRef.current);
    }

    attributeRollTimeoutRef.current = setTimeout(() => {
      const pools = rollAttributePools();
      const resolvedAttributes = computeRolledAttributesForRace(
        selectedRace,
        pools,
        draft.attributes.glory,
      );

      mutateDraft((nextState) => {
        setStoredAttributeRolls(nextState, {
          version: 1,
          usedAt: Date.now(),
          raceIdAtRoll: selectedRace.id,
          pools,
        });

        if (resolvedAttributes) {
          nextState.attributes = resolvedAttributes;
        }
      });

      setIsRollingAttributes(false);
      setPendingAction(null);
      attributeRollTimeoutRef.current = null;
    }, 980);
  }

  function handleJsonChange(key: keyof JsonEditorState, value: string) {
    setJsonEditors((current) => (current ? { ...current, [key]: value } : current));
  }

  function handleJsonCommit(key: keyof JsonEditorState) {
    if (!jsonEditors) {
      return;
    }

    try {
      if (key === "activeConditions") {
        const parsed = parseJsonValue<CharacterDraft["body"]["activeConditions"]>(
          jsonEditors.activeConditions,
        );
        mutateDraft((nextState) => {
          nextState.body.activeConditions = parsed;
        });
      }

      if (key === "activeEffects") {
        const parsed = parseJsonValue<CharacterDraft["activeEffects"]>(
          jsonEditors.activeEffects,
        );
        mutateDraft((nextState) => {
          nextState.activeEffects = parsed;
        });
      }

      if (key === "extensions") {
        const parsed = parseJsonValue<NonNullable<CharacterDraft["extensions"]>>(
          jsonEditors.extensions,
        );
        mutateDraft((nextState) => {
          nextState.extensions = parsed;
        });
      }

      setJsonErrors((current) => ({ ...current, [key]: null }));
    } catch (error) {
      setJsonErrors((current) => ({
        ...current,
        [key]: error instanceof Error ? error.message : "Invalid JSON payload.",
      }));
    }
  }

  async function persistNow(targetStep: WizardStep = currentStepRef.current) {
    if (!activeBugchudId || !draftRef.current) {
      return null;
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }

    const draftSnapshot = cloneState(draftRef.current);
    const signatureSnapshot = serializeDraftSignature(draftSnapshot, targetStep);

    if (lastPersistedSignatureRef.current === signatureSnapshot) {
      return {
        state: draftSnapshot,
        currentStep: targetStep,
        status,
      };
    }

    setSaveState("saving");
    setSaveMessage("Saving draft");

    const saved = await saveDraft({
      bugchudId: activeBugchudId,
      state: draftSnapshot,
      currentStep: targetStep,
    });

    if (saved) {
      const persistedSignature = serializeDraftSignature(
        saved.state,
        saved.currentStep as WizardStep,
      );
      lastPersistedSignatureRef.current = persistedSignature;
      setDraft(cloneState(saved.state));
      setStatus(saved.status);
      startTransition(() => {
        setCurrentStep(saved.currentStep as WizardStep);
      });
      setJsonEditors(buildJsonState(saved.state));
      setSaveState("saved");
      setSaveMessage("All changes saved");
    }

    return saved;
  }

  async function handleComplete() {
    if (!activeBugchudId || !draftRef.current || !isEditorValid) {
      return;
    }

    setPendingAction(status === "complete" ? "Saving character" : "Finalizing character");
    setSurfaceError(null);

    try {
      const latest = await persistNow("review");
      const latestState = latest?.state ?? draftRef.current;

      const saved = await completeDraft({
        bugchudId: activeBugchudId,
        state: latestState,
      });

      if (saved) {
        setDraft(cloneState(saved.state));
        setStatus(saved.status);
        setCurrentStep("review");
        setJsonEditors(buildJsonState(saved.state));
        lastPersistedSignatureRef.current = serializeDraftSignature(saved.state, "review");
        setSaveState("saved");
        setSaveMessage(status === "complete" ? "Character saved" : "Character finalized");
      }
    } catch (error) {
      setSurfaceError(error instanceof Error ? error.message : "Character completion failed.");
      setSaveState("error");
      setSaveMessage(status === "complete" ? "Save failed" : "Finalize failed");
    } finally {
      setPendingAction(null);
    }
  }

  if (!isLoaded) {
    return (
      <LoadingState
        title="Syncing Session"
        detail="Waiting for the auth conduit before opening the advanced editor workspace."
      />
    );
  }

  if (!isSignedIn) {
    return (
      <LoadingState
        title="Sign In Required"
        detail="Character creation and draft resumption live behind the protected Frontchud archive."
        action={
          <SignInButton mode="modal">
            <Button>
              <SignInIcon data-icon="inline-start" />
              Authenticate
            </Button>
          </SignInButton>
        }
      />
    );
  }

  if (character === null && activeBugchudId) {
    return (
      <LoadingState
        title="Character Missing"
        detail="This character could not be reopened from your archive."
      />
    );
  }

  if (!activeBugchudId || !editorOptions || !draft || !jsonEditors || !currentPreviewState) {
    return (
      <LoadingState
        title="Hydrating Editor"
        detail="Pulling the ruleset registries, preview projection, and saved runtime into the workspace editor."
      />
    );
  }

  const selectedRace = findByRef(editorOptions.steps.lineage.races, draft.identity.raceRef);
  const selectedOrigin = findByRef(editorOptions.steps.lineage.origins, draft.identity.originRef);
  const storedAttributeRolls = getStoredAttributeRolls(draft);
  const selectedRaceRollProfile = getRaceRollProfile(selectedRace);
  const displayedAttributeRolls = rollingAttributePreview ?? storedAttributeRolls?.pools ?? null;
  const canRollAttributes =
    Boolean(selectedRace) &&
    selectedRaceRollProfile.supported &&
    !storedAttributeRolls &&
    !isRollingAttributes;

  const raceOptions = sortByName(editorOptions.steps.lineage.races).map((race) =>
    toSearchOption(
      race.id,
      race.name,
      renderOptionalSummary(race.summary),
      "Races",
      [race.id, race.size],
    ),
  );
  const originOptions = sortByName(editorOptions.steps.lineage.origins).map((origin) =>
    toSearchOption(
      origin.id,
      origin.name,
      renderOptionalSummary(origin.summary),
      "Origins",
      [origin.id, origin.group, ...(origin.homelandTags ?? [])],
    ),
  );
  const backgroundOptions = availableBackgrounds.map((background) => {
    const selected =
      draft.identity.backgroundRefs.some((refValue) => refValue.id === background.id);
    const originLinked =
      backgroundSelection?.originBackgroundIds.has(background.id) ?? false;
    const disabled =
      backgroundSelection
        ? !backgroundSelection.selectableBackgroundIds.has(background.id)
        : true;

    return {
      value: background.id,
      label: background.name,
      description: renderOptionalSummary(background.summary),
      group: originLinked ? "Your origin" : "Other origins",
      keywords: [background.id, background.narrativeRole],
      disabled,
      meta: selected ? (
        <Badge variant="default">Selected</Badge>
      ) : (
        <Badge variant="outline">{originLinked ? "Origin-linked" : "Cross-origin"}</Badge>
      ),
    } satisfies SearchOption;
  });
  const factionOptions = sortByName(editorOptions.steps.social.factions).map((faction) =>
    toSearchOption(faction.id, faction.name, renderOptionalSummary(faction.summary), "Factions", [faction.id]),
  );
  const cultureOptions = sortByName(editorOptions.steps.social.cultures).map((culture) =>
    toSearchOption(culture.id, culture.name, renderOptionalSummary(culture.summary), "Cultures", [culture.id]),
  );
  const dreamOptions = getSuggestedDreams(editorOptions, draft).map((dream) =>
    toSearchOption(dream.id, dream.name, renderOptionalSummary(dream.summary), "Dreams", [dream.id]),
  );
  const mutationOptions = sortByName(editorOptions.steps.path.mutations).map((mutation) =>
    toSearchOption(
      mutation.id,
      mutation.name,
      renderOptionalSummary(mutation.summary),
      "Mutations",
      [mutation.id],
    ),
  );
  const bionicOptions = sortByName(editorOptions.steps.path.bionics).map((bionic) =>
    toSearchOption(bionic.id, bionic.name, renderOptionalSummary(bionic.summary), "Bionics", [bionic.id]),
  );
  const grimoireOptions = sortByName(editorOptions.steps.path.grimoires).map((grimoire) =>
    toSearchOption(
      grimoire.id,
      grimoire.name,
      renderOptionalSummary(grimoire.summary),
      "Grimoires",
      [grimoire.id],
    ),
  );
  const spellOptions = sortByName(editorOptions.steps.path.spells).map((spell) =>
    toSearchOption(spell.id, spell.name, renderOptionalSummary(spell.summary), "Spells", [spell.id]),
  );
  const pantheonOptions = editorOptions.characterCreation.faithOptions.pantheons.map((option) =>
    toSearchOption(
      option.ref.id,
      option.definition.name,
      renderOptionalSummary(option.definition.summary),
      "Pantheons",
      [option.ref.id],
    ),
  );
  const patronOptions = editorOptions.characterCreation.faithOptions.patrons.map((option) =>
    toSearchOption(
      option.ref.id,
      option.definition.name,
      renderOptionalSummary(option.definition.summary),
      "Patrons",
      [option.ref.id],
    ),
  );
  const boonOptions = editorOptions.steps.faith.boons.map((boon) =>
    toSearchOption(boon.id, boon.name, renderOptionalSummary(boon.summary), "Boons", [boon.id]),
  );
  const covenantOptions = editorOptions.steps.faith.covenants.map((covenant) =>
    toSearchOption(
      covenant.id,
      covenant.name,
      renderOptionalSummary(covenant.summary),
      "Covenants",
      [covenant.id],
    ),
  );
  const relicOptions = editorOptions.steps.faith.relics.map((relic) =>
    toSearchOption(relic.id, relic.name, renderOptionalSummary(relic.summary), "Relics", [relic.id]),
  );

  const legacyEquippedOptions = [...new Map(
    draft.inventory.items
      .filter((item) => isLegacyEquippableRef(item.ref))
      .map((item) => [
        refKey(item.ref),
        toSearchOption(
          refKey(item.ref),
          inventoryLabelFromRef(editorOptions, item.ref),
          `Owned in inventory${item.quantity > 1 ? ` // Qty ${item.quantity}` : ""}`,
          "Legacy equipped",
          [item.ref.id, String(item.ref.kind)],
        ),
      ]),
  ).values()];
  const inventoryStackViews = draft.inventory.items.map((item, index) => ({
    index,
    item,
    key: buildInventoryStackKey(item, index),
    label: inventoryLabelFromRef(editorOptions, item.ref),
    placement:
      item.containerId && draft.inventory.containers.find((entry) => entry.id === item.containerId)
        ? `Contained: ${draft.inventory.containers.find((entry) => entry.id === item.containerId)?.label}`
        : getInventoryPlacementLabel(item),
  }));

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <header className="flex flex-col gap-4 border-b border-border/20 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">Advanced editor</Badge>
              <Badge variant="ghost">Ruleset v{editorOptions.rulesetVersion}</Badge>
              <Badge variant="ghost">{activeBugchudId}</Badge>
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-3xl font-black tracking-[-0.06em] text-primary sm:text-4xl">
                {draft.identity.name || "Untitled Character"}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
                Full-state editing with autosave, preview validation, and searchable registry controls.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <SaveStatusBadge saveState={saveState} saveMessage={saveMessage} />
            <Button
              onClick={() => void handleComplete()}
              disabled={!isEditorValid || Boolean(pendingAction)}
            >
              <ShieldCheckIcon data-icon="inline-start" />
              {status === "complete" ? "Save" : "Finalize"}
            </Button>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          <MetricCard label="Current Section" value={STEP_META[currentStep].label} />
          <MetricCard label="Validation Issues" value={String(allValidationIssues.length)} />
          <MetricCard label="Draft State" value={status.toUpperCase()} />
        </div>

        {surfaceError ? (
          <Card size="sm" className="border border-secondary/40 bg-secondary/12">
            <CardHeader className="gap-2">
              <CardTitle className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-secondary">
                <WarningCircleIcon />
                Draft issue
              </CardTitle>
              <CardDescription className="text-xs leading-6 text-secondary-foreground">
                {surfaceError}
              </CardDescription>
            </CardHeader>
          </Card>
        ) : null}
        {pendingAction ? (
          <Badge variant="outline" className="w-fit">
            {pendingAction}
          </Badge>
        ) : null}
      </header>

        <SummaryPanel
          className="xl:hidden"
          draft={draft}
          preview={preview}
          options={editorOptions}
          validationIssues={allValidationIssues}
        />

      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="min-w-0 flex-1">
          <Card className="border border-border/20 bg-background/65">
            <CardContent className="px-0 py-0">
                <Accordion
                  type="single"
                  value={currentStep}
                  onValueChange={(value) => {
                    if (value) {
                      startTransition(() => {
                        setCurrentStep(value as WizardStep);
                      });
                    }
                  }}
                >
                  {WIZARD_STEPS.map((step) => (
                    <AccordionItem key={step} value={step} className="border-border/20 px-4 sm:px-6">
                      <AccordionTrigger className="py-5 hover:no-underline">
                        <SectionTriggerSummary
                          step={step}
                          summary={sectionSummaries[step]}
                          status={status}
                        />
                      </AccordionTrigger>
                      <AccordionContent className="pb-6">
                        <div className="flex flex-col gap-6">
                          <SectionIntro step={step} summary={sectionSummaries[step]} />

                          {step === "identity" ? (
                            <div className="flex flex-col gap-5">
                              <Card size="sm" className="border border-border/20 bg-card/55">
                                <CardContent className="py-4">
                                  <FieldGroup className="gap-4 md:grid md:grid-cols-2">
                                    <CompactTextField
                                      id="character-name"
                                      label="Name"
                                      value={draft.identity.name}
                                      onChange={(value) =>
                                        mutateDraft((nextState) => {
                                          nextState.identity.name = value;
                                        })
                                      }
                                      placeholder="Selene Ash"
                                    />
                                    <CompactTextField
                                      id="character-epithet"
                                      label="Epithet"
                                      value={draft.identity.epithet ?? ""}
                                      onChange={(value) =>
                                        mutateDraft((nextState) => {
                                          nextState.identity.epithet = value || undefined;
                                        })
                                      }
                                      placeholder="The Rust-Sworn"
                                    />
                                    <CompactTextField
                                      id="character-faith-label"
                                      label="Faith Label"
                                      value={draft.identity.faithLabel ?? ""}
                                      onChange={(value) =>
                                        mutateDraft((nextState) => {
                                          nextState.identity.faithLabel = value || undefined;
                                        })
                                      }
                                      placeholder="Ash Cathedral initiate"
                                    />
                                  </FieldGroup>
                                </CardContent>
                              </Card>

                              <Card size="sm" className="border border-border/20 bg-card/55">
                                <CardHeader className="gap-2">
                                  <CardTitle className="text-xs uppercase tracking-[0.28em] text-primary">
                                    Ruleset notes
                                  </CardTitle>
                                  <CardDescription className="text-xs leading-6 text-muted-foreground">
                                    Character lore hooks surfaced directly from the current BUGCHUD ruleset.
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3 py-1">
                                  {editorOptions.characterLore.generationNotes?.length ? (
                                    editorOptions.characterLore.generationNotes.map((note) => (
                                      <p key={note} className="text-sm leading-7 text-muted-foreground">
                                        {note}
                                      </p>
                                    ))
                                  ) : (
                                    <p className="text-sm leading-7 text-muted-foreground">
                                      No generation notes are attached to the active ruleset.
                                    </p>
                                  )}
                                </CardContent>
                              </Card>
                            </div>
                          ) : null}

                          {step === "lineage" ? (
                            <div className="flex flex-col gap-5">
                              <Card size="sm" className="border border-border/20 bg-card/55">
                                <CardContent className="py-4">
                                  <FieldGroup className="gap-5 md:grid md:grid-cols-2">
                                    <SearchableSingleSelect
                                      label="Race"
                                      options={raceOptions}
                                      value={draft.identity.raceRef.id}
                                      onChange={(value) => {
                                        if (!value) {
                                          return;
                                        }
                                        const race = findById(editorOptions.steps.lineage.races, value);
                                        if (!race) {
                                          return;
                                        }
                                        mutateDraft((nextState) => {
                                          nextState.identity.raceRef = { kind: "race", id: race.id };
                                          const storedRolls = getStoredAttributeRolls(nextState);
                                          if (storedRolls) {
                                            const resolvedAttributes = computeRolledAttributesForRace(
                                              race,
                                              storedRolls.pools,
                                              nextState.attributes.glory,
                                            );
                                            if (resolvedAttributes) {
                                              nextState.attributes = resolvedAttributes;
                                            }
                                          }
                                          nextState.social.languages = [
                                            ...new Set([
                                              ...nextState.social.languages,
                                              ...race.startingLanguages,
                                            ]),
                                          ];
                                        });
                                      }}
                                      description="The race definition contributes baseline languages and identity flavor."
                                    />
                                    <SearchableSingleSelect
                                      label="Origin"
                                      options={originOptions}
                                      value={draft.identity.originRef.id}
                                      onChange={(value) => {
                                        if (!value) {
                                          return;
                                        }
                                        const origin = findById(editorOptions.steps.lineage.origins, value);
                                        if (!origin) {
                                          return;
                                        }
                                        mutateDraft((nextState) => {
                                          nextState.identity.originRef = { kind: "origin", id: origin.id };
                                          const normalizedBackgroundIds =
                                            normalizeBackgroundSelection({
                                              originId: origin.id,
                                              selectedBackgroundIds:
                                                nextState.identity.backgroundRefs.map(
                                                  (refValue) => refValue.id,
                                                ),
                                              backgroundsByOrigin:
                                                editorOptions.steps.background.backgroundsByOrigin,
                                              allBackgroundIds:
                                                editorOptions.steps.background.backgrounds.map(
                                                  (background) => background.id,
                                                ),
                                            });
                                          nextState.identity.backgroundRefs =
                                            normalizedBackgroundIds.map((id) => ({
                                              kind: "background",
                                              id,
                                            }));
                                          nextState.social.languages = [
                                            ...new Set([
                                              ...nextState.social.languages,
                                              ...(origin.startingLanguages ?? []),
                                            ]),
                                          ];
                                        });
                                      }}
                                      description="Changing origin keeps only background packages that still fit the current origin and cross-origin limits."
                                    />
                                  </FieldGroup>
                                </CardContent>
                              </Card>

                              <Card size="sm" className="border border-border/20 bg-card/55">
                                <CardHeader className="gap-3">
                                  <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div className="space-y-2">
                                      <CardTitle className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-primary">
                                        <DiceFiveIcon />
                                        Attribute Roll
                                      </CardTitle>
                                      <CardDescription className="max-w-3xl text-xs leading-6 text-muted-foreground">
                                        Roll the three base `3d6` triplets once, lock them into the draft, and let the
                                        selected race resolve Twitch, Flesh, and Mojo from those saved values.
                                      </CardDescription>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                      {storedAttributeRolls ? (
                                        <Badge variant="default">roll locked</Badge>
                                      ) : (
                                        <Badge variant="outline">single use</Badge>
                                      )}
                                      <Button
                                        type="button"
                                        onClick={() => handleAttributeRoll()}
                                        disabled={!canRollAttributes}
                                      >
                                        <DiceFiveIcon data-icon="inline-start" />
                                        {isRollingAttributes
                                          ? "Rolling..."
                                          : storedAttributeRolls
                                            ? "Roll spent"
                                            : "Roll attributes"}
                                      </Button>
                                    </div>
                                  </div>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-5 py-1">
                                  <div className="grid gap-4 xl:grid-cols-3">
                                    {ROLL_ATTRIBUTE_KEYS.map((key, rollIndex) => {
                                      const rule = selectedRaceRollProfile.supported
                                        ? selectedRaceRollProfile.rules?.[key] ?? null
                                        : null;
                                      const triplet = displayedAttributeRolls?.[key];
                                      const resolvedValue =
                                        rule && triplet
                                          ? pickRollValue(triplet, rule.selection) + rule.bonus
                                          : null;

                                      return (
                                        <Card
                                          key={key}
                                          size="sm"
                                          className="border border-border/20 bg-background/50"
                                        >
                                          <CardHeader className="gap-2">
                                            <div className="flex items-center justify-between gap-3">
                                              <CardTitle className="text-xs uppercase tracking-[0.24em] text-accent">
                                                {formatRollAttributeLabel(key)}
                                              </CardTitle>
                                              {resolvedValue !== null ? (
                                                <Badge variant="ghost">{resolvedValue}</Badge>
                                              ) : null}
                                            </div>
                                            <CardDescription className="text-[0.72rem] leading-5 text-muted-foreground">
                                              {rule
                                                ? `Take ${rule.selection}${rule.bonus ? `, add ${rule.bonus}` : ""}.`
                                                : selectedRaceRollProfile.reason}
                                            </CardDescription>
                                          </CardHeader>
                                          <CardContent className="flex flex-col gap-3 py-1">
                                            <div className="flex gap-2">
                                              {(triplet ?? [1, 1, 1]).map((value, dieIndex) => (
                                                <AttributeRollDie
                                                  key={`${key}-${dieIndex}`}
                                                  value={value}
                                                  rolling={isRollingAttributes}
                                                  delayMs={rollIndex * 120 + dieIndex * 90}
                                                />
                                              ))}
                                            </div>
                                            <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                                              {triplet ? formatRollTriplet(triplet) : "Awaiting one-time roll"}
                                            </p>
                                          </CardContent>
                                        </Card>
                                      );
                                    })}
                                  </div>

                                  <div className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
                                    <Card size="sm" className="border border-border/20 bg-background/50">
                                      <CardHeader className="gap-2">
                                        <CardTitle className="text-xs uppercase tracking-[0.24em] text-primary">
                                          {selectedRace?.name ?? "Race profile pending"}
                                        </CardTitle>
                                        <CardDescription className="text-[0.72rem] leading-5 text-muted-foreground">
                                          {selectedRaceRollProfile.supported
                                            ? "These are the active race-specific selection rules applied to the saved triplets."
                                            : selectedRaceRollProfile.reason}
                                        </CardDescription>
                                      </CardHeader>
                                      <CardContent className="flex flex-col gap-2 py-1">
                                        {selectedRaceRollProfile.notes.length ? (
                                          selectedRaceRollProfile.notes.map((note) => (
                                            <p
                                              key={note}
                                              className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground"
                                            >
                                              {note}
                                            </p>
                                          ))
                                        ) : (
                                          <p className="text-sm leading-7 text-muted-foreground">
                                            No authored roll notes are attached to the selected race.
                                          </p>
                                        )}
                                      </CardContent>
                                    </Card>

                                    <Card size="sm" className="border border-border/20 bg-background/50">
                                      <CardHeader className="gap-2">
                                        <CardTitle className="text-xs uppercase tracking-[0.24em] text-primary">
                                          Lock state
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="flex flex-col gap-3 py-1">
                                        <SummaryRow
                                          label="Roll status"
                                          value={storedAttributeRolls ? "LOCKED" : "UNUSED"}
                                        />
                                        <SummaryRow
                                          label="Rolled on"
                                          value={
                                            storedAttributeRolls?.usedAt
                                              ? new Date(storedAttributeRolls.usedAt).toLocaleTimeString()
                                              : "Pending"
                                          }
                                        />
                                        <SummaryRow
                                          label="Current race"
                                          value={selectedRace?.name ?? "Pending"}
                                        />
                                        <SummaryRow
                                          label="Rolled as"
                                          value={storedAttributeRolls?.raceIdAtRoll ?? "Pending"}
                                        />
                                      </CardContent>
                                    </Card>
                                  </div>
                                </CardContent>
                              </Card>

                              <div className="grid gap-4 md:grid-cols-2">
                                <MetricCard
                                  label="Race Summary"
                                  value={selectedRace?.name ?? "Pending"}
                                />
                                <MetricCard
                                  label="Origin Summary"
                                  value={selectedOrigin?.name ?? "Pending"}
                                />
                              </div>
                            </div>
                          ) : null}

                          {step === "background" ? (
                            <div className="flex flex-col gap-5">
                              <Card size="sm" className="border border-border/20 bg-card/55">
                                <CardContent className="py-4">
                                  <FieldGroup className="gap-5">
                                    <SearchableMultiSelect
                                      label="Background Packages"
                                      options={backgroundOptions}
                                      values={draft.identity.backgroundRefs.map((refValue) => refValue.id)}
                                      onChange={(backgroundIds) =>
                                        mutateDraft((nextState) => {
                                          const normalizedBackgroundIds =
                                            normalizeBackgroundSelection({
                                              originId: nextState.identity.originRef.id,
                                              selectedBackgroundIds: backgroundIds,
                                              backgroundsByOrigin:
                                                editorOptions.steps.background.backgroundsByOrigin,
                                              allBackgroundIds:
                                                editorOptions.steps.background.backgrounds.map(
                                                  (background) => background.id,
                                                ),
                                            });
                                          nextState.identity.backgroundRefs =
                                            normalizedBackgroundIds.map((id) => ({
                                            kind: "background",
                                            id,
                                          }));
                                          const selectedBackgrounds = editorOptions.steps.background.backgrounds.filter(
                                            (background) =>
                                              normalizedBackgroundIds.includes(background.id),
                                          );
                                          nextState.social.reputationTags = [
                                            ...new Set([
                                              ...(nextState.social.reputationTags ?? []),
                                              ...selectedBackgrounds.flatMap(
                                                (background) => background.socialTags ?? [],
                                              ),
                                            ]),
                                          ];
                                        })
                                      }
                                      description={`Choose up to ${MAX_BACKGROUND_SELECTIONS}. At least one must match the active origin, and no more than one can be cross-origin.`}
                                    />

                                    <FieldGroup className="gap-4 md:grid md:grid-cols-2">
                                      <CompactTextField
                                        id="background-languages"
                                        label="Languages"
                                        value={draft.social.languages.join(", ")}
                                        onChange={(value) =>
                                          mutateDraft((nextState) => {
                                            nextState.social.languages = parseCommaList(value);
                                          })
                                        }
                                      />
                                      <CompactTextField
                                        id="background-reputation"
                                        label="Reputation Tags"
                                        value={(draft.social.reputationTags ?? []).join(", ")}
                                        onChange={(value) =>
                                          mutateDraft((nextState) => {
                                            nextState.social.reputationTags = parseCommaList(value);
                                          })
                                        }
                                      />
                                    </FieldGroup>
                                  </FieldGroup>
                                </CardContent>
                              </Card>

                              <div className="grid gap-4 lg:grid-cols-2">
                                <Card size="sm" className="border border-border/20 bg-card/55 lg:col-span-2">
                                  <CardHeader className="gap-2">
                                    <CardTitle className="text-xs uppercase tracking-[0.28em] text-primary">
                                      Followers
                                    </CardTitle>
                                    <CardDescription className="text-xs leading-6 text-muted-foreground">
                                      Track starting entourages like Archon cutthroats without dropping into raw JSON.
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent className="flex flex-col gap-4 py-2">
                                    {draft.social.followers.length ? (
                                      <div className="flex flex-col gap-3">
                                        {draft.social.followers.map((follower, followerIndex) => (
                                          <div
                                            key={`follower-${followerIndex}-${follower.label}`}
                                            className="grid gap-3 rounded-none border border-border/20 bg-background/45 px-3 py-3 md:grid-cols-[minmax(0,1fr)_9rem_auto]"
                                          >
                                            <CompactTextField
                                              id={`background-follower-label-${followerIndex}`}
                                              label="Label"
                                              value={follower.label}
                                              onChange={(value) =>
                                                mutateDraft((nextState) => {
                                                  nextState.social.followers[followerIndex] = {
                                                    ...nextState.social.followers[followerIndex],
                                                    label: value,
                                                  };
                                                })
                                              }
                                            />
                                            <NumberField
                                              id={`background-follower-quantity-${followerIndex}`}
                                              label="Quantity"
                                              min={1}
                                              value={follower.quantity}
                                              onChange={(value) =>
                                                mutateDraft((nextState) => {
                                                  nextState.social.followers[followerIndex] = {
                                                    ...nextState.social.followers[followerIndex],
                                                    quantity: Math.max(1, value),
                                                  };
                                                })
                                              }
                                            />
                                            <div className="flex items-end">
                                              <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                  mutateDraft((nextState) => {
                                                    nextState.social.followers =
                                                      nextState.social.followers.filter(
                                                        (_, index) => index !== followerIndex,
                                                      );
                                                  })
                                                }
                                              >
                                                Remove
                                              </Button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-[0.72rem] leading-6 text-muted-foreground">
                                        No followers recorded on this draft yet.
                                      </p>
                                    )}

                                    <div className="flex justify-end">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          mutateDraft((nextState) => {
                                            nextState.social.followers = [
                                              ...nextState.social.followers,
                                              {
                                                label: "",
                                                quantity: 1,
                                              },
                                            ];
                                          })
                                        }
                                      >
                                        Add follower
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card size="sm" className="border border-border/20 bg-card/55">
                                  <CardContent className="py-4">
                                    <SearchableMultiSelect
                                      label="Factions"
                                      options={factionOptions}
                                      values={(draft.social.factionRefs ?? []).map((refValue) => refValue.id)}
                                      onChange={(factionIds) =>
                                        mutateDraft((nextState) => {
                                          nextState.social.factionRefs = factionIds.map((id) => ({
                                            kind: "faction",
                                            id,
                                          }));
                                        })
                                      }
                                    />
                                  </CardContent>
                                </Card>
                                <Card size="sm" className="border border-border/20 bg-card/55">
                                  <CardContent className="py-4">
                                    <SearchableMultiSelect
                                      label="Cultures"
                                      options={cultureOptions}
                                      values={(draft.social.cultureRefs ?? []).map((refValue) => refValue.id)}
                                      onChange={(cultureIds) =>
                                        mutateDraft((nextState) => {
                                          nextState.social.cultureRefs = cultureIds.map((id) => ({
                                            kind: "culture",
                                            id,
                                          }));
                                        })
                                      }
                                    />
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          ) : null}

                          {step === "path" ? (
                            <div className="flex flex-col gap-5">
                              <Card size="sm" className="border border-border/20 bg-card/55">
                                <CardContent className="py-4">
                                  <FieldGroup className="gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
                                    <NumberField
                                      id="path-current-fate"
                                      label="Current Fate"
                                      value={draft.progression.currentFate}
                                      onChange={(value) =>
                                        mutateDraft((nextState) => {
                                          nextState.progression.currentFate = value;
                                        })
                                      }
                                    />
                                    <NumberField
                                      id="path-total-fate"
                                      label="Total Fate Earned"
                                      value={draft.progression.totalFateEarned}
                                      onChange={(value) =>
                                        mutateDraft((nextState) => {
                                          nextState.progression.totalFateEarned = value;
                                        })
                                      }
                                    />
                                    <NumberField
                                      id="path-twitch"
                                      label="Twitch"
                                      value={draft.attributes.twitch}
                                      onChange={(value) =>
                                        mutateDraft((nextState) => {
                                          nextState.attributes.twitch = value;
                                        })
                                      }
                                    />
                                    <NumberField
                                      id="path-flesh"
                                      label="Flesh"
                                      value={draft.attributes.flesh}
                                      onChange={(value) =>
                                        mutateDraft((nextState) => {
                                          nextState.attributes.flesh = value;
                                        })
                                      }
                                    />
                                    <NumberField
                                      id="path-mojo"
                                      label="Mojo"
                                      value={draft.attributes.mojo}
                                      onChange={(value) =>
                                        mutateDraft((nextState) => {
                                          nextState.attributes.mojo = value;
                                        })
                                      }
                                    />
                                    <NumberField
                                      id="path-glory"
                                      label="Glory"
                                      value={draft.attributes.glory}
                                      onChange={(value) =>
                                        mutateDraft((nextState) => {
                                          nextState.attributes.glory = value;
                                        })
                                      }
                                    />
                                  </FieldGroup>
                                </CardContent>
                              </Card>

                              <div className="grid gap-4 xl:grid-cols-2">
                                <Card size="sm" className="border border-border/20 bg-card/55">
                                  <CardContent className="py-4">
                                    <SearchableMultiSelect
                                      label="Dreams"
                                      options={dreamOptions}
                                      values={draft.progression.dreamRefs.map((refValue) => refValue.id)}
                                      onChange={(dreamIds) =>
                                        mutateDraft((nextState) => {
                                          nextState.progression.dreamRefs = dreamIds.map((id) => ({
                                            kind: "dream",
                                            id,
                                          }));
                                        })
                                      }
                                    />
                                  </CardContent>
                                </Card>
                                <Card size="sm" className="border border-border/20 bg-card/55">
                                  <CardContent className="py-4">
                                    <SearchableMultiSelect
                                      label="Mutations"
                                      options={mutationOptions}
                                      values={draft.body.mutationRefs.map((refValue) => refValue.id)}
                                      onChange={(mutationIds) =>
                                        mutateDraft((nextState) => {
                                          nextState.body.mutationRefs = mutationIds.map((id) => ({
                                            kind: "mutation",
                                            id,
                                          }));
                                        })
                                      }
                                    />
                                  </CardContent>
                                </Card>
                                <Card size="sm" className="border border-border/20 bg-card/55">
                                  <CardContent className="py-4">
                                    <SearchableMultiSelect
                                      label="Bionics"
                                      options={bionicOptions}
                                      values={draft.body.bionicRefs.map((refValue) => refValue.id)}
                                      onChange={(bionicIds) =>
                                        mutateDraft((nextState) => {
                                          nextState.body.bionicRefs = bionicIds.map((id) => ({
                                            kind: "bionic",
                                            id,
                                          }));
                                        })
                                      }
                                    />
                                  </CardContent>
                                </Card>
                                <Card size="sm" className="border border-border/20 bg-card/55">
                                  <CardContent className="py-4">
                                    <SearchableMultiSelect
                                      label="Grimoires"
                                      options={grimoireOptions}
                                      values={draft.magic.grimoireRefs.map((refValue) => refValue.id)}
                                      onChange={(grimoireIds) =>
                                        mutateDraft((nextState) => {
                                          nextState.magic.grimoireRefs = grimoireIds.map((id) => ({
                                            kind: "grimoire",
                                            id,
                                          }));
                                        })
                                      }
                                    />
                                  </CardContent>
                                </Card>
                              </div>

                              {hasEditorArcynePotential ? (
                                <ArcyneSpellSelector
                                  spells={editorOptions.steps.path.spells}
                                  selectedKnownSpellIds={arcyneSpellSelection.selectedKnownSpellIds}
                                  lockedKnownSpellIds={arcyneSpellSelection.lockedKnownSpellIds}
                                  preparedSlotsBySpellId={arcyneSpellSelection.preparedSlotsBySpellId}
                                  onKnownSpellIdsChange={(spellIds) =>
                                    mutateDraft((nextState) => {
                                      const nextSelection = resolveArcyneSpellSelection({
                                        selectedKnownSpellIds: spellIds,
                                        lockedKnownSpellIds:
                                          arcyneSpellSelection.lockedKnownSpellIds,
                                        preparedSlotsBySpellId:
                                          getPreparedSlotsBySpellIdFromState(nextState),
                                        validSpellIds,
                                      });
                                      applyResolvedArcyneSpellSelectionToState(
                                        nextState,
                                        nextSelection,
                                      );
                                    })
                                  }
                                  onPreparedSlotsBySpellIdChange={(preparedSlotsBySpellId) =>
                                    mutateDraft((nextState) => {
                                      const nextSelection = resolveArcyneSpellSelection({
                                        selectedKnownSpellIds:
                                          arcyneSpellSelection.selectedKnownSpellIds,
                                        lockedKnownSpellIds:
                                          arcyneSpellSelection.lockedKnownSpellIds,
                                        preparedSlotsBySpellId,
                                        validSpellIds,
                                      });
                                      applyResolvedArcyneSpellSelectionToState(
                                        nextState,
                                        nextSelection,
                                      );
                                    })
                                  }
                                  description={`Spell preparation is locked to the known pool here. Allocate exactly ${ARCYNE_PREPARED_SLOT_TOTAL} slots to keep this arcyne draft battle-ready.`}
                                  issueText={
                                    arcyneValidationIssues.length
                                      ? arcyneValidationIssues
                                          .map((issue) => issue.message)
                                          .join(" ")
                                      : null
                                  }
                                />
                              ) : (
                                <div className="grid gap-4 xl:grid-cols-2">
                                  <Card size="sm" className="border border-border/20 bg-card/55">
                                    <CardContent className="py-4">
                                      <SearchableMultiSelect
                                        label="Known Spells"
                                        options={spellOptions}
                                        values={draft.magic.knownSpellRefs.map((refValue) => refValue.id)}
                                        onChange={(spellIds) =>
                                          mutateDraft((nextState) => {
                                            nextState.magic.knownSpellRefs = spellIds.map((id) => ({
                                              kind: "spell",
                                              id,
                                            }));
                                          })
                                        }
                                      />
                                    </CardContent>
                                  </Card>
                                  <Card size="sm" className="border border-border/20 bg-card/55">
                                    <CardContent className="py-4">
                                      <SearchableMultiSelect
                                        label="Prepared Spells"
                                        options={spellOptions}
                                        values={draft.magic.preparedSpellRefs.map((refValue) => refValue.id)}
                                        onChange={(spellIds) =>
                                          mutateDraft((nextState) => {
                                            nextState.magic.preparedSpellRefs = spellIds.map((id) => ({
                                              kind: "spell",
                                              id,
                                            }));
                                          })
                                        }
                                      />
                                    </CardContent>
                                  </Card>
                                </div>
                              )}

                              <Accordion type="multiple" className="border border-border/20 bg-card/55 px-4">
                                <AccordionItem value="path-advanced" className="border-border/20">
                                  <AccordionTrigger className="py-4 hover:no-underline">
                                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                                      <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent">
                                        Advanced runtime controls
                                      </span>
                                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
                                        Wounds, mana, raw JSON payloads, and resource pools
                                      </span>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="pb-4">
                                    <div className="flex flex-col gap-5">
                                      <FieldGroup className="gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
                                        <NumberField
                                          id="path-current-wounds"
                                          label="Current Wounds"
                                          value={draft.body.injuries.currentWounds}
                                          onChange={(value) =>
                                            mutateDraft((nextState) => {
                                              nextState.body.injuries.currentWounds = value;
                                            })
                                          }
                                        />
                                        <NumberField
                                          id="path-maximum-wounds"
                                          label="Maximum Wounds"
                                          value={draft.body.injuries.maximumWounds}
                                          onChange={(value) =>
                                            mutateDraft((nextState) => {
                                              nextState.body.injuries.maximumWounds = value;
                                            })
                                          }
                                        />
                                        <NumberField
                                          id="path-death-pressure"
                                          label="Death Pressure"
                                          value={draft.body.injuries.deathPressure}
                                          onChange={(value) =>
                                            mutateDraft((nextState) => {
                                              nextState.body.injuries.deathPressure = value;
                                            })
                                          }
                                        />
                                        <NumberField
                                          id="path-xom-current"
                                          label="XOM Current"
                                          value={draft.body.xom.current}
                                          onChange={(value) =>
                                            mutateDraft((nextState) => {
                                              nextState.body.xom.current = value;
                                            })
                                          }
                                        />
                                      </FieldGroup>

                                      <Card size="sm" className="border border-border/20 bg-background/50">
                                        <CardContent className="py-4">
                                          <FieldGroup className="gap-4">
                                            <CheckboxRow
                                              id="path-can-cast"
                                              title="Can Cast"
                                              description="Toggle spellcasting without leaving the compact editor."
                                              checked={draft.magic.canCast}
                                              onCheckedChange={(checked) =>
                                                mutateDraft((nextState) => {
                                                  nextState.magic.canCast = checked;
                                                })
                                              }
                                            />
                                            <div className="grid gap-4 md:grid-cols-2">
                                              <NumberField
                                                id="path-mana-current"
                                                label="Mana Dice Current"
                                                value={draft.magic.manaDiceCurrent}
                                                onChange={(value) =>
                                                  mutateDraft((nextState) => {
                                                    nextState.magic.manaDiceCurrent = value;
                                                  })
                                                }
                                              />
                                              <NumberField
                                                id="path-mana-maximum"
                                                label="Mana Dice Maximum"
                                                value={draft.magic.manaDiceMaximum}
                                                onChange={(value) =>
                                                  mutateDraft((nextState) => {
                                                    nextState.magic.manaDiceMaximum = value;
                                                  })
                                                }
                                              />
                                            </div>
                                          </FieldGroup>
                                        </CardContent>
                                      </Card>

                                      <div className="grid gap-4 xl:grid-cols-2">
                                        <CompactTextareaField
                                          id="path-active-conditions"
                                          label="Active Conditions JSON"
                                          value={jsonEditors.activeConditions}
                                          onChange={(value) => handleJsonChange("activeConditions", value)}
                                          error={jsonErrors.activeConditions}
                                        />
                                        <CompactTextareaField
                                          id="path-active-effects"
                                          label="Active Effects JSON"
                                          value={jsonEditors.activeEffects}
                                          onChange={(value) => handleJsonChange("activeEffects", value)}
                                          error={jsonErrors.activeEffects}
                                        />
                                        <CompactTextareaField
                                          id="path-extensions"
                                          label="Extensions JSON"
                                          value={jsonEditors.extensions}
                                          onChange={(value) => handleJsonChange("extensions", value)}
                                          error={jsonErrors.extensions}
                                        />
                                        <Card size="sm" className="border border-border/20 bg-background/50">
                                          <CardHeader className="gap-2">
                                            <CardTitle className="text-xs uppercase tracking-[0.28em] text-primary">
                                              Commit raw payloads
                                            </CardTitle>
                                            <CardDescription className="text-xs leading-6 text-muted-foreground">
                                              Parse and apply edited JSON back into the draft runtime.
                                            </CardDescription>
                                          </CardHeader>
                                          <CardContent className="flex flex-wrap gap-2 py-1">
                                            <Button variant="outline" size="sm" onClick={() => handleJsonCommit("activeConditions")}>
                                              Conditions
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => handleJsonCommit("activeEffects")}>
                                              Effects
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => handleJsonCommit("extensions")}>
                                              Extensions
                                            </Button>
                                          </CardContent>
                                        </Card>
                                      </div>

                                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                        {RESOURCE_KEYS.map((resourceKey) => {
                                          const pool = draft.resources[resourceKey] ?? {
                                            current: 0,
                                            maximum: 0,
                                          };

                                          return (
                                            <Card
                                              key={resourceKey}
                                              size="sm"
                                              className="border border-border/20 bg-background/50"
                                            >
                                              <CardHeader className="gap-2">
                                                <CardTitle className="text-xs uppercase tracking-[0.28em] text-primary">
                                                  {resourceKey}
                                                </CardTitle>
                                              </CardHeader>
                                              <CardContent className="grid gap-4 md:grid-cols-2">
                                                <NumberField
                                                  id={`resource-${resourceKey}-current`}
                                                  label="Current"
                                                  value={pool.current}
                                                  onChange={(value) =>
                                                    mutateDraft((nextState) => {
                                                      setPoolValue(nextState, resourceKey, "current", value);
                                                    })
                                                  }
                                                />
                                                <NumberField
                                                  id={`resource-${resourceKey}-maximum`}
                                                  label="Maximum"
                                                  value={pool.maximum}
                                                  onChange={(value) =>
                                                    mutateDraft((nextState) => {
                                                      setPoolValue(nextState, resourceKey, "maximum", value);
                                                    })
                                                  }
                                                />
                                              </CardContent>
                                            </Card>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </div>
                          ) : null}

                          {step === "faith" ? (
                            <div className="flex flex-col gap-5">
                              <Card size="sm" className="border border-border/20 bg-card/55">
                                <CardContent className="py-4">
                                  <FieldGroup className="gap-5 md:grid md:grid-cols-2">
                                    <SearchableSingleSelect
                                      label="Pantheon"
                                      options={pantheonOptions}
                                      value={draft.faith.pantheonRef?.id}
                                      onChange={(value) =>
                                        mutateDraft((nextState) => {
                                          nextState.faith.pantheonRef = value
                                            ? { kind: "pantheon", id: value }
                                            : undefined;
                                        })
                                      }
                                      placeholder="Select a pantheon"
                                    />
                                    <SearchableSingleSelect
                                      label="Patron"
                                      options={patronOptions}
                                      value={draft.faith.patronRef?.id}
                                      onChange={(value) => {
                                        mutateDraft((nextState) => {
                                          if (!value) {
                                            nextState.faith.patronRef = undefined;
                                            return;
                                          }
                                          const patron = findById(editorOptions.steps.faith.patrons, value);
                                          nextState.faith.patronRef = { kind: "patron", id: value };
                                          if (patron?.pantheonRef) {
                                            nextState.faith.pantheonRef = patron.pantheonRef;
                                          }
                                        });
                                      }}
                                      placeholder="Select a patron"
                                    />
                                  </FieldGroup>
                                </CardContent>
                              </Card>

                              <div className="grid gap-4 xl:grid-cols-2">
                                {boonOptions.length ? (
                                  <Card size="sm" className="border border-border/20 bg-card/55">
                                    <CardContent className="py-4">
                                      <SearchableMultiSelect
                                        label="Boons"
                                        options={boonOptions}
                                        values={draft.faith.boonRefs.map((refValue) => refValue.id)}
                                        onChange={(boonIds) =>
                                          mutateDraft((nextState) => {
                                            nextState.faith.boonRefs = boonIds.map((id) => ({
                                              kind: "boon",
                                              id,
                                            }));
                                          })
                                        }
                                      />
                                    </CardContent>
                                  </Card>
                                ) : (
                                  <EmptyRegistryNotice
                                    title="Boons unavailable"
                                    detail="The imported ruleset currently exposes no boon definitions."
                                  />
                                )}

                                {covenantOptions.length ? (
                                  <Card size="sm" className="border border-border/20 bg-card/55">
                                    <CardContent className="py-4">
                                      <SearchableMultiSelect
                                        label="Covenants"
                                        options={covenantOptions}
                                        values={draft.faith.covenantRefs.map((refValue) => refValue.id)}
                                        onChange={(covenantIds) =>
                                          mutateDraft((nextState) => {
                                            nextState.faith.covenantRefs = covenantIds.map((id) => ({
                                              kind: "covenant",
                                              id,
                                            }));
                                          })
                                        }
                                      />
                                    </CardContent>
                                  </Card>
                                ) : (
                                  <EmptyRegistryNotice
                                    title="Covenants unavailable"
                                    detail="The imported ruleset currently exposes no covenant definitions."
                                  />
                                )}
                              </div>

                              <Card size="sm" className="border border-border/20 bg-card/55">
                                <CardContent className="flex flex-col gap-5 py-4">
                                  <SearchableMultiSelect
                                    label="Relics"
                                    options={relicOptions}
                                    values={draft.faith.relicRefs.map((refValue) => refValue.id)}
                                    onChange={(relicIds) =>
                                      mutateDraft((nextState) => {
                                        nextState.faith.relicRefs = relicIds.map((id) => ({
                                          kind: "relic",
                                          id,
                                        }));
                                      })
                                    }
                                  />
                                  <CompactTextField
                                    id="faith-vows"
                                    label="Vow Tags"
                                    value={(draft.faith.vowTags ?? []).join(", ")}
                                    onChange={(value) =>
                                      mutateDraft((nextState) => {
                                        nextState.faith.vowTags = parseCommaList(value);
                                      })
                                    }
                                  />
                                </CardContent>
                              </Card>
                            </div>
                          ) : null}

                          {step === "gear" ? (
                            <div className="flex flex-col gap-5">
                              <Card size="sm" className="border border-border/20 bg-card/55">
                                <CardHeader className="gap-2">
                                  <CardTitle className="text-xs uppercase tracking-[0.28em] text-primary">
                                    Currency
                                  </CardTitle>
                                  <CardDescription className="text-xs leading-6 text-muted-foreground">
                                    Edit denominations inline before refining the actual inventory list.
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                  {editorOptions.steps.gear.denominations.map((denomination) => (
                                    <NumberField
                                      key={denomination}
                                      id={`currency-${denomination}`}
                                      label={denomination}
                                      value={draft.inventory.currency[denomination] ?? 0}
                                      onChange={(value) =>
                                        mutateDraft((nextState) => {
                                          nextState.inventory.currency[denomination] = value;
                                        })
                                      }
                                    />
                                  ))}
                                </CardContent>
                              </Card>

                              <Card size="sm" className="border border-border/20 bg-card/55">
                                <CardContent className="flex flex-col gap-4 py-4">
                                  <SearchableSingleSelect
                                    label="Add Inventory Stack"
                                    options={inventoryCatalog}
                                    value={inventoryCatalogSelection}
                                    onChange={setInventoryCatalogSelection}
                                    placeholder="Search inventory definitions"
                                    description="Each add creates a fresh draft stack. Remove or edit stacks from the ledger below."
                                  />
                                  <div className="flex justify-end">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      disabled={!inventoryCatalogSelection}
                                      onClick={() => {
                                        const selected = inventoryCatalogSelection
                                          ? inventoryOptionMap.get(inventoryCatalogSelection)
                                          : undefined;
                                        if (!selected) {
                                          return;
                                        }

                                        applyInventoryMutation((nextState, catalog) => {
                                          appendInventoryStack(
                                            nextState,
                                            selected.ref as InventoryOwnedRef,
                                            catalog,
                                          );
                                        });
                                        setInventoryCatalogSelection(undefined);
                                      }}
                                    >
                                      Add stack
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card size="sm" className="border border-border/20 bg-card/55">
                                <CardContent className="grid gap-5 py-4 lg:grid-cols-2">
                                  <div className="grid gap-3 sm:grid-cols-2">
                                    <MetricCard
                                      label="Primary Weapon"
                                      value={
                                        draft.loadout.primaryWeaponRef
                                          ? inventoryLabelFromRef(
                                              editorOptions,
                                              draft.loadout.primaryWeaponRef,
                                            )
                                          : "NONE"
                                      }
                                    />
                                    <MetricCard
                                      label="Secondary Weapon"
                                      value={
                                        draft.loadout.secondaryWeaponRef
                                          ? inventoryLabelFromRef(
                                              editorOptions,
                                              draft.loadout.secondaryWeaponRef,
                                            )
                                          : "NONE"
                                      }
                                    />
                                    <MetricCard
                                      label="Armor"
                                      value={
                                        draft.loadout.armorRef
                                          ? inventoryLabelFromRef(
                                              editorOptions,
                                              draft.loadout.armorRef,
                                            )
                                          : "NONE"
                                      }
                                    />
                                    <MetricCard
                                      label="Shield"
                                      value={
                                        draft.loadout.shieldRef
                                          ? inventoryLabelFromRef(
                                              editorOptions,
                                              draft.loadout.shieldRef,
                                            )
                                          : "NONE"
                                      }
                                    />
                                  </div>

                                  <SearchableMultiSelect
                                    label="Legacy Equipped Relics & Grimoires"
                                    options={legacyEquippedOptions}
                                    values={draft.loadout.equippedItemRefs
                                      .filter((entry) => isLegacyEquippableRef(entry))
                                      .map((entry) => refKey(entry))}
                                    onChange={(itemKeys) =>
                                      applyInventoryMutation((nextState, catalog) => {
                                        const nextLegacyRefs = itemKeys
                                          .map((itemKey) =>
                                            nextState.inventory.items.find(
                                              (entry) => refKey(entry.ref) === itemKey,
                                            )?.ref,
                                          )
                                          .filter(
                                            (refValue): refValue is InventoryOwnedRef =>
                                              Boolean(refValue),
                                          );
                                        setLegacyNonCombatEquippedRefs(
                                          nextState,
                                          nextLegacyRefs,
                                          catalog,
                                        );
                                      })
                                    }
                                    placeholder="Choose legacy non-combat refs"
                                    description="Combat gear is projected from stack placement. Only legacy non-combat refs remain directly editable here."
                                  />
                                </CardContent>
                              </Card>

                              <Accordion type="multiple" className="border border-border/20 bg-card/55 px-4">
                                <AccordionItem value="gear-advanced" className="border-border/20">
                                  <AccordionTrigger className="py-4 hover:no-underline">
                                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                                      <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent">
                                        Advanced inventory bookkeeping
                                      </span>
                                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
                                        Quantities, charges, containers, and template-driven carry slots
                                      </span>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="pb-4">
                                    <div className="flex flex-col gap-5">
                                      <div className="flex flex-wrap gap-2">
                                        {editorOptions.steps.gear.containerDefinitions.map((container) => (
                                          <Button
                                            key={container.label}
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                              applyInventoryMutation((nextState, catalog) => {
                                                nextState.inventory.containers = [
                                                  ...nextState.inventory.containers,
                                                  {
                                                    id: `container.${Date.now()}.${container.label.toLowerCase()}`,
                                                    label: container.label,
                                                    capacity: container.capacity,
                                                    occupiedSlots: 0,
                                                  },
                                                ];
                                                syncInventoryPlacementState(nextState, catalog);
                                              })
                                            }
                                          >
                                            Add {container.label}
                                          </Button>
                                        ))}
                                      </div>

                                      {inventoryStackViews.length ? (
                                        <div className="flex flex-col gap-4">
                                          {inventoryStackViews.map((view) => {
                                            const item = view.item;
                                            const weaponDefinition =
                                              item.ref.kind === "weapon"
                                                ? findById(editorOptions.steps.gear.weapons, item.ref.id)
                                                : undefined;
                                            const containerOptions = draft.inventory.containers.map((container) =>
                                              toSearchOption(
                                                container.id,
                                                container.label,
                                                `${container.occupiedSlots}/${container.capacity} used`,
                                                "Containers",
                                                [container.id, container.label],
                                              ),
                                            );

                                            return (
                                              <Card
                                                key={view.key}
                                                size="sm"
                                                className="border border-border/20 bg-background/50"
                                              >
                                                <CardHeader className="gap-2">
                                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                                    <CardTitle className="text-xs uppercase tracking-[0.24em] text-accent">
                                                      {view.label}
                                                    </CardTitle>
                                                    <Badge variant="outline">{view.placement}</Badge>
                                                  </div>
                                                  <CardDescription className="text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">
                                                    {String(item.ref.kind)}
                                                  </CardDescription>
                                                </CardHeader>
                                                <CardContent className="flex flex-col gap-4">
                                                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                                    <NumberField
                                                      id={`inventory-qty-${view.key}`}
                                                      label="Qty"
                                                      min={1}
                                                      value={item.quantity}
                                                      disabled={Boolean(item.equippedSlot)}
                                                      description={item.equippedSlot ? "Equipped stacks stay at 1." : undefined}
                                                      onChange={(value) =>
                                                        applyInventoryMutation((nextState, catalog) => {
                                                          updateInventoryStackQuantity(
                                                            nextState,
                                                            view.index,
                                                            Math.max(1, value),
                                                            catalog,
                                                          );
                                                        })
                                                      }
                                                    />
                                                    <NumberField
                                                      id={`inventory-charges-${view.key}`}
                                                      label="Charges"
                                                      min={1}
                                                      value={item.charges ?? 0}
                                                      onChange={(value) =>
                                                        applyInventoryMutation((nextState, catalog) => {
                                                          updateInventoryStackCharges(
                                                            nextState,
                                                            view.index,
                                                            value > 0 ? value : undefined,
                                                            catalog,
                                                          );
                                                        })
                                                      }
                                                    />
                                                    <SearchableSingleSelect
                                                      label="Move To Container"
                                                      options={containerOptions}
                                                      value={undefined}
                                                      onChange={(value) => {
                                                        if (!value) {
                                                          return;
                                                        }
                                                        applyInventoryMutation((nextState, catalog) => {
                                                          moveInventoryStackToContainerAtIndex(
                                                            nextState,
                                                            view.index,
                                                            value,
                                                            catalog,
                                                          );
                                                        });
                                                      }}
                                                      placeholder={containerOptions.length ? "Choose container" : "No containers"}
                                                      disabled={
                                                        !containerOptions.length ||
                                                        Boolean(item.containerId) ||
                                                        Boolean(item.equippedSlot)
                                                      }
                                                      description={
                                                        item.containerId
                                                          ? "Already stored in a container."
                                                          : item.equippedSlot
                                                            ? "Stow this stack before moving it into a container."
                                                            : "Moves one unit and splits the stack when needed."
                                                      }
                                                    />
                                                    <Field>
                                                      <FieldLabel>Remove</FieldLabel>
                                                      <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() =>
                                                          applyInventoryMutation((nextState, catalog) => {
                                                            removeInventoryStackAtIndex(
                                                              nextState,
                                                              view.index,
                                                              catalog,
                                                            );
                                                          })
                                                        }
                                                      >
                                                        Remove stack
                                                      </Button>
                                                    </Field>
                                                  </div>

                                                  <div className="flex flex-wrap gap-2">
                                                    {item.ref.kind === "weapon" &&
                                                    !item.containerId &&
                                                    !item.equippedSlot ? (
                                                      <>
                                                        <Button
                                                          type="button"
                                                          variant="outline"
                                                          size="sm"
                                                          onClick={() =>
                                                            applyInventoryMutation((nextState, catalog) => {
                                                              equipInventoryStackAtIndex(
                                                                nextState,
                                                                view.index,
                                                                "mainHand",
                                                                catalog,
                                                              );
                                                            })
                                                          }
                                                        >
                                                          Equip main hand
                                                        </Button>
                                                        {weaponDefinition?.handedness === "oneHanded" ? (
                                                          <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                              applyInventoryMutation((nextState, catalog) => {
                                                                equipInventoryStackAtIndex(
                                                                  nextState,
                                                                  view.index,
                                                                  "offHand",
                                                                  catalog,
                                                                );
                                                              })
                                                            }
                                                          >
                                                            Equip off hand
                                                          </Button>
                                                        ) : null}
                                                        {weaponDefinition?.handedness === "twoHanded" ? (
                                                          <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                              applyInventoryMutation((nextState, catalog) => {
                                                                equipInventoryStackAtIndex(
                                                                  nextState,
                                                                  view.index,
                                                                  "twoHanded",
                                                                  catalog,
                                                                );
                                                              })
                                                            }
                                                          >
                                                            Equip two-handed
                                                          </Button>
                                                        ) : null}
                                                      </>
                                                    ) : null}
                                                    {item.ref.kind === "shield" &&
                                                    !item.containerId &&
                                                    !item.equippedSlot ? (
                                                      <>
                                                        <Button
                                                          type="button"
                                                          variant="outline"
                                                          size="sm"
                                                          onClick={() =>
                                                            applyInventoryMutation((nextState, catalog) => {
                                                              equipInventoryStackAtIndex(
                                                                nextState,
                                                                view.index,
                                                                "mainHand",
                                                                catalog,
                                                              );
                                                            })
                                                          }
                                                        >
                                                          Equip main hand
                                                        </Button>
                                                        <Button
                                                          type="button"
                                                          variant="outline"
                                                          size="sm"
                                                          onClick={() =>
                                                            applyInventoryMutation((nextState, catalog) => {
                                                              equipInventoryStackAtIndex(
                                                                nextState,
                                                                view.index,
                                                                "offHand",
                                                                catalog,
                                                              );
                                                            })
                                                          }
                                                        >
                                                          Equip off hand
                                                        </Button>
                                                      </>
                                                    ) : null}
                                                    {item.ref.kind === "armor" &&
                                                    !item.containerId &&
                                                    !item.equippedSlot ? (
                                                      <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                          applyInventoryMutation((nextState, catalog) => {
                                                            equipInventoryStackAtIndex(
                                                              nextState,
                                                              view.index,
                                                              "armor",
                                                              catalog,
                                                            );
                                                          })
                                                        }
                                                      >
                                                        Equip armor
                                                      </Button>
                                                    ) : null}
                                                    {item.equippedSlot ? (
                                                      <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                          applyInventoryMutation((nextState, catalog) => {
                                                            stowEquippedInventoryStackAtIndex(
                                                              nextState,
                                                              view.index,
                                                              catalog,
                                                            );
                                                          })
                                                        }
                                                      >
                                                        Stow equipped
                                                      </Button>
                                                    ) : null}
                                                    {item.containerId ? (
                                                      <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                          applyInventoryMutation((nextState, catalog) => {
                                                            removeInventoryStackFromContainerAtIndex(
                                                              nextState,
                                                              view.index,
                                                              catalog,
                                                            );
                                                          })
                                                        }
                                                      >
                                                        Remove from container
                                                      </Button>
                                                    ) : null}
                                                  </div>
                                                </CardContent>
                                              </Card>
                                            );
                                          })}
                                        </div>
                                      ) : (
                                        <EmptyRegistryNotice
                                          title="Inventory empty"
                                          detail="Add inventory above to unlock stack actions, placement controls, and container moves."
                                        />
                                      )}

                                      {draft.inventory.containers.length ? (
                                        <div className="flex flex-col gap-4">
                                          {draft.inventory.containers.map((container) => (
                                            <Card
                                              key={container.id}
                                              size="sm"
                                              className="border border-border/20 bg-background/50"
                                            >
                                              <CardHeader className="gap-2">
                                                <CardTitle className="text-xs uppercase tracking-[0.24em] text-primary">
                                                  {container.label}
                                                </CardTitle>
                                              </CardHeader>
                                              <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                                <CompactTextField
                                                  id={`container-label-${container.id}`}
                                                  label="Label"
                                                  value={container.label}
                                                  onChange={(value) =>
                                                    mutateDraft((nextState) => {
                                                      const target = nextState.inventory.containers.find(
                                                        (entry) => entry.id === container.id,
                                                      );
                                                      if (target) {
                                                        target.label = value;
                                                      }
                                                    })
                                                  }
                                                />
                                                <NumberField
                                                  id={`container-capacity-${container.id}`}
                                                  label="Capacity"
                                                  value={container.capacity}
                                                  onChange={(value) =>
                                                    applyInventoryMutation((nextState, catalog) => {
                                                      const target = nextState.inventory.containers.find(
                                                        (entry) => entry.id === container.id,
                                                      );
                                                      if (target) {
                                                        target.capacity = value;
                                                      }
                                                      syncInventoryPlacementState(nextState, catalog);
                                                    })
                                                  }
                                                />
                                                <Field>
                                                  <FieldLabel>Used</FieldLabel>
                                                  <Input
                                                    value={`${container.occupiedSlots}`}
                                                    readOnly
                                                  />
                                                  <FieldDescription>
                                                    Derived from the stacks stored in this container.
                                                  </FieldDescription>
                                                </Field>
                                                <Field>
                                                  <FieldLabel>Remove</FieldLabel>
                                                  <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                      applyInventoryMutation((nextState, catalog) => {
                                                        nextState.inventory.items = nextState.inventory.items.map(
                                                          (entry) =>
                                                            entry.containerId === container.id
                                                              ? {
                                                                  ...entry,
                                                                  containerId: undefined,
                                                                }
                                                              : { ...entry },
                                                        );
                                                        nextState.inventory.containers =
                                                          nextState.inventory.containers.filter(
                                                            (entry) => entry.id !== container.id,
                                                          );
                                                        syncInventoryPlacementState(nextState, catalog);
                                                      })
                                                    }
                                                  >
                                                    Remove container
                                                  </Button>
                                                </Field>
                                              </CardContent>
                                            </Card>
                                          ))}
                                        </div>
                                      ) : (
                                        <EmptyRegistryNotice
                                          title="No containers"
                                          detail="Add a container template to manage occupied carry slots."
                                        />
                                      )}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </div>
                          ) : null}

                          {step === "review" ? (
                            <div className="flex flex-col gap-5">
                              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                <MetricCard label="Status" value={status.toUpperCase()} />
                                <MetricCard
                                  label="Validation"
                                  value={isEditorValid ? "OK" : "ATTENTION"}
                                />
                                <MetricCard
                                  label="Dream Count"
                                  value={String(draft.progression.dreamRefs.length)}
                                />
                                <MetricCard
                                  label="Items"
                                  value={String(draft.inventory.items.length)}
                                />
                              </div>

                              <div className="grid gap-4 lg:grid-cols-2">
                                <Card size="sm" className="border border-border/20 bg-card/55">
                                  <CardHeader className="gap-2">
                                    <CardTitle className="text-xs uppercase tracking-[0.28em] text-primary">
                                      Validation issues
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="flex flex-col gap-3 py-1">
                                    {allValidationIssues.length ? (
                                      allValidationIssues.map((issue, index) => (
                                        <Card
                                          key={`${issue.path}-${index}`}
                                          size="sm"
                                          className="border border-secondary/30 bg-secondary/8"
                                        >
                                          <CardHeader className="gap-1">
                                            <CardTitle className="text-xs uppercase tracking-[0.18em] text-secondary">
                                              {issue.severity}
                                            </CardTitle>
                                            <CardDescription className="text-xs leading-6 text-muted-foreground">
                                              {describeIssue(issue)}
                                            </CardDescription>
                                          </CardHeader>
                                        </Card>
                                      ))
                                    ) : (
                                      <p className="text-sm leading-7 text-muted-foreground">
                                        No validation issues detected. The draft can be finalized as a completed character.
                                      </p>
                                    )}
                                  </CardContent>
                                </Card>

                                <Card size="sm" className="border border-border/20 bg-card/55 ">
                                  <CardHeader className="gap-2">
                                    <CardTitle className="text-xs uppercase tracking-[0.28em] text-primary">
                                      Combat profile
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="flex flex-col gap-3 py-1">
                                    {preview?.combatProfile ? (
                                      <>
                                        <SummaryRow
                                          label="Display Name"
                                          value={preview.combatProfile.displayName}
                                        />
                                        <SummaryRow
                                          label="Movement"
                                          value={`${preview.combatProfile.movement.land} land`}
                                        />
                                        <SummaryRow
                                          label="Initiative"
                                          value={String(preview.combatProfile.initiative)}
                                        />
                                        <SummaryRow
                                          label="Soak"
                                          value={String(preview.combatProfile.soak)}
                                        />
                                        <SummaryRow
                                          label="Attack Options"
                                          value={String(preview.combatProfile.attackOptions.length)}
                                        />
                                      </>
                                    ) : (
                                      <p className="text-sm leading-7 text-muted-foreground">
                                        Combat profile still syncing from the preview query.
                                      </p>
                                    )}
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
            </CardContent>
          </Card>
        </div>

        <SummaryPanel
          className="hidden w-[24rem] shrink-0 xl:block"
          draft={draft}
          preview={preview}
          options={editorOptions}
          validationIssues={allValidationIssues}
        />
      </div>
    </div>
  );
}
