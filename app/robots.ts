import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: "https://axumgeez.adischat.com/sitemap.xml",
    host: "https://axumgeez.adischat.com"
  };
}
