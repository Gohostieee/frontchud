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
  _id: Id<"characterCategories">;
  label: string;
  sortOrder: number;
  updatedAt: number;
};

type ManagerCharacter = {
  _id: Id<"characters">;
  bugchudId: string;
  name: string;
  status: "draft" | "complete";
  currentStep: string;
  completedAt: number | null;
  isArchived: boolean;
  archivedAt: number | null;
  managerCategoryId: Id<"characterCategories"> | null;
  managerSortOrder: number;
  updatedAt: number;
  backgroundCount: number;
  currentFate: number;
};

type ManagerData = {
  categories: ManagerCategory[];
  characters: ManagerCharacter[];
  trashedCharacters: ManagerCharacter[];
};

type ViewFilter = "all" | "draft" | "complete" | "trash";

type CharacterSection = {
  id: string;
  label: string;
  categoryId: Id<"characterCategories"> | null;
  isCustom: boolean;
  characters: ManagerCharacter[];
};

type CharacterDropTarget = {
  categoryId: Id<"characterCategories"> | null;
  index: number;
};

type CharacterDragState = {
  bugchudId: string;
  sourceCategoryId: Id<"characterCategories"> | null;
  sourceIndex: number;
  targetCategoryId: Id<"characterCategories"> | null;
  targetIndex: number;
  pointerOffsetX: number;
  pointerOffsetY: number;
  pointerX: number;
  pointerY: number;
  width: number;
  height: number;
};

const EMPTY_CATEGORIES: ManagerCategory[] = [];
const EMPTY_CHARACTERS: ManagerCharacter[] = [];

function compareCharacters(left: ManagerCharacter, right: ManagerCharacter) {
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

function normalizeCategoryId(
  character: ManagerCharacter,
  categories: ManagerCategory[],
) {
  if (!character.managerCategoryId) {
    return null;
  }

  return categories.some((category) => category._id === character.managerCategoryId)
    ? character.managerCategoryId
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

function hasSameTarget(left: CharacterDropTarget, right: CharacterDropTarget) {
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
  sections: CharacterSection[];
  sectionElements: Map<string, HTMLDivElement>;
  rowElements: Map<string, HTMLDivElement>;
}): CharacterDropTarget | null {
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
        section: CharacterSection;
        score: number;
      } => candidate !== null,
    )
    .sort((left, right) => left.score - right.score)[0];

  if (!sectionCandidate) {
    return null;
  }

  const visibleCharacters = sectionCandidate.section.characters.filter(
    (character) => character.bugchudId !== draggedBugchudId,
  );

  let index = visibleCharacters.length;

  for (const [characterIndex, character] of visibleCharacters.entries()) {
    const rowElement = rowElements.get(character.bugchudId);
    if (!rowElement) {
      continue;
    }

    const rect = rowElement.getBoundingClientRect();
    if (clientY < rect.top + rect.height / 2) {
      index = characterIndex;
      break;
    }
  }

  return {
    categoryId: sectionCandidate.section.categoryId,
    index,
  };
}

