import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { GuidedCharacterCreator } from "../_components/guided-character-creator";

export default function NewCharacterPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="grain-overlay pointer-events-none fixed inset-0 z-0" />

      <main className="relative z-10 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[120rem] flex-col gap-6">
          <header className="flex flex-col gap-4 border-b border-border/20 pb-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex min-w-0 flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">Character creation</Badge>
                <Badge variant="ghost">Guided route</Badge>
              </div>
              <div>
                <h1 className="font-display text-4xl font-black tracking-[-0.06em] text-primary sm:text-5xl">
                  New Character
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
                  Stay on this route while you shape the core identity, lineage, background,
                  granted opening dreams, and any optional patron tie. Frontchud only persists
                  the draft once you confirm the handoff into the advanced editor.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button asChild variant="outline">
                <Link href="/characters">Open manager</Link>
              </Button>
            </div>
          </header>

          <GuidedCharacterCreator />
        </div>
      </main>
    </div>
  );
}
