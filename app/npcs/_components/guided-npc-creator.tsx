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
  ShieldCheckIcon,
  SignInIcon,
  SparkleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import type { ComputedCombatProfile, NpcState } from "@bugchud/core";
import type {
  ArmorDefinition,
  BionicDefinition,
  BoonDefinition,
  ContainerDefinition,
  CovenantDefinition,
  CreatureDefinition,
  GrimoireDefinition,
  ItemDefinition,
  MutationDefinition,
  PantheonDefinition,
  PatronDefinition,
  RelicDefinition,
  ShieldDefinition,
  SpellDefinition,
  WeaponDefinition,
} from "@bugchud/core/content";
import type {
  DefinitionIdByKind,
  DefinitionKind,
  RegistryRef,
} from "@bugchud/core/foundation";
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
import {
  appendInventoryStack,
  buildInventoryPlacementCatalog,
  equipInventoryStackAtIndex,
  getInventoryPlacementLabel,
  moveInventoryStackToContainerAtIndex,
  removeInventoryStackAtIndex,
  removeInventoryStackFromContainerAtIndex,
  stowEquippedInventoryStackAtIndex,
  syncInventoryPlacementState,
  type InventoryOwnedRef,
  type InventoryPlacementCatalog,
  type InventoryPlacementStateLike,
  updateInventoryStackQuantity,
} from "@/lib/character-inventory-placement";
import {
  getCurrencyFieldLabel,
  getVisibleCurrencyDenominations,
  normalizeCurrencyAliases,
  readCurrencyAmount,
  writeCurrencyAmount,
} from "@/lib/bugchud-currency-aliases";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import {
  CompactTextField,
  SearchableMultiSelect,
  SearchableSingleSelect,
  type SearchOption,
} from "../../characters/_components/character-editor-controls";

const GUIDED_STEPS = [
  "identity",
  "template",
  "loadout",
  "capabilities",
  "gear",
  "review",
] as const;
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
const STORAGE_VERSION = 1;

type GuidedStep = (typeof GUIDED_STEPS)[number];
type CurrencyMap = Record<string, number>;
type Preview = {
  normalizedState: NpcState;
  validation: {
    ok: boolean;
    issues: ValidationIssue[];
  };
  combatProfile: ComputedCombatProfile;
};
type GuidedOptions = {
  rulesetId: string;
  rulesetVersion: string;
  creatures: CreatureDefinition[];
  npcLoadouts: Array<{ id: string; name: string; summary: string }>;
  items: ItemDefinition[];
  weapons: WeaponDefinition[];
  armors: ArmorDefinition[];
  shields: ShieldDefinition[];
  grimoires: GrimoireDefinition[];
  spells: SpellDefinition[];
  mutations: MutationDefinition[];
  bionics: BionicDefinition[];
  pantheons: PantheonDefinition[];
  patrons: PatronDefinition[];
  boons: BoonDefinition[];
  covenants: CovenantDefinition[];
  relics: RelicDefinition[];
  containerDefinitions: readonly ContainerDefinition[];
  denominations: string[];
  defaultCurrency: string;
};
type GuidedWizardState = {
  currentStep: GuidedStep;
  name: string;
  tagsText: string;
  allegiance: string;
  actorKind: "npc" | "creature" | "mount";
  creatureId: string | null;
  npcLoadoutId: string | null;
  body: NpcState["body"] | null;
  inventory: NpcState["inventory"] | null;
  loadout: NpcState["loadout"] | null;
  magic: NpcState["magic"] | null;
  faith: NpcState["faith"] | null;
  resources: NpcState["resources"] | null;
  activeEffects: NpcState["activeEffects"] | null;
};

function defaultWizardState(): GuidedWizardState {
  return {
    currentStep: "identity",
    name: "",
    tagsText: "",
    allegiance: "",
    actorKind: "npc",
    creatureId: null,
    npcLoadoutId: null,
    body: null,
    inventory: null,
    loadout: null,
    magic: null,
    faith: null,
    resources: null,
    activeEffects: null,
  };
}

