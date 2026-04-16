import type { RaceDefinition } from "@bugchud/core/content";

export const ATTRIBUTE_ROLL_EXTENSION_NAMESPACE = "frontchudCharacterCreator";
export const ROLL_ATTRIBUTE_KEYS = ["twitch", "flesh", "mojo"] as const;

export type RollAttributeKey = (typeof ROLL_ATTRIBUTE_KEYS)[number];
export type RollSelection = "lowest" | "median" | "highest";
export type AttributeRollTriplet = [number, number, number];
export type AttributeRollPools = Record<RollAttributeKey, AttributeRollTriplet>;
export type StoredAttributeRolls = {
  version: 1;
  usedAt: number;
  raceIdAtRoll: string;
  pools: AttributeRollPools;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidTriplet(value: unknown): value is AttributeRollTriplet {
  return (
    Array.isArray(value) &&
    value.length === 3 &&
    value.every(
      (entry) =>
        typeof entry === "number" &&
        Number.isInteger(entry) &&
        entry >= 1 &&
        entry <= 6,
    )
  );
}

export function rollDieFace() {
  return Math.floor(Math.random() * 6) + 1;
}

export function rollAttributeTriplet(): AttributeRollTriplet {
  return [rollDieFace(), rollDieFace(), rollDieFace()];
}

export function rollAttributePools(): AttributeRollPools {
  return {
    twitch: rollAttributeTriplet(),
    flesh: rollAttributeTriplet(),
    mojo: rollAttributeTriplet(),
  };
}

export function pickRollValue(
  values: AttributeRollTriplet,
  selection: RollSelection,
) {
  const sorted = [...values].sort((left, right) => left - right);
  if (selection === "lowest") {
    return sorted[0];
  }
  if (selection === "highest") {
    return sorted[2];
  }
  return sorted[1];
}

export function formatRollAttributeLabel(key: RollAttributeKey) {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

export function formatRollTriplet(values: AttributeRollTriplet) {
  return values.join(" / ");
}

export function parseRaceRollRule(note: string) {
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

export function getRaceRollProfile(race: RaceDefinition | null | undefined) {
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

  const rules: Partial<
    Record<RollAttributeKey, { selection: RollSelection; bonus: number }>
  > = {};
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
      rules: rules as Record<
        RollAttributeKey,
        { selection: RollSelection; bonus: number }
      >,
    };
  }

  return {
    supported: false,
    reason:
      "This race's roll notes are present, but they are not in an executable format yet.",
    notes,
  };
}

export function computeRolledAttributesForRace(
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
      pickRollValue(pools.twitch, profile.rules.twitch.selection) +
      profile.rules.twitch.bonus,
    flesh:
      pickRollValue(pools.flesh, profile.rules.flesh.selection) +
      profile.rules.flesh.bonus,
    mojo:
      pickRollValue(pools.mojo, profile.rules.mojo.selection) +
      profile.rules.mojo.bonus,
    glory: race.baseAttributes.glory ?? currentGlory,
  };
}

export function sanitizeStoredAttributeRolls(
  value: unknown,
): StoredAttributeRolls | null {
  if (
    !isRecord(value) ||
    value.version !== 1 ||
    typeof value.usedAt !== "number" ||
    !Number.isFinite(value.usedAt) ||
    typeof value.raceIdAtRoll !== "string" ||
    !isRecord(value.pools)
  ) {
    return null;
  }

  const pools = {} as AttributeRollPools;
  for (const key of ROLL_ATTRIBUTE_KEYS) {
    const triplet = value.pools[key];
    if (!isValidTriplet(triplet)) {
      return null;
    }
    pools[key] = triplet;
  }

  return {
    version: 1,
    usedAt: value.usedAt,
    raceIdAtRoll: value.raceIdAtRoll,
    pools,
  };
}

export function getStoredAttributeRollsFromExtensions(
  extensions: unknown,
): StoredAttributeRolls | null {
  if (!isRecord(extensions)) {
    return null;
  }

  const namespace = extensions[ATTRIBUTE_ROLL_EXTENSION_NAMESPACE];
  if (!isRecord(namespace)) {
    return null;
  }

  return sanitizeStoredAttributeRolls(namespace.attributeRolls);
}

export function buildExtensionsWithStoredAttributeRolls(
  extensions: unknown,
  payload: StoredAttributeRolls,
) {
  const nextExtensions = isRecord(extensions) ? { ...extensions } : {};
  const namespace = isRecord(nextExtensions[ATTRIBUTE_ROLL_EXTENSION_NAMESPACE])
    ? {
        ...nextExtensions[ATTRIBUTE_ROLL_EXTENSION_NAMESPACE],
      }
    : {};

  namespace.attributeRolls = payload;
  nextExtensions[ATTRIBUTE_ROLL_EXTENSION_NAMESPACE] = namespace;

  return nextExtensions;
}
