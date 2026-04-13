"use client";

import type { Preloaded } from "convex/react";
import { usePreloadedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home({
  preloaded,
}: {
  preloaded: Preloaded<typeof api.ruleset.getNpcCreationOptions>;
}) {
  const data = usePreloadedQuery(preloaded);

  return (
    <section className="grid gap-4 md:grid-cols-2">
      <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
          Creatures
        </p>
        <p className="mt-3 text-3xl font-semibold text-slate-950">
          {data.creatures.length}
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Canonical creature definitions are still imported read-only from the
          BUGCHUD ruleset.
        </p>
      </article>
      <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
          NPC loadouts
        </p>
        <p className="mt-3 text-3xl font-semibold text-slate-950">
          {data.npcLoadouts.length}
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Runtime NPC snapshots will point at these authored loadout definitions
          instead of duplicating registry content in the database.
        </p>
      </article>
    </section>
  );
}
