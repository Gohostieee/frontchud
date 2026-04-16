"use client";

import {
  startTransition,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircleIcon,
  DiceFiveIcon,
  ShieldCheckIcon,
  SignInIcon,
  SparkleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import type { ComputedCombatProfile } from "@bugchud/core";
import type {
  ArmorDefinition,
  BackgroundDefinition,
  BionicDefinition,
  DreamDefinition,
  ItemDefinition,
  MutationDefinition,
  OriginDefinition,
  PatronDefinition,
  RaceDefinition,
  ShieldDefinition,
  SpellDefinition,
  WeaponDefinition,
} from "@bugchud/core/content";
import type { ValidationIssue } from "@bugchud/core/validation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import {
  buildBackgroundSelectionState,
  getOriginBackgroundIds,
  normalizeBackgroundSelection,
  type BackgroundOriginMapping,
  MAX_BACKGROUND_SELECTIONS,
} from "@/lib/character-background-rules";
import {
  buildExtensionsWithStoredAttributeRolls,
  computeRolledAttributesForRace,
  formatRollAttributeLabel,
  formatRollTriplet,
  getRaceRollProfile,
  rollAttributePools,
  sanitizeStoredAttributeRolls,
  type StoredAttributeRolls,
  ROLL_ATTRIBUTE_KEYS,
} from "@/lib/character-attribute-rolls";
import {
  getActiveGuidedBackgroundSpecials,
  getDreadTonguedAutoGrants,
  getMajorBionicIds,
  getSterileTyrantFollowerLabel,
  sanitizeGuidedBackgroundSpecialSelections,
  type GuidedBackgroundSpecialSelections,
} from "@/lib/character-background-special-steps";
import {
  ARCYNE_PREPARED_SLOT_TOTAL,
  getArcyneSpellSelectionIssues,
  resolveArcyneSpellSelection,
} from "@/lib/character-spell-preparation";
import { cn } from "@/lib/utils";
import {
  SearchableMultiSelect,
  SearchableSingleSelect,
  type SearchOption,
} from "./character-editor-controls";
import { ArcyneSpellSelector } from "./character-spell-selector";

const GUIDED_STEPS = [
  "identity",
  "lineage",
  "background",
  "calling",
  "trader",
  "review",
] as const;

const STORAGE_VERSION = 3;

type GuidedStep = (typeof GUIDED_STEPS)[number];
type CharacterDraft = Doc<"characters">["state"];
type CurrencyValue = { amount: number; denomination: string };

type CartItem = {
  kind: "item" | "weapon" | "armor" | "shield";
  id: string;
  quantity: number;
};

type CatalogEntry = {
  kind: "item" | "weapon" | "armor" | "shield";
  id: string;
  name: string;
  summary: string;
  price: CurrencyValue;
  rarity: "common" | "uncommon" | "rare" | "legendary";
  slots: number;
};

type GuidedCreationOptions = {
  rulesetId: string;
  rulesetVersion: string;
  generationNotes: string[];
  races: RaceDefinition[];
  origins: OriginDefinition[];
  backgrounds: BackgroundDefinition[];
  backgroundsByOrigin: BackgroundOriginMapping[];
  dreams: DreamDefinition[];
  mutations: MutationDefinition[];
  bionics: BionicDefinition[];
  spells: SpellDefinition[];
  patrons: Array<{
    kind: "patron";
    ref: { kind: "patron"; id: string };
    definition: PatronDefinition;
  }>;
  items: ItemDefinition[];
  weapons: WeaponDefinition[];
  armors: ArmorDefinition[];
  shields: ShieldDefinition[];
  startingBudget: CurrencyValue;
  defaultCurrency: string;
  denominations: string[];
};
type InitializationPreview = {
  normalizedState: CharacterDraft;
  validation: {
    ok: boolean;
    issues: ValidationIssue[];
  };
  combatProfile: ComputedCombatProfile;
};
type GuidedWizardState = {
  currentStep: GuidedStep;
  name: string;
  tagsText: string;
  raceId: string | null;
  originId: string | null;
  backgroundIds: string[];
  geneFreekMutationIds: string[];
  overclockedBionicId: string | null;
  sterileTyrantCutthroatCount: number | null;
  arcyneKnownSpellIds: string[];
  arcynePreparedSpellSlotsById: Record<string, number>;
  patronId: string | null;
  cartItems: CartItem[];
  attributeRolls: StoredAttributeRolls | null;
};
type StoredWizardState = {
  version: 3;
  state: GuidedWizardState;
};

function normalizeGuidedCreationOptions(
  options: Partial<GuidedCreationOptions> | undefined,
): GuidedCreationOptions | undefined {
  if (!options?.rulesetId || !options.rulesetVersion) {
    return undefined;
  }

  return {
    rulesetId: options.rulesetId,
    rulesetVersion: options.rulesetVersion,
    generationNotes: options.generationNotes ?? [],
    races: options.races ?? [],
    origins: options.origins ?? [],
    backgrounds: options.backgrounds ?? [],
    backgroundsByOrigin: options.backgroundsByOrigin ?? [],
    dreams: options.dreams ?? [],
    mutations: options.mutations ?? [],
    bionics: options.bionics ?? [],
    spells: options.spells ?? [],
    patrons: options.patrons ?? [],
    items: options.items ?? [],
    weapons: options.weapons ?? [],
    armors: options.armors ?? [],
    shields: options.shields ?? [],
    startingBudget: options.startingBudget ?? {
      amount: 0,
      denomination: options.defaultCurrency ?? "",
    },
    defaultCurrency: options.defaultCurrency ?? "",
    denominations: options.denominations ?? [],
  };
}

const STEP_META: Record<
  GuidedStep,
  { label: string; eyebrow: string; detail: string }
> = {
  identity: {
    label: "Identity",
    eyebrow: "Step 01",
    detail: "Name the subject and mark the dossier.",
  },
  lineage: {
    label: "Lineage",
    eyebrow: "Step 02",
    detail: "Anchor ancestry and homeland before the rest cascades.",
  },
  background: {
    label: "Background",
    eyebrow: "Step 03",
    detail: "Choose up to three formative packages, with only one allowed from outside the chosen origin.",
  },
  calling: {
    label: "Calling",
    eyebrow: "Step 04",
    detail: "Review the dreams granted by the selected background path, then optionally bind a patron.",
  },
  trader: {
    label: "Sven's Wares",
    eyebrow: "Step 05",
    detail: "Spend your starting budget on gear, weapons, and armour before heading out. Sven takes coin, not prayers.",
  },
  review: {
    label: "Review",
    eyebrow: "Step 06",
    detail: "Inspect the live preview, validation state, and final handoff.",
  },
};

function defaultWizardState(): GuidedWizardState {
  return {
    currentStep: "identity",
    name: "",
    tagsText: "",
    raceId: null,
    originId: null,
    backgroundIds: [],
    geneFreekMutationIds: [],
    overclockedBionicId: null,
    sterileTyrantCutthroatCount: null,
    arcyneKnownSpellIds: [],
    arcynePreparedSpellSlotsById: {},
    patronId: null,
    cartItems: [],
    attributeRolls: null,
  };
}

function rollThreeSixSidedDice() {
  return Array.from({ length: 3 }, () => Math.floor(Math.random() * 6) + 1).reduce(
    (total, value) => total + value,
    0,
  );
}

function parseCommaList(value: string) {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function sortByName<T extends { name: string }>(items: readonly T[]) {
  return [...items].sort((left, right) => left.name.localeCompare(right.name));
}

function safeJoin(values: readonly string[]) {
  return values.length ? values.join(", ") : "None";
}

function arraysEqual(left: readonly string[], right: readonly string[]) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function buildStorageKey(options: GuidedCreationOptions) {
  return `frontchud.guided-character.${options.rulesetId}.${options.rulesetVersion}`;
}

function sanitizeStoredState(value: unknown): GuidedWizardState {
  const fallback = defaultWizardState();
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return fallback;
  }

  const record = value as Record<string, unknown>;
  const currentStep = GUIDED_STEPS.includes(record.currentStep as GuidedStep)
    ? (record.currentStep as GuidedStep)
    : fallback.currentStep;

  return {
    currentStep,
    name: typeof record.name === "string" ? record.name : "",
    tagsText: typeof record.tagsText === "string" ? record.tagsText : "",
    raceId: typeof record.raceId === "string" ? record.raceId : null,
    originId: typeof record.originId === "string" ? record.originId : null,
    backgroundIds: Array.isArray(record.backgroundIds)
      ? record.backgroundIds.filter((entry): entry is string => typeof entry === "string")
      : [],
    geneFreekMutationIds: Array.isArray(record.geneFreekMutationIds)
      ? record.geneFreekMutationIds.filter(
          (entry): entry is string => typeof entry === "string",
        )
      : [],
    overclockedBionicId:
      typeof record.overclockedBionicId === "string"
        ? record.overclockedBionicId
        : null,
    sterileTyrantCutthroatCount:
      typeof record.sterileTyrantCutthroatCount === "number"
        ? record.sterileTyrantCutthroatCount
        : null,
    arcyneKnownSpellIds: Array.isArray(record.arcyneKnownSpellIds)
      ? record.arcyneKnownSpellIds.filter(
          (entry): entry is string => typeof entry === "string",
        )
      : [],
    arcynePreparedSpellSlotsById:
      record.arcynePreparedSpellSlotsById &&
      typeof record.arcynePreparedSpellSlotsById === "object" &&
      !Array.isArray(record.arcynePreparedSpellSlotsById)
        ? Object.fromEntries(
            Object.entries(
              record.arcynePreparedSpellSlotsById as Record<string, unknown>,
            ).filter(
              (entry): entry is [string, number] =>
                typeof entry[0] === "string" && typeof entry[1] === "number",
            ),
          )
        : {},
    patronId: typeof record.patronId === "string" ? record.patronId : null,
    cartItems: Array.isArray(record.cartItems)
      ? (record.cartItems as unknown[]).reduce<CartItem[]>((acc, entry) => {
          if (entry && typeof entry === "object" && !Array.isArray(entry)) {
            const e = entry as Record<string, unknown>;
            if (
              (e.kind === "item" || e.kind === "weapon" || e.kind === "armor" || e.kind === "shield") &&
              typeof e.id === "string" &&
              typeof e.quantity === "number" &&
              e.quantity > 0
            ) {
              acc.push({ kind: e.kind, id: e.id, quantity: e.quantity });
            }
          }
          return acc;
        }, [])
      : [],
    attributeRolls: sanitizeStoredAttributeRolls(record.attributeRolls),
  };
}

