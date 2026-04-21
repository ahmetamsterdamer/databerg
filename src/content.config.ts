import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/work',
    // Keep the relative path (minus extension) as the id so `health-insurer-analytics.md`
    // and `nl/health-insurer-analytics.md` do not collide. Route handlers derive the
    // public slug from the `slug` frontmatter field (or strip the locale prefix).
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    /** Client sector, anonymised — e.g. "Health insurance", "Retail banking". Never a real client name. */
    sector: z.string(),
    /** Broad region; omit for maximum anonymity when a client is easily identifiable. */
    location: z.string().optional(),
    /** Human-readable duration, e.g. "Jan 2023 – Present" or "12 months". */
    duration: z.string(),
    /** Technology list as named on the CV / engagement. */
    stack: z.array(z.string()),
    /** Slugs from src/lib/services.ts that this case relates to. Used for cross-linking. */
    services: z.array(z.string()).default([]),
    /** One-line summary used on the index and card surfaces. */
    summary: z.string(),
    /** Headline outcomes. Metric is the headline number or label; note is the short caption. */
    outcomes: z
      .array(
        z.object({
          metric: z.string(),
          note: z.string(),
        }),
      )
      .default([]),
    publishedAt: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    /** ISO locale; defaults to 'en' for back-compat. Phase 12 added 'nl' parallels. */
    locale: z.enum(['en', 'nl']).default('en'),
    /** Stable slug shared between locales (the URL segment). Defaults to file basename when omitted. */
    slug: z.string().optional(),
  }),
});

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/posts',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    draft: z.boolean().default(false),
    locale: z.enum(['en', 'nl']).default('en'),
    slug: z.string().optional(),
  }),
});

export const collections = { work, posts };
