import type { Metadata } from "next";
import Link from "next/link";
import { Download, MonitorDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Download",
  description: "Download AxumGeez for Windows 10 and Windows 11."
};

const requirements = ["Windows 10 or Windows 11", "64-bit Windows recommended", ".NET Desktop Runtime included by installer or installed separately", "Internet connection for future license validation"];

export default function DownloadPage() {
  const microsoftStoreUrl = process.env.NEXT_PUBLIC_MICROSOFT_STORE_URL;
  const downloadUrl = microsoftStoreUrl || process.env.NEXT_PUBLIC_DOWNLOAD_URL || "/downloads/1.0.0/AxumGeezSetup.exe";
  const downloadLabel = microsoftStoreUrl ? "Get from Microsoft Store" : "Download for Windows";

  return (
    <main className="bg-surface-light">
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-line bg-white p-8 shadow-soft sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            <div>
              <MonitorDown className="h-12 w-12 text-blue-primary" aria-hidden="true" />
              <h1 className="mt-6 text-4xl font-black text-ink sm:text-5xl">Download AxumGeez</h1>
              <p className="mt-4 text-lg leading-8 text-ink/68">Smart Amharic typing software for Windows 10 and Windows 11.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={downloadUrl} className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-primary px-6 py-3.5 font-bold text-white shadow-blue transition-colors hover:bg-blue-deep">
                  <Download className="h-5 w-5" aria-hidden="true" />
                  {downloadLabel}
                </Link>
                <span className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 font-bold text-ink">Free for now</span>
              </div>
            </div>
            <aside className="rounded-2xl bg-surface-light p-6">
              <h2 className="text-xl font-black text-ink">Version 1.0.0</h2>
              <p className="mt-2 text-sm leading-6 text-ink/64">Official download link updates to Microsoft Store after publishing.</p>
              <h3 className="mt-6 font-black text-ink">System requirements</h3>
              <ul className="mt-4 space-y-3 text-sm text-ink/72">
                {requirements.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-blue-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
