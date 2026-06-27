import {
  BadgeCheck,
  CloudOff,
  FileText,
  Globe2,
  Keyboard,
  Laptop,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Type,
  Workflow
} from "lucide-react";

export const brand = {
  name: "AxumGeez",
  logo: "አክሱም ግዕዝ",
  description: "Smart Amharic typing software for Windows",
  url: "https://github.com/aliyukinfe/axumgeez"
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/layout", label: "Keyboard Layout" },
  { href: "/download", label: "Download" },
  { href: "/support", label: "Support" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" }
];

export const featureCards = [
  {
    title: "Works everywhere",
    body: "Type Amharic in Word, Excel, browsers, websites, chat apps, VS Code, and standard Windows text fields.",
    icon: Globe2
  },
  {
    title: "Fast Amharic typing",
    body: "Latin-to-fidel transliteration converts familiar key patterns into clear Unicode Amharic.",
    icon: Keyboard
  },
  {
    title: "Brana font support",
    body: "Preview Brana-style and bundled Ethiopic fonts inside AxumGeez without forcing fonts into your documents.",
    icon: Type
  },
  {
    title: "Secure activation",
    body: "Free for now, with friendly one-device protection planned for future releases.",
    icon: ShieldCheck
  },
  {
    title: "Offline allowance",
    body: "Designed for temporary offline use so typing stays practical even without a constant connection.",
    icon: CloudOff
  },
  {
    title: "Professional Windows tool",
    body: "Runs from the taskbar tray with simple ON/OFF control, settings, and keyboard layout help.",
    icon: Laptop
  }
];

export const securityItems = [
  { title: "Free for now", body: "Download and install AxumGeez without payment while the first public version is available.", icon: BadgeCheck },
  { title: "One-device protection", body: "Signed license tokens are bound to each registered computer.", icon: LockKeyhole },
  { title: "No packages to choose", body: "There are no setup packages on the website right now. Just download and start typing.", icon: ShieldCheck }
];

export const howItWorks = [
  { title: "Download", body: "Get the Windows installer from the download page.", icon: FileText },
  { title: "Install", body: "Run the setup and launch AxumGeez from the taskbar tray.", icon: Workflow },
  { title: "Start typing", body: "Toggle Amharic mode and type Unicode fidels wherever Windows accepts text.", icon: Sparkles }
];

export const faqs = [
  {
    question: "Does it work in Word?",
    answer: "Yes. AxumGeez types Unicode Amharic into normal Microsoft Word text fields."
  },
  {
    question: "Does it work in Excel?",
    answer: "Yes. Select a cell, turn on Amharic mode, and type directly."
  },
  {
    question: "Can I use it offline?",
    answer: "The app is designed for offline typing. Some future activation checks may require occasional connection."
  },
  {
    question: "Can I move it to another computer?",
    answer: "Future license accounts will support deactivation and transfer limits from the user account or support team."
  },
  {
    question: "How does activation work?",
    answer: "The planned license system registers a hashed device fingerprint and validates a signed token from the server."
  }
];
