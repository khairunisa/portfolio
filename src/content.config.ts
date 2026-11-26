import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * One project = one folder in src/content/projects/<slug>/
 *   index.md        ← frontmatter below + optional long write-up
 *   cover.png       ← first image in the carousel
 *   shot-1.png ...  ← gameplay screenshots
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/index.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One or two sentences shown on the card. */
      summary: z.string().max(240),
      status: z.enum(['released', 'in-development']),
      /** Release year, or the year work started for in-development projects. */
      year: z.number().int(),
      /** What you did on it, e.g. "Solo dev", "Lead programmer". */
      role: z.string(),
      /** Engine, genre, tech — shown as small tags. */
      tags: z.array(z.string()).default([]),
      cover: image(),
      coverAlt: z.string().default(''),
      screenshots: z
        .array(z.object({ src: image(), alt: z.string().default('') }))
        .default([]),
      links: z
        .object({
          itch: z.url().optional(),
          playStore: z.url().optional(),
          website: z.url().optional(),
          trailer: z.url().optional(),
        })
        .default({}),
      /** Featured projects get the wide layout at the top. */
      featured: z.boolean().default(false),
      /** Lower numbers show first. Ties fall back to newest year. */
      order: z.number().default(100),
      /** Set true to hide a project without deleting it. */
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
