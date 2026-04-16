import type { CharacterState } from "@bugchud/core";

export const CHARACTER_CREATOR_EXTENSION_NAMESPACE = "frontchudCharacterCreator";
export const SPELL_PREPARATION_EXTENSION_KEY = "spellPreparation";
export const ARCYNE_POTENTIAL_DREAM_ID = "arcyne-potential";
export const ARCYNE_PREPARED_SLOT_TOTAL = 8;

export type SpellPreparationCounts = Record<string, number>;

export type SpellPreparationPayload = {
  version: 1;
  preparedSlotsBySpellId: SpellPreparationCounts;
};

type SpellRefLike = {
  kind: string | number | boolean | bigint;
  id: string;
};

type CharacterMagicLikeState = {
  magic: {
    knownSpellRefs: readonly SpellRefLike[];
    preparedSpellRefs: readonly SpellRefLike[];
    grimoireRefs: readonly SpellRefLike[];
  };
  extensions?: CharacterState["extensions"];
};

type ResolveArcyneSpellSelectionArgs = {
  selectedKnownSpellIds: readonly string[];
  lockedKnownSpellIds?: readonly string[];
  preparedSlotsBySpellId: SpellPreparationCounts;
  validSpellIds: ReadonlySet<string>;
};

type StoredSpellPreparationRecord = Record<string, unknown>;

