import type { CharacterState } from "@bugchud/core";
import type {
  BionicDefinition,
  DreamDefinition,
} from "@bugchud/core/content";
import type { DefinitionKind, RegistryRef } from "@bugchud/core/foundation";
import {
  applyResolvedArcyneSpellSelectionToState,
  getArcyneSpellSelectionIssues,
  resolveArcyneSpellSelection,
} from "./character-spell-preparation";

export type GuidedBackgroundSpecialSelections = {
  geneFreekMutationIds: string[];
  overclockedBionicId: string | null;
  sterileTyrantCutthroatCount: number | null;
  arcyneKnownSpellIds: string[];
  arcynePreparedSpellSlotsById: Record<string, number>;
};

export type GuidedBackgroundSpecialActivity = {
  geneFreek: boolean;
  overclocked: boolean;
  dreadTongued: boolean;
  sterileTyrant: boolean;
  arcynePotential: boolean;
};

type GuidedBackgroundSpecialDreams = {
  geneFreek: DreamDefinition | null;
  overclocked: DreamDefinition | null;
  dreadTongued: DreamDefinition | null;
  sterileTyrant: DreamDefinition | null;
  arcynePotential: DreamDefinition | null;
};

type DreamRefLike = {
  id: string;
};

type SanitizeGuidedBackgroundSpecialSelectionsArgs = {
  selections: GuidedBackgroundSpecialSelections;
  active: GuidedBackgroundSpecialActivity;
  validMutationIds: ReadonlySet<string>;
  validMajorBionicIds: ReadonlySet<string>;
  validSpellIds: ReadonlySet<string>;
  lockedKnownSpellIds?: readonly string[];
};

type ValidateGuidedBackgroundSpecialSelectionsArgs =
  SanitizeGuidedBackgroundSpecialSelectionsArgs;

type ApplyGuidedBackgroundSpecialSelectionsArgs = {
  state: CharacterState;
  dreams: readonly DreamDefinition[];
  validSpellIds: ReadonlySet<string>;
  selections: GuidedBackgroundSpecialSelections;
};

const SPECIAL_DREAM_IDS = {
  geneFreek: "gene-freek",
  overclocked: "overclocked",
  dreadTongued: "dread-tongued",
  sterileTyrant: "sterile-tyrant",
  arcynePotential: "arcyne-potential",
} as const;

export const EMPTY_GUIDED_BACKGROUND_SPECIAL_SELECTIONS: GuidedBackgroundSpecialSelections =
  {
    geneFreekMutationIds: [],
    overclockedBionicId: null,
    sterileTyrantCutthroatCount: null,
    arcyneKnownSpellIds: [],
    arcynePreparedSpellSlotsById: {},
  };

function dedupeStrings(values: readonly string[]) {
  return [...new Set(values)];
}

