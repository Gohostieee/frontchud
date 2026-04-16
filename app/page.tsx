"use client";

import type { ElementType } from "react";
import Link from "next/link";
import {
  ArrowSquareOut,
  Broadcast,
  ClockCounterClockwise,
  Scroll,
  Skull,
  Sparkle,
  UserCirclePlus,
} from "@phosphor-icons/react";
import {
  SignInButton,
  useAuth,
} from "@clerk/nextjs";
import { useQuery } from "convex/react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

const fieldNotes = [
  {
    cycle: "Cycle 41 // Sector 02",
    note: "The iron marrow of the city is weeping oil again. The rituals suggest a synchronization error between the gears of reality and the void below.",
  },
  {
    cycle: "Cycle 39 // Sector 12",
    note: "Encountered a scrap-golem with a human tongue. It kept chanting binary sequences that sounded like prayers. Terminated sequence for safety.",
  },
  {
    cycle: "Cycle 38 // Sector 00",
    note: "Found a rusted data-slate in the belly of a furnace-beast. The content was encrypted in a language that should not exist for another century.",
  },
  {
    cycle: "Cycle 35 // Sector 09",
    note: "Beware the Bugchud echo. It mimics the sounds of progress but leads only to recursive loops of logic failure.",
  },
] as const;

const teaserModules = [
  { label: "Encounters", stamp: "Redacted", rotation: "rotate-[11deg]" },
  { label: "Campaigns", stamp: "Access Denied", rotation: "-rotate-[7deg]" },
  { label: "World Tools", stamp: "Redacted", rotation: "rotate-[4deg]" },
] as const;

