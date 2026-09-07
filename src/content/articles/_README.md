# Adding articles

Each article is one Markdown file in this folder. Everything lives in the
YAML frontmatter now — **there is no free-text body below the `---`.** The
article body is the `blocks:` list (see below).

## The easy way: Pages CMS

Open the site in Pages CMS, go to **Blog Articles → New**, fill in the
headline / series / dates / description, then build the body in the
**Article** field by adding blocks. That's the intended workflow — the
rest of this file is only for when you're editing the `.md` by hand.

## Frontmatter fields

```yaml
---
title: "Headline"
deck: "One or two sentences — what this piece argues and why it matters."
series: "whose-peers" # one of the 8 series slugs, see src/lib/series.ts
topics: ["optional", "tag", "list"]
pubDate: 2026-09-01
updatedDate: 2026-09-02 # optional
author: "Mabbit" # optional, defaults to Mabbit
description: "Meta description for SEO/social sharing (~150 chars)."
socialImage: "/article-images/social-card.webp" # optional
coverImage: "/article-images/article-feature.webp" # optional; featured image + card thumbnail
coverAlt: "A red-pen annotation across a university policy document." # describe it
coverCaption: "The official language is doing more work than it admits." # optional
draft: false # true hides it from the live site
placeholder: false # true = sample content, shows a "sample content" flag
blocks: # the article body — an ordered list, see next section
  - type: text
    markdown: |
      Body copy in Markdown.
---
```

## Blocks

The body is a list under `blocks:`. Each block has a `type` and then only
the fields that type uses. Blocks render top to bottom in the order listed.

### `text` — Markdown prose

```yaml
  - type: text
    markdown: |
      Ordinary **Markdown**. Headings, lists, links, `>` block quotes,
      and inline images all work. Use several text blocks with an image
      or quote block between them wherever you want the break.
```

### `image` — a graphic exactly where you drop it

```yaml
  - type: image
    image: /article-images/syllabus-fine-print.webp
    alt: "What the reader needs to see in the graphic."
    caption: "Optional caption or source credit." # optional
    size: wide     # inline | wide | full   (default: wide)
    tilt: left     # left | none | right    (default: left)
```

The image renders as a taped, slightly tilted print. `inline` keeps it in
the text column; `full` runs the full content width.

### `callout` — a boxed aside

```yaml
  - type: callout
    variant: second-look   # second-look | warning | plain  (default: second-look)
    title: "The footnote doesn't say that."
    eyebrow: "Second Look" # optional; second-look defaults to this
    markdown: |
      The body of the callout, in Markdown.
    steps: 3               # second-look only: draws a numbered citation trail
    source: "full citation trail below" # second-look only: end of the trail
```

- `second-look` — the chalkboard treatment, for sourcing / fact-checks.
- `warning` — hazard-tape box, for "here's the catch" caveats.
- `plain` — a quiet accent-framed note.

### `quote` — a display-size pull quote

```yaml
  - type: quote
    quote: "Everything academia loves is not automatically objective."
    attribution: "the sarcastic punch" # optional
```

For a normal sourced block quote *inside* prose, just use Markdown `>` in a
`text` block. This one is the big interruption between sections.

### `divider` — a break between sections

```yaml
  - type: divider
    dividerStyle: splatter   # splatter | rule | space   (default: splatter)
```

## Images

Put image files in `public/article-images/` (Pages CMS does this for you on
upload). Short lowercase hyphenated names, e.g. `syllabus-fine-print.webp`.
WebP is usually the best quality-to-size trade-off; PNG/JPG/SVG/AVIF/GIF
also work.

Series slugs, in order: `whose-peers`, `academic-autopsy`,
`receipts-or-it-didnt-happen`, `field-notes-from-the-other-side`,
`the-syllabus-left-this-out`, `use-the-damn-tool`, `dog-eared-dissent`,
`where-the-work-is`.
