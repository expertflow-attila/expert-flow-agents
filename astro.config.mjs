import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://expert-flow-agents.vercel.app",
  trailingSlash: "ignore",
  build: { format: "directory" },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  integrations: [
    sitemap({
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date(),
      // The `/` and `/orchestrator` serve the same HTML (flagship); we keep `/`
      // in the sitemap as the primary entry and drop the duplicate to avoid SEO noise.
      filter: (page) => !page.endsWith("/orchestrator/"),
      // Trailing-slash normalization to match `cleanUrls: true` in vercel.json.
      serialize: (item) => ({
        ...item,
        url: item.url.endsWith("/") && item.url !== "https://expert-flow-agents.vercel.app/"
          ? item.url.slice(0, -1)
          : item.url,
      }),
      i18n: { defaultLocale: "hu", locales: { hu: "hu-HU" } },
    }),
  ],
});
