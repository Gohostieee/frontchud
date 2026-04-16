"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { SignInButton, useAuth } from "@clerk/nextjs";
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
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

type ManagerCategory = {
  _id: Id<"npcCategories">;
  label: string;
  sortOrder: number;
  updatedAt: number;
};

type ManagerNpc = {
  _id: Id<"npcs">;
  bugchudId: string;
  name: string;
  status: "draft" | "complete";
  currentStep: string;
  completedAt: number | null;
  actorKind: "npc" | "creature" | "mount";
  allegiance: string | null;
  isArchived: boolean;
  archivedAt: number | null;
  managerCategoryId: Id<"npcCategories"> | null;
  managerSortOrder: number;
  updatedAt: number;
  creatureRef: { kind: "creature"; id: string };
  creatureName: string;
  npcLoadoutRef: { kind: "npcLoadout"; id: string } | null;
  npcLoadoutName: string | null;
};

type ManagerData = {
  categories: ManagerCategory[];
  npcs: ManagerNpc[];
  trashedNpcs: ManagerNpc[];
};

type ViewFilter = "all" | "draft" | "complete" | "trash";
type ActorKindFilter = "all" | "npc" | "creature" | "mount";

type NpcSection = {
  id: string;
  label: string;
  categoryId: Id<"npcCategories"> | null;
  isCustom: boolean;
  npcs: ManagerNpc[];
};

type NpcDropTarget = {
  categoryId: Id<"npcCategories"> | null;
  index: number;
};

type NpcDragState = {
  bugchudId: string;
  sourceCategoryId: Id<"npcCategories"> | null;
  sourceIndex: number;
  targetCategoryId: Id<"npcCategories"> | null;
  targetIndex: number;
  pointerOffsetX: number;
  pointerOffsetY: number;
  pointerX: number;
  pointerY: number;
  width: number;
  height: number;
};

const EMPTY_CATEGORIES: ManagerCategory[] = [];
const EMPTY_NPCS: ManagerNpc[] = [];

function compareNpcs(left: ManagerNpc, right: ManagerNpc) {
  const orderDelta = left.managerSortOrder - right.managerSortOrder;
  if (orderDelta !== 0) {
    return orderDelta;
  }

  return right.updatedAt - left.updatedAt;
}

