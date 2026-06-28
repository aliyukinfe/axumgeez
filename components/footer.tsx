import Link from "next/link";
import { brand, navItems } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <div className="text-2xl font-black">{brand.logo}</div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/72">
            Smart Amharic typing software for Windows, designed for clean Unicode input and professional everyday use.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-white/74">
          {navItems.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
          <Link href="https://github.com/aliyukinfe/axumgeez" className="transition-colors hover:text-white">
            GitHub
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-white/58">
        © 2026 AxumGeez. All rights reserved.
      </div>
    </footer>
  );
}