function getOriginMapping(
  options: GuidedCreationOptions,
  originId: string | null,
) {
  if (!originId) {
    return null;
  }

  return (
    options.backgroundsByOrigin.find((entry) => entry.originId === originId) ?? null
  );
}

function getBackgroundChoices(
  options: GuidedCreationOptions,
  originId: string | null,
) {
  if (!originId) {
    return [];
  }

  const originBackgroundIds = getOriginBackgroundIds(options.backgroundsByOrigin, originId);

  return [...options.backgrounds].sort((left, right) => {
    const leftRank = originBackgroundIds.has(left.id) ? 0 : 1;
    const rightRank = originBackgroundIds.has(right.id) ? 0 : 1;
    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }
    return left.name.localeCompare(right.name);
  });
}

function getSuggestedDreams(
  options: GuidedCreationOptions,
  originId: string | null,
  backgroundIds: string[],
) {
  const backgroundIdSet = new Set(backgroundIds);
  const dreamIds = new Set<string>();
  const mapping = getOriginMapping(options, originId);

  for (const dreamId of mapping?.startingDreamIds ?? []) {
    dreamIds.add(dreamId);
  }

  for (const background of options.backgrounds) {
    if (!backgroundIdSet.has(background.id)) {
      continue;
    }
    for (const dreamRef of background.startingDreamRefs ?? []) {
      dreamIds.add(dreamRef.id);
    }
  }

  return sortByName(options.dreams.filter((dream) => dreamIds.has(dream.id)));
}

function stepIndex(step: GuidedStep) {
  return GUIDED_STEPS.indexOf(step);
}

function buildInitializationInput(state: GuidedWizardState) {
  return {
    name: state.name.trim(),
    raceRef: state.raceId ? { kind: "race" as const, id: state.raceId } : undefined,
    originRef: state.originId
      ? { kind: "origin" as const, id: state.originId }
      : undefined,
    backgroundRefs: state.backgroundIds.map((id) => ({
      kind: "background" as const,
      id,
    })),
    patronRef: state.patronId
      ? { kind: "patron" as const, id: state.patronId }
      : undefined,
    tags: parseCommaList(state.tagsText),
    startingItems: state.cartItems.length > 0
      ? state.cartItems.map((entry) => ({
          ref: { kind: entry.kind as "item" | "weapon" | "armor" | "shield", id: entry.id },
          quantity: entry.quantity,
        }))
      : undefined,
    extensions: state.attributeRolls
      ? buildExtensionsWithStoredAttributeRolls(undefined, state.attributeRolls)
      : undefined,
  };
}

function buildSpecialSelections(
  state: GuidedWizardState,
): GuidedBackgroundSpecialSelections {
  return {
    geneFreekMutationIds: state.geneFreekMutationIds,
    overclockedBionicId: state.overclockedBionicId,
    sterileTyrantCutthroatCount: state.sterileTyrantCutthroatCount,
    arcyneKnownSpellIds: state.arcyneKnownSpellIds,
    arcynePreparedSpellSlotsById: state.arcynePreparedSpellSlotsById,
  };
}

