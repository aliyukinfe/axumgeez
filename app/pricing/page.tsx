import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { plans } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: "AxumGeez is free now and ready for future subscription plans."
};

export default function PricingPage() {
  return (
    <main className="bg-surface-light">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-primary">Pricing</p>
          <h1 className="mt-3 text-4xl font-black text-ink sm:text-5xl">Free now. Subscription ready.</h1>
          <p className="mt-4 text-lg leading-8 text-ink/68">AxumGeez starts with a free plan and is architected for future premium services.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <article key={plan.name} className={plan.featured ? "rounded-2xl border-2 border-blue-primary bg-white p-6 shadow-blue" : "rounded-2xl border border-line bg-white p-6 shadow-sm"}>
              <h2 className="text-2xl font-black text-ink">{plan.name}</h2>
              <p className="mt-3 text-3xl font-black text-blue-primary">{plan.price}</p>
              <p className="mt-4 min-h-16 text-sm leading-6 text-ink/66">{plan.description}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-ink/74">
                    <Check className="h-5 w-5 shrink-0 text-blue-primary" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/download" className="inline-flex rounded-full bg-blue-primary px-6 py-3.5 font-bold text-white shadow-blue transition-colors hover:bg-blue-deep">
            Download the free version
          </Link>
        </div>
      </section>
    </main>
  );
}
