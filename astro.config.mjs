import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import remarkGroupMdxImages from "./src/remark/remarkGroupMdxImages.mjs";

export default defineConfig({
  integrations: [mdx({ remarkPlugins: [remarkGroupMdxImages] })],
  vite: {
    plugins: [tailwindcss()],
  },
});