function CharacterListRow({
  character,
  categories,
  draggable = false,
  dragPreview = false,
  rowRef,
  onMoveToCategory,
  onArchiveToggle,
  onDragPointerDown,
}: {
  character: ManagerCharacter;
  categories: ManagerCategory[];
  draggable?: boolean;
  dragPreview?: boolean;
  rowRef?: (node: HTMLDivElement | null) => void;
  onMoveToCategory: (
    bugchudId: string,
    categoryId: Id<"characterCategories"> | null,
  ) => void;
  onArchiveToggle: (bugchudId: string, isArchived: boolean) => void;
  onDragPointerDown?: (
    event: ReactPointerEvent<HTMLButtonElement>,
    character: ManagerCharacter,
  ) => void;
}) {
  const moveSelectValue = character.managerCategoryId ?? "__uncategorized__";

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
              aria-label={`Drag ${character.name || "Untitled Character"}`}
              className="mt-0.5 shrink-0 cursor-grab rounded-sm border border-border/15 px-1.5 py-1 text-[0.65rem] leading-none text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary active:cursor-grabbing"
              onPointerDown={(event) => onDragPointerDown?.(event, character)}
            >
              ::::
            </button>
          ) : (
            <div className="pt-0.5 text-muted-foreground">...</div>
          )}
          <div className="min-w-0 flex-1">
            <Link
              href={`/characters/${character.bugchudId}`}
              className="block min-w-0"
            >
              <div className="truncate text-sm font-medium uppercase tracking-[0.14em] text-foreground">
                {character.name || "Untitled Character"}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant={character.status === "complete" ? "default" : "outline"}>
                  {character.status}
                </Badge>
                <Badge variant="ghost">{character.currentStep}</Badge>
                <Badge variant="ghost">{character.backgroundCount} backgrounds</Badge>
                <Badge variant="ghost">Fate {character.currentFate}</Badge>
              </div>
              <div className="mt-2 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                {character.isArchived
                  ? `Trashed ${formatTimestamp(character.archivedAt)}`
                  : `Updated ${formatTimestamp(character.updatedAt)}`}
              </div>
            </Link>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <select
            aria-label="Move character to category"
            className="h-7 min-w-32 border border-border/20 bg-background px-2 text-[0.72rem] uppercase tracking-[0.12em] text-foreground"
            value={moveSelectValue}
            onChange={(event) =>
              onMoveToCategory(
                character.bugchudId,
                event.target.value === "__uncategorized__"
                  ? null
                  : (event.target.value as Id<"characterCategories">),
              )
            }
            disabled={character.isArchived || dragPreview}
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
            onClick={() => onArchiveToggle(character.bugchudId, !character.isArchived)}
            disabled={dragPreview}
          >
            {character.isArchived ? "Restore" : "Trash"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function CharacterDropSlot({
  active,
  height,
}: {
  active: boolean;
  height: number;
}) {
  const resolvedHeight = active ? Math.max(height, 72) : 0;

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden transition-[height,opacity] duration-200 ease-out"
      style={{
        height: resolvedHeight,
        opacity: active ? 1 : 0,
      }}
    >
      <div
        className="mx-3 my-1.5 border border-dashed border-primary/35 bg-primary/8"
        style={{
          height: Math.max(resolvedHeight - 12, 60),
        }}
      />
    </div>
  );
}

