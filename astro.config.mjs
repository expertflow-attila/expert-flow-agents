import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://expert-flow-agents.vercel.app",
  trailingSlash: "ignore",
  build: { format: "directory" },
  integrations: [
    sitemap({
      changefreq: "monthly",
      priority: 0.7,
      i18n: { defaultLocale: "hu", locales: { hu: "hu-HU" } },
    }),
  ],
});
