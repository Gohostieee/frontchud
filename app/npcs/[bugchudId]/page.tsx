import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { NpcEditor } from "../_components/npc-editor";

export default async function NpcEditorPage({
  params,
}: {
  params: Promise<{ bugchudId: string }>;
}) {
  const { bugchudId } = await params;

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="grain-overlay pointer-events-none fixed inset-0 z-0" />

      <main className="relative z-10 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[120rem] flex-col gap-6">
          <header className="flex flex-col gap-4 border-b border-border/20 pb-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex min-w-0 flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">NPC workspace</Badge>
                <Badge variant="ghost">Advanced editor</Badge>
              </div>
              <div>
                <h1 className="font-display text-4xl font-black tracking-[-0.06em] text-primary sm:text-5xl">
                  NPC Editor
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
                  Guided creation happens on the new route. This workspace is the full editor for refining, validating, and finalizing the persisted draft.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button asChild variant="outline">
                <Link href="/npcs/new">New guided draft</Link>
              </Button>
              <Button asChild>
                <Link href="/npcs">Open manager</Link>
              </Button>
            </div>
          </header>

          <NpcEditor bugchudId={bugchudId} />
        </div>
      </main>
    </div>
  );
}