function ManagerPlaceholder() {
  return (
    <Card className="border border-border/20 bg-background/70">
      <CardHeader className="gap-3 border-b border-border/20 pb-5">
        <Badge variant="outline" className="w-fit">
          Character manager
        </Badge>
        <CardTitle className="font-display text-4xl font-black tracking-[-0.06em] text-primary">
          No characters yet
        </CardTitle>
        <CardDescription className="max-w-xl text-sm leading-7 text-muted-foreground">
          Start with the guided creator, then let the advanced editor take over once the draft is
          forged.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3 py-5">
        <Button asChild>
          <Link href="/characters/new">New character</Link>
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
            Character workspace
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

export function CharacterManager() {
  const { isLoaded, isSignedIn } = useAuth();
  const managerData = useQuery(
    api.characters.getManagerData,
    isSignedIn ? {} : "skip",
  ) as ManagerData | undefined;
  const createCategory = useMutation(api.characters.createCategory);
  const renameCategory = useMutation(api.characters.renameCategory);
  const deleteCategory = useMutation(api.characters.deleteCategory);
  const moveInManager = useMutation(api.characters.moveInManager);
  const archiveCharacter = useMutation(api.characters.archive);

  const [viewFilter, setViewFilter] = useState<ViewFilter>("all");
  const [search, setSearch] = useState("");
  const [newCategoryLabel, setNewCategoryLabel] = useState("");
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [dragState, setDragState] = useState<CharacterDragState | null>(null);
  const [editingCategoryId, setEditingCategoryId] =
    useState<Id<"characterCategories"> | null>(null);
  const [editingLabel, setEditingLabel] = useState("");
  const sectionElementsRef = useRef(new Map<string, HTMLDivElement>());
  const rowElementsRef = useRef(new Map<string, HTMLDivElement>());

  const categories = managerData?.categories ?? EMPTY_CATEGORIES;
  const activeCharacters = managerData?.characters ?? EMPTY_CHARACTERS;
  const trashedCharacters = managerData?.trashedCharacters ?? EMPTY_CHARACTERS;

  const normalizedActiveCharacters = useMemo(
    () =>
      activeCharacters
        .map((character) => ({
          ...character,
          managerCategoryId: normalizeCategoryId(character, categories),
        }))
        .sort(compareCharacters),
    [activeCharacters, categories],
  );

  const normalizedTrashedCharacters = useMemo(
    () =>
      trashedCharacters
        .map((character) => ({
          ...character,
          managerCategoryId: normalizeCategoryId(character, categories),
        }))
        .sort(compareCharacters),
    [categories, trashedCharacters],
  );

  const filteredActiveCharacters = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return normalizedActiveCharacters.filter((character) => {
      if (viewFilter === "draft" && character.status !== "draft") {
        return false;
      }
      if (viewFilter === "complete" && character.status !== "complete") {
        return false;
      }
      if (!normalizedSearch) {
        return true;
      }

      return character.name.toLowerCase().includes(normalizedSearch);
    });
  }, [normalizedActiveCharacters, search, viewFilter]);

  const filteredTrashedCharacters = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return normalizedTrashedCharacters.filter((character) =>
      normalizedSearch
        ? character.name.toLowerCase().includes(normalizedSearch)
        : true,
    );
  }, [normalizedTrashedCharacters, search]);

  const visibleActiveCharacters = useMemo(
    () =>
      dragState
        ? filteredActiveCharacters.filter(
            (character) => character.bugchudId !== dragState.bugchudId,
          )
        : filteredActiveCharacters,
    [dragState, filteredActiveCharacters],
  );

  const draggedCharacter = useMemo(
    () =>
      dragState
        ? normalizedActiveCharacters.find(
            (character) => character.bugchudId === dragState.bugchudId,
          ) ?? null
        : null,
    [dragState, normalizedActiveCharacters],
  );

  const sections = useMemo<CharacterSection[]>(() => {
    const baseSections: CharacterSection[] = [
      {
        id: "uncategorized",
        label: "Uncategorized",
        categoryId: null,
        isCustom: false,
        characters: [],
      },
      ...categories.map((category) => ({
        id: category._id,
        label: category.label,
        categoryId: category._id,
        isCustom: true,
        characters: [],
      })),
    ];

    for (const section of baseSections) {
      section.characters = visibleActiveCharacters.filter(
        (character) => character.managerCategoryId === section.categoryId,
      );
    }

    return baseSections;
  }, [categories, visibleActiveCharacters]);

  const activeCountsByCategory = useMemo(() => {
    const counts = new Map<Id<"characterCategories"> | null, number>();
    for (const character of normalizedActiveCharacters) {
      const categoryId = character.managerCategoryId;
      counts.set(categoryId, (counts.get(categoryId) ?? 0) + 1);
    }
    return counts;
  }, [normalizedActiveCharacters]);

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
      setActionError(
        error instanceof Error ? error.message : "Category creation failed.",
      );
    } finally {
      setPendingAction(null);
    }
  }

  async function handleRenameCategory(categoryId: Id<"characterCategories">) {
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
      setActionError(
        error instanceof Error ? error.message : "Category rename failed.",
      );
    } finally {
      setPendingAction(null);
    }
  }

  async function handleDeleteCategory(categoryId: Id<"characterCategories">) {
    const category = categories.find((entry) => entry._id === categoryId);
    if (!category) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${category.label}" and move its characters back to Uncategorized?`,
    );
    if (!confirmed) {
      return;
    }

    setPendingAction("Deleting category");
    setActionError(null);
    try {
      await deleteCategory({ categoryId });
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Category deletion failed.",
      );
    } finally {
      setPendingAction(null);
    }
  }

  async function handleMoveCharacter(
    bugchudId: string,
    categoryId: Id<"characterCategories"> | null,
    targetIndex?: number,
  ) {
    const resolvedIndex =
      targetIndex ?? (activeCountsByCategory.get(categoryId) ?? 0);

    setPendingAction("Moving character");
    setActionError(null);
    try {
      await moveInManager({
        bugchudId,
        targetCategoryId: categoryId,
        targetIndex: resolvedIndex,
      });
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Character move failed.",
      );
    } finally {
      setPendingAction(null);
    }
  }

  async function handleArchiveToggle(bugchudId: string, isArchived: boolean) {
    setPendingAction(isArchived ? "Trashing character" : "Restoring character");
    setActionError(null);
    try {
      await archiveCharacter({ bugchudId, isArchived });
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Character update failed.",
      );
    } finally {
      setPendingAction(null);
    }
  }

  function handleDragPointerDown(
    event: ReactPointerEvent<HTMLButtonElement>,
    character: ManagerCharacter,
    section: CharacterSection,
  ) {
    if (event.button !== 0) {
      return;
    }

    const rowElement = rowElementsRef.current.get(character.bugchudId);
    if (!rowElement) {
      return;
    }

    const sourceIndex = section.characters.findIndex(
      (entry) => entry.bugchudId === character.bugchudId,
    );
    if (sourceIndex < 0) {
      return;
    }

    const rect = rowElement.getBoundingClientRect();
    event.preventDefault();
    setActionError(null);
    setDragState({
      bugchudId: character.bugchudId,
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
      void handleMoveCharacter(bugchudId, targetCategoryId, targetIndex);
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
        detail="Waiting for the auth session before opening the character workspace."
      />
    );
  }

  if (!isSignedIn) {
    return (
      <WorkspaceLoading
        title="Sign In Required"
        detail="Character management lives behind the protected archive."
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
        detail="Loading your categories, active characters, and trash view."
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
                <Badge variant="outline">Character manager</Badge>
                <Badge variant="ghost">{activeCharacters.length} active</Badge>
                <Badge variant="ghost">{trashedCharacters.length} in trash</Badge>
              </div>
              <div>
                <h1 className="font-display text-4xl font-black tracking-[-0.06em] text-primary sm:text-5xl">
                  Characters
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
                  Organize the full roster, move characters between sections, and open any draft in the advanced editor.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button asChild>
                <Link href="/characters/new">New character</Link>
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

          {!activeCharacters.length && !trashedCharacters.length ? (
            <ManagerPlaceholder />
          ) : (
            <section className="flex flex-col gap-4 border border-border/20 bg-background/70 p-4">
              <div className="flex flex-col gap-3">
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search characters"
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
                    placeholder="Frontline"
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
                    {filteredTrashedCharacters.length ? (
                      filteredTrashedCharacters.map((character) => (
                        <CharacterListRow
                          key={character._id}
                          character={character}
                          categories={categories}
                          onMoveToCategory={handleMoveCharacter}
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
                              <Badge variant="ghost">{section.characters.length}</Badge>
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
                        ref={(node) =>
                          setElementRef(sectionElementsRef.current, section.id, node)
                        }
                        className={cn(
                          "border border-border/15 transition-colors duration-200",
                          dragState?.targetCategoryId === section.categoryId &&
                            "border-primary/30 bg-primary/5",
                        )}
                      >
                        {section.characters.length || dragState ? (
                          Array.from(
                            { length: section.characters.length + 1 },
                            (_, index) => {
                              const character = section.characters[index];
                              const isTargetSlot =
                                dragState?.targetCategoryId === section.categoryId &&
                                dragState.targetIndex === index;

                              return (
                                <div key={`${section.id}-slot-${index}`}>
                                  <CharacterDropSlot
                                    active={Boolean(isTargetSlot)}
                                    height={dragState?.height ?? 0}
                                  />
                                  {character ? (
                                    <CharacterListRow
                                      character={character}
                                      categories={categories}
                                      draggable
                                      rowRef={(node) =>
                                        setElementRef(
                                          rowElementsRef.current,
                                          character.bugchudId,
                                          node,
                                        )
                                      }
                                      onMoveToCategory={handleMoveCharacter}
                                      onArchiveToggle={handleArchiveToggle}
                                      onDragPointerDown={(event, activeCharacter) =>
                                        handleDragPointerDown(
                                          event,
                                          activeCharacter,
                                          section,
                                        )
                                      }
                                    />
                                  ) : null}
                                </div>
                              );
                            },
                          )
                        ) : (
                          <div className="px-3 py-4 text-sm leading-7 text-muted-foreground">
                            {search
                              ? "No characters match this section."
                              : "Drop characters here or move one with the selector."}
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

      {dragState && draggedCharacter ? (
        <div
          className="pointer-events-none fixed left-0 top-0 z-30"
          style={{
            width: dragState.width,
            transform: `translate3d(${dragState.pointerX - dragState.pointerOffsetX}px, ${
              dragState.pointerY - dragState.pointerOffsetY
            }px, 0) rotate(-1.35deg)`,
          }}
        >
          <CharacterListRow
            character={draggedCharacter}
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
