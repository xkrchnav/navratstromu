import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import remarkGroupMdxImages from "./src/remark/remarkGroupMdxImages.mjs";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  integrations: [mdx({ remarkPlugins: [remarkGroupMdxImages] })],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});