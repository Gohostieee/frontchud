"use client";

import Link from "next/link";
import { ArrowSquareOut, List, Lightning } from "@phosphor-icons/react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type LiveNavItem = {
  label: string;
  href: string;
  kind: "live";
  match: (pathname: string) => boolean;
};

type UpcomingNavItemType = {
  label: string;
  kind: "upcoming";
  match: (pathname: string) => boolean;
};

type NavItem = LiveNavItem | UpcomingNavItemType;

const NAV_ITEMS: readonly NavItem[] = [
  {
    label: "Home",
    href: "/",
    kind: "live",
    match: (pathname: string) => pathname === "/",
  },
  {
    label: "Characters",
    href: "/characters",
    kind: "live",
    match: (pathname: string) =>
      pathname === "/characters" ||
      (pathname !== "/characters/new" && /^\/characters\/[^/]+$/.test(pathname)),
  },
  {
    label: "New Character",
    href: "/characters/new",
    kind: "live",
    match: (pathname: string) => pathname === "/characters/new",
  },
  {
    label: "Server",
    href: "/server",
    kind: "live",
    match: (pathname: string) => pathname === "/server",
  },
  {
    label: "NPCs",
    kind: "upcoming",
    match: () => false,
  },
  {
    label: "Grimoire",
    kind: "upcoming",
    match: () => false,
  },
  {
    label: "Log",
    kind: "upcoming",
    match: () => false,
  },
];

function LiveNavLink({
  item,
  pathname,
  mobile = false,
}: {
  item: LiveNavItem;
  pathname: string;
  mobile?: boolean;
}) {
  const isActive = item.match(pathname);

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex items-center gap-2 border border-transparent px-3 py-2 font-sans text-[0.68rem] uppercase tracking-[0.28em] transition-colors",
        mobile && "w-full justify-between px-4 py-3",
        isActive
          ? "border-primary/30 bg-primary/10 text-primary"
          : "text-muted-foreground hover:border-border/25 hover:bg-card/70 hover:text-accent",
      )}
    >
      <span>{item.label}</span>
      {mobile ? (
        <span className="font-mono text-[0.58rem] tracking-[0.24em] text-muted-foreground">
          Open
        </span>
      ) : null}
    </Link>
  );
}

function UpcomingNavItem({
  item,
  mobile = false,
}: {
  item: UpcomingNavItemType;
  mobile?: boolean;
}) {
  return (
    <div
      aria-disabled="true"
      className={cn(
        "inline-flex items-center gap-2 border border-border/10 px-3 py-2 font-sans text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground/65",
        mobile && "w-full justify-between px-4 py-3",
      )}
    >
      <span>{item.label}</span>
      <span className="border border-border/15 px-1.5 py-0.5 font-mono text-[0.52rem] tracking-[0.24em] text-primary/85">
        Soon
      </span>
    </div>
  );
}

export function SiteNavbar() {
  const pathname = usePathname();
  const liveItems = NAV_ITEMS.filter(
    (item): item is LiveNavItem => item.kind === "live",
  );
  const upcomingItems = NAV_ITEMS.filter(
    (item): item is UpcomingNavItemType => item.kind === "upcoming",
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border/20 bg-background/88 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-[110rem] items-center gap-3 px-4 lg:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="status-rune size-2 shrink-0 bg-primary" />
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-display text-2xl font-black uppercase tracking-[0.18em] text-primary sm:text-[1.7rem]">
              Frontchud
            </span>
            <span className="hidden font-mono text-[0.58rem] uppercase tracking-[0.3em] text-muted-foreground sm:block">
              Global command layer
            </span>
          </div>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-2 lg:flex">
          {liveItems.map((item) => (
            <LiveNavLink key={item.label} item={item} pathname={pathname} />
          ))}
          <span className="mx-2 h-5 w-px bg-border/20" />
          {upcomingItems.map((item) => (
            <UpcomingNavItem key={item.label} item={item} />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" size="sm">
                <ArrowSquareOut data-icon="inline-end" />
                <span className="uppercase tracking-[0.28em]">Enter</span>
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="lg:hidden"
                aria-label="Open navigation"
              >
                <List />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[88vw] max-w-sm border-r border-border/20 bg-sidebar px-0 text-sidebar-foreground"
            >
              <SheetHeader className="border-b border-border/15 px-6 py-5">
                <SheetTitle className="sr-only">Frontchud navigation</SheetTitle>
                <div className="flex items-center gap-3">
                  <span className="status-rune size-2 bg-primary" />
                  <div className="flex flex-col">
                    <span className="font-display text-3xl font-black uppercase tracking-[0.18em] text-primary">
                      Frontchud
                    </span>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
                      Navigate the live system
                    </span>
                  </div>
                </div>
              </SheetHeader>

              <div className="flex h-full flex-col">
                <div className="flex flex-col gap-5 px-4 py-5">
                  <section className="flex flex-col gap-2">
                    <p className="px-1 font-mono text-[0.58rem] uppercase tracking-[0.3em] text-muted-foreground">
                      Live routes
                    </p>
                    {liveItems.map((item) => (
                      <SheetClose key={item.label} asChild>
                        <LiveNavLink item={item} pathname={pathname} mobile />
                      </SheetClose>
                    ))}
                  </section>

                  <section className="flex flex-col gap-2 border-t border-border/15 pt-5">
                    <p className="px-1 font-mono text-[0.58rem] uppercase tracking-[0.3em] text-muted-foreground">
                      Incoming modules
                    </p>
                    {upcomingItems.map((item) => (
                      <UpcomingNavItem key={item.label} item={item} mobile />
                    ))}
                  </section>
                </div>

                <div className="mt-auto border-t border-border/15 px-4 py-4">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button className="w-full">
                        <Lightning data-icon="inline-end" />
                        <span className="uppercase tracking-[0.28em]">
                          Authenticate
                        </span>
                      </Button>
                    </SignInButton>
                  </SignedOut>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
