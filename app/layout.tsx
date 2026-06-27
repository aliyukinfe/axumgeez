import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { brand } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://axumgeez.adischat.com"),
  title: {
    default: "AxumGeez | Smart Amharic typing software for Windows",
    template: "%s | AxumGeez"
  },
  description: "AxumGeez is smart Amharic typing software for Windows 10 and Windows 11.",
  applicationName: brand.name,
  keywords: ["AxumGeez", "Amharic typing", "Geez keyboard", "Windows Amharic software", "Ethiopic typing"],
  openGraph: {
    title: "AxumGeez",
    description: "Smart Amharic typing software for Windows.",
    url: "https://axumgeez.adischat.com",
    siteName: "AxumGeez",
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630, alt: "AxumGeez website preview" }],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AxumGeez",
    description: "Smart Amharic typing software for Windows.",
    images: ["/brand/og-image.png"]
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/brand/apple-touch-icon.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
