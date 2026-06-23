import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for AxumGeez."
};

export default function TermsPage() {
  return (
    <main className="bg-white">
      <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-ink">Terms</h1>
        <p className="mt-6 text-ink/68">Last updated: 2026</p>
        <div className="prose prose-slate mt-8 max-w-none">
          <p>AxumGeez is provided as Windows typing software for Amharic/Geez input.</p>
          <h2>License</h2>
          <p>The installer may be downloaded freely. Future premium services may require activation or subscription.</p>
          <h2>Acceptable use</h2>
          <p>Do not tamper with activation, licensing, or anti-copy protection systems.</p>
          <h2>Subscriptions</h2>
          <p>Future monthly, yearly, and lifetime plans may be introduced. Existing users should not need to reinstall for subscription changes.</p>
          <h2>Support</h2>
          <p>Support is provided through the channels listed on the Support page.</p>
        </div>
      </article>
    </main>
  );
}
