import type { MetadataRoute } from "next";

const siteUrl = "https://axumgeez.adischat.com";

const routes = [
  { path: "/", priority: 1 },
  { path: "/download", priority: 0.95 },
  { path: "/features", priority: 0.9 },
  { path: "/layout", priority: 0.9 },
  { path: "/support", priority: 0.75 },
  { path: "/docs/installer-return-codes", priority: 0.5 },
  { path: "/privacy", priority: 0.45 },
  { path: "/terms", priority: 0.45 }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.path === "/" ? "weekly" : "monthly",
    priority: route.priority
  }));
}
