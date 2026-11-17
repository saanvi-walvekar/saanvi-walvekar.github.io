import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One item = one markdown file. Either `content/<world>/<slug>.md`, or
// `content/<world>/<slug>/index.md` with its images beside it.
// Files or folders starting with "_" are ignored (use that for drafts).
const load = (world: string) =>
  glob({
    base: `./content/${world}`,
    pattern: ['**/*.md', '!**/_*', '!**/_*/**'],
    generateId: ({ entry }) => entry.replace(/\\/g, '/').replace(/(\/index)?\.md$/, ''),
  });

const date = z.coerce.date();

export const collections = {
  photos: defineCollection({
    loader: load('photos'),
    schema: z.object({
      title: z.string(),
      date,
      category: z.enum(['Travel', 'Campus', 'People', 'Sport']),
      location: z.string().optional(),
      // File name of the cover photo. Omit to use the first photo in the folder.
      cover: z.string().optional(),
    }),
  }),

  sport: defineCollection({
    loader: load('sport'),
    schema: z.object({
      title: z.string(),
      sport: z.enum(['basketball', 'athletics']),
      when: z.string(),
      detail: z.string().optional(),
      order: z.number().default(0),
    }),
  }),

  projects: defineCollection({
    loader: load('projects'),
    schema: z.object({
      title: z.string(),
      summary: z.string(),
      date,
      skills: z.array(z.string()).default([]),
      repo: z.url().optional(),
      link: z.url().optional(),
    }),
  }),

  music: defineCollection({
    loader: load('music'),
    schema: z.object({
      title: z.string(),
      date,
      instrument: z.string().default('Tabla'),
      // Which beat of the 16-beat cycle this clip sits on.
      beat: z.number().int().min(1).max(16),
      // Either a link (YouTube, Instagram…) or an audio file name in the same folder.
      url: z.url().optional(),
      audio: z.string().optional(),
    }),
  }),

  words: defineCollection({
    loader: load('words'),
    schema: z.object({
      title: z.string(),
      date,
      kind: z.enum(['poem', 'story', 'essay']).default('poem'),
    }),
  }),

  wonders: defineCollection({
    loader: load('wonders'),
    schema: z.object({
      question: z.string(),
      date,
      // One line: the short answer, shown on the card.
      short: z.string(),
      sources: z
        .array(z.object({ label: z.string(), url: z.url().optional() }))
        .default([]),
    }),
  }),
};
