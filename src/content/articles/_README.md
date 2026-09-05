# Adding articles

Each article is one Markdown (or MDX) file in this folder. Frontmatter fields:

```yaml
---
title: "Headline"
deck: "One or two sentences — what this piece argues and why it matters."
series: "whose-peers" # one of the 8 series slugs, see src/lib/series.ts
topics: ["optional", "tag", "list"]
pubDate: 2026-09-01
author: "Mabbit" # optional, defaults to Mabbit
description: "Meta description for SEO/social sharing (~150 chars)."
socialImage: "/article-images/social-card.webp" # optional: image used when the link is shared
coverImage: "/article-images/article-feature.webp" # optional: featured image on the article and cards
coverAlt: "A red-pen annotation across a university policy document." # describe the image
coverCaption: "The official language is doing more work than it admits." # optional
draft: false # true hides it from the live site
placeholder: false # true = sample content, shows a "sample content" flag
---
Body content in Markdown below the frontmatter.
```

## Adding graphics without coding

1. Put the image file in `public/article-images/`. Create that folder if it does not exist.
2. Use a short lowercase filename with hyphens, such as `syllabus-fine-print.webp`.
3. Add it anywhere inside the article with ordinary Markdown:

```markdown
![Describe what the reader needs to see in the graphic.](/article-images/syllabus-fine-print.webp)

*Optional caption or source credit goes directly under the image in italics.*
```

The site automatically turns that image into a responsive, taped-paper graphic. The italic line
directly below it becomes the caption. You can use PNG, JPG, SVG, AVIF, or WebP; WebP is usually
the best balance of quality and file size.

For the large graphic at the top of an article, use `coverImage`, `coverAlt`, and optional
`coverCaption` in the frontmatter. That same graphic automatically appears as the thumbnail on
the homepage and Articles page. `socialImage` remains separate because social-sharing graphics
are often a different shape and contain larger text.

The three `sample-*.md` files in this folder are placeholder content that demonstrate the
article template — replace or delete them before launch. Nothing in them is real DA editorial
content, so it's safe to delete them at any time without losing anything.

Series slugs, in order: `whose-peers`, `academic-autopsy`, `receipts-or-it-didnt-happen`,
`field-notes-from-the-other-side`, `the-syllabus-left-this-out`, `use-the-damn-tool`,
`dog-eared-dissent`, `where-the-work-is`.
