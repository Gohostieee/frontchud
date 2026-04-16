"use client";

import { useMemo } from "react";
import { BookOpenIcon, SparkleIcon } from "@phosphor-icons/react";
import type { SpellDefinition } from "@bugchud/core/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SearchableMultiSelect, type SearchOption } from "./character-editor-controls";
import {
  ARCYNE_PREPARED_SLOT_TOTAL,
  type SpellPreparationCounts,
  countPreparedSpellSlots,
} from "@/lib/character-spell-preparation";
import { cn } from "@/lib/utils";

type ArcyneSpellSelectorProps = {
  spells: readonly SpellDefinition[];
  selectedKnownSpellIds: string[];
  lockedKnownSpellIds?: readonly string[];
  preparedSlotsBySpellId: SpellPreparationCounts;
  onKnownSpellIdsChange: (spellIds: string[]) => void;
  onPreparedSlotsBySpellIdChange: (preparedSlotsBySpellId: SpellPreparationCounts) => void;
  description?: string;
  knownLabel?: string;
  preparedLabel?: string;
  issueText?: string | null;
};

function sortSpells(spells: readonly SpellDefinition[]) {
  return [...spells].sort((left, right) => left.name.localeCompare(right.name));
}

function formatSpellMeta(spell: SpellDefinition) {
  return `${spell.school} // Circle ${spell.circle} // ${spell.rangeDescription}`;
}

function buildKnownSpellOptions(spells: readonly SpellDefinition[]): SearchOption[] {
  return sortSpells(spells).map((spell) => ({
    value: spell.id,
    label: spell.name,
    description: spell.summary,
    group: spell.school.toUpperCase(),
    keywords: [
      spell.id,
      spell.slug,
      spell.school,
      spell.rangeDescription,
      spell.castingTime,
      ...(spell.tags ?? []),
    ],
    meta: (
      <div className="flex flex-wrap items-center gap-1">
        <Badge variant="outline" className="px-1.5 py-0 text-[0.55rem] tracking-[0.14em]">
          C{spell.circle}
        </Badge>
        <Badge variant="outline" className="px-1.5 py-0 text-[0.55rem] tracking-[0.14em]">
          {spell.rangeDescription}
        </Badge>
      </div>
    ),
  }));
}

