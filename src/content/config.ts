import { defineCollection, z } from 'astro:content';

const SERIES_SLUGS = [
  'whose-peers',
  'academic-autopsy',
  'receipts-or-it-didnt-happen',
  'field-notes-from-the-other-side',
  'the-syllabus-left-this-out',
  'use-the-damn-tool',
  'dog-eared-dissent',
  'where-the-work-is',
] as const;

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    deck: z.string().describe('One or two sentences: what this piece argues and why it matters.'),
    // One primary series per article — confirmed decision, 31 Aug 2026.
    series: z.enum(SERIES_SLUGS),
    topics: z.array(z.string()).default([]),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Mabbit'),
    description: z.string().describe('Meta description for SEO/social sharing.'),
    socialImage: z.string().optional(),
    draft: z.boolean().default(false),
    placeholder: z
      .boolean()
      .default(false)
      .describe('True for demo/sample content that must be replaced before launch.'),
  }),
});

export const collections = { articles };
