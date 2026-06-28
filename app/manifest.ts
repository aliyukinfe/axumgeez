import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AxumGeez - Amharic Typing Software",
    short_name: "AxumGeez",
    description: "Smart Amharic and Geez typing software for Windows 10 and Windows 11.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#0B5CFF",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "16x16 24x24 32x32 48x48 64x64 256x256",
        type: "image/x-icon"
      },
      {
        src: "/brand/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  };
}