function MetricBlock({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="border border-border/20 bg-background/60 px-3 py-3">
      <div className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </div>
      <div
        className={cn(
          "mt-2 text-sm uppercase tracking-[0.18em] text-foreground",
          accent && "text-primary",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function StepButton({
  step,
  currentStep,
  unlocked,
  completed,
  onSelect,
}: {
  step: GuidedStep;
  currentStep: GuidedStep;
  unlocked: boolean;
  completed: boolean;
  onSelect: (step: GuidedStep) => void;
}) {
  const active = currentStep === step;

  return (
    <button
      type="button"
      onClick={() => onSelect(step)}
      disabled={!unlocked}
      className={cn(
        "flex w-full items-start gap-3 border px-3 py-3 text-left transition-colors",
        active
          ? "border-primary/40 bg-primary/10"
          : unlocked
            ? "border-border/20 bg-background/40 hover:border-primary/25 hover:bg-background/70"
            : "border-border/10 bg-background/25 text-muted-foreground/70",
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex size-7 shrink-0 items-center justify-center border text-[0.68rem] uppercase tracking-[0.18em]",
          active
            ? "border-primary/40 bg-primary/15 text-primary"
            : completed
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-border/20 text-muted-foreground",
        )}
      >
        {completed ? <CheckCircleIcon className="size-4" weight="fill" /> : stepIndex(step) + 1}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
          {STEP_META[step].eyebrow}
        </div>
        <div className="mt-1 text-sm uppercase tracking-[0.18em] text-foreground">
          {STEP_META[step].label}
        </div>
        <p className="mt-2 text-xs leading-6 text-muted-foreground">
          {STEP_META[step].detail}
        </p>
      </div>
    </button>
  );
}

function SelectionCard({
  title,
  summary,
  detail,
  meta,
  selected,
  disabled = false,
  onClick,
}: {
  title: string;
  summary: string;
  detail?: string | null;
  meta?: string | null;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "module-cut flex min-h-44 flex-col justify-between border px-4 py-4 text-left transition-colors",
        selected
          ? "border-primary/40 bg-primary/10 text-foreground"
          : disabled
            ? "border-border/10 bg-background/25 text-muted-foreground/60 opacity-60"
            : "border-border/20 bg-background/55 hover:border-primary/25 hover:bg-background/75",
      )}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm uppercase tracking-[0.2em] text-primary">{title}</span>
          {selected ? <Badge variant="outline">Selected</Badge> : null}
        </div>
        <p className="text-sm leading-7 text-foreground/90">{summary}</p>
      </div>
      <div className="space-y-2 pt-4">
        {meta ? (
          <div className="text-[0.65rem] uppercase tracking-[0.2em] text-accent">{meta}</div>
        ) : null}
        {detail ? (
          <div className="text-[0.72rem] leading-6 text-muted-foreground">{detail}</div>
        ) : null}
      </div>
    </button>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border/15 py-2">
      <span className="text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </span>
      <span className="max-w-[16rem] text-right text-[0.72rem] leading-6 text-foreground/90">
        {value}
      </span>
    </div>
  );
}

function buildTraderCatalog(options: GuidedCreationOptions): CatalogEntry[] {
  const budgetDenom = options.startingBudget.denomination;

  function fromCatalog<
    T extends {
      id: string;
      name: string;
      summary: string;
      economy: { value: CurrencyValue; rarity: "common" | "uncommon" | "rare" | "legendary" };
      slotCost: { slots: number };
    },
  >(kind: CatalogEntry["kind"], catalog: T[]): CatalogEntry[] {
    return catalog
      .filter((entry) => entry.economy.value.denomination === budgetDenom)
      .map((entry) => ({
        kind,
        id: entry.id,
        name: entry.name,
        summary: entry.summary,
        price: entry.economy.value,
        rarity: entry.economy.rarity,
        slots: entry.slotCost.slots,
      }));
  }

  return [
    ...fromCatalog("item", options.items),
    ...fromCatalog("weapon", options.weapons),
    ...fromCatalog("armor", options.armors),
    ...fromCatalog("shield", options.shields),
  ];
}

function computeSpentAmount(cartItems: CartItem[], options: GuidedCreationOptions): number {
  const catalog = buildTraderCatalog(options);
  const priceMap = new Map(catalog.map((e) => [`${e.kind}:${e.id}`, e.price.amount]));
  return cartItems.reduce(
    (total, item) => total + (priceMap.get(`${item.kind}:${item.id}`) ?? 0) * item.quantity,
    0,
  );
}

function computeRemainingBudget(cartItems: CartItem[], options: GuidedCreationOptions): number {
  return options.startingBudget.amount - computeSpentAmount(cartItems, options);
}

export function GuidedCharacterCreator() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const rawOptions = useQuery(
    api.ruleset.getGuidedCharacterCreationOptions,
    {},
  ) as Partial<GuidedCreationOptions> | undefined;
  const options = useMemo(
    () => normalizeGuidedCreationOptions(rawOptions),
    [rawOptions],
  );
  const createGuidedDraft = useMutation(api.characters.createGuidedDraft);

  const [wizard, setWizard] = useState<GuidedWizardState>(defaultWizardState);
  const [surfaceError, setSurfaceError] = useState<string | null>(null);
  const [resetNotice, setResetNotice] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const hydratedStorageKeyRef = useRef<string | null>(null);

  const storageKey = options ? buildStorageKey(options) : null;

  useEffect(() => {
    if (!storageKey || hydratedStorageKeyRef.current === storageKey) {
      return;
    }

    hydratedStorageKeyRef.current = storageKey;

    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) {
        setWizard(defaultWizardState());
        return;
      }

      const parsed = JSON.parse(raw) as StoredWizardState;
      if (parsed.version !== STORAGE_VERSION) {
        window.localStorage.removeItem(storageKey);
        setWizard(defaultWizardState());
        return;
      }

      setWizard(sanitizeStoredState(parsed.state));
    } catch {
      window.localStorage.removeItem(storageKey);
      setWizard(defaultWizardState());
    }
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey || hydratedStorageKeyRef.current !== storageKey) {
      return;
    }

    const payload: StoredWizardState = {
      version: STORAGE_VERSION,
      state: wizard,
    };
    window.localStorage.setItem(storageKey, JSON.stringify(payload));
  }, [storageKey, wizard]);

  const identityComplete = wizard.name.trim().length > 0;
  const lineageComplete = Boolean(wizard.raceId && wizard.originId);
  const backgroundComplete = wizard.backgroundIds.length > 0;
  const validMutationIds = useMemo(
    () => new Set((options?.mutations ?? []).map((mutation) => mutation.id)),
    [options],
  );
  const majorBionicIds = useMemo(
    () => getMajorBionicIds(options?.bionics ?? []),
    [options],
  );
  const validSpellIds = useMemo(
    () => new Set((options?.spells ?? []).map((spell) => spell.id)),
    [options],
  );

  const selectedRace = useMemo(
    () => options?.races.find((race) => race.id === wizard.raceId) ?? null,
    [options, wizard.raceId],
  );
  const selectedOrigin = useMemo(
    () => options?.origins.find((origin) => origin.id === wizard.originId) ?? null,
    [options, wizard.originId],
  );
  const backgroundSelection = useMemo(
    () =>
      options
        ? buildBackgroundSelectionState({
            originId: wizard.originId,
            selectedBackgroundIds: wizard.backgroundIds,
            backgroundsByOrigin: options.backgroundsByOrigin,
            allBackgroundIds: options.backgrounds.map((background) => background.id),
          })
        : null,
    [options, wizard.backgroundIds, wizard.originId],
  );
  const availableBackgrounds = useMemo(
    () => (options ? getBackgroundChoices(options, wizard.originId) : []),
    [options, wizard.originId],
  );
  const selectedBackgrounds = useMemo(() => {
    const selectedIds = new Set(wizard.backgroundIds);
    return sortByName(
      (options?.backgrounds ?? []).filter((background) => selectedIds.has(background.id)),
    );
  }, [options, wizard.backgroundIds]);
  const suggestedDreams = useMemo(
    () =>
      options
        ? getSuggestedDreams(options, wizard.originId, wizard.backgroundIds)
        : [],
    [options, wizard.backgroundIds, wizard.originId],
  );
  const activeBackgroundSpecials = useMemo(
    () =>
      getActiveGuidedBackgroundSpecials(
        suggestedDreams.map((dream) => ({ kind: "dream" as const, id: dream.id })),
      ),
    [suggestedDreams],
  );
  const dreadTonguedAutoGrants = useMemo(
    () => getDreadTonguedAutoGrants(suggestedDreams, suggestedDreams),
    [suggestedDreams],
  );
  const sanitizedSpecialSelections = useMemo(
    () =>
      sanitizeGuidedBackgroundSpecialSelections({
        selections: buildSpecialSelections(wizard),
        active: activeBackgroundSpecials,
        validMutationIds,
        validMajorBionicIds: majorBionicIds,
        validSpellIds,
        lockedKnownSpellIds: dreadTonguedAutoGrants.spellIds,
      }),
    [
      activeBackgroundSpecials,
      dreadTonguedAutoGrants.spellIds,
      majorBionicIds,
      validMutationIds,
      validSpellIds,
      wizard,
    ],
  );
  const arcyneSpellSelection = useMemo(
    () =>
      resolveArcyneSpellSelection({
        selectedKnownSpellIds: wizard.arcyneKnownSpellIds,
        lockedKnownSpellIds: dreadTonguedAutoGrants.spellIds,
        preparedSlotsBySpellId: wizard.arcynePreparedSpellSlotsById,
        validSpellIds,
      }),
    [
      dreadTonguedAutoGrants.spellIds,
      validSpellIds,
      wizard.arcyneKnownSpellIds,
      wizard.arcynePreparedSpellSlotsById,
    ],
  );
  const arcyneIssueText = useMemo(() => {
    if (!activeBackgroundSpecials.arcynePotential) {
      return null;
    }

    const issues = getArcyneSpellSelectionIssues(arcyneSpellSelection);
    return issues.join(" ");
  }, [activeBackgroundSpecials.arcynePotential, arcyneSpellSelection]);
  const sterileTyrantFollowerLabel = useMemo(
    () => getSterileTyrantFollowerLabel(suggestedDreams),
    [suggestedDreams],
  );
  const selectedRaceRollProfile = useMemo(
    () => getRaceRollProfile(selectedRace),
    [selectedRace],
  );
  const displayedAttributeRolls = wizard.attributeRolls?.pools ?? null;
  const missingRequiredAttributeRoll =
    selectedRaceRollProfile.supported && !wizard.attributeRolls;
  const callingComplete =
    (!activeBackgroundSpecials.geneFreek ||
      sanitizedSpecialSelections.geneFreekMutationIds.length === 2) &&
    (!activeBackgroundSpecials.overclocked ||
      Boolean(sanitizedSpecialSelections.overclockedBionicId)) &&
    (!activeBackgroundSpecials.arcynePotential ||
      getArcyneSpellSelectionIssues(arcyneSpellSelection).length === 0) &&
    (!activeBackgroundSpecials.sterileTyrant ||
      sanitizedSpecialSelections.sterileTyrantCutthroatCount !== null);

  useEffect(() => {
    if (!options) {
      return;
    }

    const availableRaceIds = new Set<string>(options.races.map((race) => race.id));
    const availableOriginIds = new Set<string>(options.origins.map((origin) => origin.id));
    const availableBackgroundIds = new Set<string>(
      options.backgrounds.map((background) => background.id),
    );
    const availablePatronIds = new Set<string>(
      options.patrons.map((patron) => patron.ref.id),
    );

    setWizard((current) => {
      let changed = false;
      const notices: string[] = [];
      const next: GuidedWizardState = {
        ...current,
        backgroundIds: current.backgroundIds,
      };

      if (next.raceId && !availableRaceIds.has(next.raceId)) {
        next.raceId = null;
        changed = true;
        notices.push("Race selection was cleared because the active ruleset changed.");
      }

      if (next.originId && !availableOriginIds.has(next.originId)) {
        next.originId = null;
        next.backgroundIds = [];
        changed = true;
        notices.push("Origin selection was cleared because it is no longer available.");
      }

      const knownBackgroundIds = next.backgroundIds.filter((id) =>
        availableBackgroundIds.has(id),
      );
      if (knownBackgroundIds.length !== next.backgroundIds.length) {
        next.backgroundIds = knownBackgroundIds;
        changed = true;
        notices.push("Background choices were trimmed because some packages are no longer available.");
      }

      const normalizedBackgroundIds = normalizeBackgroundSelection({
        originId: next.originId,
        selectedBackgroundIds: next.backgroundIds,
        backgroundsByOrigin: options.backgroundsByOrigin,
        allBackgroundIds: options.backgrounds.map((background) => background.id),
      });
      if (!arraysEqual(normalizedBackgroundIds, next.backgroundIds)) {
        next.backgroundIds = normalizedBackgroundIds;
        changed = true;
        notices.push(
          "Background choices were trimmed to fit the current origin rule.",
        );
      }

      if (next.patronId && !availablePatronIds.has(next.patronId)) {
        next.patronId = null;
        changed = true;
        notices.push("Patron selection was cleared because it is no longer available.");
      }

      const traderCatalog = buildTraderCatalog(options);
      const validCatalogKeys = new Set(traderCatalog.map((e) => `${e.kind}:${e.id}`));
      const validCartItems = next.cartItems.filter((item) =>
        validCatalogKeys.has(`${item.kind}:${item.id}`),
      );
      if (validCartItems.length !== next.cartItems.length) {
        next.cartItems = validCartItems;
        changed = true;
        notices.push("Some cart selections were removed because the active ruleset changed.");
      }

      const nextSuggestedDreams = getSuggestedDreams(
        options,
        next.originId,
        next.backgroundIds,
      );
      const nextActiveBackgroundSpecials = getActiveGuidedBackgroundSpecials(
        nextSuggestedDreams.map((dream) => ({
          kind: "dream" as const,
          id: dream.id,
        })),
      );
      const nextSpecialSelections = sanitizeGuidedBackgroundSpecialSelections({
        selections: buildSpecialSelections(next),
        active: nextActiveBackgroundSpecials,
        validMutationIds,
        validMajorBionicIds: majorBionicIds,
        validSpellIds,
        lockedKnownSpellIds: getDreadTonguedAutoGrants(
          nextSuggestedDreams,
          nextSuggestedDreams,
        ).spellIds,
      });

      if (
        !arraysEqual(
          nextSpecialSelections.geneFreekMutationIds,
          next.geneFreekMutationIds,
        )
      ) {
        next.geneFreekMutationIds = nextSpecialSelections.geneFreekMutationIds;
        changed = true;
      }

      if (nextSpecialSelections.overclockedBionicId !== next.overclockedBionicId) {
        next.overclockedBionicId = nextSpecialSelections.overclockedBionicId;
        changed = true;
      }

      if (
        nextSpecialSelections.sterileTyrantCutthroatCount !==
        next.sterileTyrantCutthroatCount
      ) {
        next.sterileTyrantCutthroatCount =
          nextSpecialSelections.sterileTyrantCutthroatCount;
        changed = true;
      }

      if (
        !arraysEqual(
          nextSpecialSelections.arcyneKnownSpellIds,
          next.arcyneKnownSpellIds,
        )
      ) {
        next.arcyneKnownSpellIds = nextSpecialSelections.arcyneKnownSpellIds;
        changed = true;
      }

      if (
        JSON.stringify(nextSpecialSelections.arcynePreparedSpellSlotsById) !==
        JSON.stringify(next.arcynePreparedSpellSlotsById)
      ) {
        next.arcynePreparedSpellSlotsById =
          nextSpecialSelections.arcynePreparedSpellSlotsById;
        changed = true;
      }

      if (!changed) {
        return current;
      }

      setResetNotice(notices.join(" "));
      return next;
    });
  }, [majorBionicIds, options, validMutationIds, validSpellIds]);

  useEffect(() => {
    if (!options) {
      return;
    }

    setWizard((current) => {
      const nextSuggestedDreams = getSuggestedDreams(
        options,
        current.originId,
        current.backgroundIds,
      );
      const nextActiveBackgroundSpecials = getActiveGuidedBackgroundSpecials(
        nextSuggestedDreams.map((dream) => ({
          kind: "dream" as const,
          id: dream.id,
        })),
      );
      const nextSpecialSelections = sanitizeGuidedBackgroundSpecialSelections({
        selections: buildSpecialSelections(current),
        active: nextActiveBackgroundSpecials,
        validMutationIds,
        validMajorBionicIds: majorBionicIds,
        validSpellIds,
        lockedKnownSpellIds: getDreadTonguedAutoGrants(
          nextSuggestedDreams,
          nextSuggestedDreams,
        ).spellIds,
      });
      const nextSterileTyrantCutthroatCount =
        nextActiveBackgroundSpecials.sterileTyrant &&
        nextSpecialSelections.sterileTyrantCutthroatCount === null
          ? rollThreeSixSidedDice()
          : nextSpecialSelections.sterileTyrantCutthroatCount;

      if (
        arraysEqual(
          current.geneFreekMutationIds,
          nextSpecialSelections.geneFreekMutationIds,
        ) &&
        current.overclockedBionicId === nextSpecialSelections.overclockedBionicId &&
        current.sterileTyrantCutthroatCount === nextSterileTyrantCutthroatCount &&
        arraysEqual(
          current.arcyneKnownSpellIds,
          nextSpecialSelections.arcyneKnownSpellIds,
        ) &&
        JSON.stringify(current.arcynePreparedSpellSlotsById) ===
          JSON.stringify(nextSpecialSelections.arcynePreparedSpellSlotsById)
      ) {
        return current;
      }

      return {
        ...current,
        geneFreekMutationIds: nextSpecialSelections.geneFreekMutationIds,
        overclockedBionicId: nextSpecialSelections.overclockedBionicId,
        sterileTyrantCutthroatCount: nextSterileTyrantCutthroatCount,
        arcyneKnownSpellIds: nextSpecialSelections.arcyneKnownSpellIds,
        arcynePreparedSpellSlotsById:
          nextSpecialSelections.arcynePreparedSpellSlotsById,
      };
    });
  }, [
    majorBionicIds,
    options,
    validMutationIds,
    validSpellIds,
    wizard.backgroundIds,
    wizard.originId,
  ]);

  const maxUnlockedStepIndex = useMemo(() => {
    if (!identityComplete) {
      return 0;
    }
    if (!lineageComplete) {
      return 1;
    }
    if (!backgroundComplete) {
      return 2;
    }
    if (!callingComplete) {
      return 3;
    }
    return GUIDED_STEPS.length - 1;
  }, [backgroundComplete, callingComplete, identityComplete, lineageComplete]);

  useEffect(() => {
    setWizard((current) => {
      const currentIndex = stepIndex(current.currentStep);
      if (currentIndex <= maxUnlockedStepIndex) {
        return current;
      }

      return {
        ...current,
        currentStep: GUIDED_STEPS[maxUnlockedStepIndex],
      };
    });
  }, [maxUnlockedStepIndex]);

  const previewInput = useMemo(() => {
    if (
      !identityComplete ||
      !lineageComplete ||
      !backgroundComplete ||
      !callingComplete
    ) {
      return null;
    }

    return buildInitializationInput(wizard);
  }, [backgroundComplete, callingComplete, identityComplete, lineageComplete, wizard]);

  const deferredPreviewInput = useDeferredValue(previewInput);
  const deferredSpecialSelections = useDeferredValue(sanitizedSpecialSelections);
  const preview = useQuery(
    api.characters.previewInitialization,
    deferredPreviewInput
      ? {
          input: deferredPreviewInput,
          specialSelections: deferredSpecialSelections,
        }
      : "skip",
  ) as InitializationPreview | undefined;

  const reviewReady = Boolean(previewInput);
  const validationIssues = preview?.validation.issues ?? [];

  const patronSearchOptions = useMemo<SearchOption[]>(
    () =>
      options?.patrons.map((patron) => ({
        value: patron.ref.id,
        label: patron.definition.name,
        description: patron.definition.summary,
        keywords: [
          patron.ref.id,
          patron.definition.summary,
          ...(patron.definition.tags ?? []),
        ],
      })) ?? [],
    [options],
  );
  const geneFreekMutationOptions = useMemo<SearchOption[]>(
    () =>
      sortByName(options?.mutations ?? []).map((mutation) => {
        const selected = sanitizedSpecialSelections.geneFreekMutationIds.includes(
          mutation.id,
        );
        return {
          value: mutation.id,
          label: mutation.name,
          description: mutation.summary,
          keywords: [mutation.id, ...(mutation.tags ?? [])],
          disabled:
            activeBackgroundSpecials.geneFreek &&
            !selected &&
            sanitizedSpecialSelections.geneFreekMutationIds.length >= 2,
        };
      }),
    [activeBackgroundSpecials.geneFreek, options, sanitizedSpecialSelections],
  );
  const overclockedBionicOptions = useMemo<SearchOption[]>(
    () =>
      sortByName(
        (options?.bionics ?? []).filter((bionic) => majorBionicIds.has(bionic.id)),
      ).map((bionic) => ({
        value: bionic.id,
        label: bionic.name,
        description: bionic.summary,
        keywords: [bionic.id, bionic.surgeryCode, ...(bionic.tags ?? [])],
      })),
    [majorBionicIds, options],
  );
  const spellNameById = useMemo(
    () =>
      new Map<string, string>((options?.spells ?? []).map((spell) => [spell.id, spell.name])),
    [options],
  );

  function updateWizard(mutator: (current: GuidedWizardState) => GuidedWizardState) {
    setSurfaceError(null);
    setWizard((current) => mutator(current));
  }

  function moveToStep(step: GuidedStep) {
    const targetIndex = stepIndex(step);
    if (targetIndex > maxUnlockedStepIndex) {
      return;
    }

    startTransition(() => {
      setWizard((current) => ({
        ...current,
        currentStep: step,
      }));
    });
  }

  function goBack() {
    const currentIndex = stepIndex(wizard.currentStep);
    if (currentIndex === 0) {
      return;
    }

    moveToStep(GUIDED_STEPS[currentIndex - 1]);
  }

  function goForward() {
    const currentIndex = stepIndex(wizard.currentStep);
    const nextIndex = Math.min(currentIndex + 1, maxUnlockedStepIndex);
    moveToStep(GUIDED_STEPS[nextIndex]);
  }

  function resetFlow() {
    setSurfaceError(null);
    setResetNotice("Creation run reset. The new route is back to a clean local draft.");
    setWizard(defaultWizardState());
    if (storageKey) {
      window.localStorage.removeItem(storageKey);
    }
  }

  async function handleCreateDraft() {
    if (!previewInput || !preview?.validation.ok || isCreating || missingRequiredAttributeRoll) {
      return;
    }

    setIsCreating(true);
    setSurfaceError(null);

    try {
      const created = await createGuidedDraft({
        input: previewInput,
        specialSelections: sanitizedSpecialSelections,
      });
      if (!created) {
        throw new Error("Guided draft creation returned no character.");
      }

      if (storageKey) {
        window.localStorage.removeItem(storageKey);
      }

      router.replace(`/characters/${created.bugchudId}`);
    } catch (error) {
      setSurfaceError(
        error instanceof Error ? error.message : "Guided draft creation failed.",
      );
      setIsCreating(false);
    }
  }

  const stepSummary = {
    identity: wizard.name.trim() || "Name required",
    lineage:
      selectedRace && selectedOrigin
        ? [
            selectedRace.name,
            selectedOrigin.name,
            selectedRaceRollProfile.supported
              ? wizard.attributeRolls
                ? "3d6 locked"
                : "3d6 pending"
              : null,
          ]
            .filter(Boolean)
            .join(" // ")
        : "Race and origin pending",
    background: selectedBackgrounds.length
      ? `${selectedBackgrounds.length} selected`
      : "Choose at least one background",
    calling:
      activeBackgroundSpecials.geneFreek ||
      activeBackgroundSpecials.overclocked ||
      activeBackgroundSpecials.arcynePotential
        ? callingComplete
          ? activeBackgroundSpecials.arcynePotential
            ? `Spellbook locked // ${arcyneSpellSelection.preparedSlotCount}/${ARCYNE_PREPARED_SLOT_TOTAL} slots`
            : "Procedures resolved // patron optional"
          : activeBackgroundSpecials.arcynePotential
            ? "Spellbook calibration pending"
            : "Background procedures pending"
        : suggestedDreams.length || wizard.patronId
          ? `${suggestedDreams.length} granted // patron optional`
          : "Dreams resolve from background",
    trader: (() => {
      if (!options) return "Loading wares";
      const budget = options.startingBudget;
      if (wizard.cartItems.length === 0) return `Budget: ${budget.amount} ${budget.denomination}`;
      const spent = computeSpentAmount(wizard.cartItems, options);
      return `${wizard.cartItems.length} item${wizard.cartItems.length !== 1 ? "s" : ""} // ${spent}/${budget.amount} ${budget.denomination}`;
    })(),
    review: preview?.validation.ok
      ? "Preview stable"
      : reviewReady
        ? `${validationIssues.length} issues`
        : "Locked until core steps are complete",
  };
  const currentStepIndex = stepIndex(wizard.currentStep);
  const nextStep =
    currentStepIndex < GUIDED_STEPS.length - 1
      ? GUIDED_STEPS[currentStepIndex + 1]
      : null;

  let stepBody: React.ReactNode = null;

  if (wizard.currentStep === "identity") {
    stepBody = (
      <div className="flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="guided-name"
              className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground"
            >
              Character name
            </label>
            <Input
              id="guided-name"
              value={wizard.name}
              placeholder="Selene Ash"
              onChange={(event) =>
                updateWizard((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="guided-tags"
              className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground"
            >
              Tags
            </label>
            <Input
              id="guided-tags"
              value={wizard.tagsText}
              placeholder="industrial, void-touched"
              onChange={(event) =>
                updateWizard((current) => ({
                  ...current,
                  tagsText: event.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <MetricBlock label="Nameplate" value={wizard.name.trim() ? "Bound" : "Required"} accent />
          <MetricBlock label="Tag Count" value={String(parseCommaList(wizard.tagsText).length)} />
          <MetricBlock label="Next Gate" value="Lineage" />
        </div>

        <div className="space-y-3">
          <div className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
            Ruleset generation notes
          </div>
          {options?.generationNotes.length ? (
            <div className="grid gap-3">
              {options.generationNotes.map((note) => (
                <div
                  key={note}
                  className="border border-border/20 bg-background/45 px-4 py-3 text-sm leading-7 text-muted-foreground"
                >
                  {note}
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-border/20 bg-background/45 px-4 py-3 text-sm leading-7 text-muted-foreground">
              No additional generation notes are attached to the active ruleset.
            </div>
          )}
        </div>
      </div>
    );
  }

  if (wizard.currentStep === "lineage") {
    stepBody = (
      <div className="flex flex-col gap-8">
        <section className="space-y-4">
          <div>
            <div className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              Race
            </div>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Pick the ancestry anchor first. The guided flow uses this to shape the review dossier and the editor handoff.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {sortByName(options?.races ?? []).map((race) => (
              <SelectionCard
                key={race.id}
                title={race.name}
                summary={race.summary}
                detail={race.description ?? null}
                meta={`${race.size} // ${safeJoin(race.startingLanguages)}`}
                selected={wizard.raceId === race.id}
                onClick={() =>
                  updateWizard((current) => ({
                    ...current,
                    raceId: current.raceId === race.id ? null : race.id,
                  }))
                }
              />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <div className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              Origin
            </div>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Origin governs the available backgrounds and the opening dreams that will be granted in the calling step.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {sortByName(options?.origins ?? []).map((origin) => (
              <SelectionCard
                key={origin.id}
                title={origin.name}
                summary={origin.summary}
                detail={origin.description ?? null}
                meta={`${origin.group} // ${safeJoin(origin.startingLanguages ?? [])}`}
                selected={wizard.originId === origin.id}
                onClick={() =>
                  updateWizard((current) => ({
                    ...current,
                    originId: current.originId === origin.id ? null : origin.id,
                  }))
                }
              />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <div className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              Attribute roll
            </div>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {selectedRaceRollProfile.supported
                ? "Roll the three base 3d6 triplets once and carry the locked result into the advanced editor."
                : selectedRaceRollProfile.reason}
            </p>
          </div>

          <Card size="sm" className="border border-border/20 bg-card/55">
            <CardHeader className="gap-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-primary">
                    <DiceFiveIcon />
                    3d6 Profile
                  </CardTitle>
                  <CardDescription className="max-w-3xl text-xs leading-6 text-muted-foreground">
                    {selectedRaceRollProfile.supported
                      ? "The selected race maps each saved triplet to Twitch, Flesh, and Mojo using its authored notes."
                      : selectedRaceRollProfile.reason}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {wizard.attributeRolls ? (
                    <Badge variant="default">roll locked</Badge>
                  ) : (
                    <Badge variant="outline">single use</Badge>
                  )}
                  <Button
                    type="button"
                    onClick={() => {
                      if (!selectedRace || !selectedRaceRollProfile.supported || wizard.attributeRolls) {
                        return;
                      }

                      updateWizard((current) => ({
                        ...current,
                        attributeRolls: {
                          version: 1,
                          usedAt: Date.now(),
                          raceIdAtRoll: selectedRace.id,
                          pools: rollAttributePools(),
                        },
                      }));
                    }}
                    disabled={!selectedRaceRollProfile.supported || Boolean(wizard.attributeRolls)}
                  >
                    <DiceFiveIcon data-icon="inline-start" />
                    {wizard.attributeRolls ? "Roll spent" : "Roll attributes"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 py-1">
              <div className="grid gap-4 xl:grid-cols-3">
                {ROLL_ATTRIBUTE_KEYS.map((key) => {
                  const rule = selectedRaceRollProfile.supported
                    ? selectedRaceRollProfile.rules?.[key] ?? null
                    : null;
                  const triplet = displayedAttributeRolls?.[key];
                  const resolvedValue =
                    selectedRace && triplet
                      ? computeRolledAttributesForRace(
                          selectedRace,
                          displayedAttributeRolls,
                          preview?.normalizedState.attributes.glory ?? 0,
                        )?.[key] ?? null
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
                      <CardContent className="space-y-3 py-1">
                        <div className="grid grid-cols-3 gap-2">
                          {(triplet ?? [1, 1, 1]).map((value, index) => (
                            <div
                              key={`${key}-${index}`}
                              className={cn(
                                "flex h-12 items-center justify-center border text-sm font-semibold",
                                triplet
                                  ? "border-primary/30 bg-primary/8 text-primary"
                                  : "border-border/20 bg-background/35 text-muted-foreground",
                              )}
                            >
                              {value}
                            </div>
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
                      value={wizard.attributeRolls ? "LOCKED" : selectedRaceRollProfile.supported ? "PENDING" : "N/A"}
                    />
                    <SummaryRow
                      label="Rolled on"
                      value={
                        wizard.attributeRolls?.usedAt
                          ? new Date(wizard.attributeRolls.usedAt).toLocaleTimeString()
                          : "Pending"
                      }
                    />
                    <SummaryRow
                      label="Current race"
                      value={selectedRace?.name ?? "Pending"}
                    />
                    <SummaryRow
                      label="Rolled as"
                      value={wizard.attributeRolls?.raceIdAtRoll ?? "Pending"}
                    />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {missingRequiredAttributeRoll ? (
            <div className="border border-secondary/35 bg-secondary/10 px-4 py-3 text-sm leading-7 text-secondary-foreground">
              This race uses a rolled attribute profile. Lock the 3d6 result here before forging
              the guided draft so the review preview matches the character that opens in the editor.
            </div>
          ) : null}
        </section>
      </div>
    );
  }

  if (wizard.currentStep === "background") {
    stepBody = (
      <div className="flex flex-col gap-6">
        <div className="grid gap-3 md:grid-cols-3">
          <MetricBlock label="Origin" value={selectedOrigin?.name ?? "Pending"} accent />
          <MetricBlock
            label="Origin Pool"
            value={String(
              getOriginMapping(options!, wizard.originId)?.backgroundIds.length ?? 0,
            )}
          />
          <MetricBlock label="Selected" value={String(wizard.backgroundIds.length)} />
        </div>

        {selectedOrigin ? (
          <div className="border border-border/20 bg-background/45 px-4 py-3 text-sm leading-7 text-muted-foreground">
            <span className="text-accent">{selectedOrigin.name}</span> grants{" "}
            {getOriginMapping(options!, wizard.originId)?.backgroundIds.length ?? 0} origin-linked
            packages and contributes{" "}
            {safeJoin(getOriginMapping(options!, wizard.originId)?.startingLanguages ?? [])} as
            starting language cues. Choose up to {MAX_BACKGROUND_SELECTIONS} backgrounds total,
            and only one can come from outside this origin.
          </div>
        ) : (
          <div className="border border-border/20 bg-background/45 px-4 py-3 text-sm leading-7 text-muted-foreground">
            Select an origin in the previous step. At least one background must come from that
            origin, and you can include at most one background from another origin.
          </div>
        )}

        {availableBackgrounds.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {availableBackgrounds.map((background) => {
              const selected = wizard.backgroundIds.includes(background.id);
              const isOriginLinked =
                backgroundSelection?.originBackgroundIds.has(background.id) ?? false;
              const disabled =
                backgroundSelection
                  ? !backgroundSelection.selectableBackgroundIds.has(background.id)
                  : true;
              const dreamCount = background.startingDreamRefs?.length ?? 0;
              return (
                <SelectionCard
                  key={background.id}
                  title={background.name}
                  summary={background.summary}
                  detail={background.narrativeRole}
                  meta={`${isOriginLinked ? "origin-linked" : "cross-origin"} // ${dreamCount} linked dreams // ${background.startingPackages.length} packages`}
                  selected={selected}
                  disabled={disabled}
                  onClick={() =>
                    updateWizard((current) => ({
                      ...current,
                      backgroundIds: selected
                        ? current.backgroundIds.filter((id) => id !== background.id)
                        : [...current.backgroundIds, background.id],
                    }))
                  }
                />
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }

  if (wizard.currentStep === "calling") {
    stepBody = (
      <div className="flex flex-col gap-8">
        <section className="space-y-4">
          <div>
            <div className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              Granted dreams
            </div>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              These dreams are granted automatically from the selected origin and backgrounds. The guided route shows what the draft will receive, but does not ask you to pick them separately.
            </p>
          </div>

          {suggestedDreams.length ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {suggestedDreams.map((dream) => (
                <Card
                  key={dream.id}
                  size="sm"
                  className="border border-primary/20 bg-primary/6"
                >
                  <CardHeader className="gap-2">
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-xs uppercase tracking-[0.18em] text-primary">
                        {dream.name}
                      </CardTitle>
                      <Badge variant="outline">Granted</Badge>
                    </div>
                    <CardDescription className="text-xs leading-6 text-muted-foreground">
                      {dream.summary}
                    </CardDescription>
                    {dream.description ? (
                      <div className="text-[0.72rem] leading-6 text-muted-foreground">
                        {dream.description}
                      </div>
                    ) : null}
                    <div className="text-[0.65rem] uppercase tracking-[0.2em] text-accent">
                      {`${dream.group} | Tier ${dream.tier} | Fate ${dream.fateCost}`}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="border border-border/20 bg-background/45 px-4 py-3 text-sm leading-7 text-muted-foreground">
              This lineage and background mix does not grant an opening dream.
            </div>
          )}
        </section>

        {activeBackgroundSpecials.geneFreek ||
        activeBackgroundSpecials.overclocked ||
        activeBackgroundSpecials.dreadTongued ||
        activeBackgroundSpecials.sterileTyrant ? (
          <section className="space-y-4">
            <div>
              <div className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
                Background procedures
              </div>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Some opening dreams need extra setup before the guided draft can be forged. Required selections are captured here and persisted into the first editor state.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {activeBackgroundSpecials.geneFreek ? (
                <Card size="sm" className="border border-primary/20 bg-primary/6">
                  <CardHeader className="gap-2">
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-xs uppercase tracking-[0.18em] text-primary">
                        Gene-Freek
                      </CardTitle>
                      <Badge variant="outline">
                        {sanitizedSpecialSelections.geneFreekMutationIds.length}/2 selected
                      </Badge>
                    </div>
                    <CardDescription className="text-xs leading-6 text-muted-foreground">
                      Choose exactly two mutations from the imported catalog to represent the dream’s creation-time mutation-table outcome.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-2">
                    <SearchableMultiSelect
                      label="Mutation results"
                      options={geneFreekMutationOptions}
                      values={sanitizedSpecialSelections.geneFreekMutationIds}
                      onChange={(mutationIds) =>
                        updateWizard((current) => ({
                          ...current,
                          geneFreekMutationIds: mutationIds.slice(0, 2),
                        }))
                      }
                      description="Manual picks are used here because the imported mutation table is only a representative slice."
                    />
                  </CardContent>
                </Card>
              ) : null}

              {activeBackgroundSpecials.overclocked ? (
                <Card size="sm" className="border border-primary/20 bg-primary/6">
                  <CardHeader className="gap-2">
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-xs uppercase tracking-[0.18em] text-primary">
                        Overclocked
                      </CardTitle>
                      <Badge variant="outline">
                        {sanitizedSpecialSelections.overclockedBionicId ? "Resolved" : "Required"}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs leading-6 text-muted-foreground">
                      Select one major bionic to grant at character creation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-2">
                    <SearchableSingleSelect
                      label="Major bionic"
                      options={overclockedBionicOptions}
                      value={sanitizedSpecialSelections.overclockedBionicId ?? undefined}
                      onChange={(value) =>
                        updateWizard((current) => ({
                          ...current,
                          overclockedBionicId: value ?? null,
                        }))
                      }
                      placeholder="Select a major bionic"
                      description="Only major bionics are eligible for the guided grant."
                    />
                  </CardContent>
                </Card>
              ) : null}

              {activeBackgroundSpecials.dreadTongued ? (
                <Card size="sm" className="border border-primary/20 bg-primary/6">
                  <CardHeader className="gap-2">
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-xs uppercase tracking-[0.18em] text-primary">
                        Dread-Tongued
                      </CardTitle>
                      <Badge variant="outline">Auto-granted</Badge>
                    </div>
                    <CardDescription className="text-xs leading-6 text-muted-foreground">
                      These language and spell grants will be added to the initial character state automatically.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 py-2">
                    <SummaryRow
                      label="Language"
                      value={dreadTonguedAutoGrants.languages.join(", ") || "Pending"}
                    />
                    <SummaryRow
                      label="Known spells"
                      value={
                        dreadTonguedAutoGrants.spellIds
                          .map((spellId) => spellNameById.get(spellId) ?? spellId)
                          .join(", ") || "Pending"
                      }
                    />
                  </CardContent>
                </Card>
              ) : null}

              {activeBackgroundSpecials.sterileTyrant ? (
                <Card size="sm" className="border border-primary/20 bg-primary/6">
                  <CardHeader className="gap-2">
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-xs uppercase tracking-[0.18em] text-primary">
                        Sterile-Tyrant
                      </CardTitle>
                      <Badge variant="outline">3d6 resolved</Badge>
                    </div>
                    <CardDescription className="text-xs leading-6 text-muted-foreground">
                      The guided flow rolls the creation-only cutthroat count once and carries that result into preview and draft creation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 py-2">
                    <SummaryRow
                      label={sterileTyrantFollowerLabel}
                      value={String(
                        sanitizedSpecialSelections.sterileTyrantCutthroatCount ?? 0,
                      )}
                    />
                  </CardContent>
                </Card>
              ) : null}
            </div>

            {!callingComplete ? (
              <div className="border border-secondary/35 bg-secondary/10 px-4 py-3 text-sm leading-7 text-secondary-foreground">
                Resolve the required background procedures before continuing past the calling step.
              </div>
            ) : null}
          </section>
        ) : null}

        {activeBackgroundSpecials.arcynePotential ? (
          <section className="space-y-4">
            <div>
              <div className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
                Spellbook
              </div>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Arcyne Potential opens the spell vault. Choose the spells this wizard knows,
                then allocate the full prepared spread before forging the draft.
              </p>
            </div>

            <ArcyneSpellSelector
              spells={options?.spells ?? []}
              selectedKnownSpellIds={arcyneSpellSelection.selectedKnownSpellIds}
              lockedKnownSpellIds={arcyneSpellSelection.lockedKnownSpellIds}
              preparedSlotsBySpellId={arcyneSpellSelection.preparedSlotsBySpellId}
              onKnownSpellIdsChange={(spellIds) =>
                updateWizard((current) => ({
                  ...current,
                  arcyneKnownSpellIds: spellIds,
                }))
              }
              onPreparedSlotsBySpellIdChange={(preparedSlotsBySpellId) =>
                updateWizard((current) => ({
                  ...current,
                  arcynePreparedSpellSlotsById: preparedSlotsBySpellId,
                }))
              }
              description={`Choose any number of known spells, then distribute exactly ${ARCYNE_PREPARED_SLOT_TOTAL} prepared slots across that pool. Auto-granted known spells remain available automatically.`}
              issueText={arcyneIssueText}
            />
          </section>
        ) : null}

        <section className="space-y-4">
          <div>
            <div className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              Patron
            </div>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Patron selection is optional in the guided flow and can be refined later in the editor.
            </p>
          </div>

          {patronSearchOptions.length > 8 ? (
            <SearchableSingleSelect
              label="Patron"
              description="Search the available patron list."
              options={patronSearchOptions}
              value={wizard.patronId ?? undefined}
              onChange={(value) =>
                updateWizard((current) => ({
                  ...current,
                  patronId: value ?? null,
                }))
              }
              placeholder="No patron"
            />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {options?.patrons.map((patron) => (
                <SelectionCard
                  key={patron.ref.id}
                  title={patron.definition.name}
                  summary={patron.definition.summary}
                  detail={patron.definition.description ?? null}
                  meta={safeJoin(patron.definition.tags ?? [])}
                  selected={wizard.patronId === patron.ref.id}
                  onClick={() =>
                    updateWizard((current) => ({
                      ...current,
                      patronId: current.patronId === patron.ref.id ? null : patron.ref.id,
                    }))
                  }
                />
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }

  if (wizard.currentStep === "trader") {
    const traderCatalog = options ? buildTraderCatalog(options) : [];
    const remaining = options ? computeRemainingBudget(wizard.cartItems, options) : 0;
    const budget = options?.startingBudget;

    const cartMap = new Map(
      wizard.cartItems.map((item) => [`${item.kind}:${item.id}`, item.quantity]),
    );

    function cartQuantity(kind: string, id: string): number {
      return cartMap.get(`${kind}:${id}`) ?? 0;
    }

    function addToCart(kind: CartItem["kind"], id: string, unitCost: number) {
      if (remaining < unitCost) return;
      updateWizard((current) => {
        const existingIndex = current.cartItems.findIndex(
          (entry) => entry.kind === kind && entry.id === id,
        );
        if (existingIndex !== -1) {
          const next = [...current.cartItems];
          next[existingIndex] = { ...next[existingIndex], quantity: next[existingIndex].quantity + 1 };
          return { ...current, cartItems: next };
        }
        return { ...current, cartItems: [...current.cartItems, { kind, id, quantity: 1 }] };
      });
    }

    function removeFromCart(kind: CartItem["kind"], id: string) {
      updateWizard((current) => {
        const existingIndex = current.cartItems.findIndex(
          (entry) => entry.kind === kind && entry.id === id,
        );
        if (existingIndex === -1) return current;
        const existing = current.cartItems[existingIndex];
        if (existing.quantity <= 1) {
          return { ...current, cartItems: current.cartItems.filter((_, i) => i !== existingIndex) };
        }
        const next = [...current.cartItems];
        next[existingIndex] = { ...existing, quantity: existing.quantity - 1 };
        return { ...current, cartItems: next };
      });
    }

    const rarityLabel: Record<string, string> = {
      common: "Common",
      uncommon: "Uncommon",
      rare: "Rare",
      legendary: "Legendary",
    };

    const sections: Array<{
      label: string;
      kind: CartItem["kind"];
      entries: CatalogEntry[];
    }> = [
      {
        label: "Items",
        kind: "item" as const,
        entries: sortByName(traderCatalog.filter((e) => e.kind === "item")),
      },
      {
        label: "Weapons",
        kind: "weapon" as const,
        entries: sortByName(traderCatalog.filter((e) => e.kind === "weapon")),
      },
      {
        label: "Armour",
        kind: "armor" as const,
        entries: sortByName(traderCatalog.filter((e) => e.kind === "armor")),
      },
      {
        label: "Shields",
        kind: "shield" as const,
        entries: sortByName(traderCatalog.filter((e) => e.kind === "shield")),
      },
    ].filter((section) => section.entries.length > 0);

    stepBody = (
      <div className="flex flex-col gap-8">
        <div className="border border-border/20 bg-background/45 px-4 py-4 space-y-2">
          <div className="text-[0.7rem] uppercase tracking-[0.24em] text-accent">
            Sven the Trader
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            {`
            A bear of a man wrapped in furs from a dozen killed things, Sven sets his crates
            down with a grunt and fixes you with one pale eye. "Take what you need. Leave
            Don't touch the fur wrap — that one's not for sale." His wares are priced to your
            purse, no more.
            `}
          </p>
        </div>

        {budget ? (
          <div className="grid gap-3 md:grid-cols-3">
            <MetricBlock
              label="Starting Budget"
              value={`${budget.amount} ${budget.denomination}`}
              accent
            />
            <MetricBlock
              label="Remaining"
              value={`${remaining} ${budget.denomination}`}
            />
            <MetricBlock
              label="Cart"
              value={`${wizard.cartItems.length} line${wizard.cartItems.length !== 1 ? "s" : ""}`}
            />
          </div>
        ) : null}

        {traderCatalog.length === 0 ? (
          <div className="border border-border/20 bg-background/45 px-4 py-3 text-sm leading-7 text-muted-foreground">
            {`
            Sven shrugs. "Nothing priced to your coin today. Move on."
            `}
          </div>
        ) : null}

        {sections.map((section) => (
          <section key={section.kind} className="space-y-4">
            <div className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              {section.label}
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              {section.entries.map((entry) => {
                const qty = cartQuantity(entry.kind, entry.id);
                const unitCost = entry.price.amount;
                const canAffordOne = remaining >= unitCost;
                const isInCart = qty > 0;

                return (
                  <div
                    key={`${entry.kind}:${entry.id}`}
                    className={cn(
                      "module-cut border px-4 py-4 transition-colors",
                      isInCart
                        ? "border-primary/30 bg-primary/8"
                        : canAffordOne
                          ? "border-border/20 bg-background/55"
                          : "border-border/10 bg-background/25 opacity-60",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="truncate text-sm uppercase tracking-[0.18em] text-primary">
                            {entry.name}
                          </span>
                          <Badge variant="outline" className="shrink-0">
                            {rarityLabel[entry.rarity] ?? entry.rarity}
                          </Badge>
                        </div>
                        <p className="text-xs leading-6 text-muted-foreground">{entry.summary}</p>
                        <div className="text-[0.65rem] uppercase tracking-[0.2em] text-accent">
                          {`${unitCost} ${entry.price.denomination} // ${entry.slots} slot${entry.slots !== 1 ? "s" : ""}`}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        {qty > 0 ? (
                          <>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0 text-xs"
                              onClick={() => removeFromCart(entry.kind, entry.id)}
                            >
                              −
                            </Button>
                            <span className="w-4 text-center text-sm">{qty}</span>
                          </>
                        ) : null}
                        <Button
                          type="button"
                          variant={qty > 0 ? "outline" : "default"}
                          size="sm"
                          className="h-7 w-7 p-0 text-xs"
                          disabled={!canAffordOne}
                          onClick={() => addToCart(entry.kind, entry.id, unitCost)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {wizard.cartItems.length > 0 ? (
          <section className="space-y-3">
            <div className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              Your selections
            </div>
            <div className="flex flex-col gap-1">
              {wizard.cartItems.map((item) => {
                const entry = traderCatalog.find(
                  (e) => e.kind === item.kind && e.id === item.id,
                );
                if (!entry) return null;
                return (
                  <SummaryRow
                    key={`${item.kind}:${item.id}`}
                    label={`${entry.name} ×${item.quantity}`}
                    value={`${entry.price.amount * item.quantity} ${entry.price.denomination}`}
                  />
                );
              })}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateWizard((current) => ({ ...current, cartItems: [] }))}
            >
              Clear cart
            </Button>
          </section>
        ) : null}
      </div>
    );
  }

  if (wizard.currentStep === "review") {
    stepBody = (
      <div className="flex flex-col gap-6">
        <div className="grid gap-3 md:grid-cols-3">
          <MetricBlock label="Preview" value={reviewReady ? "Live" : "Locked"} accent />
          <MetricBlock
            label="Issues"
            value={reviewReady ? String(validationIssues.length) : "-"}
          />
          <MetricBlock
            label="Editor Handoff"
            value={preview?.validation.ok ? "Ready" : "Pending"}
          />
        </div>

        {reviewReady ? (
          <>
            {missingRequiredAttributeRoll ? (
              <Card size="sm" className="border border-secondary/40 bg-secondary/12">
                <CardHeader className="gap-2">
                  <CardTitle className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-secondary">
                    <WarningCircleIcon className="size-4" />
                    Attribute roll required
                  </CardTitle>
                  <CardDescription className="text-[0.72rem] leading-6 text-muted-foreground">
                    {selectedRace?.name ?? "This race"} uses a rolled profile. Go back to the
                    lineage step and lock the 3d6 result before forging the draft.
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : null}

            <div className="border border-border/20 bg-background/45 px-4 py-3 text-sm leading-7 text-muted-foreground">
              The guided route creates the record only after confirmation. When you forge the draft, Frontchud will persist it once and open the advanced editor at the review state.
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricBlock
                label="Display name"
                value={preview?.combatProfile.displayName ?? wizard.name.trim()}
              />
              <MetricBlock
                label="Movement"
                value={
                  preview?.combatProfile
                    ? `${preview.combatProfile.movement.land} land`
                    : "Syncing"
                }
              />
              <MetricBlock
                label="Initiative"
                value={preview?.combatProfile ? String(preview.combatProfile.initiative) : "Syncing"}
              />
              <MetricBlock
                label="Attack options"
                value={
                  preview?.combatProfile
                    ? String(preview.combatProfile.attackOptions.length)
                    : "Syncing"
                }
              />
            </div>

            {preview &&
            (activeBackgroundSpecials.geneFreek ||
              activeBackgroundSpecials.overclocked ||
              activeBackgroundSpecials.dreadTongued ||
              activeBackgroundSpecials.sterileTyrant ||
              activeBackgroundSpecials.arcynePotential) ? (
              <Card size="sm" className="border border-border/20 bg-background/45">
                <CardHeader className="gap-2">
                  <CardTitle className="text-xs uppercase tracking-[0.18em] text-primary">
                    Background procedure handoff
                  </CardTitle>
                  <CardDescription className="text-xs leading-6 text-muted-foreground">
                    These grants are already resolved in the previewed state and will open in the advanced editor the same way.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-1 py-2">
                  {activeBackgroundSpecials.geneFreek ? (
                    <SummaryRow
                      label="Mutations"
                      value={
                        preview.normalizedState.body.mutationRefs
                          .map((mutationRef) => {
                            const mutation = options?.mutations.find(
                              (entry) => entry.id === mutationRef.id,
                            );
                            return mutation?.name ?? mutationRef.id;
                          })
                          .join(", ") || "None"
                      }
                    />
                  ) : null}
                  {activeBackgroundSpecials.overclocked ? (
                    <SummaryRow
                      label="Bionic"
                      value={
                        preview.normalizedState.body.bionicRefs
                          .map((bionicRef) => {
                            const bionic = options?.bionics.find(
                              (entry) => entry.id === bionicRef.id,
                            );
                            return bionic?.name ?? bionicRef.id;
                          })
                          .join(", ") || "None"
                      }
                    />
                  ) : null}
                  {activeBackgroundSpecials.dreadTongued ? (
                    <>
                      <SummaryRow
                        label="Languages"
                        value={preview.normalizedState.social.languages.join(", ") || "None"}
                      />
                      <SummaryRow
                        label="Known spells"
                        value={
                          preview.normalizedState.magic.knownSpellRefs
                            .map((spellRef) => spellNameById.get(spellRef.id) ?? spellRef.id)
                            .join(", ") || "None"
                        }
                      />
                    </>
                  ) : null}
                  {activeBackgroundSpecials.sterileTyrant ? (
                    <SummaryRow
                      label="Followers"
                      value={
                        preview.normalizedState.social.followers
                          .map((follower) => `${follower.label} x${follower.quantity}`)
                          .join(", ") || "None"
                      }
                    />
                  ) : null}
                  {activeBackgroundSpecials.arcynePotential ? (
                    <>
                      <SummaryRow
                        label="Known spell pool"
                        value={
                          arcyneSpellSelection.combinedKnownSpellIds
                            .map((spellId) => spellNameById.get(spellId) ?? spellId)
                            .join(", ") || "None"
                        }
                      />
                      <SummaryRow
                        label="Prepared spread"
                        value={
                          Object.entries(arcyneSpellSelection.preparedSlotsBySpellId)
                            .map(
                              ([spellId, count]) =>
                                `${spellNameById.get(spellId) ?? spellId} x${count}`,
                            )
                            .join(", ") || "None"
                        }
                      />
                    </>
                  ) : null}
                </CardContent>
              </Card>
            ) : null}

            {validationIssues.length ? (
              <div className="flex flex-col gap-3">
                {validationIssues.map((issue, index) => (
                  <Card
                    key={`${issue.path}-${index}`}
                    size="sm"
                    className="border border-secondary/35 bg-secondary/10"
                  >
                    <CardHeader className="gap-1">
                      <CardTitle className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-secondary">
                        <WarningCircleIcon className="size-4" />
                        {issue.severity}
                      </CardTitle>
                      <CardDescription className="text-[0.72rem] leading-6 text-muted-foreground">
                        {issue.message}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="border border-primary/25 bg-primary/8 px-4 py-3 text-sm leading-7 text-foreground/90">
                The preview normalized cleanly. This guided draft is ready to hand off into the advanced editor.
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {isSignedIn ? (
                <Button
                  size="lg"
                  onClick={() => void handleCreateDraft()}
                  disabled={!preview?.validation.ok || isCreating || missingRequiredAttributeRoll}
                >
                  <ShieldCheckIcon data-icon="inline-start" />
                  {isCreating ? "Forging Draft" : "Forge Draft And Open Editor"}
                </Button>
              ) : (
                <SignInButton mode="modal">
                  <Button size="lg">
                    <SignInIcon data-icon="inline-start" />
                    Sign In To Forge Draft
                  </Button>
                </SignInButton>
              )}
              <Button asChild variant="outline" size="lg">
                <Link href="/characters">Open manager</Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="border border-border/20 bg-background/45 px-4 py-3 text-sm leading-7 text-muted-foreground">
            Finish the required steps before the live review dossier can resolve.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-6 pb-10">
      {!isLoaded || !options ? (
        <Card className="border border-border/20 bg-background/70">
          <CardHeader className="gap-3 border-b border-border/20 pb-5">
            <Badge variant="outline" className="w-fit">
              Guided creation
            </Badge>
            <CardTitle className="font-display text-4xl font-black tracking-[-0.06em] text-primary">
              Syncing Creation Matrix
            </CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-7 text-muted-foreground">
              Loading the guided character creation data before the route opens.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 xl:hidden">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">Guided route</Badge>
              <Badge variant="ghost">
                {stepIndex(wizard.currentStep) + 1} / {GUIDED_STEPS.length}
              </Badge>
              <Badge variant="ghost">{stepSummary[wizard.currentStep]}</Badge>
            </div>
          </div>

          {resetNotice ? (
            <div className="border border-primary/20 bg-primary/8 px-4 py-3 text-[0.72rem] leading-6 text-foreground/90">
              {resetNotice}
            </div>
          ) : null}

          {surfaceError ? (
            <Card size="sm" className="border border-secondary/40 bg-secondary/12">
              <CardHeader className="gap-2">
                <CardTitle className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-secondary">
                  <WarningCircleIcon className="size-4" />
                  Guided flow issue
                </CardTitle>
                <CardDescription className="text-xs leading-6 text-secondary-foreground">
                  {surfaceError}
                </CardDescription>
              </CardHeader>
            </Card>
          ) : null}

          <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
            <aside className="hidden min-w-0 xl:block xl:w-[20rem] xl:shrink-0">
              <div className="sticky top-24 flex flex-col gap-3">
                {GUIDED_STEPS.map((step) => (
                  <StepButton
                    key={step}
                    step={step}
                    currentStep={wizard.currentStep}
                    unlocked={stepIndex(step) <= maxUnlockedStepIndex}
                    completed={stepIndex(step) < stepIndex(wizard.currentStep)}
                    onSelect={moveToStep}
                  />
                ))}
              </div>
            </aside>

            <div className="min-w-0 flex-1 xl:max-w-[68rem]">
              <Card className="ritual-surface border border-border/20 bg-background/68">
                <CardHeader className="gap-4 border-b border-border/20 pb-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">Guided character creation</Badge>
                    <Badge variant="ghost">{STEP_META[wizard.currentStep].eyebrow}</Badge>
                    <Badge variant="ghost">{stepSummary[wizard.currentStep]}</Badge>
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="font-display text-4xl font-black tracking-[-0.06em] text-primary sm:text-5xl">
                      {STEP_META[wizard.currentStep].label}
                    </CardTitle>
                    <CardDescription className="max-w-3xl text-sm leading-7 text-muted-foreground">
                      {STEP_META[wizard.currentStep].detail}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-8 py-6">
                  {stepBody}
                </CardContent>
              </Card>

              <div className="mt-4 border border-primary/30 bg-primary/10 px-4 py-4 shadow-[0_0_30px_rgba(255,176,0,0.08)] sm:px-5 sm:py-5">
                <div className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <div className="text-[0.68rem] uppercase tracking-[0.26em] text-primary">
                      Primary action
                    </div>
                    <p className="text-sm leading-7 text-foreground/90">
                      {wizard.currentStep !== "review"
                        ? nextStep
                          ? `Continue into ${STEP_META[nextStep].label.toLowerCase()} once this section is ready.`
                          : "Continue through the guided flow."
                        : "Forge the draft and hand it off into the advanced editor when the review looks clean."}
                    </p>
                  </div>

                  <div className="w-full">
                    {wizard.currentStep !== "review" ? (
                      <Button
                        size="lg"
                        className="amber-glow h-11 w-full justify-center text-sm uppercase tracking-[0.24em]"
                        onClick={goForward}
                        disabled={currentStepIndex >= maxUnlockedStepIndex}
                      >
                        {nextStep
                          ? `Continue To ${STEP_META[nextStep].label}`
                          : "Continue"}
                      </Button>
                    ) : isSignedIn ? (
                      <Button
                        size="lg"
                        className="amber-glow h-11 w-full justify-center text-sm uppercase tracking-[0.24em]"
                        onClick={() => void handleCreateDraft()}
                        disabled={
                          !preview?.validation.ok || isCreating || missingRequiredAttributeRoll
                        }
                      >
                        <SparkleIcon data-icon="inline-start" />
                        {isCreating ? "Forging Draft" : "Forge Draft And Open Editor"}
                      </Button>
                    ) : (
                      <SignInButton mode="modal">
                        <Button
                          size="lg"
                          className="amber-glow h-11 w-full justify-center text-sm uppercase tracking-[0.24em]"
                        >
                          <SignInIcon data-icon="inline-start" />
                          Sign In To Forge Draft
                        </Button>
                      </SignInButton>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 border-t border-primary/20 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goBack}
                      disabled={wizard.currentStep === "identity"}
                    >
                      Back
                    </Button>
                    <Button variant="ghost" size="sm" onClick={resetFlow}>
                      Start over
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