function dedupeRegistryRefs<TKind extends DefinitionKind>(
  refs: readonly RegistryRef<TKind>[],
): RegistryRef<TKind>[] {
  const seen = new Set<string>();
  const deduped: RegistryRef<TKind>[] = [];

  for (const refValue of refs) {
    const key = `${refValue.kind}:${refValue.id}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    deduped.push(refValue);
  }

  return deduped;
}

function getGuidedBackgroundSpecialDreamMap(
  dreams: readonly DreamDefinition[],
): GuidedBackgroundSpecialDreams {
  const byKey = new Map(
    dreams.flatMap((dream) => [
      [dream.id, dream] as const,
      [dream.slug, dream] as const,
    ]),
  );

  return {
    geneFreek: byKey.get(SPECIAL_DREAM_IDS.geneFreek) ?? null,
    overclocked: byKey.get(SPECIAL_DREAM_IDS.overclocked) ?? null,
    dreadTongued: byKey.get(SPECIAL_DREAM_IDS.dreadTongued) ?? null,
    sterileTyrant: byKey.get(SPECIAL_DREAM_IDS.sterileTyrant) ?? null,
    arcynePotential: byKey.get(SPECIAL_DREAM_IDS.arcynePotential) ?? null,
  };
}

function collectDreamIds(dreamRefs: readonly DreamRefLike[]) {
  return new Set(dreamRefs.map((dreamRef) => dreamRef.id));
}

export function getActiveGuidedBackgroundSpecials(
  dreamRefs: readonly DreamRefLike[],
): GuidedBackgroundSpecialActivity {
  const dreamIds = collectDreamIds(dreamRefs);
  const hasDream = (targetId: string) =>
    [...dreamIds].some((dreamId) => dreamId === targetId || dreamId.endsWith(`.${targetId}`));

  return {
    geneFreek: hasDream(SPECIAL_DREAM_IDS.geneFreek),
    overclocked: hasDream(SPECIAL_DREAM_IDS.overclocked),
    dreadTongued: hasDream(SPECIAL_DREAM_IDS.dreadTongued),
    sterileTyrant: hasDream(SPECIAL_DREAM_IDS.sterileTyrant),
    arcynePotential: hasDream(SPECIAL_DREAM_IDS.arcynePotential),
  };
}

export function getMajorBionicIds(
  bionics: readonly Pick<BionicDefinition, "id" | "surgeryCode">[],
) {
  return new Set(
    bionics
      .filter((bionic) => bionic.surgeryCode.startsWith("Major"))
      .map((bionic) => bionic.id),
  );
}

export function sanitizeGuidedBackgroundSpecialSelections({
  selections,
  active,
  validMutationIds,
  validMajorBionicIds,
  validSpellIds,
  lockedKnownSpellIds = [],
}: SanitizeGuidedBackgroundSpecialSelectionsArgs): GuidedBackgroundSpecialSelections {
  const geneFreekMutationIds = active.geneFreek
    ? dedupeStrings(selections.geneFreekMutationIds).filter((id) =>
        validMutationIds.has(id),
      )
    : [];

  const overclockedBionicId =
    active.overclocked &&
    selections.overclockedBionicId &&
    validMajorBionicIds.has(selections.overclockedBionicId)
      ? selections.overclockedBionicId
      : null;

  const sterileTyrantCutthroatCount =
    active.sterileTyrant &&
    typeof selections.sterileTyrantCutthroatCount === "number" &&
    Number.isInteger(selections.sterileTyrantCutthroatCount) &&
    selections.sterileTyrantCutthroatCount > 0
      ? selections.sterileTyrantCutthroatCount
      : null;

  const arcyneSelection = active.arcynePotential
    ? resolveArcyneSpellSelection({
        selectedKnownSpellIds: selections.arcyneKnownSpellIds,
        lockedKnownSpellIds,
        preparedSlotsBySpellId: selections.arcynePreparedSpellSlotsById,
        validSpellIds,
      })
    : resolveArcyneSpellSelection({
        selectedKnownSpellIds: [],
        preparedSlotsBySpellId: {},
        validSpellIds,
      });

  return {
    geneFreekMutationIds,
    overclockedBionicId,
    sterileTyrantCutthroatCount,
    arcyneKnownSpellIds: arcyneSelection.selectedKnownSpellIds,
    arcynePreparedSpellSlotsById: arcyneSelection.preparedSlotsBySpellId,
  };
}

export function validateGuidedBackgroundSpecialSelections({
  selections,
  active,
  validMutationIds,
  validMajorBionicIds,
  validSpellIds,
  lockedKnownSpellIds = [],
}: ValidateGuidedBackgroundSpecialSelectionsArgs) {
  const issues: string[] = [];

  if (active.geneFreek) {
    if (selections.geneFreekMutationIds.length !== 2) {
      issues.push("Gene-Freek requires exactly two mutation picks.");
    }
    for (const mutationId of selections.geneFreekMutationIds) {
      if (!validMutationIds.has(mutationId)) {
        issues.push("Gene-Freek includes an unknown mutation selection.");
        break;
      }
    }
  }

  if (active.overclocked) {
    if (!selections.overclockedBionicId) {
      issues.push("Overclocked requires one major bionic selection.");
    } else if (!validMajorBionicIds.has(selections.overclockedBionicId)) {
      issues.push("Overclocked must use a major bionic selection.");
    }
  }

  if (active.sterileTyrant) {
    if (
      selections.sterileTyrantCutthroatCount === null ||
      !Number.isInteger(selections.sterileTyrantCutthroatCount) ||
      selections.sterileTyrantCutthroatCount <= 0
    ) {
      issues.push("Sterile-Tyrant requires a resolved cutthroat follower count.");
    }
  }

  if (active.arcynePotential) {
    for (const spellId of selections.arcyneKnownSpellIds) {
      if (!validSpellIds.has(spellId)) {
        issues.push("Arcyne Potential includes an unknown spell selection.");
        break;
      }
    }

    const knownSpellIds = new Set([
      ...lockedKnownSpellIds,
      ...selections.arcyneKnownSpellIds,
    ]);
    for (const spellId of Object.keys(selections.arcynePreparedSpellSlotsById)) {
      if (!knownSpellIds.has(spellId)) {
        issues.push(
          "Arcyne Potential prepared slots must come from selected known spells.",
        );
        break;
      }
    }

    const arcyneSelection = resolveArcyneSpellSelection({
      selectedKnownSpellIds: selections.arcyneKnownSpellIds,
      lockedKnownSpellIds,
      preparedSlotsBySpellId: selections.arcynePreparedSpellSlotsById,
      validSpellIds,
    });
    issues.push(...getArcyneSpellSelectionIssues(arcyneSelection));
  }

  return issues;
}

export function getDreadTonguedAutoGrants(
  dreams: readonly DreamDefinition[],
  dreamRefs: readonly DreamRefLike[],
) {
  const { dreadTongued } = getGuidedBackgroundSpecialDreamMap(dreams);
  const active = getActiveGuidedBackgroundSpecials(dreamRefs).dreadTongued;

  if (!active || !dreadTongued) {
    return {
      active: false,
      languages: [] as string[],
      spellIds: [] as string[],
    };
  }

  return {
    active: true,
    languages: dedupeStrings(
      dreadTongued.grants.flatMap((grant) =>
        grant.kind === "language" ? [grant.language] : [],
      ),
    ),
    spellIds: dedupeStrings(
      dreadTongued.grants.flatMap((grant) =>
        grant.kind === "spellAccess"
          ? (grant.spellRefs ?? []).map((spellRef) => spellRef.id)
          : [],
      ),
    ),
  };
}

export function getSterileTyrantFollowerLabel(dreams: readonly DreamDefinition[]) {
  const { sterileTyrant } = getGuidedBackgroundSpecialDreamMap(dreams);
  return (
    sterileTyrant?.grants.find((grant) => grant.kind === "follower")?.label ??
    "Cutthroats"
  );
}

export function applyGuidedBackgroundSpecialSelectionsToState({
  state,
  dreams,
  validSpellIds,
  selections,
}: ApplyGuidedBackgroundSpecialSelectionsArgs): CharacterState {
  const next = structuredClone(state);
  const active = getActiveGuidedBackgroundSpecials(next.progression.dreamRefs);
  const dreamMap = getGuidedBackgroundSpecialDreamMap(dreams);

  if (active.geneFreek && selections.geneFreekMutationIds.length > 0) {
    next.body.mutationRefs = dedupeRegistryRefs([
      ...next.body.mutationRefs,
      ...selections.geneFreekMutationIds.map(
        (mutationId) =>
          ({
            kind: "mutation",
            id: mutationId,
          }) as RegistryRef<"mutation">,
      ),
    ]);
  }

  if (active.overclocked && selections.overclockedBionicId) {
    next.body.bionicRefs = dedupeRegistryRefs([
      ...next.body.bionicRefs,
      ({
        kind: "bionic",
        id: selections.overclockedBionicId,
      }) as RegistryRef<"bionic">,
    ]);
  }

  if (active.dreadTongued && dreamMap.dreadTongued) {
    const dreadTonguedGrants = getDreadTonguedAutoGrants(
      dreams,
      next.progression.dreamRefs,
    );

    next.social.languages = dedupeStrings([
      ...next.social.languages,
      ...dreadTonguedGrants.languages,
    ]);
    next.magic.knownSpellRefs = dedupeRegistryRefs([
      ...next.magic.knownSpellRefs,
      ...dreadTonguedGrants.spellIds.map(
        (spellId) =>
          ({
            kind: "spell",
            id: spellId,
          }) as RegistryRef<"spell">,
      ),
    ]);
  }

  if (active.arcynePotential && dreamMap.arcynePotential) {
    const arcyneSelection = resolveArcyneSpellSelection({
      selectedKnownSpellIds: selections.arcyneKnownSpellIds,
      lockedKnownSpellIds: next.magic.knownSpellRefs.map((spellRef) => spellRef.id),
      preparedSlotsBySpellId: selections.arcynePreparedSpellSlotsById,
      validSpellIds,
    });

    applyResolvedArcyneSpellSelectionToState(next, arcyneSelection);
  }

  if (
    active.sterileTyrant &&
    dreamMap.sterileTyrant &&
    selections.sterileTyrantCutthroatCount !== null
  ) {
    const followerLabel = getSterileTyrantFollowerLabel(dreams);
    next.social.followers = [
      ...next.social.followers.filter(
        (follower) => follower.label !== followerLabel,
      ),
      {
        label: followerLabel,
        quantity: selections.sterileTyrantCutthroatCount,
      },
    ];
  }

  return next;
}
