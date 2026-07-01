import type { Metadata } from "next";

const returnCodes = [
  { code: "0", meaning: "Installation successful" },
  { code: "1", meaning: "General installation failure" },
  { code: "2", meaning: "Installation cancelled by user" },
  { code: "5", meaning: "Access denied / installation already in progress" },
  { code: "8", meaning: "Not enough disk space" },
  { code: "3010", meaning: "Installation successful, restart required if applicable" }
];

export const metadata: Metadata = {
  title: "Installer Return Codes | Axum Geez",
  description: "Axum Geez installer return code documentation for Microsoft Store Win32 EXE submission.",
  alternates: {
    canonical: "/docs/installer-return-codes"
  }
};

export default function InstallerReturnCodesPage() {
  return (
    <main className="bg-surface-light">
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-blue-primary">Axum Geez Windows Installer</p>
          <h1 className="mt-4 text-4xl font-black text-ink sm:text-5xl">Installer Return Codes</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-ink/68">
            This page documents the standalone EXE installer return codes for Axum Geez version 1.0.1.
            The installer is built with Inno Setup for Windows 10 and Windows 11.
          </p>

          <div className="mt-8 rounded-2xl border border-line bg-surface-light p-5">
            <h2 className="text-lg font-black text-ink">Microsoft Store silent install command</h2>
            <code className="mt-3 block overflow-x-auto rounded-xl bg-ink px-4 py-3 text-sm font-bold text-white">
              /VERYSILENT /SUPPRESSMSGBOXES /NORESTART /SP-
            </code>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-line">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-ink text-white">
                <tr>
                  <th className="px-4 py-3 font-black">Return code</th>
                  <th className="px-4 py-3 font-black">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-white">
                {returnCodes.map((item) => (
                  <tr key={item.code}>
                    <td className="whitespace-nowrap px-4 py-4 font-black text-blue-primary">{item.code}</td>
                    <td className="px-4 py-4 font-bold text-ink">{item.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-4 rounded-2xl border border-line bg-surface-light p-5 text-sm leading-6 text-ink/68 sm:grid-cols-2">
            <div>
              <h2 className="font-black text-ink">Package URL</h2>
              <p className="mt-2 break-all">https://axumgeez.adischat.com/downloads/1.0.1/AxumGeezSetup.exe</p>
            </div>
            <div>
              <h2 className="font-black text-ink">Support</h2>
              <p className="mt-2">https://axumgeez.adischat.com/support</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
