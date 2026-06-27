"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { KeyboardRow } from "@/lib/keyboard-layout";

export function KeyboardLayoutTable({ rows }: { rows: KeyboardRow[] }) {
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const visibleRows = normalized
      ? rows.filter((row) =>
          [row.category, row.family, row.fidel, row.latin]
            .filter(Boolean)
            .some((value) => value!.toLowerCase().includes(normalized))
        )
      : rows;

    const groups = new Map<string, KeyboardRow[]>();
    for (const row of visibleRows) {
      const key = `${row.category}-${row.family ?? row.category}`;
      groups.set(key, [...(groups.get(key) ?? []), row]);
    }

    return Array.from(groups.entries()).map(([key, values]) => ({
      key,
      category: values[0].category,
      family: values[0].family,
      values
    }));
  }, [query, rows]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-line bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-black">Keyboard reference</h2>
            <p className="mt-2 text-sm leading-6 text-ink/64">Each fidel family is shown left to right. Search by Latin keys, Ethiopic symbol, or category.</p>
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

        <div className="mt-6 space-y-3">
          {filteredRows.map((group) => (
            <article key={group.key} className="rounded-2xl border border-line bg-surface-light p-3 transition-colors hover:border-blue-primary/35">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="flex items-center gap-3 lg:w-44 lg:shrink-0">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-primary text-2xl font-black text-white shadow-blue">
                    {group.family ?? group.values[0].fidel}
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-normal text-blue-primary">{group.category}</div>
                    {group.family ? <div className="mt-1 text-xs font-semibold text-ink/52">Family {group.family}</div> : null}
                  </div>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
                  {group.values.map((row) => (
                    <div key={`${row.category}-${row.fidel}-${row.latin}`} className="rounded-xl border border-line bg-white px-3 py-3 text-center">
                      <div className="text-2xl font-black leading-none text-ink">{row.fidel}</div>
                      <div className="mt-2 font-mono text-xs font-black leading-none text-blue-primary">{row.latin}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredRows.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-line bg-surface-light p-6 text-center text-sm font-semibold text-ink/64">No mapping found for “{query}”.</div>
        ) : null}
      </div>
    </section>
  );
}
