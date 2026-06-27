"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Search } from "lucide-react";
import type { KeyboardRow } from "@/lib/keyboard-layout";

export function KeyboardLayoutTable({ rows }: { rows: KeyboardRow[] }) {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return rows;
    }

    return rows.filter((row) =>
      [row.category, row.family, row.fidel, row.latin]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalized))
    );
  }, [query, rows]);

  const copy = async (row: KeyboardRow) => {
    await navigator.clipboard.writeText(row.fidel);
    const key = `${row.fidel}-${row.latin}`;
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-line bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-black">Searchable layout table</h2>
            <p className="mt-2 text-sm leading-6 text-ink/64">Search by Latin keys, Ethiopic symbol, or category. Each row includes a one-click copy button.</p>
          </div>
          <label className="relative block w-full lg:max-w-sm">
            <span className="sr-only">Search keyboard layout</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/45" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search gn, g40, ፵, ሀ, ha"
              className="h-12 w-full rounded-full border border-line bg-surface-light pl-11 pr-4 text-sm font-semibold text-ink outline-none transition-colors placeholder:text-ink/42 focus:border-blue-primary focus:bg-white focus:ring-4 focus:ring-blue-primary/10"
            />
          </label>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-line">
          <div className="hidden grid-cols-[1fr_96px_1fr_120px] bg-ink px-4 py-3 text-xs font-black uppercase tracking-normal text-white md:grid">
            <div>Category</div>
            <div>Fidel</div>
            <div>Typing shortcut</div>
            <div className="text-right">Copy</div>
          </div>
          <div className="divide-y divide-line">
            {filteredRows.map((row) => {
              const key = `${row.fidel}-${row.latin}`;
              const isCopied = copied === key;
              return (
                <article key={`${row.category}-${key}`} className="grid gap-3 bg-white p-4 transition-colors hover:bg-blue-primary/5 md:grid-cols-[1fr_96px_1fr_120px] md:items-center">
                  <div>
                    <div className="text-xs font-black uppercase tracking-normal text-blue-primary">{row.category}</div>
                    {row.family ? <div className="mt-1 text-xs font-semibold text-ink/50">Family {row.family}</div> : null}
                  </div>
                  <div className="text-3xl font-black text-ink">{row.fidel}</div>
                  <div className="inline-flex w-fit rounded-full bg-surface-light px-3 py-1.5 font-mono text-sm font-black text-blue-primary">{row.latin}</div>
                  <button
                    type="button"
                    onClick={() => void copy(row)}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-line px-4 text-sm font-black text-ink transition-colors hover:border-blue-primary hover:bg-blue-primary hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-primary/20 md:justify-self-end"
                    aria-label={`Copy ${row.fidel}`}
                  >
                    {isCopied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                    {isCopied ? "Copied" : "Copy"}
                  </button>
                </article>
              );
            })}
          </div>
        </div>

        {filteredRows.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-line bg-surface-light p-6 text-center text-sm font-semibold text-ink/64">No mapping found for “{query}”.</div>
        ) : null}
      </div>
    </section>
  );
}
