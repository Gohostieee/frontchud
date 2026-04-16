export type BackgroundOriginMapping = {
  originId: string;
  backgroundIds: string[];
  startingDreamIds?: string[];
  startingLanguages?: string[];
};

export const MAX_BACKGROUND_SELECTIONS = 3;
export const MAX_CROSS_ORIGIN_BACKGROUND_SELECTIONS = 1;

type BackgroundSelectionArgs = {
  originId: string | null;
  selectedBackgroundIds: readonly string[];
  backgroundsByOrigin: readonly BackgroundOriginMapping[];
  allBackgroundIds?: readonly string[];
};

export type BackgroundSelectionState = {
  normalizedSelectedBackgroundIds: string[];
  originBackgroundIds: Set<string>;
  selectedOriginBackgroundIds: string[];
  selectedCrossOriginBackgroundIds: string[];
  selectableBackgroundIds: Set<string>;
  validationMessage: string | null;
  isValid: boolean;
};

function uniqueIds(ids: readonly string[]) {
  return [...new Set(ids.filter((id) => id.trim().length > 0))];
}

export function getOriginBackgroundIds(
  backgroundsByOrigin: readonly BackgroundOriginMapping[],
  originId: string | null,
) {
  if (!originId) {
    return new Set<string>();
  }

  const entry = backgroundsByOrigin.find((mapping) => mapping.originId === originId);
  return new Set(entry?.backgroundIds ?? []);
}

export function getBackgroundSelectionValidationMessage({
  originId,
  selectedBackgroundIds,
  backgroundsByOrigin,
}: Omit<BackgroundSelectionArgs, "allBackgroundIds">) {
  const selectedIds = uniqueIds(selectedBackgroundIds);
  if (selectedIds.length === 0) {
    return null;
  }

  if (!originId) {
    return "Select an origin before choosing backgrounds.";
  }

  if (selectedIds.length > MAX_BACKGROUND_SELECTIONS) {
    return `Choose no more than ${MAX_BACKGROUND_SELECTIONS} backgrounds.`;
  }

  const originBackgroundIds = getOriginBackgroundIds(backgroundsByOrigin, originId);
  const selectedOriginCount = selectedIds.filter((id) => originBackgroundIds.has(id)).length;
  const selectedCrossOriginCount = selectedIds.length - selectedOriginCount;

  if (selectedOriginCount === 0) {
    return "Choose at least one background from your origin.";
  }

  if (selectedCrossOriginCount > MAX_CROSS_ORIGIN_BACKGROUND_SELECTIONS) {
    return `Choose no more than ${MAX_CROSS_ORIGIN_BACKGROUND_SELECTIONS} background from another origin.`;
  }

  return null;
}

export function normalizeBackgroundSelection({
  originId,
  selectedBackgroundIds,
  backgroundsByOrigin,
  allBackgroundIds,
}: BackgroundSelectionArgs) {
  const knownBackgroundIds = allBackgroundIds ? new Set(allBackgroundIds) : null;
  const selectedIds = uniqueIds(selectedBackgroundIds).filter((id) =>
    knownBackgroundIds ? knownBackgroundIds.has(id) : true,
  );

  if (!originId) {
    return [];
  }

  const originBackgroundIds = getOriginBackgroundIds(backgroundsByOrigin, originId);
  const selectedOriginBackgroundIds = selectedIds.filter((id) =>
    originBackgroundIds.has(id),
  );

  if (selectedOriginBackgroundIds.length === 0) {
    return [];
  }

  const selectedCrossOriginBackgroundIds = selectedIds.filter(
    (id) => !originBackgroundIds.has(id),
  );

  return [
    ...selectedOriginBackgroundIds,
    ...selectedCrossOriginBackgroundIds.slice(
      0,
      MAX_CROSS_ORIGIN_BACKGROUND_SELECTIONS,
    ),
  ].slice(0, MAX_BACKGROUND_SELECTIONS);
}

export function buildBackgroundSelectionState(
  args: BackgroundSelectionArgs,
): BackgroundSelectionState {
  const normalizedSelectedBackgroundIds = normalizeBackgroundSelection(args);
  const originBackgroundIds = getOriginBackgroundIds(
    args.backgroundsByOrigin,
    args.originId,
  );
  const selectedOriginBackgroundIds = normalizedSelectedBackgroundIds.filter((id) =>
    originBackgroundIds.has(id),
  );
  const selectedCrossOriginBackgroundIds = normalizedSelectedBackgroundIds.filter(
    (id) => !originBackgroundIds.has(id),
  );
  const validationMessage = getBackgroundSelectionValidationMessage(args);
  const selectableBackgroundIds = new Set(normalizedSelectedBackgroundIds);

  if (args.originId) {
    if (normalizedSelectedBackgroundIds.length < MAX_BACKGROUND_SELECTIONS) {
      if (selectedOriginBackgroundIds.length === 0) {
        for (const id of originBackgroundIds) {
          selectableBackgroundIds.add(id);
        }
      } else {
        const availableIds =
          selectedCrossOriginBackgroundIds.length < MAX_CROSS_ORIGIN_BACKGROUND_SELECTIONS
            ? (args.allBackgroundIds ?? normalizedSelectedBackgroundIds)
            : originBackgroundIds;

        for (const id of availableIds) {
          selectableBackgroundIds.add(id);
        }
      }
    }
  }

  return {
    normalizedSelectedBackgroundIds,
    originBackgroundIds,
    selectedOriginBackgroundIds,
    selectedCrossOriginBackgroundIds,
    selectableBackgroundIds,
    validationMessage,
    isValid: validationMessage === null,
  };
}
