import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ChevronDown,
  Download,
  Plus,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { colleges, spring, type College } from "@/lib/setu-data";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "Verify a course approval — Setu" },
      {
        name: "description",
        content:
          "Search any Indian engineering college and course to see whether it is currently approved by AICTE, with a dated verification you can re-check anytime.",
      },
      { property: "og:title", content: "Is this course actually approved?" },
      {
        property: "og:description",
        content: "Public, login-free AICTE approval verification for students and parents.",
      },
    ],
  }),
  component: VerifyPage,
});

function QrPlaceholder() {
  const cells = useMemo(() => {
    const out: boolean[] = [];
    let seed = 7;
    for (let i = 0; i < 441; i++) {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      out.push((seed >> 8) % 3 !== 0);
    }
    return out;
  }, []);
  return (
    <svg viewBox="0 0 21 21" className="size-24" role="img" aria-label="Verification QR code">
      <rect width="21" height="21" fill="transparent" />
      {cells.map((on, i) =>
        on ? (
          <rect
            key={i}
            x={i % 21}
            y={Math.floor(i / 21)}
            width="1"
            height="1"
            fill="currentColor"
          />
        ) : null,
      )}
      {(
        [
          [0, 0],
          [14, 0],
          [0, 14],
        ] as const
      ).map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="7" height="7" fill="var(--color-card)" />
          <rect
            x={x + 0.5}
            y={y + 0.5}
            width="6"
            height="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <rect x={x + 2} y={y + 2} width="3" height="3" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}

function VerifyPage() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState<College | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [shortlist, setShortlist] = useState<College[]>([]);

  const results = colleges.filter(
    (c) =>
      query.trim().length > 0 &&
      `${c.name} ${c.course} ${c.city}`.toLowerCase().includes(query.toLowerCase()),
  );

  const addToShortlist = (c: College) => {
    setShortlist((s) => (s.some((x) => x.id === c.id) || s.length >= 3 ? s : [...s, c]));
  };

  return (
    <main className="min-h-screen px-6 pb-28">
      <div className="mx-auto flex max-w-2xl flex-col items-center pt-20 sm:pt-28">
        <Link
          to="/"
          className="mb-16 inline-flex items-center gap-1.5 self-start text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> Setu
        </Link>

        <motion.h1
          layout
          transition={spring}
          className="text-center text-3xl font-semibold tracking-tight sm:text-[2.5rem] sm:leading-tight"
        >
          Is this course actually approved?
        </motion.h1>

        <motion.div layout transition={spring} className="relative mt-10 w-full">
          <Search className="absolute top-1/2 left-5 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 120)}
            placeholder="Search college name + course"
            className="w-full rounded-xl border border-border bg-card py-4 pr-5 pl-12 text-base outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/60"
          />

          <AnimatePresence>
            {focused && results.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={spring}
                className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-border bg-popover shadow-sm"
              >
                {results.map((c) => (
                  <li key={c.id}>
                    <button
                      onMouseDown={() => {
                        setSelected(c);
                        setQuery("");
                        setHistoryOpen(false);
                      }}
                      className="flex w-full flex-col items-start px-5 py-3 text-left transition-colors hover:bg-accent"
                    >
                      <span className="text-sm">{c.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {c.course} · {c.city}
                      </span>
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 text-center text-sm text-muted-foreground"
            >
              Try “Kalinga”, “Ramakrishna” or “Bhilai”. No login, no forms.
            </motion.p>
          ) : (
            <motion.section
              key={selected.id}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={spring}
              className="mt-10 w-full rounded-2xl border border-border bg-card p-8 sm:p-10"
            >
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <h2 className="text-lg font-medium">{selected.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {selected.course} · Intake {selected.intake}
                  </p>
                </div>
                <QrPlaceholder />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.08 }}
                className="mt-8 flex items-center gap-3"
              >
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                    selected.status === "approved"
                      ? "bg-ok-soft text-ok-foreground"
                      : "bg-warn-soft text-warn-foreground"
                  }`}
                >
                  <ShieldCheck className="size-4" />
                  {selected.status === "approved"
                    ? `Approved for ${selected.intake}`
                    : `Conditionally approved for ${selected.intake}`}
                </span>
              </motion.div>

              <p className="mt-3 text-xs text-muted-foreground">
                Verified as of 12 Aug 2026, 9:14 AM · Scan the code to re-verify anytime — it always
                shows today's status.
              </p>

              <p className="mt-6 text-sm leading-relaxed">
                This means your degree will be valid for GATE, CAT and campus placements.
              </p>

              <div className="mt-8 border-t border-border pt-5">
                <button
                  onClick={() => setHistoryOpen((v) => !v)}
                  className="flex w-full items-center justify-between text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  History
                  <ChevronDown
                    className={`size-4 transition-transform ${historyOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {historyOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={spring}
                      className="overflow-hidden"
                    >
                      <div className="relative mt-8 flex items-start justify-between px-2">
                        <div className="absolute top-1.5 right-6 left-6 h-px bg-border" />
                        {selected.history.map((h) => (
                          <div key={h.year} className="relative flex flex-1 flex-col items-center">
                            <span
                              className={`size-3 rounded-full ${
                                h.state === "ok" ? "bg-ok" : "bg-warn"
                              }`}
                            />
                            <span className="mt-3 text-xs text-muted-foreground">{h.year}</span>
                            {h.note && (
                              <span className="mt-1 max-w-[14rem] text-center text-xs text-warn-foreground">
                                {h.note}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() =>
                    toast.success("Certificate downloaded", {
                      description: "Verified 12 Aug 2026.",
                    })
                  }
                >
                  <Download className="size-4" />
                  Download verified certificate
                </Button>
                <button
                  onClick={() => addToShortlist(selected)}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Plus className="size-3.5" />
                  Compare shortlist
                </button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {shortlist.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={spring}
              className="mt-12 w-full"
            >
              <p className="text-xs tracking-widest text-muted-foreground uppercase">
                Shortlist ({shortlist.length}/3)
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <tbody>
                    <tr>
                      <th className="py-3 pr-6 text-xs font-normal text-muted-foreground">
                        College
                      </th>
                      {shortlist.map((c) => (
                        <td key={c.id} className="py-3 pr-6 align-top">
                          <div className="flex items-start gap-2">
                            <span>{c.name}</span>
                            <button
                              onClick={() =>
                                setShortlist((s) => s.filter((x) => x.id !== c.id))
                              }
                              aria-label={`Remove ${c.name}`}
                              className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <X className="size-3.5" />
                            </button>
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t border-border">
                      <th className="py-3 pr-6 text-xs font-normal text-muted-foreground">
                        Approval status
                      </th>
                      {shortlist.map((c) => (
                        <td
                          key={c.id}
                          className={`py-3 pr-6 ${c.status === "approved" ? "text-ok-foreground" : "text-warn-foreground"}`}
                        >
                          {c.status === "approved" ? "Approved" : "Conditional"}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t border-border">
                      <th className="py-3 pr-6 text-xs font-normal text-muted-foreground">
                        Accreditation
                      </th>
                      {shortlist.map((c) => (
                        <td key={c.id} className="py-3 pr-6">
                          {c.accreditation}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t border-border">
                      <th className="py-3 pr-6 text-xs font-normal text-muted-foreground">
                        Approved since
                      </th>
                      {shortlist.map((c) => (
                        <td key={c.id} className="py-3 pr-6">
                          {c.since}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
