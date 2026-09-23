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

// One content block in an article body. Articles are composed as an ordered
// list of these in the CMS (see .pages.yml `blocks`) instead of one long
// Markdown field — so an image lands exactly where it's dropped in the stack.
// Every field past `type` is optional at the schema level; which ones matter
// depends on `type`. Rendering + the meaning of each field lives in
// src/components/blocks/BlockRenderer.astro.
const block = z
  .object({
    type: z.enum(['text', 'image', 'callout', 'quote', 'divider', 'pinboard']).default('text'),
    // text
    markdown: z.string().optional(),
    // image
    image: z.string().optional(),
    alt: z.string().optional(),
    caption: z.string().optional(),
    size: z.enum(['inline', 'wide', 'full']).default('wide').optional(),
    tilt: z.enum(['left', 'none', 'right']).default('left').optional(),
    // callout
    variant: z.enum(['second-look', 'warning', 'plain']).default('second-look').optional(),
    title: z.string().optional(),
    eyebrow: z.string().optional(),
    steps: z.coerce.number().optional(),
    source: z.string().optional(),
    // quote
    quote: z.string().optional(),
    attribution: z.string().optional(),
    // divider
    dividerStyle: z.enum(['splatter', 'rule', 'space']).default('splatter').optional(),
    // pinboard — a visual cluster of short pinned notes / links
    intro: z.string().optional(),
    notes: z
      .array(
        z.object({
          title: z.string().optional(),
          body: z.string().optional(),
          link: z.string().optional(),
          linkLabel: z.string().optional(),
          color: z.enum(['pink', 'cyan', 'lime', 'yellow', 'porcelain']).default('yellow').optional(),
        }),
      )
      .default([])
      .optional(),
  })
  .passthrough();

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
    coverImage: z
      .string()
      .optional()
      .describe('Site path for the featured article graphic, usually /article-images/filename.webp.'),
    coverAlt: z
      .string()
      .optional()
      .describe('Concise description of the featured graphic for screen readers.'),
    coverCaption: z.string().optional(),
    coverStyle: z
      .enum(['framed', 'bleed'])
      .default('framed')
      .optional()
      .describe(
        'framed = the usual white paper-mat print with tape (default). bleed = full-width, no border/mat/tape — for a graphic (like a headline collage) already designed to sit directly on the page background.',
      ),
    draft: z.boolean().default(false),
    placeholder: z
      .boolean()
      .default(false)
      .describe('True for demo/sample content that must be replaced before launch.'),
    // The article body, as an ordered list of blocks. Optional so a legacy
    // file with only a Markdown body still validates during the transition.
    blocks: z.array(block).default([]),
  }),
});

export const collections = { articles };