function Meter({
  value,
  maximum,
}: {
  value: number;
  maximum: number;
}) {
  const percentage = Math.max(0, Math.min(100, (value / maximum) * 100));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
        <span>Prepared slots</span>
        <span
          className={cn(
            "text-foreground",
            value !== maximum && "text-secondary",
          )}
        >
          {value} / {maximum}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-border/30">
        <div
          className={cn(
            "h-full transition-[width] duration-200",
            value === maximum ? "bg-primary" : "bg-secondary",
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function ArcyneSpellSelector({
  spells,
  selectedKnownSpellIds,
  lockedKnownSpellIds = [],
  preparedSlotsBySpellId,
  onKnownSpellIdsChange,
  onPreparedSlotsBySpellIdChange,
  description,
  knownLabel = "Known spells",
  preparedLabel = "Prepared distribution",
  issueText,
}: ArcyneSpellSelectorProps) {
  const spellMap = useMemo(
    () => new Map<string, SpellDefinition>(spells.map((spell) => [spell.id, spell])),
    [spells],
  );
  const lockedKnownSet = useMemo(
    () => new Set(lockedKnownSpellIds),
    [lockedKnownSpellIds],
  );
  const selectableSpells = useMemo(
    () => spells.filter((spell) => !lockedKnownSet.has(spell.id)),
    [lockedKnownSet, spells],
  );
  const knownSpellOptions = useMemo(
    () => buildKnownSpellOptions(selectableSpells),
    [selectableSpells],
  );
  const combinedKnownSpellIds = useMemo(
    () => [...lockedKnownSpellIds, ...selectedKnownSpellIds],
    [lockedKnownSpellIds, selectedKnownSpellIds],
  );
  const combinedKnownSpells = useMemo(
    () =>
      combinedKnownSpellIds
        .map((spellId) => spellMap.get(spellId))
        .filter((spell): spell is SpellDefinition => Boolean(spell)),
    [combinedKnownSpellIds, spellMap],
  );
  const preparedSlotCount = countPreparedSpellSlots(preparedSlotsBySpellId);
  const preparedUniqueCount = Object.keys(preparedSlotsBySpellId).length;

  function setPreparedCount(spellId: string, nextCount: number) {
    const nextPrepared = { ...preparedSlotsBySpellId };

    if (nextCount <= 0) {
      delete nextPrepared[spellId];
    } else {
      nextPrepared[spellId] = nextCount;
    }

    onPreparedSlotsBySpellIdChange(nextPrepared);
  }

  return (
    <Card size="sm" className="border border-primary/20 bg-primary/6">
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
              <BookOpenIcon />
              Spellbook
            </CardTitle>
            <CardDescription className="max-w-3xl text-xs leading-6 text-muted-foreground">
              {description ??
                "Choose the spells this arcyne adept knows, then allocate the full prepared spread across that pool."}
            </CardDescription>
          </div>
          <Badge variant="outline">ARCYNE POTENTIAL</Badge>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="border border-primary/20 bg-background/55 px-3 py-3">
            <div className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
              Known pool
            </div>
            <div className="mt-2 text-sm uppercase tracking-[0.18em] text-foreground">
              {combinedKnownSpells.length} spell{combinedKnownSpells.length === 1 ? "" : "s"}
            </div>
          </div>
          <div className="border border-primary/20 bg-background/55 px-3 py-3">
            <div className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
              Prepared slots
            </div>
            <div className="mt-2 text-sm uppercase tracking-[0.18em] text-foreground">
              {preparedSlotCount} / {ARCYNE_PREPARED_SLOT_TOTAL}
            </div>
          </div>
          <div className="border border-primary/20 bg-background/55 px-3 py-3">
            <div className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
              Prepared spread
            </div>
            <div className="mt-2 text-sm uppercase tracking-[0.18em] text-foreground">
              {preparedUniqueCount} unique spell{preparedUniqueCount === 1 ? "" : "s"}
            </div>
          </div>
        </div>

        <Meter value={preparedSlotCount} maximum={ARCYNE_PREPARED_SLOT_TOTAL} />
      </CardHeader>

      <CardContent className="space-y-5">
        {lockedKnownSpellIds.length > 0 ? (
          <div className="space-y-3 border border-border/20 bg-background/45 px-4 py-4">
            <div className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-accent">
              <SparkleIcon className="size-4" />
              Auto-granted known spells
            </div>
            <div className="flex flex-wrap gap-2">
              {lockedKnownSpellIds.map((spellId) => {
                const spell = spellMap.get(spellId);
                return (
                  <Badge
                    key={spellId}
                    variant="outline"
                    className="h-auto gap-1 px-2 py-1"
                  >
                    <span className="uppercase tracking-[0.16em]">
                      {spell?.name ?? spellId}
                    </span>
                    <span className="text-[0.58rem] tracking-[0.14em] text-muted-foreground">
                      locked
                    </span>
                  </Badge>
                );
              })}
            </div>
          </div>
        ) : null}

        <SearchableMultiSelect
          label={knownLabel}
          description="Search by school, spell name, range, or casting tags. Auto-granted spells stay in the pool automatically."
          options={knownSpellOptions}
          values={selectedKnownSpellIds}
          onChange={onKnownSpellIdsChange}
          placeholder="Search the spell catalog"
          maxHeightClassName="max-h-80"
        />

        <div className="space-y-3">
          <div className="text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
            {preparedLabel}
          </div>

          {combinedKnownSpells.length ? (
            <div className="grid gap-3 lg:grid-cols-2">
              {combinedKnownSpells.map((spell) => {
                const preparedCount = preparedSlotsBySpellId[spell.id] ?? 0;
                const canAddMore = preparedSlotCount < ARCYNE_PREPARED_SLOT_TOTAL;

                return (
                  <div
                    key={spell.id}
                    className={cn(
                      "module-cut border px-4 py-4 transition-colors",
                      preparedCount > 0
                        ? "border-primary/30 bg-primary/10"
                        : "border-border/20 bg-background/55",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="truncate text-sm uppercase tracking-[0.18em] text-primary">
                            {spell.name}
                          </span>
                          <Badge variant="outline">C{spell.circle}</Badge>
                          <Badge variant="outline">{spell.school}</Badge>
                        </div>
                        <p className="text-xs leading-6 text-muted-foreground">
                          {spell.summary}
                        </p>
                        <div className="text-[0.65rem] uppercase tracking-[0.18em] text-accent">
                          {formatSpellMeta(spell)}
                        </div>
                        <div className="text-[0.72rem] leading-6 text-muted-foreground">
                          {spell.castingTime}
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <Badge
                          variant={preparedCount > 0 ? "default" : "outline"}
                          className="min-w-20 justify-center"
                        >
                          {preparedCount} slot{preparedCount === 1 ? "" : "s"}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0 text-xs"
                            disabled={preparedCount <= 0}
                            onClick={() =>
                              setPreparedCount(spell.id, preparedCount - 1)
                            }
                          >
                            -
                          </Button>
                          <Button
                            type="button"
                            variant={preparedCount > 0 ? "outline" : "default"}
                            size="sm"
                            className="h-7 w-7 p-0 text-xs"
                            disabled={!canAddMore}
                            onClick={() =>
                              setPreparedCount(spell.id, preparedCount + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="border border-border/20 bg-background/45 px-4 py-3 text-sm leading-7 text-muted-foreground">
              Pick at least one known spell before allocating prepared slots.
            </div>
          )}
        </div>

        {issueText ? (
          <div className="border border-secondary/35 bg-secondary/10 px-4 py-3 text-sm leading-7 text-secondary-foreground">
            {issueText}
          </div>
        ) : (
          <div className="border border-border/20 bg-background/45 px-4 py-3 text-sm leading-7 text-muted-foreground">
            Prepared slots can repeat the same spell. The canonical runtime keeps unique
            prepared refs, while this panel preserves the full slot spread.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