function parseCommaList(value: string) {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function buildStorageKey(options: GuidedOptions) {
  return `frontchud.guided-npc.${options.rulesetId}.${options.rulesetVersion}`;
}

function stepIndex(step: GuidedStep) {
  return GUIDED_STEPS.indexOf(step);
}

function toSearchOption(
  value: string,
  label: string,
  description?: string,
  group?: string,
): SearchOption {
  return { value, label, description, group };
}

function registryRef<K extends DefinitionKind>(kind: K, id: string): RegistryRef<K> {
  return { kind, id: id as DefinitionIdByKind[K] };
}

function registryRefs<K extends DefinitionKind>(kind: K, ids: string[]): RegistryRef<K>[] {
  return ids.map((id) => registryRef(kind, id));
}

function normalizeOptions(
  value: Partial<GuidedOptions> | undefined,
): GuidedOptions | undefined {
  if (!value?.rulesetId || !value.rulesetVersion) {
    return undefined;
  }

  return {
    rulesetId: value.rulesetId,
    rulesetVersion: value.rulesetVersion,
    creatures: value.creatures ?? [],
    npcLoadouts: value.npcLoadouts ?? [],
    items: value.items ?? [],
    weapons: value.weapons ?? [],
    armors: value.armors ?? [],
    shields: value.shields ?? [],
    grimoires: value.grimoires ?? [],
    spells: value.spells ?? [],
    mutations: value.mutations ?? [],
    bionics: value.bionics ?? [],
    pantheons: value.pantheons ?? [],
    patrons: value.patrons ?? [],
    boons: value.boons ?? [],
    covenants: value.covenants ?? [],
    relics: value.relics ?? [],
    containerDefinitions: value.containerDefinitions ?? [],
    denominations: value.denominations ?? [],
    defaultCurrency: value.defaultCurrency ?? "",
  };
}

function cloneState<T>(value: T): T {
  return structuredClone(value);
}

function normalizeGuidedWizardCurrency(state: GuidedWizardState, defaultCurrency: string) {
  if (!state.inventory) {
    return state;
  }

  return {
    ...state,
    inventory: {
      ...state.inventory,
      currency: normalizeCurrencyAliases(state.inventory.currency, defaultCurrency),
    },
  };
}

function inventoryLabelFromRef(options: GuidedOptions, refValue: { kind: string; id: string }) {
  return (
    options.items.find((entry) => entry.id === refValue.id)?.name ??
    options.weapons.find((entry) => entry.id === refValue.id)?.name ??
    options.armors.find((entry) => entry.id === refValue.id)?.name ??
    options.shields.find((entry) => entry.id === refValue.id)?.name ??
    options.grimoires.find((entry) => entry.id === refValue.id)?.name ??
    options.relics.find((entry) => entry.id === refValue.id)?.name ??
    refValue.id
  );
}

function MetricBlock({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="border border-border/20 bg-background/60 px-3 py-3">
      <div className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </div>
      <div className={cn("mt-2 text-sm uppercase tracking-[0.18em] text-foreground", accent && "text-primary")}>
        {value}
      </div>
    </div>
  );
}

export function GuidedNpcCreator() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const rawOptions = useQuery(api.ruleset.getGuidedNpcCreationOptions, {}) as
    | Partial<GuidedOptions>
    | undefined;
  const options = useMemo(() => normalizeOptions(rawOptions), [rawOptions]);
  const createGuidedDraft = useMutation(api.npcs.createGuidedDraft);

  const [wizard, setWizard] = useState<GuidedWizardState>(defaultWizardState);
  const [surfaceError, setSurfaceError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const hydratedStorageKeyRef = useRef<string | null>(null);
  const hydratedTemplateKeyRef = useRef<string | null>(null);
  const deferredWizard = useDeferredValue(wizard);
  const storageKey = options ? buildStorageKey(options) : null;

  useEffect(() => {
    if (!options || wizard.creatureId) {
      return;
    }

    setWizard((current) => ({
      ...current,
      creatureId: options.creatures[0]?.id ?? null,
    }));
  }, [options, wizard.creatureId]);

  useEffect(() => {
    if (!storageKey || hydratedStorageKeyRef.current === storageKey) {
      return;
    }

    hydratedStorageKeyRef.current = storageKey;
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as {
        version: number;
        state: GuidedWizardState;
      };
      if (parsed.version !== STORAGE_VERSION) {
        window.localStorage.removeItem(storageKey);
        return;
      }
      setWizard(
        normalizeGuidedWizardCurrency(parsed.state, options?.defaultCurrency ?? "zennies"),
      );
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, [options, storageKey]);

  useEffect(() => {
    if (!storageKey || hydratedStorageKeyRef.current !== storageKey) {
      return;
    }

    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        version: STORAGE_VERSION,
        state: wizard,
      }),
    );
  }, [storageKey, wizard]);

  const previewInput = useMemo(() => {
    if (!options || !deferredWizard.creatureId) {
      return "skip";
    }

    const creatureId = deferredWizard.creatureId;
    const normalizedWizard = normalizeGuidedWizardCurrency(
      deferredWizard,
      options.defaultCurrency,
    );

    return {
      input: {
        name: normalizedWizard.name.trim() || undefined,
        actorKind: normalizedWizard.actorKind,
        allegiance: normalizedWizard.allegiance.trim() || undefined,
        creatureRef: registryRef("creature", creatureId),
        npcLoadoutRef: normalizedWizard.npcLoadoutId
          ? registryRef("npcLoadout", normalizedWizard.npcLoadoutId)
          : undefined,
        tags: parseCommaList(normalizedWizard.tagsText),
        body: normalizedWizard.body ? cloneState(normalizedWizard.body) : undefined,
        inventory: normalizedWizard.inventory ? cloneState(normalizedWizard.inventory) : undefined,
        loadout: normalizedWizard.loadout ? cloneState(normalizedWizard.loadout) : undefined,
        magic: normalizedWizard.magic ? cloneState(normalizedWizard.magic) : undefined,
        faith: normalizedWizard.faith ? cloneState(normalizedWizard.faith) : undefined,
        resources: normalizedWizard.resources ? cloneState(normalizedWizard.resources) : undefined,
        activeEffects: normalizedWizard.activeEffects
          ? cloneState(normalizedWizard.activeEffects)
          : undefined,
      },
    };
  }, [deferredWizard, options]);

  const preview = useQuery(
    api.npcs.previewInitialization,
    previewInput as never,
  ) as Preview | undefined;

  const templateKey = useMemo(
    () => `${wizard.actorKind}:${wizard.creatureId ?? ""}:${wizard.npcLoadoutId ?? ""}`,
    [wizard.actorKind, wizard.creatureId, wizard.npcLoadoutId],
  );
  const visibleDenominations = useMemo(
    () =>
      options
        ? getVisibleCurrencyDenominations(options.denominations, options.defaultCurrency)
        : [],
    [options],
  );

  useEffect(() => {
    if (!preview || hydratedTemplateKeyRef.current === templateKey) {
      return;
    }

    hydratedTemplateKeyRef.current = templateKey;
    setWizard((current) =>
      normalizeGuidedWizardCurrency(
        {
          ...current,
          body: cloneState(preview.normalizedState.body),
          inventory: cloneState(preview.normalizedState.inventory),
          loadout: cloneState(preview.normalizedState.loadout),
          magic: cloneState(preview.normalizedState.magic),
          faith: cloneState(preview.normalizedState.faith),
          resources: cloneState(preview.normalizedState.resources),
          activeEffects: cloneState(preview.normalizedState.activeEffects),
        },
        options?.defaultCurrency ?? "zennies",
      ),
    );
  }, [options?.defaultCurrency, preview, templateKey]);

  const inventoryCatalog = useMemo<InventoryPlacementCatalog | null>(() => {
    if (!options) {
      return null;
    }

    return buildInventoryPlacementCatalog({
      items: options.items,
      weapons: options.weapons,
      armors: options.armors,
      shields: options.shields,
      grimoires: options.grimoires,
      relics: options.relics,
      containerDefinitions: options.containerDefinitions,
    });
  }, [options]);

  function updateWizard(mutator: (current: GuidedWizardState) => GuidedWizardState) {
    startTransition(() => {
      setWizard((current) => mutator(current));
    });
  }

  function resetTemplateSlices() {
    updateWizard((current) => ({
      ...current,
      body: null,
      inventory: null,
      loadout: null,
      magic: null,
      faith: null,
      resources: null,
      activeEffects: null,
    }));
    hydratedTemplateKeyRef.current = null;
  }

  function mutateDraftState(
    mutator: (state: NpcState & InventoryPlacementStateLike) => void,
  ) {
    if (!wizard.body || !wizard.inventory || !wizard.loadout || !wizard.magic || !wizard.faith || !wizard.resources) {
      return;
    }

    updateWizard((current) => {
      if (!current.body || !current.inventory || !current.loadout || !current.magic || !current.faith || !current.resources) {
        return current;
      }

      const nextState = {
        id: preview?.normalizedState.id ?? "draft",
        kind: "creatureState" as const,
        identity: {
          name: current.name.trim(),
          creatureRef: current.creatureId
            ? registryRef("creature", current.creatureId)
            : preview?.normalizedState.identity.creatureRef ?? registryRef("creature", ""),
          npcLoadoutRef: current.npcLoadoutId
            ? registryRef("npcLoadout", current.npcLoadoutId)
            : undefined,
          allegiance: current.allegiance.trim() || undefined,
        },
        actorKind: current.actorKind,
        attributes: preview?.normalizedState.attributes ?? {
          twitch: 0,
          flesh: 0,
          mojo: 0,
          glory: 0,
        },
        derivedStats: preview?.normalizedState.derivedStats ?? {
          sprint: 0,
          skill: 0,
          bones: 0,
          manaDiceMax: 0,
          focus: 0,
        },
        saveBonuses: preview?.normalizedState.saveBonuses ?? {},
        body: cloneState(current.body),
        inventory: cloneState(current.inventory),
        loadout: cloneState(current.loadout),
        magic: cloneState(current.magic),
        faith: cloneState(current.faith),
        resources: cloneState(current.resources),
        activeEffects: cloneState(current.activeEffects ?? []),
        tags: parseCommaList(current.tagsText),
        extensions: preview?.normalizedState.extensions,
      };

      mutator(nextState as unknown as NpcState & InventoryPlacementStateLike);

      return {
        ...current,
        body: nextState.body,
        inventory: nextState.inventory,
        loadout: nextState.loadout,
        magic: nextState.magic,
        faith: nextState.faith,
        resources: nextState.resources,
        activeEffects: nextState.activeEffects,
      };
    });
  }

  function applyInventoryMutation(
    mutator: (
      state: NpcState & InventoryPlacementStateLike,
      catalog: InventoryPlacementCatalog,
    ) => void,
  ) {
    if (!inventoryCatalog) {
      return;
    }

    mutateDraftState((state) => {
      mutator(state, inventoryCatalog);
      syncInventoryPlacementState(state, inventoryCatalog);
    });
  }

  const creatureOptions = useMemo(
    () =>
      (options?.creatures ?? [])
        .slice()
        .sort((left, right) => left.name.localeCompare(right.name))
        .map((creature) =>
          toSearchOption(creature.id, creature.name, creature.summary, "CREATURE"),
        ),
    [options],
  );
  const loadoutOptions = useMemo(
    () =>
      (options?.npcLoadouts ?? [])
        .slice()
        .sort((left, right) => left.name.localeCompare(right.name))
        .map((loadout) => toSearchOption(loadout.id, loadout.name, loadout.summary)),
    [options],
  );
  const mutationOptions = useMemo(
    () => (options?.mutations ?? []).map((entry) => toSearchOption(entry.id, entry.name, entry.summary)),
    [options],
  );
  const bionicOptions = useMemo(
    () => (options?.bionics ?? []).map((entry) => toSearchOption(entry.id, entry.name, entry.summary)),
    [options],
  );
  const grimoireOptions = useMemo(
    () => (options?.grimoires ?? []).map((entry) => toSearchOption(entry.id, entry.name, entry.summary)),
    [options],
  );
  const spellOptions = useMemo(
    () =>
      (options?.spells ?? []).map((entry) =>
        toSearchOption(entry.id, entry.name, entry.summary, entry.school.toUpperCase()),
      ),
    [options],
  );
  const pantheonOptions = useMemo(
    () => (options?.pantheons ?? []).map((entry) => toSearchOption(entry.id, entry.name, entry.summary)),
    [options],
  );
  const patronOptions = useMemo(
    () => (options?.patrons ?? []).map((entry) => toSearchOption(entry.id, entry.name, entry.summary)),
    [options],
  );
  const boonOptions = useMemo(
    () => (options?.boons ?? []).map((entry) => toSearchOption(entry.id, entry.name, entry.summary)),
    [options],
  );
  const covenantOptions = useMemo(
    () => (options?.covenants ?? []).map((entry) => toSearchOption(entry.id, entry.name, entry.summary)),
    [options],
  );
  const relicOptions = useMemo(
    () => (options?.relics ?? []).map((entry) => toSearchOption(entry.id, entry.name, entry.summary)),
    [options],
  );
  const inventoryCatalogOptions = useMemo(
    () =>
      options
        ? [
            ...options.items.map((entry) => ({
              value: `item:${entry.id}`,
              label: entry.name,
              description: entry.summary,
            })),
            ...options.weapons.map((entry) => ({
              value: `weapon:${entry.id}`,
              label: entry.name,
              description: entry.summary,
            })),
            ...options.armors.map((entry) => ({
              value: `armor:${entry.id}`,
              label: entry.name,
              description: entry.summary,
            })),
            ...options.shields.map((entry) => ({
              value: `shield:${entry.id}`,
              label: entry.name,
              description: entry.summary,
            })),
            ...options.grimoires.map((entry) => ({
              value: `grimoire:${entry.id}`,
              label: entry.name,
              description: entry.summary,
            })),
            ...options.relics.map((entry) => ({
              value: `relic:${entry.id}`,
              label: entry.name,
              description: entry.summary,
            })),
          ]
        : [],
    [options],
  );
  const [inventorySelection, setInventorySelection] = useState<string | undefined>(undefined);

  const maxUnlockedStep = wizard.creatureId ? GUIDED_STEPS.length - 1 : 1;
  const validationIssues = preview?.validation.issues ?? [];

  async function handleCreateDraft() {
    if (!previewInput || previewInput === "skip") {
      return;
    }

    setSurfaceError(null);
    setIsCreating(true);
    try {
      const created = await createGuidedDraft(previewInput as never);
      if (storageKey) {
        window.localStorage.removeItem(storageKey);
      }
      router.push(`/npcs/${created?.bugchudId}`);
    } catch (error) {
      setSurfaceError(error instanceof Error ? error.message : "Guided draft creation failed.");
    } finally {
      setIsCreating(false);
    }
  }

  function updateCurrentStep(step: GuidedStep) {
    if (stepIndex(step) > maxUnlockedStep) {
      return;
    }
    updateWizard((current) => ({ ...current, currentStep: step }));
  }

  function addContainer(definitionLabel: string) {
    const definition = options?.containerDefinitions.find((entry) => entry.label === definitionLabel);
    if (!definition) {
      return;
    }

    applyInventoryMutation((state) => {
      state.inventory.containers = [
        ...state.inventory.containers,
        {
          id: crypto.randomUUID(),
          label: definition.label,
          capacity: definition.capacity,
          occupiedSlots: 0,
        },
      ];
    });
  }

  if (!isLoaded || !options) {
    return (
      <Card className="border border-border/20 bg-background/70">
        <CardHeader className="gap-3 border-b border-border/20 pb-5">
          <Badge variant="outline" className="w-fit">
            Guided NPC creation
          </Badge>
          <CardTitle className="font-display text-4xl font-black tracking-[-0.06em] text-primary">
            Syncing Creation Matrix
          </CardTitle>
          <CardDescription className="max-w-2xl text-sm leading-7 text-muted-foreground">
            Loading the guided NPC creation data before the route opens.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-6 pb-10">
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

      <div className="flex flex-wrap gap-2">
        {GUIDED_STEPS.map((step) => (
          <Button
            key={step}
            variant={wizard.currentStep === step ? "default" : "outline"}
            size="xs"
            disabled={stepIndex(step) > maxUnlockedStep}
            onClick={() => updateCurrentStep(step)}
          >
            {step}
          </Button>
        ))}
      </div>

      <Card className="ritual-surface border border-border/20 bg-background/68">
        <CardHeader className="gap-4 border-b border-border/20 pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Guided NPC creation</Badge>
            <Badge variant="ghost">
              {stepIndex(wizard.currentStep) + 1} / {GUIDED_STEPS.length}
            </Badge>
          </div>
          <div className="space-y-2">
            <CardTitle className="font-display text-4xl font-black tracking-[-0.06em] text-primary sm:text-5xl">
              {wizard.currentStep[0]?.toUpperCase() + wizard.currentStep.slice(1)}
            </CardTitle>
            <CardDescription className="max-w-3xl text-sm leading-7 text-muted-foreground">
              Forge a creature-side draft with template defaults, capability overrides, gear, and a live preview before persistence.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-8 py-6">
          {wizard.currentStep === "identity" ? (
            <div className="grid gap-4 md:grid-cols-2">
              <CompactTextField
                id="npc-name"
                label="Display name"
                value={wizard.name}
                onChange={(value) => updateWizard((current) => ({ ...current, name: value }))}
                placeholder="Roadfang"
              />
              <CompactTextField
                id="npc-allegiance"
                label="Allegiance"
                value={wizard.allegiance}
                onChange={(value) => updateWizard((current) => ({ ...current, allegiance: value }))}
                placeholder="Raiders"
              />
              <CompactTextField
                id="npc-tags"
                label="Tags"
                value={wizard.tagsText}
                onChange={(value) => updateWizard((current) => ({ ...current, tagsText: value }))}
                placeholder="boss, elite"
                description="Comma-separated labels."
              />
              <div className="space-y-3">
                <div className="text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                  Actor kind
                </div>
                <div className="flex flex-wrap gap-2">
                  {(["npc", "creature", "mount"] as const).map((kind) => (
                    <Button
                      key={kind}
                      variant={wizard.actorKind === kind ? "default" : "outline"}
                      size="xs"
                      onClick={() => {
                        updateWizard((current) => ({ ...current, actorKind: kind }));
                        resetTemplateSlices();
                      }}
                    >
                      {kind}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {wizard.currentStep === "template" || wizard.currentStep === "loadout" ? (
            <div className="grid gap-4 md:grid-cols-2">
              <SearchableSingleSelect
                label="Creature template"
                options={creatureOptions}
                value={wizard.creatureId ?? undefined}
                onChange={(value) => {
                  updateWizard((current) => ({ ...current, creatureId: value ?? null }));
                  resetTemplateSlices();
                }}
              />
              <SearchableSingleSelect
                label="NPC loadout"
                options={loadoutOptions}
                value={wizard.npcLoadoutId ?? undefined}
                onChange={(value) => {
                  updateWizard((current) => ({ ...current, npcLoadoutId: value ?? null }));
                  resetTemplateSlices();
                }}
                description="Optional authored loadout to layer onto the creature template."
              />
              <div className="border border-border/20 bg-background/55 px-4 py-4 md:col-span-2">
                <div className="text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                  Template handoff
                </div>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Changing the creature or loadout rebuilds body, doctrine, faith, and gear slices from the server preview so the draft stays aligned with authored defaults.
                </p>
              </div>
            </div>
          ) : null}

          {wizard.currentStep === "capabilities" ? (
            <div className="grid gap-4 xl:grid-cols-2">
              <SearchableMultiSelect
                label="Mutations"
                options={mutationOptions}
                values={wizard.body?.mutationRefs.map((entry) => entry.id) ?? []}
                onChange={(values) =>
                  mutateDraftState((state) => {
                    state.body.mutationRefs = registryRefs("mutation", values);
                  })
                }
              />
              <SearchableMultiSelect
                label="Bionics"
                options={bionicOptions}
                values={wizard.body?.bionicRefs.map((entry) => entry.id) ?? []}
                onChange={(values) =>
                  mutateDraftState((state) => {
                    state.body.bionicRefs = registryRefs("bionic", values);
                  })
                }
              />
              <SearchableMultiSelect
                label="Grimoires"
                options={grimoireOptions}
                values={wizard.magic?.grimoireRefs.map((entry) => entry.id) ?? []}
                onChange={(values) =>
                  mutateDraftState((state) => {
                    state.magic.grimoireRefs = registryRefs("grimoire", values);
                  })
                }
              />
              <SearchableMultiSelect
                label="Known spells"
                options={spellOptions}
                values={wizard.magic?.knownSpellRefs.map((entry) => entry.id) ?? []}
                onChange={(values) =>
                  mutateDraftState((state) => {
                    state.magic.knownSpellRefs = registryRefs("spell", values);
                  })
                }
              />
              <SearchableMultiSelect
                label="Prepared spells"
                options={spellOptions}
                values={wizard.magic?.preparedSpellRefs.map((entry) => entry.id) ?? []}
                onChange={(values) =>
                  mutateDraftState((state) => {
                    state.magic.preparedSpellRefs = registryRefs("spell", values);
                  })
                }
              />
              <SearchableSingleSelect
                label="Pantheon"
                options={pantheonOptions}
                value={wizard.faith?.pantheonRef?.id}
                onChange={(value) =>
                  mutateDraftState((state) => {
                    state.faith.pantheonRef = value ? registryRef("pantheon", value) : undefined;
                  })
                }
              />
              <SearchableSingleSelect
                label="Patron"
                options={patronOptions}
                value={wizard.faith?.patronRef?.id}
                onChange={(value) =>
                  mutateDraftState((state) => {
                    state.faith.patronRef = value ? registryRef("patron", value) : undefined;
                  })
                }
              />
              <SearchableMultiSelect
                label="Boons"
                options={boonOptions}
                values={wizard.faith?.boonRefs.map((entry) => entry.id) ?? []}
                onChange={(values) =>
                  mutateDraftState((state) => {
                    state.faith.boonRefs = registryRefs("boon", values);
                  })
                }
              />
              <SearchableMultiSelect
                label="Covenants"
                options={covenantOptions}
                values={wizard.faith?.covenantRefs.map((entry) => entry.id) ?? []}
                onChange={(values) =>
                  mutateDraftState((state) => {
                    state.faith.covenantRefs = registryRefs("covenant", values);
                  })
                }
              />
              <SearchableMultiSelect
                label="Relics"
                options={relicOptions}
                values={wizard.faith?.relicRefs.map((entry) => entry.id) ?? []}
                onChange={(values) =>
                  mutateDraftState((state) => {
                    state.faith.relicRefs = registryRefs("relic", values);
                  })
                }
              />
              <div className="grid gap-3 md:grid-cols-2 xl:col-span-2">
                {RESOURCE_KEYS.map((key) => {
                  const resource = wizard.resources?.[key];
                  return (
                    <div key={key} className="grid gap-2 grid-cols-2">
                      <Input
                        value={resource?.current ?? 0}
                        type="number"
                        onChange={(event) =>
                          mutateDraftState((state) => {
                            state.resources[key] = {
                              current: Number(event.target.value || 0),
                              maximum: state.resources[key]?.maximum ?? 0,
                            };
                          })
                        }
                        placeholder={`${key} current`}
                      />
                      <Input
                        value={resource?.maximum ?? 0}
                        type="number"
                        onChange={(event) =>
                          mutateDraftState((state) => {
                            state.resources[key] = {
                              current: state.resources[key]?.current ?? 0,
                              maximum: Number(event.target.value || 0),
                            };
                          })
                        }
                        placeholder={`${key} max`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {wizard.currentStep === "gear" ? (
            <div className="flex flex-col gap-5">
              <div className="grid gap-3 md:grid-cols-3">
                {visibleDenominations.map((denomination) => (
                  <CompactTextField
                    key={denomination}
                    id={`currency-${denomination}`}
                    label={getCurrencyFieldLabel(denomination)}
                    type="number"
                    value={String(readCurrencyAmount(wizard.inventory?.currency, denomination))}
                    onChange={(value) =>
                      mutateDraftState((state) => {
                        const nextCurrency: CurrencyMap = writeCurrencyAmount(
                          state.inventory.currency as CurrencyMap,
                          denomination,
                          Number(value || 0),
                          options.defaultCurrency,
                        );
                        state.inventory.currency = nextCurrency;
                      })
                    }
                  />
                ))}
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                <SearchableSingleSelect
                  label="Add inventory stack"
                  options={inventoryCatalogOptions}
                  value={inventorySelection}
                  onChange={setInventorySelection}
                  placeholder="Search inventory definitions"
                />
                <div className="flex flex-wrap gap-2 self-end">
                  <Button
                    type="button"
                    size="sm"
                    disabled={!inventorySelection}
                    onClick={() => {
                      if (!inventorySelection) {
                        return;
                      }
                      const [kind, id] = inventorySelection.split(":");
                      applyInventoryMutation((state, catalog) => {
                        appendInventoryStack(state, { kind, id } as InventoryOwnedRef, catalog);
                      });
                      setInventorySelection(undefined);
                    }}
                  >
                    Add item
                  </Button>
                  {options.containerDefinitions.slice(0, 3).map((definition) => (
                    <Button
                      key={definition.label}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addContainer(definition.label)}
                    >
                      + {definition.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {(wizard.inventory?.items ?? []).map((item, index) => (
                  <Card key={`${item.ref.kind}:${item.ref.id}:${index}`} size="sm" className="border border-border/20 bg-background/50">
                    <CardContent className="grid gap-3 py-4 md:grid-cols-[1fr_auto]">
                      <div>
                        <div className="text-sm uppercase tracking-[0.18em] text-primary">
                          {inventoryLabelFromRef(options, item.ref)}
                        </div>
                        <div className="mt-2 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                          {getInventoryPlacementLabel(item)}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Input
                          type="number"
                          value={item.quantity}
                          className="h-8 w-20"
                          onChange={(event) =>
                            applyInventoryMutation((state, catalog) => {
                              updateInventoryStackQuantity(state, index, Number(event.target.value || 1), catalog);
                            })
                          }
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            applyInventoryMutation((state, catalog) => {
                              removeInventoryStackAtIndex(state, index, catalog);
                            })
                          }
                        >
                          Remove
                        </Button>
                        {!item.equippedSlot && !item.containerId && item.ref.kind !== "armor" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              applyInventoryMutation((state, catalog) => {
                                equipInventoryStackAtIndex(state, index, "mainHand", catalog);
                              })
                            }
                          >
                            Equip
                          </Button>
                        ) : null}
                        {!item.equippedSlot && !item.containerId && item.ref.kind === "armor" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              applyInventoryMutation((state, catalog) => {
                                equipInventoryStackAtIndex(state, index, "armor", catalog);
                              })
                            }
                          >
                            Armor
                          </Button>
                        ) : null}
                        {wizard.inventory?.containers[0] && !item.containerId && !item.equippedSlot ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              applyInventoryMutation((state, catalog) => {
                                moveInventoryStackToContainerAtIndex(
                                  state,
                                  index,
                                  wizard.inventory?.containers[0]?.id ?? "",
                                  catalog,
                                );
                              })
                            }
                          >
                            Stow
                          </Button>
                        ) : null}
                        {item.equippedSlot ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              applyInventoryMutation((state, catalog) => {
                                stowEquippedInventoryStackAtIndex(state, index, catalog);
                              })
                            }
                          >
                            Unequip
                          </Button>
                        ) : null}
                        {item.containerId ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              applyInventoryMutation((state, catalog) => {
                                removeInventoryStackFromContainerAtIndex(state, index, catalog);
                              })
                            }
                          >
                            Remove from container
                          </Button>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : null}

          {wizard.currentStep === "review" ? (
            <div className="flex flex-col gap-6">
              <div className="grid gap-3 md:grid-cols-3">
                <MetricBlock label="Preview" value={preview ? "Live" : "Locked"} accent />
                <MetricBlock label="Issues" value={String(validationIssues.length)} />
                <MetricBlock label="Editor handoff" value={preview?.validation.ok ? "Ready" : "Pending"} />
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricBlock label="Display name" value={preview?.combatProfile.displayName ?? wizard.name.trim()} />
                <MetricBlock label="Movement" value={preview ? `${preview.combatProfile.movement.land} land` : "Syncing"} />
                <MetricBlock label="Initiative" value={preview ? String(preview.combatProfile.initiative) : "Syncing"} />
                <MetricBlock label="Attack options" value={preview ? String(preview.combatProfile.attackOptions.length) : "Syncing"} />
              </div>

              {validationIssues.length ? (
                <div className="flex flex-col gap-3">
                  {validationIssues.map((issue, index) => (
                    <Card key={`${issue.path}-${index}`} size="sm" className="border border-secondary/35 bg-secondary/10">
                      <CardHeader className="gap-1">
                        <CardTitle className="text-[0.68rem] uppercase tracking-[0.18em] text-secondary">
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
                    disabled={!preview?.validation.ok || isCreating}
                  >
                    <ShieldCheckIcon />
                    {isCreating ? "Forging Draft" : "Forge Draft And Open Editor"}
                  </Button>
                ) : (
                  <SignInButton mode="modal">
                    <Button size="lg">
                      <SignInIcon />
                      Sign In To Forge Draft
                    </Button>
                  </SignInButton>
                )}
                <Button asChild variant="outline" size="lg">
                  <Link href="/npcs">Open manager</Link>
                </Button>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          disabled={wizard.currentStep === "identity"}
          onClick={() => updateCurrentStep(GUIDED_STEPS[Math.max(0, stepIndex(wizard.currentStep) - 1)]!)}
        >
          Back
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setWizard(defaultWizardState());
            hydratedTemplateKeyRef.current = null;
            if (storageKey) {
              window.localStorage.removeItem(storageKey);
            }
          }}
        >
          Start over
        </Button>
        {wizard.currentStep !== "review" ? (
          <Button
            className="amber-glow"
            onClick={() =>
              updateCurrentStep(
                GUIDED_STEPS[Math.min(GUIDED_STEPS.length - 1, stepIndex(wizard.currentStep) + 1)]!,
              )
            }
            disabled={stepIndex(wizard.currentStep) >= maxUnlockedStep}
          >
            <SparkleIcon />
            Continue
          </Button>
        ) : null}
      </div>
    </div>
  );
}
