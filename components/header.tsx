import Link from "next/link";
import { Download } from "lucide-react";
import { brand, navItems } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-primary focus:ring-offset-4">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-lg font-black text-white shadow-blue">አ</span>
          <span className="leading-tight">
            <span className="block text-lg font-black tracking-normal text-ink">{brand.logo}</span>
            <span className="block text-xs font-semibold text-blue-primary">{brand.name}</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-ink/72 transition-colors hover:text-blue-primary">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/download"
          className="inline-flex items-center gap-2 rounded-full bg-blue-primary px-4 py-2.5 text-sm font-bold text-white shadow-blue transition-colors hover:bg-blue-deep focus:outline-none focus:ring-2 focus:ring-blue-primary focus:ring-offset-4"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download
        </Link>
      </div>
    </header>
  );
}
