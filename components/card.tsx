import type { LucideIcon } from "lucide-react";

export function FeatureCard({ title, body, icon: Icon }: { title: string; body: string; icon: LucideIcon }) {
  return (
    <article className="rounded-2xl border border-line bg-white p-6 shadow-sm transition-colors duration-200 hover:border-blue-primary/40 hover:bg-surface-light">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-primary text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-xl font-black text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-ink/68">{body}</p>
    </article>
  );
}
