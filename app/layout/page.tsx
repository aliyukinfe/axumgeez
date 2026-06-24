import type { Metadata } from "next";
import { Keyboard, Search, Type } from "lucide-react";
import { labializedFamilies, layoutFamilies, numberRow } from "@/lib/keyboard-layout";

export const metadata: Metadata = {
  title: "Keyboard Layout",
  description: "Full AxumGeez Amharic keyboard layout reference for Windows typing."
};

export default function KeyboardLayoutPage() {
  return (
    <main className="bg-surface-light text-ink">
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-blue-primary/10 px-4 py-2 text-sm font-black text-blue-primary">
              <Keyboard className="h-4 w-4" aria-hidden="true" />
              Keyboard Layout
            </p>
            <h1 className="mt-6 text-4xl font-black tracking-normal text-ink sm:text-5xl">AxumGeez fidel reference</h1>
            <p className="mt-5 text-lg leading-8 text-ink/68">
              Use this chart as the official AxumGeez typing layout. Uppercase letters such as H, S, T, C, P, and A are typed with Shift or Caps Lock.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-surface-light p-5">
              <Type className="h-5 w-5 text-blue-primary" aria-hidden="true" />
              <p className="mt-3 text-sm font-black">Direct Unicode output</p>
              <p className="mt-2 text-sm leading-6 text-ink/64">AxumGeez types real Amharic/Geez characters into Windows apps.</p>
            </div>
            <div className="rounded-2xl border border-line bg-surface-light p-5">
              <Search className="h-5 w-5 text-blue-primary" aria-hidden="true" />
              <p className="mt-3 text-sm font-black">Fast scanning</p>
              <p className="mt-2 text-sm leading-6 text-ink/64">Families are grouped by base fidel for quick lookup.</p>
            </div>
            <div className="rounded-2xl border border-line bg-surface-light p-5">
              <Keyboard className="h-5 w-5 text-blue-primary" aria-hidden="true" />
              <p className="mt-3 text-sm font-black">Normal number row</p>
              <p className="mt-2 text-sm leading-6 text-ink/64">Shift plus number keys stays as 1 through 0, not Ethiopic numerals.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-line bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-black">Main fidel families</h2>
              <p className="mt-2 text-sm leading-6 text-ink/64">Each tile shows the Ethiopic character and the Latin keys used to type it.</p>
            </div>
            <div className="rounded-full bg-ink px-4 py-2 text-sm font-black text-white">አክሱም ግዕዝ</div>
          </div>
          <div className="mt-6 grid gap-4">
            {layoutFamilies.map((family) => (
              <article key={family.name} className="grid gap-3 rounded-2xl border border-line bg-surface-light p-3 md:grid-cols-[72px_1fr] md:items-center">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-blue-primary text-3xl font-black text-white shadow-blue">{family.name}</div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
                  {family.cells.map((cell) => (
                    <div key={`${family.name}-${cell.fidel}-${cell.latin}`} className="rounded-xl border border-line bg-white p-3 text-center transition-colors hover:border-blue-primary/50 hover:bg-blue-primary/5">
                      <div className="text-2xl font-black text-ink">{cell.fidel}</div>
                      <div className="mt-1 font-mono text-xs font-bold text-blue-primary">{cell.latin}</div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-line bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-2xl font-black">Labialized combinations</h2>
            <div className="mt-6 grid gap-4">
              {labializedFamilies.map((family) => (
                <article key={family.name} className="rounded-2xl border border-line bg-surface-light p-3">
                  <div className="mb-3 text-3xl font-black text-blue-primary">{family.name}</div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {family.cells.map((cell) => (
                      <div key={`${family.name}-${cell.fidel}-${cell.latin}`} className="rounded-xl border border-line bg-white p-3 text-center">
                        <div className="text-2xl font-black">{cell.fidel}</div>
                        <div className="mt-1 font-mono text-xs font-bold text-blue-primary">{cell.latin}</div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-line bg-ink p-6 text-white shadow-sm">
            <h2 className="text-2xl font-black">Number row</h2>
            <p className="mt-3 text-sm leading-6 text-white/70">Shift plus number keys uses normal Arabic digits in AxumGeez.</p>
            <div className="mt-6 grid grid-cols-5 gap-2">
              {numberRow.map((number) => (
                <div key={number} className="rounded-xl border border-white/10 bg-white/8 p-4 text-center text-xl font-black">{number}</div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl bg-white p-5 text-ink">
              <p className="text-sm font-black text-blue-primary">Examples</p>
              <div className="mt-3 space-y-2 text-sm font-semibold">
                <p><span className="font-mono text-ink/60">sh</span> → ሸ</p>
                <p><span className="font-mono text-ink/60">Ts</span> → ፀ</p>
                <p><span className="font-mono text-ink/60">qwaa</span> → ቋ</p>
                <p><span className="font-mono text-ink/60">gwaa</span> → ጓ</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
