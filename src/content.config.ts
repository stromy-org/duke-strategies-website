import { defineCollection, z } from "astro:content";

const insights = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedAt: z.coerce.date().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
  }),
});

const authors = defineCollection({
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    email: z.string().email().optional(),
  }),
});

export const collections = { insights, pages, authors };