export default function Home() {
  const { isSignedIn } = useAuth();
  const isAuthenticated = Boolean(isSignedIn);

  const characterOptions = useQuery(api.ruleset.getCharacterCreationOptions, {});
  const npcOptions = useQuery(api.ruleset.getNpcCreationOptions, {});

  const rulesetId =
    characterOptions?.rulesetId ?? npcOptions?.rulesetId ?? "BUGCHUD_CORE";
  const rulesetVersion =
    characterOptions?.rulesetVersion ?? npcOptions?.rulesetVersion ?? "sync-pending";

  const characterSummary = characterOptions
    ? `${characterOptions.races.length} races // ${characterOptions.origins.length} origins // ${characterOptions.backgrounds.length} backgrounds`
    : "Synchronizing canonical race and origin matrices.";
  const npcSummary = npcOptions
    ? `${npcOptions.creatures.length} creatures // ${npcOptions.npcLoadouts.length} loadouts`
    : "Reading creature taxonomy from the imported ruleset.";

  const moduleCards = [
    {
      title: "New Character",
      sequence: "Sequence 001 // Forge identity",
      summary: characterSummary,
      icon: UserCirclePlus,
      href: "/characters/new",
    },
    {
      title: "NPC Manager",
      sequence: "Sequence 002 // Summon entities",
      summary: npcSummary,
      icon: Skull,
      href: "/npcs",
    },
    {
      title: "Ruleset Explorer",
      sequence: "Sequence 003 // Decipher logic",
      summary: `${rulesetId} // v${rulesetVersion}`,
      icon: Scroll,
    },
    {
      title: "Session Log",
      sequence: "Sequence 004 // Archive truth",
      summary: isAuthenticated
        ? "Authenticated conduit detected. Protected manager handoff primed."
        : "Sign in to cross the protected archive threshold.",
      icon: ClockCounterClockwise,
    },
  ] as const;

  const terminalFeed = [
    `[INFO] IMPORTING RULESET: ${rulesetId}.HEX`,
    `[INFO] CHARACTER OPTIONS: ${characterOptions ? `${characterOptions.races.length} RACES / ${characterOptions.origins.length} ORIGINS / ${characterOptions.backgrounds.length} BACKGROUNDS` : "PENDING"}`,
    `[INFO] NPC OPTIONS: ${npcOptions ? `${npcOptions.creatures.length} CREATURES / ${npcOptions.npcLoadouts.length} LOADOUTS` : "PENDING"}`,
    isAuthenticated
      ? "[SUCCESS] CLERK SESSION VERIFIED. MANAGER CONDUIT OPEN."
      : "[WARN] UNSEALED VISITOR STATE. AUTH REQUIRED FOR MANAGER ACCESS.",
    "[ERROR] CRITICAL BREACH IN 'WORLD_TOOLS' MODULE. ACCESS REVOKED.",
  ] as const;

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="grain-overlay pointer-events-none fixed inset-0 z-0" />

      <main className="relative z-10 px-4 pb-28 pt-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-[92rem] flex-col gap-12">
          <section className="relative flex min-h-[calc(100svh-11rem)] flex-col justify-center overflow-hidden border-l border-primary/20 pl-6 lg:pl-10">
            <div className="status-rune absolute left-[-6px] top-5 size-3 bg-primary" />
            <div className="absolute inset-y-12 right-0 hidden w-[28rem] bg-[radial-gradient(circle_at_center,_rgba(255,176,0,0.16),_transparent_65%)] blur-3xl lg:block" />

            <div className="relative flex max-w-5xl flex-col gap-6">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.48em] text-muted-foreground">
                Command hub // public ingress node
              </p>

              <h1 className="hero-title max-w-6xl font-display text-[4.5rem] leading-[0.9] font-black tracking-[-0.08em] text-primary sm:text-[6rem] lg:text-[8.8rem]">
                FRONTCHUD
              </h1>

              <div className="flex max-w-3xl flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-sans text-sm uppercase tracking-[0.34em] text-accent">
                    The Bugchud operations hub
                  </span>
                  <span className="hidden h-px flex-1 ghost-divider lg:block" />
                </div>

                <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {isAuthenticated
                    ? "Clerk has verified this operator. Step through the protected manager conduit to inspect imported rulesets, shape characters, and monitor active ritual state."
                    : "An ancient interface for BUGCHUD operations. Manage characters, summon NPCs, and navigate the imported canon through a ritualistic digital lens."}
                </p>

                <div className="flex flex-wrap gap-3 text-[0.72rem] uppercase tracking-[0.34em] text-muted-foreground">
                  <span>{rulesetId}</span>
                  <span className="text-primary">v{rulesetVersion}</span>
                  <span>{isAuthenticated ? "Session sealed" : "Public visitor mode"}</span>
                </div>
              </div>

              <HeroActions isAuthenticated={isAuthenticated} />
            </div>
          </section>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_23rem]">
            <div className="flex min-w-0 flex-col gap-10">
              <section className="grid gap-5 md:grid-cols-2">
                {moduleCards.map((card) => (
                  <ModuleCard key={card.title} {...card} />
                ))}
              </section>

              <section
                id="system-feed"
                className="module-cut ritual-surface relative overflow-hidden border-l-4 border-primary px-6 py-7 sm:px-8"
              >
                <div className="absolute inset-y-0 right-0 w-40 bg-[radial-gradient(circle_at_center,_rgba(255,176,0,0.08),_transparent_72%)] blur-2xl" />
                <div className="relative flex flex-col gap-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="status-rune size-2 bg-primary" />
                      <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.32em] text-accent">
                        System Integrity
                      </h2>
                    </div>
                    <div className="terminal-copy text-[0.65rem] text-muted-foreground">
                      Encryption: active
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {terminalFeed.map((line) => (
                      <p
                        key={line}
                        className={cn(
                          "terminal-copy text-[0.7rem] leading-6 text-accent/75 sm:text-xs",
                          line.includes("[ERROR]") && "text-secondary",
                          line.includes("[WARN]") && "text-accent",
                          line.includes("[SUCCESS]") && "text-foreground",
                        )}
                      >
                        {`> ${line}`}
                      </p>
                    ))}
                  </div>
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-3">
                {teaserModules.map((item) => (
                  <article
                    key={item.label}
                    className="ritual-surface-strong relative flex h-36 overflow-hidden border border-border/15 p-4"
                  >
                    <div
                      className={cn(
                        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-xl font-black uppercase tracking-[0.48em] text-secondary/90 sm:text-2xl",
                        item.rotation,
                      )}
                    >
                      {item.stamp}
                    </div>
                    <span className="mt-auto font-mono text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
                      {item.label}
                    </span>
                  </article>
                ))}
              </section>
            </div>

            <aside className="min-w-0">
              <section className="ritual-surface-strong sticky top-28 flex max-h-[calc(100svh-10rem)] flex-col overflow-hidden">
                <div className="flex items-center justify-between bg-card px-5 py-4">
                  <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.34em] text-secondary">
                    Field Notes
                  </h2>
                  <Broadcast className="size-5 text-secondary" weight="fill" />
                </div>

                <div className="flex flex-col gap-6 overflow-y-auto px-5 py-6">
                  {fieldNotes.map((entry, index) => (
                    <article key={entry.cycle} className="flex flex-col gap-3">
                      <time className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
                        {entry.cycle}
                      </time>
                      <p className="text-base leading-7 text-foreground/88 italic">
                        &ldquo;{entry.note}&rdquo;
                      </p>
                      {index < fieldNotes.length - 1 ? (
                        <Separator className="ghost-divider opacity-35" />
                      ) : null}
                    </article>
                  ))}
                </div>

                <div className="mt-auto border-t border-border/20 bg-background px-5 py-4">
                  <div className="flex items-center justify-between bg-card px-4 py-3">
                    <div className="flex items-end gap-1">
                      <span className="h-3 w-1 bg-primary/30" />
                      <span className="h-4 w-1 bg-primary/55" />
                      <span className="h-5 w-1 bg-primary" />
                    </div>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
                      Feed stabilized
                    </span>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-border/20 bg-sidebar/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[110rem] flex-wrap items-center justify-between gap-3 px-4 py-2 lg:px-6">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.34em] text-secondary">
            System_uptime: 432:12:09 // active_rituals: 03
          </div>
          <div className="flex flex-wrap items-center gap-5 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-secondary">
            <span>Diagnostics</span>
            <span>Terminal_Feed</span>
            <span>Node_Status</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HeroActions({ isAuthenticated }: { isAuthenticated: boolean }) {
  if (isAuthenticated) {
    return (
      <div className="flex flex-wrap gap-3 pt-4">
        <Button asChild size="lg">
          <Link href="/characters/new">
            <Sparkle data-icon="inline-end" />
            <span className="uppercase tracking-[0.28em]">New Character</span>
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/npcs">
            <Skull data-icon="inline-end" />
            <span className="uppercase tracking-[0.28em]">Open NPCs</span>
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3 pt-4">
      <Button asChild size="lg">
        <Link href="/characters/new">
          <Sparkle data-icon="inline-end" />
          <span className="uppercase tracking-[0.28em]">New Character</span>
        </Link>
      </Button>
      <SignInButton mode="modal">
        <Button variant="outline" size="lg">
          <ArrowSquareOut data-icon="inline-end" />
          <span className="uppercase tracking-[0.28em]">Access Manager</span>
        </Button>
      </SignInButton>
    </div>
  );
}

function ModuleCard({
  title,
  sequence,
  summary,
  icon: Icon,
  href,
}: {
  title: string;
  sequence: string;
  summary: string;
  icon: ElementType;
  href?: string;
}) {
  const content = (
    <article className="module-cut ritual-surface-strong group relative overflow-hidden p-7">
      <div className="absolute right-5 top-5 text-primary/25 transition-colors duration-200 group-hover:text-primary/50">
        <Icon className="size-7" weight="fill" />
      </div>

      <div className="flex flex-col gap-5">
        <span className="h-1.5 w-14 bg-primary" />
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-3xl font-bold tracking-[-0.04em] text-card-foreground">
            {title}
          </h2>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.26em] text-muted-foreground">
            {sequence}
          </p>
        </div>
        <Separator className="ghost-divider opacity-35" />
        <p className="text-sm leading-7 text-muted-foreground">{summary}</p>
      </div>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
