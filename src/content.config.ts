import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { DEFAULT_BLOG_AUTHOR } from "./constants/blog";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default(DEFAULT_BLOG_AUTHOR),
    previewImage: image().optional(),
    previewImageAlt: z.string().optional(),
  }),
});

export const collections = { blog };
