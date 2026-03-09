import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import remarkGroupMdxImages from "./src/remark/remarkGroupMdxImages.mjs";

export default defineConfig({
  integrations: [tailwind(), mdx({ remarkPlugins: [remarkGroupMdxImages] })],
});
