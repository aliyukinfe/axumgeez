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
    default: "AxumGeez | Amharic Typing Software for Windows",
    template: "%s | AxumGeez"
  },
  description: "Download AxumGeez, a free Amharic and Geez typing keyboard for Windows 10 and Windows 11. Type Unicode Ethiopic text in Word, Excel, browsers, websites, and VS Code.",
  applicationName: brand.name,
  authors: [{ name: "AxumGeez" }],
  creator: "AxumGeez",
  publisher: "AxumGeez",
  category: "Productivity",
  keywords: [
    "AxumGeez",
    "Axum Geez",
    "AxumGeez download",
    "Amharic typing software",
    "Amharic keyboard for Windows",
    "Geez keyboard",
    "Ethiopic typing",
    "Ethiopian keyboard",
    "Windows Amharic software",
    "Brana font",
    "type Amharic in Word",
    "type Amharic in Excel"
  ],
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    title: "AxumGeez | Amharic Typing Software for Windows",
    description: "Download AxumGeez for Windows and type Unicode Amharic/Geez in Word, Excel, browsers, websites, and VS Code.",
    url: "https://axumgeez.adischat.com",
    siteName: "AxumGeez",
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630, alt: "AxumGeez website preview" }],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AxumGeez | Amharic Typing Software for Windows",
    description: "Smart Amharic and Geez typing software for Windows 10 and Windows 11.",
    images: ["/brand/og-image.png"]
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/brand/apple-touch-icon.png"
  },
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AxumGeez",
    alternateName: ["Axum Geez", "አክሱም ግዕዝ"],
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Windows 10, Windows 11",
    description: "Amharic and Geez typing software for Windows that converts Latin keyboard input into Unicode Ethiopic text.",
    url: "https://axumgeez.adischat.com",
    downloadUrl: "https://axumgeez.adischat.com/download",
    image: "https://axumgeez.adischat.com/brand/og-image.png",
    softwareVersion: "1.0.0",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock"
    },
    publisher: {
      "@type": "Organization",
      name: "AxumGeez",
      url: "https://axumgeez.adischat.com",
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@adischat.com",
        contactType: "customer support"
      }
    }
  };

  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
