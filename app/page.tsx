"use client";

import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import {
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { api } from "../convex/_generated/api";

export default function Home() {
  const characterOptions = useQuery(api.ruleset.getCharacterCreationOptions, {});
  const npcOptions = useQuery(api.ruleset.getNpcCreationOptions, {});

  const isLoading = characterOptions === undefined || npcOptions === undefined;

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-background px-4 py-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Frontchud
          </p>
          <h1 className="text-xl font-semibold">BUGCHUD manager backend</h1>
        </div>
        <UserButton />
      </header>
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
        <section className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Snapshot-first Convex foundation
          </p>
          <h2 className="text-3xl font-semibold text-slate-950">
            Characters and NPCs now have a real BUGCHUD persistence layer.
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-slate-700">
            The app now reads canonical creation data from the imported BUGCHUD
            ruleset and stores live character or NPC state in Convex-ready
            snapshot tables. The richer manager UI can build on top of these
            queries and mutations next.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <StatCard
            label="Character creation options"
            value={
              isLoading
                ? "Loading..."
                : `${characterOptions.races.length} races / ${characterOptions.origins.length} origins / ${characterOptions.backgrounds.length} backgrounds`
            }
            detail={
              isLoading
                ? "Fetching imported ruleset data."
                : `Ruleset ${characterOptions.rulesetId} v${characterOptions.rulesetVersion}`
            }
          />
          <StatCard
            label="NPC creation options"
            value={
              isLoading
                ? "Loading..."
                : `${npcOptions.creatures.length} creatures / ${npcOptions.npcLoadouts.length} loadouts`
            }
            detail={
              isLoading
                ? "Fetching imported GM content."
                : `Ruleset ${npcOptions.rulesetId} v${npcOptions.rulesetVersion}`
            }
          />
        </section>

        <Authenticated>
          <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-sm leading-6 text-emerald-950">
            Clerk is active in the frontend. Once `CLERK_JWT_ISSUER_DOMAIN` is
            configured on the Convex deployment, the new owner-scoped character
            and NPC APIs will enforce `identity.tokenIdentifier` on every read
            and write.
          </section>
        </Authenticated>

        <Unauthenticated>
          <section className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 md:max-w-md">
            <p className="text-sm text-slate-700">
              Sign in to use the future manager UI once the Convex Clerk issuer
              is configured.
            </p>
            <div className="flex gap-3">
              <SignInButton mode="modal">
                <button className="rounded-full bg-slate-950 px-4 py-2 text-sm text-white">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-900">
                  Sign up
                </button>
              </SignUpButton>
            </div>
          </section>
        </Unauthenticated>
      </main>
    </>
  );
}

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6">
      <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold text-slate-950">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{detail}</p>
    </article>
  );
}
