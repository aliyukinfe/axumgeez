import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, ShieldCheck } from "lucide-react";
import { FeatureCard } from "@/components/card";
import { Section } from "@/components/section";
import { brand, featureCards, howItWorks, securityItems } from "@/lib/site";

export default function HomePage() {
  return (
    <main>
      <section className="overflow-hidden bg-surface-light">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
          <div>
            <p className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-blue-primary shadow-sm">
              Windows 10 / Windows 11
            </p>
            <h1 className="mt-8 text-5xl font-black tracking-normal text-ink sm:text-6xl lg:text-7xl">{brand.logo}</h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-ink/70">Smart Amharic typing software for Windows</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/download" className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-primary px-6 py-3.5 font-bold text-white shadow-blue transition-colors hover:bg-blue-deep">
                <Download className="h-5 w-5" aria-hidden="true" />
                Download for Windows
              </Link>
              <Link href="/features" className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 font-bold text-ink transition-colors hover:border-blue-primary hover:text-blue-primary">
                View Features
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="relative min-h-[360px]">
            <Image
              src="/brand/hero-mockup.png"
              alt="AxumGeez Windows app mockup showing Amharic typing controls"
              fill
              priority
              className="object-contain"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      <Section title="Built for everyday Amharic typing" description="AxumGeez keeps the workflow simple: turn it on, choose your mode, and type Unicode Amharic anywhere Windows accepts text.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Section>

      <Section title="How it works" dark>
        <div className="grid gap-5 md:grid-cols-3">
          {howItWorks.map((item, index) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-white/6 p-6">
              <div className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-blue-primary text-sm font-black">{index + 1}</div>
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-xl font-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Free for now" title="Download AxumGeez and start typing" description="There are no packages to choose from right now. Install the Windows app and use the keyboard layout reference whenever you need it.">
        <div className="grid gap-5 md:grid-cols-3">
          {securityItems.map((item) => (
            <article key={item.title} className="rounded-2xl border border-line bg-surface-light p-6">
              <item.icon className="h-8 w-8 text-blue-primary" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/68">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <section className="bg-blue-primary">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-16 text-white sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-black sm:text-4xl">Download AxumGeez for Windows</h2>
            <p className="mt-3 max-w-2xl text-white/78">AxumGeez is free for now. Download the Windows installer and start typing Amharic/Geez everywhere.</p>
          </div>
          <Link href="/download" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-blue-primary transition-colors hover:bg-surface-light">
            Download for Windows
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
