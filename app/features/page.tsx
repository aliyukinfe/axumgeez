import type { Metadata } from "next";
import { FeatureCard } from "@/components/card";
import { Section } from "@/components/section";
import { featureCards } from "@/lib/site";

export const metadata: Metadata = {
  title: "AxumGeez Features",
  description: "Explore AxumGeez features for Amharic and Geez typing on Windows, including global typing, Brana font support, offline use, and Unicode Ethiopic output.",
  alternates: {
    canonical: "/features"
  }
};

export default function FeaturesPage() {
  return (
    <main>
      <Section eyebrow="Features" title="Professional Amharic typing on Windows" description="AxumGeez focuses on speed, compatibility, and clear Unicode output.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Section>
      <Section title="Made for normal Windows apps" dark description="No special editor required. Use AxumGeez in the tools you already open every day." />
    </main>
  );
}
