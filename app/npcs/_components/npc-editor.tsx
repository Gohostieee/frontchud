"use client";

import {
  startTransition,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CheckCircleIcon,
  FloppyDiskIcon,
  ShieldCheckIcon,
  SignInIcon,
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
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
import type { Doc } from "@/convex/_generated/dataModel";
import {
  CompactTextField,
  CompactTextareaField,
  SearchableMultiSelect,
  SearchableSingleSelect,
  type SearchOption,
} from "../../characters/_components/character-editor-controls";

const NPC_EDITOR_STEP = "template" as const;
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
const ATTRIBUTE_KEYS = ["twitch", "flesh", "mojo", "glory"] as const;
const DERIVED_STAT_KEYS = ["sprint", "skill", "bones", "manaDiceMax", "focus"] as const;
const RESOURCE_LABELS: Record<(typeof RESOURCE_KEYS)[number], string> = {
  focus: "Focus",
  xom: "XOM",
  ammo: "Ammo",
  currency: "Currency Pool",
  health: "Health",
  manaDice: "Mana Dice",
  fate: "Fate",
  fuel: "Fuel",
  morale: "Morale",
  supplies: "Supplies",
  durability: "Durability",
  shieldIntegrity: "Shield Integrity",
};
const ATTRIBUTE_LABELS: Record<(typeof ATTRIBUTE_KEYS)[number], string> = {
  twitch: "Twitch",
  flesh: "Flesh",
  mojo: "Mojo",
  glory: "Glory",
};
const DERIVED_STAT_LABELS: Record<(typeof DERIVED_STAT_KEYS)[number], string> = {
  sprint: "Sprint",
  skill: "Skill",
  bones: "Bones",
  manaDiceMax: "Mana Dice Max",
  focus: "Derived Focus",
};

type SaveState = "idle" | "saving" | "saved" | "error";
type NpcDoc = Doc<"npcs">;
type AnyRegistryRef = { kind: string | number | boolean | bigint; id: string };
type Preview = {
  normalizedState: NpcState;
  validation: {
    ok: boolean;
    issues: ValidationIssue[];
  };
  combatProfile: ComputedCombatProfile;
};
type EditorOptions = {
  rulesetId: string;
  rulesetVersion: string;
  templates: {
    creatures: CreatureDefinition[];
  };
  body: {
    mutations: MutationDefinition[];
    bionics: BionicDefinition[];
  };
  doctrine: {
    grimoires: GrimoireDefinition[];
    spells: SpellDefinition[];
    pantheons: PantheonDefinition[];
    patrons: PatronDefinition[];
    boons: BoonDefinition[];
    covenants: CovenantDefinition[];
    relics: RelicDefinition[];
  };
  gear: {
    items: ItemDefinition[];
    weapons: WeaponDefinition[];
    armors: ArmorDefinition[];
    shields: ShieldDefinition[];
    containerDefinitions: readonly ContainerDefinition[];
    denominations: string[];
    defaultCurrency: string;
  };
};

function cloneState<T>(value: T): T {
  return structuredClone(value);
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

function normalizeNpcCurrencyState<
  State extends { inventory: { currency: Record<string, number> } },
>(state: State, defaultCurrency: string): State {
  return {
    ...state,
    inventory: {
      ...state.inventory,
      currency: normalizeCurrencyAliases(state.inventory.currency, defaultCurrency),
    },
  };
}

function inventoryLabelFromRef(options: EditorOptions, refValue: AnyRegistryRef) {
  return (
    options.gear.items.find((entry) => entry.id === refValue.id)?.name ??
    options.gear.weapons.find((entry) => entry.id === refValue.id)?.name ??
    options.gear.armors.find((entry) => entry.id === refValue.id)?.name ??
    options.gear.shields.find((entry) => entry.id === refValue.id)?.name ??
    options.doctrine.grimoires.find((entry) => entry.id === refValue.id)?.name ??
    options.doctrine.relics.find((entry) => entry.id === refValue.id)?.name ??
    refValue.id
  );
}

function getSaveTone(saveState: SaveState) {
  if (saveState === "saved") return "default";
  if (saveState === "error") return "destructive";
  return "outline";
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
          : FloppyDiskIcon;

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
            NPC editor
          </Badge>
          <CardTitle className="font-display text-4xl font-black tracking-[-0.06em] text-primary">
            {title}
          </CardTitle>
          <CardDescription className="max-w-xl text-sm leading-7 text-muted-foreground">
            {detail}
          </CardDescription>
        </CardHeader>
        {action ? <CardContent className="py-5">{action}</CardContent> : null}
      </Card>
    </div>
  );
}

function EditorSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Card className="ritual-surface border border-border/20 bg-background/68">
      <CardHeader className="gap-3 border-b border-border/20 pb-5">
        <CardTitle className="font-display text-3xl font-black tracking-[-0.05em] text-primary">
          {title}
        </CardTitle>
        <CardDescription className="max-w-3xl text-sm leading-7 text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-6">{children}</CardContent>
    </Card>
  );
}

function SummaryMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border/20 bg-background/55 px-4 py-3">
      <div className="text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 text-sm uppercase tracking-[0.14em] text-foreground">{value}</div>
    </div>
  );
}

function ResourceEditorRow({
  label,
  currentValue,
  maxValue,
  onCurrentChange,
  onMaxChange,
}: {
  label: string;
  currentValue: number;
  maxValue: number;
  onCurrentChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}) {
  return (
    <Card size="sm" className="border border-border/20 bg-background/50">
      <CardContent className="grid gap-4 py-4 md:grid-cols-[14rem_1fr_1fr] md:items-end">
        <div className="text-sm uppercase tracking-[0.18em] text-primary">{label}</div>
        <Field>
          <FieldLabel htmlFor={`${label}-current`}>Current</FieldLabel>
          <Input
            id={`${label}-current`}
            type="number"
            value={currentValue}
            onChange={(event) => onCurrentChange(event.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${label}-max`}>Max</FieldLabel>
          <Input
            id={`${label}-max`}
            type="number"
            value={maxValue}
            onChange={(event) => onMaxChange(event.target.value)}
          />
        </Field>
      </CardContent>
    </Card>
  );
}

export function NpcEditor({ bugchudId }: { bugchudId: string }) {
  const { isLoaded, isSignedIn } = useAuth();
  const npc = useQuery(api.npcs.getMine, isSignedIn ? { bugchudId } : "skip") as
    | NpcDoc
    | null
    | undefined;
  const editorOptions = useQuery(api.ruleset.getNpcEditorOptions, {}) as
    | EditorOptions
    | undefined;
  const saveDraft = useMutation(api.npcs.saveDraft);
  const completeDraft = useMutation(api.npcs.completeDraft);
  const deferredNpc = useDeferredValue(npc);

  const [draftState, setDraftState] = useState<NpcState | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveMessage, setSaveMessage] = useState("Synced");
  const [surfaceError, setSurfaceError] = useState<string | null>(null);
  const [inventorySelection, setInventorySelection] = useState<string | undefined>(undefined);
  const [activeConditionsText, setActiveConditionsText] = useState("[]");
  const [activeConditionsError, setActiveConditionsError] = useState<string | null>(null);
  const [activeEffectsText, setActiveEffectsText] = useState("[]");
  const [activeEffectsError, setActiveEffectsError] = useState<string | null>(null);

  const draft = useMemo(
    () =>
      editorOptions
        ? draftState
          ? normalizeNpcCurrencyState(draftState, editorOptions.gear.defaultCurrency)
          : deferredNpc
            ? normalizeNpcCurrencyState(
                cloneState(deferredNpc.state),
                editorOptions.gear.defaultCurrency,
              )
            : null
        : draftState ?? (deferredNpc ? cloneState(deferredNpc.state) : null),
    [deferredNpc, draftState, editorOptions],
  );

  const visibleDenominations = useMemo(
    () =>
      editorOptions
        ? getVisibleCurrencyDenominations(
            editorOptions.gear.denominations,
            editorOptions.gear.defaultCurrency,
          )
        : [],
    [editorOptions],
  );

  const normalizedDraft = useMemo(
    () =>
      draft
        ? normalizeNpcCurrencyState(draft, editorOptions?.gear.defaultCurrency ?? "zennies")
        : null,
    [draft, editorOptions],
  );

  const preview = useQuery(
    api.npcs.previewDraft,
    isSignedIn && normalizedDraft ? ({ state: normalizedDraft } as never) : "skip",
  ) as Preview | undefined;

  const templatePreview = useQuery(
    api.npcs.previewInitialization,
    isSignedIn && normalizedDraft
      ? ({
          input: {
            name: normalizedDraft.identity.name,
            actorKind: normalizedDraft.actorKind,
            allegiance: normalizedDraft.identity.allegiance,
            creatureRef: normalizedDraft.identity.creatureRef,
            tags: normalizedDraft.tags ?? [],
          },
        } as never)
      : "skip",
  ) as Preview | undefined;

  const inventoryCatalog = useMemo<InventoryPlacementCatalog | null>(() => {
    if (!editorOptions) {
      return null;
    }

    return buildInventoryPlacementCatalog({
      items: editorOptions.gear.items,
      weapons: editorOptions.gear.weapons,
      armors: editorOptions.gear.armors,
      shields: editorOptions.gear.shields,
      grimoires: editorOptions.doctrine.grimoires,
      relics: editorOptions.doctrine.relics,
      containerDefinitions: editorOptions.gear.containerDefinitions,
    });
  }, [editorOptions]);

  const serializedDraft = useMemo(() => (draft ? JSON.stringify(draft) : null), [draft]);
  const serializedActiveConditions = useMemo(
    () => JSON.stringify(draft?.body.activeConditions ?? [], null, 2),
    [draft?.body.activeConditions],
  );
  const serializedActiveEffects = useMemo(
    () => JSON.stringify(draft?.activeEffects ?? [], null, 2),
    [draft?.activeEffects],
  );

  useEffect(() => {
    setActiveConditionsText(serializedActiveConditions);
  }, [serializedActiveConditions]);

  useEffect(() => {
    setActiveEffectsText(serializedActiveEffects);
  }, [serializedActiveEffects]);

  useEffect(() => {
    if (!draftState || !npc || !serializedDraft) {
      return;
    }

    const timeout = window.setTimeout(async () => {
      try {
        setSaveState("saving");
        setSaveMessage("Saving");
        await saveDraft({
          bugchudId,
          state: normalizeNpcCurrencyState(
            draftState,
            editorOptions?.gear.defaultCurrency ?? "zennies",
          ),
          currentStep: NPC_EDITOR_STEP,
        } as never);
        setSaveState("saved");
        setSaveMessage("Saved");
      } catch (error) {
        setSaveState("error");
        setSaveMessage("Save failed");
        setSurfaceError(error instanceof Error ? error.message : "Draft save failed.");
      }
    }, 800);

    return () => window.clearTimeout(timeout);
  }, [bugchudId, draftState, editorOptions?.gear.defaultCurrency, npc, saveDraft, serializedDraft]);

  function mutateDraft(mutator: (state: NpcState & InventoryPlacementStateLike) => void) {
    startTransition(() => {
      setDraftState((current) => {
        const baseState = current ?? (npc ? cloneState(npc.state) : null);
        if (!baseState) {
          return current;
        }

        const nextState = cloneState(baseState) as NpcState & InventoryPlacementStateLike;
        mutator(nextState);
        return nextState;
      });
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

    mutateDraft((state) => {
      mutator(state, inventoryCatalog);
      syncInventoryPlacementState(state, inventoryCatalog);
    });
  }

  const creatureOptions = useMemo(
    () =>
      (editorOptions?.templates.creatures ?? [])
        .slice()
        .sort((left, right) => left.name.localeCompare(right.name))
        .map((entry) => toSearchOption(entry.id, entry.name, entry.summary, "CREATURE")),
    [editorOptions],
  );
  const mutationOptions = useMemo(
    () =>
      (editorOptions?.body.mutations ?? []).map((entry) =>
        toSearchOption(entry.id, entry.name, entry.summary),
      ),
    [editorOptions],
  );
  const bionicOptions = useMemo(
    () =>
      (editorOptions?.body.bionics ?? []).map((entry) =>
        toSearchOption(entry.id, entry.name, entry.summary),
      ),
    [editorOptions],
  );
  const grimoireOptions = useMemo(
    () =>
      (editorOptions?.doctrine.grimoires ?? []).map((entry) =>
        toSearchOption(entry.id, entry.name, entry.summary),
      ),
    [editorOptions],
  );
  const spellOptions = useMemo(
    () =>
      (editorOptions?.doctrine.spells ?? []).map((entry) =>
        toSearchOption(entry.id, entry.name, entry.summary, entry.school.toUpperCase()),
      ),
    [editorOptions],
  );
  const pantheonOptions = useMemo(
    () =>
      (editorOptions?.doctrine.pantheons ?? []).map((entry) =>
        toSearchOption(entry.id, entry.name, entry.summary),
      ),
    [editorOptions],
  );
  const patronOptions = useMemo(
    () =>
      (editorOptions?.doctrine.patrons ?? []).map((entry) =>
        toSearchOption(entry.id, entry.name, entry.summary),
      ),
    [editorOptions],
  );
  const boonOptions = useMemo(
    () =>
      (editorOptions?.doctrine.boons ?? []).map((entry) =>
        toSearchOption(entry.id, entry.name, entry.summary),
      ),
    [editorOptions],
  );
  const covenantOptions = useMemo(
    () =>
      (editorOptions?.doctrine.covenants ?? []).map((entry) =>
        toSearchOption(entry.id, entry.name, entry.summary),
      ),
    [editorOptions],
  );
  const relicOptions = useMemo(
    () =>
      (editorOptions?.doctrine.relics ?? []).map((entry) =>
        toSearchOption(entry.id, entry.name, entry.summary),
      ),
    [editorOptions],
  );
  const inventoryCatalogOptions = useMemo(
    () =>
      editorOptions
        ? [
            ...editorOptions.gear.items.map((entry) => ({
              value: `item:${entry.id}`,
              label: entry.name,
              description: entry.summary,
            })),
            ...editorOptions.gear.weapons.map((entry) => ({
              value: `weapon:${entry.id}`,
              label: entry.name,
              description: entry.summary,
            })),
            ...editorOptions.gear.armors.map((entry) => ({
              value: `armor:${entry.id}`,
              label: entry.name,
              description: entry.summary,
            })),
            ...editorOptions.gear.shields.map((entry) => ({
              value: `shield:${entry.id}`,
              label: entry.name,
              description: entry.summary,
            })),
            ...editorOptions.doctrine.grimoires.map((entry) => ({
              value: `grimoire:${entry.id}`,
              label: entry.name,
              description: entry.summary,
            })),
            ...editorOptions.doctrine.relics.map((entry) => ({
              value: `relic:${entry.id}`,
              label: entry.name,
              description: entry.summary,
            })),
          ]
        : [],
    [editorOptions],
  );

  if (!isLoaded) {
    return (
      <LoadingState
        title="Syncing Session"
        detail="Waiting for the auth session before opening the NPC workspace."
      />
    );
  }

  if (!isSignedIn) {
    return (
      <LoadingState
        title="Sign In Required"
        detail="NPC editing lives behind the protected archive."
        action={
          <SignInButton mode="modal">
            <Button>
              <SignInIcon />
              Authenticate
            </Button>
          </SignInButton>
        }
      />
    );
  }

  if (npc === undefined || !editorOptions || !draft) {
    return (
      <LoadingState
        title="Hydrating Workspace"
        detail="Loading the NPC document, editor options, and live preview."
      />
    );
  }

  if (npc === null) {
    return <LoadingState title="NPC Missing" detail="This entity is not available in your archive." />;
  }

  return (
    <div className="flex min-w-0 flex-col gap-6 pb-10">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline">NPC editor</Badge>
        <Badge variant={npc.status === "complete" ? "default" : "outline"}>
          {npc.status === "complete" ? "Complete" : "Editing"}
        </Badge>
        <SaveStatusBadge saveState={saveState} saveMessage={saveMessage} />
      </div>

      {surfaceError ? (
        <Card size="sm" className="border border-secondary/40 bg-secondary/12">
          <CardHeader className="gap-2">
            <CardTitle className="text-xs uppercase tracking-[0.18em] text-secondary">
              Workspace issue
            </CardTitle>
            <CardDescription className="text-xs leading-6 text-secondary-foreground">
              {surfaceError}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <EditorSection
        title="Identity"
        description="Set the display-facing basics first. These fields stay intact when you reapply the template."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <CompactTextField
            id="npc-name"
            label="Display name"
            value={draft.identity.name}
            onChange={(value) =>
              mutateDraft((state) => {
                state.identity.name = value;
              })
            }
          />
          <CompactTextField
            id="npc-allegiance"
            label="Allegiance"
            value={draft.identity.allegiance ?? ""}
            onChange={(value) =>
              mutateDraft((state) => {
                state.identity.allegiance = value || undefined;
              })
            }
          />
          <CompactTextField
            id="npc-tags"
            label="Tags"
            value={(draft.tags ?? []).join(", ")}
            onChange={(value) =>
              mutateDraft((state) => {
                state.tags = value
                  .split(",")
                  .map((entry) => entry.trim())
                  .filter(Boolean);
              })
            }
            description="Comma-separated labels for search and grouping."
          />
          <Field>
            <FieldLabel>Actor kind</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {(["npc", "creature", "mount"] as const).map((kind) => (
                <Button
                  key={kind}
                  variant={draft.actorKind === kind ? "default" : "outline"}
                  size="xs"
                  onClick={() =>
                    mutateDraft((state) => {
                      state.actorKind = kind;
                    })
                  }
                >
                  {kind}
                </Button>
              ))}
            </div>
            <FieldDescription>Use this to distinguish NPCs, creatures, and mounts.</FieldDescription>
          </Field>
        </div>
      </EditorSection>

      <EditorSection
        title="Template"
        description="Choose the creature template here. Reapplying it rebuilds generated slices without overwriting identity fields."
      >
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <SearchableSingleSelect
            label="Template"
            options={creatureOptions}
            value={draft.identity.creatureRef.id}
            onChange={(value) =>
              mutateDraft((state) => {
                if (value) {
                  state.identity.creatureRef = registryRef("creature", value);
                }
              })
            }
          />
          <Button
            variant="outline"
            onClick={() => {
              if (!templatePreview) {
                return;
              }
              mutateDraft((state) => {
                state.body = cloneState(templatePreview.normalizedState.body);
                state.inventory = cloneState(templatePreview.normalizedState.inventory) as never;
                state.loadout = cloneState(templatePreview.normalizedState.loadout) as never;
                state.magic = cloneState(templatePreview.normalizedState.magic);
                state.faith = cloneState(templatePreview.normalizedState.faith);
                state.resources = cloneState(templatePreview.normalizedState.resources);
                state.activeEffects = cloneState(templatePreview.normalizedState.activeEffects);
              });
            }}
            disabled={!templatePreview}
          >
            Apply Template
          </Button>
        </div>
        <div className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {templatePreview ? "Template preview ready." : "Preparing template preview."}
        </div>
      </EditorSection>

      <EditorSection
        title="Stats"
        description="Directly tune the core attribute and derived-stat values the draft is carrying right now."
      >
        <div className="grid gap-4 xl:grid-cols-2">
          <div className="grid gap-3 md:grid-cols-2">
            {ATTRIBUTE_KEYS.map((key) => (
              <CompactTextField
                key={key}
                id={`attr-${key}`}
                label={ATTRIBUTE_LABELS[key]}
                type="number"
                value={String(draft.attributes[key])}
                onChange={(value) =>
                  mutateDraft((state) => {
                    state.attributes[key] = Number(value || 0);
                  })
                }
              />
            ))}
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {DERIVED_STAT_KEYS.map((key) => (
              <CompactTextField
                key={key}
                id={`derived-${key}`}
                label={DERIVED_STAT_LABELS[key]}
                type="number"
                value={String(draft.derivedStats[key])}
                onChange={(value) =>
                  mutateDraft((state) => {
                    state.derivedStats[key] = Number(value || 0);
                  })
                }
              />
            ))}
          </div>
        </div>
      </EditorSection>

      <EditorSection
        title="Resources"
        description="Every resource is labeled explicitly so current and max values are easy to read at a glance."
      >
        <div className="grid gap-3">
          {RESOURCE_KEYS.map((key) => (
            <ResourceEditorRow
              key={key}
              label={RESOURCE_LABELS[key]}
              currentValue={draft.resources[key]?.current ?? 0}
              maxValue={draft.resources[key]?.maximum ?? 0}
              onCurrentChange={(value) =>
                mutateDraft((state) => {
                  state.resources[key] = {
                    current: Number(value || 0),
                    maximum: state.resources[key]?.maximum ?? 0,
                  };
                })
              }
              onMaxChange={(value) =>
                mutateDraft((state) => {
                  state.resources[key] = {
                    current: state.resources[key]?.current ?? 0,
                    maximum: Number(value || 0),
                  };
                })
              }
            />
          ))}
        </div>
      </EditorSection>

      <EditorSection
        title="Mutations And Bionics"
        description="Adjust physical alterations and body-level changes without leaving the main editor."
      >
        <div className="grid gap-4 xl:grid-cols-2">
          <SearchableMultiSelect
            label="Mutations"
            options={mutationOptions}
            values={draft.body.mutationRefs.map((entry) => entry.id)}
            onChange={(values) =>
              mutateDraft((state) => {
                state.body.mutationRefs = registryRefs("mutation", values);
              })
            }
          />
          <SearchableMultiSelect
            label="Bionics"
            options={bionicOptions}
            values={draft.body.bionicRefs.map((entry) => entry.id)}
            onChange={(values) =>
              mutateDraft((state) => {
                state.body.bionicRefs = registryRefs("bionic", values);
              })
            }
          />
        </div>
      </EditorSection>

      <EditorSection
        title="Magic And Faith"
        description="Tune doctrine, spell access, and faith options in one place instead of separate steps."
      >
        <div className="grid gap-4 xl:grid-cols-2">
          <SearchableMultiSelect
            label="Grimoires"
            options={grimoireOptions}
            values={draft.magic.grimoireRefs.map((entry) => entry.id)}
            onChange={(values) =>
              mutateDraft((state) => {
                state.magic.grimoireRefs = registryRefs("grimoire", values);
              })
            }
          />
          <SearchableMultiSelect
            label="Known spells"
            options={spellOptions}
            values={draft.magic.knownSpellRefs.map((entry) => entry.id)}
            onChange={(values) =>
              mutateDraft((state) => {
                state.magic.knownSpellRefs = registryRefs("spell", values);
              })
            }
          />
          <SearchableMultiSelect
            label="Prepared spells"
            options={spellOptions}
            values={draft.magic.preparedSpellRefs.map((entry) => entry.id)}
            onChange={(values) =>
              mutateDraft((state) => {
                state.magic.preparedSpellRefs = registryRefs("spell", values);
              })
            }
          />
          <SearchableSingleSelect
            label="Pantheon"
            options={pantheonOptions}
            value={draft.faith.pantheonRef?.id}
            onChange={(value) =>
              mutateDraft((state) => {
                state.faith.pantheonRef = value ? registryRef("pantheon", value) : undefined;
              })
            }
          />
          <SearchableSingleSelect
            label="Patron"
            options={patronOptions}
            value={draft.faith.patronRef?.id}
            onChange={(value) =>
              mutateDraft((state) => {
                state.faith.patronRef = value ? registryRef("patron", value) : undefined;
              })
            }
          />
          <SearchableMultiSelect
            label="Boons"
            options={boonOptions}
            values={draft.faith.boonRefs.map((entry) => entry.id)}
            onChange={(values) =>
              mutateDraft((state) => {
                state.faith.boonRefs = registryRefs("boon", values);
              })
            }
          />
          <SearchableMultiSelect
            label="Covenants"
            options={covenantOptions}
            values={draft.faith.covenantRefs.map((entry) => entry.id)}
            onChange={(values) =>
              mutateDraft((state) => {
                state.faith.covenantRefs = registryRefs("covenant", values);
              })
            }
          />
          <SearchableMultiSelect
            label="Relics"
            options={relicOptions}
            values={draft.faith.relicRefs.map((entry) => entry.id)}
            onChange={(values) =>
              mutateDraft((state) => {
                state.faith.relicRefs = registryRefs("relic", values);
              })
            }
          />
        </div>
      </EditorSection>

      <EditorSection
        title="Inventory And Currency"
        description="Manage money, carried items, equipment, and containers without splitting gear into a separate workflow."
      >
        <div className="flex flex-col gap-5">
          <div className="grid gap-3 md:grid-cols-3">
            {visibleDenominations.map((denomination) => (
              <CompactTextField
                key={denomination}
                id={`currency-${denomination}`}
                label={getCurrencyFieldLabel(denomination)}
                type="number"
                value={String(readCurrencyAmount(draft.inventory.currency, denomination))}
                onChange={(value) =>
                  mutateDraft((state) => {
                    state.inventory.currency = writeCurrencyAmount(
                      state.inventory.currency,
                      denomination,
                      Number(value || 0),
                      editorOptions.gear.defaultCurrency,
                    );
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
              {editorOptions.gear.containerDefinitions.slice(0, 3).map((definition) => (
                <Button
                  key={definition.label}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    mutateDraft((state) => {
                      state.inventory.containers = [
                        ...state.inventory.containers,
                        {
                          id: crypto.randomUUID(),
                          label: definition.label,
                          capacity: definition.capacity,
                          occupiedSlots: 0,
                        },
                      ];
                    })
                  }
                >
                  + {definition.label}
                </Button>
              ))}
            </div>
          </div>

          {draft.inventory.containers.length ? (
            <div className="flex flex-wrap gap-2">
              {draft.inventory.containers.map((container) => (
                <Badge key={container.id} variant="outline">
                  {container.label} {container.occupiedSlots}/{container.capacity}
                </Badge>
              ))}
            </div>
          ) : null}

          <div className="flex flex-col gap-3">
            {(draft.inventory.items ?? []).map((item, index) => (
              <Card
                key={`${item.ref.kind}:${item.ref.id}:${index}`}
                size="sm"
                className="border border-border/20 bg-background/50"
              >
                <CardContent className="grid gap-3 py-4 md:grid-cols-[1fr_auto]">
                  <div>
                    <div className="text-sm uppercase tracking-[0.18em] text-primary">
                      {inventoryLabelFromRef(editorOptions, item.ref)}
                    </div>
                    <div className="mt-2 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                      {getInventoryPlacementLabel(item)}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Input
                      aria-label={`Quantity for ${inventoryLabelFromRef(editorOptions, item.ref)}`}
                      type="number"
                      value={item.quantity}
                      className="h-8 w-20"
                      onChange={(event) =>
                        applyInventoryMutation((state, catalog) => {
                          updateInventoryStackQuantity(
                            state,
                            index,
                            Number(event.target.value || 1),
                            catalog,
                          );
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
                    {draft.inventory.containers[0] && !item.containerId && !item.equippedSlot ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          applyInventoryMutation((state, catalog) => {
                            moveInventoryStackToContainerAtIndex(
                              state,
                              index,
                              draft.inventory.containers[0]?.id ?? "",
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
      </EditorSection>

      <EditorSection
        title="Validation And Finalize"
        description="Live validation and combat-profile feedback stay visible while you finish the draft."
      >
        <div className="flex flex-col gap-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <SummaryMetric label="Status" value={npc.status === "complete" ? "Complete" : "Editing"} />
            <SummaryMetric
              label="Validation"
              value={preview?.validation.ok ? "OK" : "Attention"}
            />
            <SummaryMetric label="Items" value={String(draft.inventory.items.length)} />
            <SummaryMetric
              label="Known spells"
              value={String(draft.magic.knownSpellRefs.length)}
            />
          </div>

          {preview?.validation.issues.length ? (
            <div className="flex flex-col gap-3">
              {preview.validation.issues.map((issue, index) => (
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
                      {issue.path}: {issue.message}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="border border-primary/25 bg-primary/8 px-4 py-3 text-sm leading-7 text-foreground/90">
              No validation issues detected. This draft can be finalized as a complete entity.
            </div>
          )}

          <div className="grid gap-4 lg:grid-cols-2">
            <Card size="sm" className="border border-border/20 bg-card/55">
              <CardHeader className="gap-2">
                <CardTitle className="text-xs uppercase tracking-[0.28em] text-primary">
                  Combat profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>{preview?.combatProfile.displayName ?? "Syncing"}</div>
                <div>Movement: {preview ? preview.combatProfile.movement.land : 0}</div>
                <div>Initiative: {preview ? preview.combatProfile.initiative : 0}</div>
                <div>Soak: {preview ? preview.combatProfile.soak : 0}</div>
                <div>
                  Attack options: {preview ? preview.combatProfile.attackOptions.length : 0}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={async () => {
                try {
                  setSurfaceError(null);
                  await completeDraft({
                    bugchudId,
                    state: normalizeNpcCurrencyState(
                      draft,
                      editorOptions?.gear.defaultCurrency ?? "zennies",
                    ),
                  } as never);
                  setSaveState("saved");
                  setSaveMessage("Completed");
                } catch (error) {
                  setSurfaceError(error instanceof Error ? error.message : "Finalize failed.");
                }
              }}
              disabled={!preview?.validation.ok || activeConditionsError !== null || activeEffectsError !== null}
            >
              <ShieldCheckIcon />
              Finalize entity
            </Button>
          </div>
        </div>
      </EditorSection>

      <Card className="border border-border/20 bg-background/68">
        <CardHeader className="gap-3 border-b border-border/20 pb-5">
          <CardTitle className="font-display text-2xl font-black tracking-[-0.04em] text-primary">
            Advanced
          </CardTitle>
          <CardDescription className="max-w-3xl text-sm leading-7 text-muted-foreground">
            Raw JSON editing stays available here when you need it, without crowding the main form.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-6">
          <Accordion type="single" collapsible defaultValue="effects">
            <AccordionItem value="effects">
              <AccordionTrigger>Raw effect state</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 xl:grid-cols-2">
                  <CompactTextareaField
                    id="active-conditions"
                    label="Active conditions JSON"
                    value={activeConditionsText}
                    onChange={(value) => {
                      setActiveConditionsText(value);
                      try {
                        const parsed = JSON.parse(value);
                        setActiveConditionsError(null);
                        mutateDraft((state) => {
                          state.body.activeConditions = parsed as NpcState["body"]["activeConditions"];
                        });
                      } catch {
                        setActiveConditionsError("Must be valid JSON.");
                      }
                    }}
                    error={activeConditionsError}
                  />
                  <CompactTextareaField
                    id="active-effects"
                    label="Active effects JSON"
                    value={activeEffectsText}
                    onChange={(value) => {
                      setActiveEffectsText(value);
                      try {
                        const parsed = JSON.parse(value);
                        setActiveEffectsError(null);
                        mutateDraft((state) => {
                          state.activeEffects = parsed as NpcState["activeEffects"];
                        });
                      } catch {
                        setActiveEffectsError("Must be valid JSON.");
                      }
                    }}
                    error={activeEffectsError}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
