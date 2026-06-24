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
  WalletCards,
  Workflow
} from "lucide-react";

export const brand = {
  name: "AxumGeez",
  logo: "አክሱም ግዕዝ",
  description: "Smart Amharic typing software for Windows",
  url: "https://github.com/aliyukinfe/axumgeez"
};

export const navItems = [
  { href: "/features", label: "Features" },
  { href: "/layout", label: "Layout" },
  { href: "/pricing", label: "Pricing" },
  { href: "/support", label: "Support" }
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
    body: "Future-ready one-device activation protects your copy while keeping the installer free to download.",
    icon: ShieldCheck
  },
  {
    title: "Offline allowance",
    body: "Designed for temporary offline use with periodic license validation when subscription mode is enabled.",
    icon: CloudOff
  },
  {
    title: "Professional Windows tool",
    body: "Runs from the taskbar tray with simple ON/OFF control, settings, and keyboard layout help.",
    icon: Laptop
  }
];

export const securityItems = [
  { title: "Free download", body: "Download and install AxumGeez without payment during the free phase.", icon: BadgeCheck },
  { title: "One-device protection", body: "Signed license tokens are bound to each registered computer.", icon: LockKeyhole },
  { title: "Subscription ready", body: "Existing installs can move to future paid plans without reinstalling.", icon: WalletCards }
];

export const howItWorks = [
  { title: "Download", body: "Get the Windows installer from the download page.", icon: FileText },
  { title: "Install", body: "Run the setup and launch AxumGeez from the taskbar tray.", icon: Workflow },
  { title: "Start typing", body: "Toggle Amharic mode and type Unicode fidels wherever Windows accepts text.", icon: Sparkles }
];

export const plans = [
  {
    name: "Free",
    price: "Free now",
    description: "Basic Amharic typing for Windows during the free phase.",
    features: ["System-wide Unicode typing", "Keyboard layout help", "Taskbar tray control", "Offline-ready app design"],
    featured: true
  },
  {
    name: "Monthly",
    price: "Coming soon",
    description: "Flexible access for premium typing services.",
    features: ["Premium typing services", "Cloud dictionary sync", "Priority updates"],
    featured: false
  },
  {
    name: "Yearly",
    price: "Coming soon",
    description: "Best value for long-term AxumGeez users.",
    features: ["Everything in Monthly", "Theme sync", "Backup settings"],
    featured: false
  },
  {
    name: "Lifetime",
    price: "Coming soon",
    description: "One-time access option planned for future release.",
    features: ["Lifetime activation", "Multiple layouts", "Priority updates"],
    featured: false
  }
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
    answer: "The app is designed for offline typing. Future subscription validation allows temporary offline use."
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
