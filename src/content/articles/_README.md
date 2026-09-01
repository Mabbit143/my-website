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
draft: false # true hides it from the live site
placeholder: false # true = sample content, shows a "sample content" flag
---
Body content in Markdown below the frontmatter.
```

The three `sample-*.md` files in this folder are placeholder content that demonstrate the
article template — replace or delete them before launch. Nothing in them is real DA editorial
content, so it's safe to delete them at any time without losing anything.

Series slugs, in order: `whose-peers`, `academic-autopsy`, `receipts-or-it-didnt-happen`,
`field-notes-from-the-other-side`, `the-syllabus-left-this-out`, `use-the-damn-tool`,
`dog-eared-dissent`, `where-the-work-is`.
