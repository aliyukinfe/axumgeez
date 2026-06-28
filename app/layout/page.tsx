import type { Metadata } from "next";
import { Hash, Keyboard, ListFilter, Type } from "lucide-react";
import { KeyboardLayoutTable } from "@/components/keyboard-layout-table";
import { geezNumberRows, keyboardRows } from "@/lib/keyboard-layout";

export const metadata: Metadata = {
  title: "AxumGeez Keyboard Layout",
  description: "Search the official AxumGeez keyboard layout for Amharic fidels, Geez punctuation, Ethiopic numbers, GN mappings, and Windows typing shortcuts.",
  alternates: {
    canonical: "/layout"
  }
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
            <h1 className="mt-6 text-4xl font-black tracking-normal text-ink sm:text-5xl">Complete AxumGeez typing reference</h1>
            <p className="mt-5 text-lg leading-8 text-ink/68">
              Search every main fidel, extended fidel, Ge&apos;ez punctuation mark, and Ge&apos;ez number shortcut. The ኘ family now uses GN keys by default.
            </p>
            <div className="mt-6 rounded-2xl border border-blue-primary/20 bg-blue-primary/5 p-5">
              <p className="text-base font-black leading-7 text-ink">
                ሁሉንም በትክክል ለመጻፍ ካፒታል ሌተር የሆኑትን በካፒታል ሌተር ይጠቀሙ። ቋንቋ ለመቀየር shift+alt+a መጠቀም ይችላሉ።
              </p>
              <p className="mt-3 text-sm font-semibold leading-6 text-ink/68">
                Use this chart as the official AxumGeez typing layout. Uppercase letters such as H, S, T, C, P, and A are typed with Shift or Caps Lock.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-surface-light p-5">
              <Type className="h-5 w-5 text-blue-primary" aria-hidden="true" />
              <p className="mt-3 text-sm font-black">Main fidels</p>
              <p className="mt-2 text-sm leading-6 text-ink/64">Complete mapping from ሀ through ፐ, including Shift-based forms.</p>
            </div>
            <div className="rounded-2xl border border-line bg-surface-light p-5">
              <Hash className="h-5 w-5 text-blue-primary" aria-hidden="true" />
              <p className="mt-3 text-sm font-black">Ge&apos;ez numbers</p>
              <p className="mt-2 text-sm leading-6 text-ink/64">Use shortcuts like g1, g40, g100, and g10000.</p>
            </div>
            <div className="rounded-2xl border border-line bg-surface-light p-5">
              <ListFilter className="h-5 w-5 text-blue-primary" aria-hidden="true" />
              <p className="mt-3 text-sm font-black">Instant search</p>
              <p className="mt-2 text-sm leading-6 text-ink/64">Find mappings by Latin input or Ethiopic symbol without scrolling through the full chart.</p>
            </div>
          </div>
        </div>
      </section>

      <KeyboardLayoutTable rows={keyboardRows} />

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-line bg-ink p-6 text-white shadow-sm">
          <h2 className="text-2xl font-black">Ge&apos;ez number shortcuts</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">Normal number-row keys remain regular digits. Use the dedicated g-prefix shortcuts below when you want Ge&apos;ez numbers.</p>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-10">
            {geezNumberRows.map((row) => (
              <div key={row.latin} className="rounded-xl border border-white/10 bg-white/8 p-4 text-center">
                <div className="text-3xl font-black">{row.fidel}</div>
                <div className="mt-2 font-mono text-xs font-black text-white/72">{row.latin}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
