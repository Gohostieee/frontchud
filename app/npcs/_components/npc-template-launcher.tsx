"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { SignInIcon } from "@phosphor-icons/react";
import { useMutation, useQuery } from "convex/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import {
  SearchableSingleSelect,
  type SearchOption,
} from "../../characters/_components/character-editor-controls";

type TemplateOptions = {
  rulesetId: string;
  rulesetVersion: string;
  creatures: Array<{
    id: string;
    name: string;
    summary?: string;
  }>;
};

function toSearchOption(
  value: string,
  label: string,
  description?: string,
  group?: string,
): SearchOption {
  return { value, label, description, group };
}

function LoadingState({
  title,
  detail,
  action,
}: {
  title: string;
  detail: string;
  action?: ReactNode;
}) {
  return (
    <Card className="border border-border/20 bg-background/70">
      <CardHeader className="gap-3 border-b border-border/20 pb-5">
        <Badge variant="outline" className="w-fit">
          NPC creation
        </Badge>
        <CardTitle className="font-display text-4xl font-black tracking-[-0.06em] text-primary">
          {title}
        </CardTitle>
        <CardDescription className="max-w-2xl text-sm leading-7 text-muted-foreground">
          {detail}
        </CardDescription>
      </CardHeader>
      {action ? <CardContent className="py-5">{action}</CardContent> : null}
    </Card>
  );
}

export function NpcTemplateLauncher() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const options = useQuery(api.ruleset.getNpcCreationOptions, {}) as
    | TemplateOptions
    | undefined;
  const createDraft = useMutation(api.npcs.createDraft);

  const [selectedCreatureId, setSelectedCreatureId] = useState<string>();
  const [isCreating, setIsCreating] = useState(false);
  const [surfaceError, setSurfaceError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCreatureId || !options?.creatures.length) {
      return;
    }

    setSelectedCreatureId(options.creatures[0]?.id);
  }, [options, selectedCreatureId]);

  const creatureOptions = useMemo(
    () =>
      (options?.creatures ?? [])
        .slice()
        .sort((left, right) => left.name.localeCompare(right.name))
        .map((creature) =>
          toSearchOption(creature.id, creature.name, creature.summary, "CREATURE"),
        ),
    [options],
  );

  async function handleCreateDraft() {
    if (!selectedCreatureId) {
      return;
    }

    setIsCreating(true);
    setSurfaceError(null);
    try {
      const created = await createDraft({
        input: {
          creatureRef: {
            kind: "creature",
            id: selectedCreatureId,
          },
        },
      });
      router.push(`/npcs/${created?.bugchudId}`);
    } catch (error) {
      setSurfaceError(
        error instanceof Error ? error.message : "Template draft creation failed.",
      );
    } finally {
      setIsCreating(false);
    }
  }

  if (!isLoaded || !options) {
    return (
      <LoadingState
        title="Loading Templates"
        detail="Gathering creature templates for the new entity flow."
      />
    );
  }

  if (!isSignedIn) {
    return (
      <LoadingState
        title="Sign In Required"
        detail="Creating NPC drafts lives behind the protected archive."
        action={
          <SignInButton mode="modal">
            <Button>
              <SignInIcon />
              Authenticate
            </Button>
          </SignInButton>
        }
      />
    );
  }

  return (
    <Card className="border border-border/20 bg-background/70">
      <CardHeader className="gap-3 border-b border-border/20 pb-5">
        <Badge variant="outline" className="w-fit">
          Template launcher
        </Badge>
        <CardTitle className="font-display text-4xl font-black tracking-[-0.06em] text-primary">
          Pick A Template
        </CardTitle>
        <CardDescription className="max-w-2xl text-sm leading-7 text-muted-foreground">
          Start from a creature template, create a draft instantly, then finish the rest in the
          full editor.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 py-6">
        <SearchableSingleSelect
          label="Template"
          description="This is the only required choice up front."
          options={creatureOptions}
          value={selectedCreatureId}
          onChange={setSelectedCreatureId}
          placeholder="Choose a creature template"
        />

        {surfaceError ? (
          <Card size="sm" className="border border-secondary/40 bg-secondary/12">
            <CardHeader className="gap-2">
              <CardTitle className="text-xs uppercase tracking-[0.18em] text-secondary">
                Creation issue
              </CardTitle>
              <CardDescription className="text-xs leading-6 text-secondary-foreground">
                {surfaceError}
              </CardDescription>
            </CardHeader>
          </Card>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => void handleCreateDraft()}
            disabled={!selectedCreatureId || isCreating}
          >
            {isCreating ? "Creating Draft" : "Create Draft And Open Editor"}
          </Button>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            No loadout step. No wizard. Template first, then edit.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