function formatTimestamp(timestamp: number | null) {
  if (!timestamp) {
    return "No timestamp";
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(timestamp);
}

function formatWorkflowStep(step: string) {
  if (step === "identity" || step === "template") {
    return "Setup";
  }
  if (step === "body" || step === "doctrine") {
    return "Capabilities";
  }
  if (step === "gear") {
    return "Gear";
  }
  if (step === "review") {
    return "Review";
  }
  return step;
}

function normalizeCategoryId(npc: ManagerNpc, categories: ManagerCategory[]) {
  if (!npc.managerCategoryId) {
    return null;
  }

  return categories.some((category) => category._id === npc.managerCategoryId)
    ? npc.managerCategoryId
    : null;
}

function setElementRef<Key>(
  elements: Map<Key, HTMLDivElement>,
  key: Key,
  node: HTMLDivElement | null,
) {
  if (node) {
    elements.set(key, node);
    return;
  }

  elements.delete(key);
}

function hasSameTarget(left: NpcDropTarget, right: NpcDropTarget) {
  return left.categoryId === right.categoryId && left.index === right.index;
}

function getClosestDropTarget({
  clientX,
  clientY,
  draggedBugchudId,
  sections,
  sectionElements,
  rowElements,
}: {
  clientX: number;
  clientY: number;
  draggedBugchudId: string;
  sections: NpcSection[];
  sectionElements: Map<string, HTMLDivElement>;
  rowElements: Map<string, HTMLDivElement>;
}): NpcDropTarget | null {
  const sectionCandidate = sections
    .map((section) => {
      const element = sectionElements.get(section.id);
      if (!element) {
        return null;
      }

      const rect = element.getBoundingClientRect();
      const verticalDistance =
        clientY < rect.top ? rect.top - clientY : clientY > rect.bottom ? clientY - rect.bottom : 0;
      const horizontalDistance =
        clientX < rect.left
          ? rect.left - clientX
          : clientX > rect.right
            ? clientX - rect.right
            : 0;

      return {
        section,
        score: verticalDistance * 12 + horizontalDistance,
      };
    })
    .filter(
      (
        candidate,
      ): candidate is {
        section: NpcSection;
        score: number;
      } => candidate !== null,
    )
    .sort((left, right) => left.score - right.score)[0];

  if (!sectionCandidate) {
    return null;
  }

  const visibleNpcs = sectionCandidate.section.npcs.filter(
    (npc) => npc.bugchudId !== draggedBugchudId,
  );

  let index = visibleNpcs.length;

  for (const [npcIndex, npc] of visibleNpcs.entries()) {
    const rowElement = rowElements.get(npc.bugchudId);
    if (!rowElement) {
      continue;
    }

    const rect = rowElement.getBoundingClientRect();
    if (clientY < rect.top + rect.height / 2) {
      index = npcIndex;
      break;
    }
  }

  return {
    categoryId: sectionCandidate.section.categoryId,
    index,
  };
}

function NpcListRow({
  npc,
  categories,
  draggable = false,
  dragPreview = false,
  rowRef,
  onMoveToCategory,
  onArchiveToggle,
  onDragPointerDown,
}: {
  npc: ManagerNpc;
  categories: ManagerCategory[];
  draggable?: boolean;
  dragPreview?: boolean;
  rowRef?: (node: HTMLDivElement | null) => void;
  onMoveToCategory: (bugchudId: string, categoryId: Id<"npcCategories"> | null) => void;
  onArchiveToggle: (bugchudId: string, isArchived: boolean) => void;
  onDragPointerDown?: (
    event: ReactPointerEvent<HTMLButtonElement>,
    npc: ManagerNpc,
  ) => void;
}) {
  const moveSelectValue = npc.managerCategoryId ?? "__uncategorized__";

  return (
    <div
      ref={rowRef}
      className={cn(
        "border-b border-border/15 px-3 py-3 transition-[background-color,border-color,box-shadow,opacity,transform] duration-200",
        dragPreview &&
          "border-border/30 bg-background/95 shadow-[0_28px_80px_-32px_rgba(15,23,42,0.58)] ring-1 ring-primary/20",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          {draggable ? (
            <button
              type="button"
              aria-label={`Drag ${npc.name || "Untitled NPC"}`}
              className="mt-0.5 shrink-0 cursor-grab rounded-sm border border-border/15 px-1.5 py-1 text-[0.65rem] leading-none text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary active:cursor-grabbing"
              onPointerDown={(event) => onDragPointerDown?.(event, npc)}
            >
              ::::
            </button>
          ) : (
            <div className="pt-0.5 text-muted-foreground">...</div>
          )}
          <div className="min-w-0 flex-1">
            <Link href={`/npcs/${npc.bugchudId}`} className="block min-w-0">
              <div className="truncate text-sm font-medium uppercase tracking-[0.14em] text-foreground">
                {npc.name || "Untitled NPC"}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant={npc.status === "complete" ? "default" : "outline"}>
                  {npc.status}
                </Badge>
                <Badge variant="ghost">{formatWorkflowStep(npc.currentStep)}</Badge>
                <Badge variant="ghost">{npc.actorKind}</Badge>
                <Badge variant="ghost">{npc.creatureName}</Badge>
                {npc.npcLoadoutName ? <Badge variant="ghost">{npc.npcLoadoutName}</Badge> : null}
                {npc.allegiance ? <Badge variant="ghost">{npc.allegiance}</Badge> : null}
              </div>
              <div className="mt-2 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                {npc.isArchived
                  ? `Trashed ${formatTimestamp(npc.archivedAt)}`
                  : `Updated ${formatTimestamp(npc.updatedAt)}`}
              </div>
            </Link>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <select
            aria-label="Move NPC to category"
            className="h-7 min-w-32 border border-border/20 bg-background px-2 text-[0.72rem] uppercase tracking-[0.12em] text-foreground"
            value={moveSelectValue}
            onChange={(event) =>
              onMoveToCategory(
                npc.bugchudId,
                event.target.value === "__uncategorized__"
                  ? null
                  : (event.target.value as Id<"npcCategories">),
              )
            }
            disabled={npc.isArchived || dragPreview}
          >
            <option value="__uncategorized__">Uncategorized</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.label}
              </option>
            ))}
          </select>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onArchiveToggle(npc.bugchudId, !npc.isArchived)}
            disabled={dragPreview}
          >
            {npc.isArchived ? "Restore" : "Trash"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function NpcDropSlot({ active, height }: { active: boolean; height: number }) {
  const resolvedHeight = active ? Math.max(height, 72) : 0;

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden transition-[height,opacity] duration-200 ease-out"
      style={{ height: resolvedHeight, opacity: active ? 1 : 0 }}
    >
      <div
        className="mx-3 my-1.5 border border-dashed border-primary/35 bg-primary/8"
        style={{ height: Math.max(resolvedHeight - 12, 60) }}
      />
    </div>
  );
}

