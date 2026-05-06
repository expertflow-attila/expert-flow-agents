import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://expert-flow-agents.vercel.app",
  trailingSlash: "ignore",
  build: { format: "directory" },
});
