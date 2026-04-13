import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Home from "./inner";

export default async function ServerPage() {
  const preloaded = await preloadQuery(api.ruleset.getNpcCreationOptions, {});

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
          Server route
        </p>
        <h1 className="text-3xl font-semibold text-slate-950">
          Imported BUGCHUD content, preloaded through Convex
        </h1>
      </header>
      <Home preloaded={preloaded} />
    </main>
  );
}
