import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { applications, evaluatorsByApp } from "@/lib/setu-data";
import {
  FileText,
  Home,
  LayoutDashboard,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";


export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (to: string, hash?: string) => {
    setOpen(false);
    void navigate(hash ? ({ to, hash } as never) : ({ to } as never));
  };

  const allEvaluators = Object.entries(evaluatorsByApp).flatMap(([appId, list]) =>
    list.map((e) => ({ ...e, appId })),
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <Search className="size-3.5" />
        Search
        <kbd className="rounded border border-border px-1 font-sans text-[10px]">⌘K</kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Jump to an application, evaluator or screen…" />
        <CommandList>
          <CommandEmpty>Nothing matches that.</CommandEmpty>
          <CommandGroup heading="Applications">
            {applications.map((a) => (
              <CommandItem
                key={a.id}
                value={`${a.id} ${a.institution} ${a.specialization}`}
                onSelect={() => go("/evaluators", a.id)}
              >
                <FileText className="size-4 text-muted-foreground" />
                <span>{a.institution}</span>
                <span className="ml-auto text-xs text-muted-foreground">{a.id}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Evaluators">
            {allEvaluators.map((e) => (
              <CommandItem
                key={e.id}
                value={`${e.name} ${e.affiliation}`}
                onSelect={() => go("/evaluators", e.appId)}
              >
                <UserRound className="size-4 text-muted-foreground" />
                <span>{e.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">{e.affiliation}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Screens">
            <CommandItem value="coordinator dashboard overview" onSelect={() => go("/dashboard")}>
              <LayoutDashboard className="size-4 text-muted-foreground" />
              Coordinator Overview
            </CommandItem>
            <CommandItem value="officer control desk overview" onSelect={() => go("/control")}>
              <LayoutDashboard className="size-4 text-muted-foreground" />
              Officer Control Desk
            </CommandItem>
            <CommandItem value="compliance vault" onSelect={() => go("/vault")}>
              <ShieldCheck className="size-4 text-muted-foreground" />
              Compliance Vault
            </CommandItem>

            <CommandItem value="ai pre-scrutiny readiness findings" onSelect={() => go("/scrutiny")}>
              <Sparkles className="size-4 text-muted-foreground" />
              AI Pre-Scrutiny
            </CommandItem>
            <CommandItem value="evaluator matching" onSelect={() => go("/evaluators")}>
              <UserRound className="size-4 text-muted-foreground" />
              Evaluator Matching
            </CommandItem>
            <CommandItem value="student verification" onSelect={() => go("/verify")}>
              <Search className="size-4 text-muted-foreground" />
              Student Verification
            </CommandItem>
            <CommandItem value="home role select" onSelect={() => go("/")}>
              <Home className="size-4 text-muted-foreground" />
              Back to role select
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
