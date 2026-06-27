import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for AxumGeez."
};

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-ink">Privacy Policy</h1>
        <p className="mt-6 text-ink/68">Last updated: 2026</p>
        <div className="prose prose-slate mt-8 max-w-none">
          <p>AxumGeez is designed to type Unicode Amharic/Geez on Windows while keeping user data minimal.</p>
          <h2>Information we may collect</h2>
          <p>Future activation services may use a hashed device fingerprint, app version, license status, and validation timestamps. Raw hardware identifiers should not be stored.</p>
          <h2>How information is used</h2>
          <p>License information may be used for activation, device transfer, and anti-copy protection.</p>
          <h2>Offline use</h2>
          <p>The desktop app is designed to allow temporary offline use. Some future activation checks may require occasional connection.</p>
          <h2>Contact</h2>
          <p>For privacy questions, contact support@adischat.com.</p>
        </div>
      </article>
    </main>
  );
}
