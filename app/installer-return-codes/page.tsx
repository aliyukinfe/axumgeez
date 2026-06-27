import type { Metadata } from "next";

const returnCodes = [
  {
    code: "0",
    meaning: "Success",
    action: "AxumGeez installed successfully. No customer action is required."
  },
  {
    code: "1",
    meaning: "Setup failed before installation completed",
    action: "Retry the installation. If it fails again, contact support with the setup log."
  },
  {
    code: "2",
    meaning: "Invalid command-line parameters",
    action: "Verify the installer parameters. Microsoft Store should use the documented silent switches."
  },
  {
    code: "3",
    meaning: "Installation was canceled",
    action: "Run the installer again. In Microsoft Store silent mode, this should not normally occur."
  },
  {
    code: "4",
    meaning: "Fatal installation error",
    action: "Restart Windows and retry. If the issue continues, contact support."
  },
  {
    code: "5",
    meaning: "Restart required",
    action: "Restart Windows to complete setup if requested by the operating system."
  }
];

const standardScenarios = [
  {
    scenario: "Installation cancelled by user",
    value: "2, 5",
    note: "Use 2 when cancelled before installation starts. Use 5 when cancelled during installation or aborted from an Abort/Retry/Ignore dialog."
  },
  {
    scenario: "Application already exists",
    value: "No distinct code",
    note: "AxumGeez allows reinstall/upgrade. The installer does not emit a separate already-installed code."
  },
  {
    scenario: "Installation already in progress",
    value: "No distinct code",
    note: "The current installer does not emit a separate concurrent-install code."
  },
  {
    scenario: "Disk space is full",
    value: "4",
    note: "Treated as a fatal error during the actual installation process."
  },
  {
    scenario: "Reboot required",
    value: "3010, 8",
    note: "Use 3010 for a successful install requiring restart with /RESTARTEXITCODE=3010. Use 8 when setup cannot proceed until Windows is restarted."
  },
  {
    scenario: "Network failure",
    value: "Not applicable",
    note: "AxumGeez is a standalone offline installer and does not download components during setup."
  },
  {
    scenario: "Package rejected during installation",
    value: "Not applicable",
    note: "Security policy rejection is handled by Windows or Microsoft Store before/during installer launch, not by the AxumGeez installer."
  },
  {
    scenario: "Installation successful",
    value: "0",
    note: "Setup completed successfully."
  }
];

export const metadata: Metadata = {
  title: "Installer Return Codes | AxumGeez",
  description: "AxumGeez Windows installer return code documentation for Microsoft Store submission."
};

export default function InstallerReturnCodesPage() {
  return (
    <main className="bg-surface-light">
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-blue-primary">AxumGeez Windows Installer</p>
          <h1 className="mt-4 text-4xl font-black text-ink sm:text-5xl">Installer Return Codes</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-ink/68">
            This page documents the standalone EXE installer return codes used for AxumGeez version 1.0.0.
            AxumGeez uses an Inno Setup based installer.
          </p>

          <div className="mt-8 rounded-2xl border border-line bg-surface-light p-5">
            <h2 className="text-lg font-black text-ink">Microsoft Store installer parameters</h2>
            <code className="mt-3 block overflow-x-auto rounded-xl bg-ink px-4 py-3 text-sm font-bold text-white">
              /VERYSILENT /SUPPRESSMSGBOXES /NORESTART /RESTARTEXITCODE=3010 /SP- /MERGETASKS=&quot;!desktopicon,!autostart&quot;
            </code>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-line">
            <div className="border-b border-line bg-surface-light px-4 py-4">
              <h2 className="text-xl font-black text-ink">Standard Microsoft Store install scenarios</h2>
            </div>
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-ink text-white">
                <tr>
                  <th className="px-4 py-3 font-black">Scenario</th>
                  <th className="px-4 py-3 font-black">EXE return code value</th>
                  <th className="px-4 py-3 font-black">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-white">
                {standardScenarios.map((item) => (
                  <tr key={item.scenario}>
                    <td className="px-4 py-4 font-bold text-ink">{item.scenario}</td>
                    <td className="whitespace-nowrap px-4 py-4 font-black text-blue-primary">{item.value}</td>
                    <td className="px-4 py-4 leading-6 text-ink/68">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-line">
            <div className="border-b border-line bg-surface-light px-4 py-4">
              <h2 className="text-xl font-black text-ink">Inno Setup return codes</h2>
            </div>
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-ink text-white">
                <tr>
                  <th className="px-4 py-3 font-black">Return code</th>
                  <th className="px-4 py-3 font-black">Meaning</th>
                  <th className="px-4 py-3 font-black">Recommended handling</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-white">
                {returnCodes.map((item) => (
                  <tr key={item.code}>
                    <td className="whitespace-nowrap px-4 py-4 font-black text-blue-primary">{item.code}</td>
                    <td className="px-4 py-4 font-bold text-ink">{item.meaning}</td>
                    <td className="px-4 py-4 leading-6 text-ink/68">{item.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-4 rounded-2xl border border-line bg-surface-light p-5 text-sm leading-6 text-ink/68 sm:grid-cols-2">
            <div>
              <h2 className="font-black text-ink">Package URL</h2>
              <p className="mt-2 break-all">https://axumgeez.adischat.com/downloads/1.0.0/AxumGeezSetup.exe</p>
            </div>
            <div>
              <h2 className="font-black text-ink">Support</h2>
              <p className="mt-2">support@adischat.com</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