function ManagerPlaceholder() {
  return (
    <Card className="border border-border/20 bg-background/70">
      <CardHeader className="gap-3 border-b border-border/20 pb-5">
        <Badge variant="outline" className="w-fit">
          NPC manager
        </Badge>
        <CardTitle className="font-display text-4xl font-black tracking-[-0.06em] text-primary">
          No entities yet
        </CardTitle>
        <CardDescription className="max-w-xl text-sm leading-7 text-muted-foreground">
          Open the guided creator to forge a creature, mount, or NPC draft, then manage the roster from here.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3 py-5">
        <Button asChild>
          <Link href="/npcs/new">New entity</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Return home</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function WorkspaceLoading({
  title,
  detail,
  action,
}: {
  title: string;
  detail: string;
  action?: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-[24rem] max-w-5xl items-center justify-center px-4 py-10">
      <Card className="w-full max-w-2xl border border-border/20 bg-background/70">
        <CardHeader className="gap-3 border-b border-border/20 pb-5">
          <Badge variant="outline" className="w-fit">
            NPC workspace
          </Badge>
          <CardTitle className="font-display text-4xl font-black tracking-[-0.06em] text-primary">
            {title}
          </CardTitle>
          <CardDescription className="max-w-xl text-sm leading-7 text-muted-foreground">
            {detail}
          </CardDescription>
        </CardHeader>
        {action ? <CardContent className="py-5">{action}</CardContent> : null}
      </Card>
    </div>
  );
}

export function NpcManager() {
  const { isLoaded, isSignedIn } = useAuth();
  const managerData = useQuery(api.npcs.getManagerData, isSignedIn ? {} : "skip") as
    | ManagerData
    | undefined;
  const createCategory = useMutation(api.npcs.createCategory);
  const renameCategory = useMutation(api.npcs.renameCategory);
  const deleteCategory = useMutation(api.npcs.deleteCategory);
  const moveInManager = useMutation(api.npcs.moveInManager);
  const archiveNpc = useMutation(api.npcs.archive);

  const [viewFilter, setViewFilter] = useState<ViewFilter>("all");
  const [actorKindFilter, setActorKindFilter] = useState<ActorKindFilter>("all");
  const [search, setSearch] = useState("");
  const [newCategoryLabel, setNewCategoryLabel] = useState("");
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [dragState, setDragState] = useState<NpcDragState | null>(null);
  const [editingCategoryId, setEditingCategoryId] =
    useState<Id<"npcCategories"> | null>(null);
  const [editingLabel, setEditingLabel] = useState("");
  const sectionElementsRef = useRef(new Map<string, HTMLDivElement>());
  const rowElementsRef = useRef(new Map<string, HTMLDivElement>());

  const categories = managerData?.categories ?? EMPTY_CATEGORIES;
  const activeNpcs = managerData?.npcs ?? EMPTY_NPCS;
  const trashedNpcs = managerData?.trashedNpcs ?? EMPTY_NPCS;

  const normalizedActiveNpcs = useMemo(
    () =>
      activeNpcs
        .map((npc) => ({
          ...npc,
          managerCategoryId: normalizeCategoryId(npc, categories),
        }))
        .sort(compareNpcs),
    [activeNpcs, categories],
  );

  const normalizedTrashedNpcs = useMemo(
    () =>
      trashedNpcs
        .map((npc) => ({
          ...npc,
          managerCategoryId: normalizeCategoryId(npc, categories),
        }))
        .sort(compareNpcs),
    [categories, trashedNpcs],
  );

  const filteredActiveNpcs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return normalizedActiveNpcs.filter((npc) => {
      if (viewFilter === "draft" && npc.status !== "draft") {
        return false;
      }
      if (viewFilter === "complete" && npc.status !== "complete") {
        return false;
      }
      if (actorKindFilter !== "all" && npc.actorKind !== actorKindFilter) {
        return false;
      }
      if (!normalizedSearch) {
        return true;
      }

      return [
        npc.name,
        npc.creatureName,
        npc.npcLoadoutName ?? "",
        npc.allegiance ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);
    });
  }, [actorKindFilter, normalizedActiveNpcs, search, viewFilter]);

  const filteredTrashedNpcs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return normalizedTrashedNpcs.filter((npc) => {
      if (actorKindFilter !== "all" && npc.actorKind !== actorKindFilter) {
        return false;
      }

      return normalizedSearch
        ? [npc.name, npc.creatureName, npc.npcLoadoutName ?? "", npc.allegiance ?? ""]
            .join(" ")
            .toLowerCase()
            .includes(normalizedSearch)
        : true;
    });
  }, [actorKindFilter, normalizedTrashedNpcs, search]);

  const visibleActiveNpcs = useMemo(
    () =>
      dragState
        ? filteredActiveNpcs.filter((npc) => npc.bugchudId !== dragState.bugchudId)
        : filteredActiveNpcs,
    [dragState, filteredActiveNpcs],
  );

  const draggedNpc = useMemo(
    () =>
      dragState
        ? normalizedActiveNpcs.find((npc) => npc.bugchudId === dragState.bugchudId) ?? null
        : null,
    [dragState, normalizedActiveNpcs],
  );

  const sections = useMemo<NpcSection[]>(() => {
    const baseSections: NpcSection[] = [
      {
        id: "uncategorized",
        label: "Uncategorized",
        categoryId: null,
        isCustom: false,
        npcs: [],
      },
      ...categories.map((category) => ({
        id: category._id,
        label: category.label,
        categoryId: category._id,
        isCustom: true,
        npcs: [],
      })),
    ];

    for (const section of baseSections) {
      section.npcs = visibleActiveNpcs.filter(
        (npc) => npc.managerCategoryId === section.categoryId,
      );
    }

    return baseSections;
  }, [categories, visibleActiveNpcs]);

  const activeCountsByCategory = useMemo(() => {
    const counts = new Map<Id<"npcCategories"> | null, number>();
    for (const npc of normalizedActiveNpcs) {
      const categoryId = npc.managerCategoryId;
      counts.set(categoryId, (counts.get(categoryId) ?? 0) + 1);
    }
    return counts;
  }, [normalizedActiveNpcs]);

  async function handleCreateCategory() {
    const label = newCategoryLabel.trim();
    if (!label) {
      return;
    }

    setPendingAction("Creating category");
    setActionError(null);
    try {
      await createCategory({ label });
      setNewCategoryLabel("");
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Category creation failed.");
    } finally {
      setPendingAction(null);
    }
  }

  async function handleRenameCategory(categoryId: Id<"npcCategories">) {
    const label = editingLabel.trim();
    if (!label) {
      return;
    }

    setPendingAction("Renaming category");
    setActionError(null);
    try {
      await renameCategory({ categoryId, label });
      setEditingCategoryId(null);
      setEditingLabel("");
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Category rename failed.");
    } finally {
      setPendingAction(null);
    }
  }

  async function handleDeleteCategory(categoryId: Id<"npcCategories">) {
    const category = categories.find((entry) => entry._id === categoryId);
    if (!category) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${category.label}" and move its entities back to Uncategorized?`,
    );
    if (!confirmed) {
      return;
    }

    setPendingAction("Deleting category");
    setActionError(null);
    try {
      await deleteCategory({ categoryId });
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Category deletion failed.");
    } finally {
      setPendingAction(null);
    }
  }

  async function handleMoveNpc(
    bugchudId: string,
    categoryId: Id<"npcCategories"> | null,
    targetIndex?: number,
  ) {
    const resolvedIndex = targetIndex ?? (activeCountsByCategory.get(categoryId) ?? 0);

    setPendingAction("Moving entity");
    setActionError(null);
    try {
      await moveInManager({
        bugchudId,
        targetCategoryId: categoryId,
        targetIndex: resolvedIndex,
      });
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Entity move failed.");
    } finally {
      setPendingAction(null);
    }
  }

  async function handleArchiveToggle(bugchudId: string, isArchived: boolean) {
    setPendingAction(isArchived ? "Trashing entity" : "Restoring entity");
    setActionError(null);
    try {
      await archiveNpc({ bugchudId, isArchived });
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Entity update failed.");
    } finally {
      setPendingAction(null);
    }
  }

  function handleDragPointerDown(
    event: ReactPointerEvent<HTMLButtonElement>,
    npc: ManagerNpc,
    section: NpcSection,
  ) {
    if (event.button !== 0) {
      return;
    }

    const rowElement = rowElementsRef.current.get(npc.bugchudId);
    if (!rowElement) {
      return;
    }

    const sourceIndex = section.npcs.findIndex((entry) => entry.bugchudId === npc.bugchudId);
    if (sourceIndex < 0) {
      return;
    }

    const rect = rowElement.getBoundingClientRect();
    event.preventDefault();
    setActionError(null);
    setDragState({
      bugchudId: npc.bugchudId,
      sourceCategoryId: section.categoryId,
      sourceIndex,
      targetCategoryId: section.categoryId,
      targetIndex: sourceIndex,
      pointerOffsetX: event.clientX - rect.left,
      pointerOffsetY: event.clientY - rect.top,
      pointerX: event.clientX,
      pointerY: event.clientY,
      width: rect.width,
      height: rect.height,
    });
  }

  const updateDragPreview = useEffectEvent((clientX: number, clientY: number) => {
    setDragState((current) => {
      if (!current) {
        return current;
      }

      const nextTarget =
        getClosestDropTarget({
          clientX,
          clientY,
          draggedBugchudId: current.bugchudId,
          sections,
          sectionElements: sectionElementsRef.current,
          rowElements: rowElementsRef.current,
        }) ?? {
          categoryId: current.targetCategoryId,
          index: current.targetIndex,
        };

      if (
        current.pointerX === clientX &&
        current.pointerY === clientY &&
        hasSameTarget(
          {
            categoryId: current.targetCategoryId,
            index: current.targetIndex,
          },
          nextTarget,
        )
      ) {
        return current;
      }

      return {
        ...current,
        pointerX: clientX,
        pointerY: clientY,
        targetCategoryId: nextTarget.categoryId,
        targetIndex: nextTarget.index,
      };
    });
  });

  const cancelDrag = useEffectEvent(() => {
    setDragState(null);
  });

  const finishDrag = useEffectEvent(() => {
    if (!dragState) {
      return;
    }

    const shouldPersist =
      dragState.sourceCategoryId !== dragState.targetCategoryId ||
      dragState.sourceIndex !== dragState.targetIndex;

    const { bugchudId, targetCategoryId, targetIndex } = dragState;
    setDragState(null);

    if (shouldPersist) {
      void handleMoveNpc(bugchudId, targetCategoryId, targetIndex);
    }
  });

  const activeDragId = dragState?.bugchudId ?? null;

  useEffect(() => {
    if (!activeDragId) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      updateDragPreview(event.clientX, event.clientY);
    };
    const handlePointerUp = () => {
      finishDrag();
    };
    const handlePointerCancel = () => {
      cancelDrag();
    };

    const previousUserSelect = document.body.style.userSelect;
    const previousCursor = document.body.style.cursor;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerCancel);

    return () => {
      document.body.style.userSelect = previousUserSelect;
      document.body.style.cursor = previousCursor;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [activeDragId]);

  if (!isLoaded) {
    return (
      <WorkspaceLoading
        title="Syncing Session"
        detail="Waiting for the auth session before opening the NPC workspace."
      />
    );
  }

  if (!isSignedIn) {
    return (
      <WorkspaceLoading
        title="Sign In Required"
        detail="NPC management lives behind the protected archive."
        action={
          <SignInButton mode="modal">
            <Button>Authenticate</Button>
          </SignInButton>
        }
      />
    );
  }

  if (!managerData) {
    return (
      <WorkspaceLoading
        title="Hydrating Workspace"
        detail="Loading your categories, active entities, and trash view."
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="grain-overlay pointer-events-none fixed inset-0 z-0" />

      <main className="relative z-10 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[120rem] flex-col gap-6">
          <header className="flex flex-col gap-4 border-b border-border/20 pb-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex min-w-0 flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">NPC manager</Badge>
                <Badge variant="ghost">{activeNpcs.length} active</Badge>
                <Badge variant="ghost">{trashedNpcs.length} in trash</Badge>
              </div>
              <div>
                <h1 className="font-display text-4xl font-black tracking-[-0.06em] text-primary sm:text-5xl">
                  NPCs
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
                  Organize the full creature-side roster, move entities between sections, and open any draft in the advanced editor.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button asChild>
                <Link href="/npcs/new">New entity</Link>
              </Button>
            </div>
          </header>

          {actionError ? (
            <Card size="sm" className="border border-secondary/40 bg-secondary/12">
              <CardHeader className="gap-2">
                <CardTitle className="text-xs uppercase tracking-[0.18em] text-secondary">
                  Workspace issue
                </CardTitle>
                <CardDescription className="text-xs leading-6 text-secondary-foreground">
                  {actionError}
                </CardDescription>
              </CardHeader>
            </Card>
          ) : null}

          {!activeNpcs.length && !trashedNpcs.length ? (
            <ManagerPlaceholder />
          ) : (
            <section className="flex flex-col gap-4 border border-border/20 bg-background/70 p-4">
              <div className="flex flex-col gap-3">
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search entities"
                />
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["all", "All"],
                      ["draft", "Drafts"],
                      ["complete", "Completed"],
                      ["trash", "Trash"],
                    ] as const
                  ).map(([value, label]) => (
                    <Button
                      key={value}
                      variant={viewFilter === value ? "default" : "outline"}
                      size="xs"
                      onClick={() => setViewFilter(value)}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["all", "All kinds"],
                      ["npc", "NPCs"],
                      ["creature", "Creatures"],
                      ["mount", "Mounts"],
                    ] as const
                  ).map(([value, label]) => (
                    <Button
                      key={value}
                      variant={actorKindFilter === value ? "default" : "outline"}
                      size="xs"
                      onClick={() => setActorKindFilter(value)}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-end gap-2 border-t border-border/15 pt-4">
                <div className="flex-1">
                  <label
                    htmlFor="new-category-label"
                    className="mb-2 block text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    New category
                  </label>
                  <Input
                    id="new-category-label"
                    value={newCategoryLabel}
                    onChange={(event) => setNewCategoryLabel(event.target.value)}
                    placeholder="Raiders"
                  />
                </div>
                <Button
                  size="sm"
                  onClick={() => void handleCreateCategory()}
                  disabled={Boolean(pendingAction)}
                >
                  Add
                </Button>
              </div>

              {pendingAction ? (
                <Badge variant="outline" className="w-fit">
                  {pendingAction}
                </Badge>
              ) : null}

              {viewFilter === "trash" ? (
                <div className="border-t border-border/15 pt-4">
                  <div className="mb-3 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                    Trash
                  </div>
                  <div className="border border-border/15">
                    {filteredTrashedNpcs.length ? (
                      filteredTrashedNpcs.map((npc) => (
                        <NpcListRow
                          key={npc._id}
                          npc={npc}
                          categories={categories}
                          onMoveToCategory={handleMoveNpc}
                          onArchiveToggle={handleArchiveToggle}
                        />
                      ))
                    ) : (
                      <div className="px-3 py-4 text-sm leading-7 text-muted-foreground">
                        Trash is empty.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 border-t border-border/15 pt-4">
                  {sections.map((section) => (
                    <section key={section.id} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-2">
                          {editingCategoryId === section.categoryId && section.isCustom ? (
                            <>
                              <Input
                                value={editingLabel}
                                onChange={(event) => setEditingLabel(event.target.value)}
                                className="h-8"
                              />
                              <Button
                                size="xs"
                                onClick={() =>
                                  section.categoryId
                                    ? void handleRenameCategory(section.categoryId)
                                    : undefined
                                }
                              >
                                Save
                              </Button>
                              <Button
                                variant="ghost"
                                size="xs"
                                onClick={() => {
                                  setEditingCategoryId(null);
                                  setEditingLabel("");
                                }}
                              >
                                Cancel
                              </Button>
                            </>
                          ) : null}
                          {editingCategoryId !== section.categoryId ? (
                            <>
                              <div className="truncate text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">
                                {section.label}
                              </div>
                              <Badge variant="ghost">{section.npcs.length}</Badge>
                            </>
                          ) : null}
                        </div>
                        {section.isCustom && editingCategoryId !== section.categoryId ? (
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="xs"
                              onClick={() => {
                                setEditingCategoryId(section.categoryId);
                                setEditingLabel(section.label);
                              }}
                            >
                              Rename
                            </Button>
                            <Button
                              variant="ghost"
                              size="xs"
                              onClick={() =>
                                section.categoryId
                                  ? void handleDeleteCategory(section.categoryId)
                                  : undefined
                              }
                            >
                              Delete
                            </Button>
                          </div>
                        ) : null}
                      </div>

                      <div
                        ref={(node) => setElementRef(sectionElementsRef.current, section.id, node)}
                        className={cn(
                          "border border-border/15 transition-colors duration-200",
                          dragState?.targetCategoryId === section.categoryId &&
                            "border-primary/30 bg-primary/5",
                        )}
                      >
                        {section.npcs.length || dragState ? (
                          Array.from({ length: section.npcs.length + 1 }, (_, index) => {
                            const npc = section.npcs[index];
                            const isTargetSlot =
                              dragState?.targetCategoryId === section.categoryId &&
                              dragState.targetIndex === index;

                            return (
                              <div key={`${section.id}-slot-${index}`}>
                                <NpcDropSlot
                                  active={Boolean(isTargetSlot)}
                                  height={dragState?.height ?? 0}
                                />
                                {npc ? (
                                  <NpcListRow
                                    npc={npc}
                                    categories={categories}
                                    draggable
                                    rowRef={(node) =>
                                      setElementRef(rowElementsRef.current, npc.bugchudId, node)
                                    }
                                    onMoveToCategory={handleMoveNpc}
                                    onArchiveToggle={handleArchiveToggle}
                                    onDragPointerDown={(event, activeNpc) =>
                                      handleDragPointerDown(event, activeNpc, section)
                                    }
                                  />
                                ) : null}
                              </div>
                            );
                          })
                        ) : (
                          <div className="px-3 py-4 text-sm leading-7 text-muted-foreground">
                            {search
                              ? "No entities match this section."
                              : "Drop entities here or move one with the selector."}
                          </div>
                        )}
                      </div>
                    </section>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </main>

      {dragState && draggedNpc ? (
        <div
          className="pointer-events-none fixed left-0 top-0 z-30"
          style={{
            width: dragState.width,
            transform: `translate3d(${dragState.pointerX - dragState.pointerOffsetX}px, ${
              dragState.pointerY - dragState.pointerOffsetY
            }px, 0) rotate(-1.35deg)`,
          }}
        >
          <NpcListRow
            npc={draggedNpc}
            categories={categories}
            dragPreview
            onMoveToCategory={() => undefined}
            onArchiveToggle={() => undefined}
          />
        </div>
      ) : null}
    </div>
  );
}