export type ResolvedArcyneSpellSelection = {
  selectedKnownSpellIds: string[];
  lockedKnownSpellIds: string[];
  combinedKnownSpellIds: string[];
  preparedSlotsBySpellId: SpellPreparationCounts;
  preparedSpellIds: string[];
  preparedSlotCount: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function dedupeStrings(values: readonly string[]) {
  return [...new Set(values)];
}

function toSpellRef(id: string): SpellRefLike {
  return {
    kind: "spell",
    id,
  };
}

function sanitizeSpellPreparationCounts(
  preparedSlotsBySpellId: SpellPreparationCounts,
  allowedSpellIds: ReadonlySet<string>,
) {
  const sanitized: SpellPreparationCounts = {};

  for (const [spellId, rawCount] of Object.entries(preparedSlotsBySpellId)) {
    if (!allowedSpellIds.has(spellId)) {
      continue;
    }

    if (!Number.isInteger(rawCount) || rawCount <= 0) {
      continue;
    }

    sanitized[spellId] = rawCount;
  }

  return sanitized;
}

export function hasArcynePotential(
  dreamRefs: readonly Pick<SpellRefLike, "id">[],
) {
  return dreamRefs.some(
    (dreamRef) =>
      dreamRef.id === ARCYNE_POTENTIAL_DREAM_ID ||
      dreamRef.id.endsWith(`.${ARCYNE_POTENTIAL_DREAM_ID}`),
  );
}

export function countPreparedSpellSlots(preparedSlotsBySpellId: SpellPreparationCounts) {
  return Object.values(preparedSlotsBySpellId).reduce(
    (total, count) => total + count,
    0,
  );
}

export function resolveArcyneSpellSelection({
  selectedKnownSpellIds,
  lockedKnownSpellIds = [],
  preparedSlotsBySpellId,
  validSpellIds,
}: ResolveArcyneSpellSelectionArgs): ResolvedArcyneSpellSelection {
  const lockedKnown = dedupeStrings(lockedKnownSpellIds).filter((id) =>
    validSpellIds.has(id),
  );
  const lockedKnownSet = new Set(lockedKnown);
  const selectedKnown = dedupeStrings(selectedKnownSpellIds).filter(
    (id) => validSpellIds.has(id) && !lockedKnownSet.has(id),
  );
  const combinedKnown = [...lockedKnown, ...selectedKnown];
  const combinedKnownSet = new Set(combinedKnown);
  const sanitizedPrepared = sanitizeSpellPreparationCounts(
    preparedSlotsBySpellId,
    combinedKnownSet,
  );
  const preparedSpellIds = combinedKnown.filter(
    (spellId) => (sanitizedPrepared[spellId] ?? 0) > 0,
  );

  return {
    selectedKnownSpellIds: selectedKnown,
    lockedKnownSpellIds: lockedKnown,
    combinedKnownSpellIds: combinedKnown,
    preparedSlotsBySpellId: sanitizedPrepared,
    preparedSpellIds,
    preparedSlotCount: countPreparedSpellSlots(sanitizedPrepared),
  };
}

export function getArcyneSpellSelectionIssues(
  selection: Pick<
    ResolvedArcyneSpellSelection,
    "combinedKnownSpellIds" | "preparedSlotCount"
  >,
) {
  const issues: string[] = [];

  if (selection.combinedKnownSpellIds.length === 0) {
    issues.push("Arcyne Potential requires at least one known spell selection.");
  }

  if (selection.preparedSlotCount !== ARCYNE_PREPARED_SLOT_TOTAL) {
    issues.push(
      `Arcyne Potential requires exactly ${ARCYNE_PREPARED_SLOT_TOTAL} prepared spell slots.`,
    );
  }

  return issues;
}

export function buildPreparedSpellRefs(preparedSpellIds: readonly string[]) {
  return preparedSpellIds.map(toSpellRef);
}

export function applyResolvedArcyneSpellSelectionToState(
  state: CharacterMagicLikeState,
  selection: ResolvedArcyneSpellSelection,
) {
  state.magic.knownSpellRefs = selection.combinedKnownSpellIds.map(toSpellRef);
  state.magic.preparedSpellRefs = buildPreparedSpellRefs(selection.preparedSpellIds);
  setStoredSpellPreparation(state, selection.preparedSlotsBySpellId);
}

export function getStoredSpellPreparation(
  state: CharacterMagicLikeState,
): SpellPreparationPayload | null {
  if (!isRecord(state.extensions)) {
    return null;
  }

  const namespace = state.extensions[CHARACTER_CREATOR_EXTENSION_NAMESPACE];
  if (!isRecord(namespace)) {
    return null;
  }

  const payload = namespace[SPELL_PREPARATION_EXTENSION_KEY];
  if (!isRecord(payload) || payload.version !== 1) {
    return null;
  }

  const preparedSlotsBySpellId = payload.preparedSlotsBySpellId;
  if (!isRecord(preparedSlotsBySpellId)) {
    return null;
  }

  const sanitized: SpellPreparationCounts = {};
  for (const [spellId, rawCount] of Object.entries(preparedSlotsBySpellId)) {
    if (typeof rawCount !== "number" || !Number.isInteger(rawCount) || rawCount <= 0) {
      continue;
    }
    sanitized[spellId] = rawCount;
  }

  return {
    version: 1,
    preparedSlotsBySpellId: sanitized,
  };
}

export function getPreparedSlotsBySpellIdFromState(
  state: CharacterMagicLikeState,
) {
  const stored = getStoredSpellPreparation(state);
  if (stored) {
    return stored.preparedSlotsBySpellId;
  }

  const fallback: SpellPreparationCounts = {};
  for (const spellRef of state.magic.preparedSpellRefs) {
    fallback[spellRef.id] = (fallback[spellRef.id] ?? 0) + 1;
  }

  return fallback;
}

export function setStoredSpellPreparation(
  state: CharacterMagicLikeState,
  preparedSlotsBySpellId: SpellPreparationCounts,
) {
  const nextExtensions = isRecord(state.extensions)
    ? { ...(state.extensions as StoredSpellPreparationRecord) }
    : {};
  const namespace = isRecord(nextExtensions[CHARACTER_CREATOR_EXTENSION_NAMESPACE])
    ? {
        ...(nextExtensions[
          CHARACTER_CREATOR_EXTENSION_NAMESPACE
        ] as StoredSpellPreparationRecord),
      }
    : {};

  namespace[SPELL_PREPARATION_EXTENSION_KEY] = {
    version: 1,
    preparedSlotsBySpellId,
  } satisfies SpellPreparationPayload;

  nextExtensions[CHARACTER_CREATOR_EXTENSION_NAMESPACE] = namespace;
  state.extensions = nextExtensions as CharacterState["extensions"];
}
