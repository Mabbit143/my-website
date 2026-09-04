# Deconstructing Academia — website setup guide

This is the source code for deconstructingacademia.com. Plain-English guide to
what's here, how to run it, and how to change things — written for someone
who doesn't code yet.

## What this is built with

- **Astro** — generates plain HTML/CSS at build time. No app framework to
  fight, fast pages, works everywhere.
- **Markdown/MDX** — every article is a `.md` file. Writing a new article
  means writing a Markdown file, not touching code.
- **Git + GitHub** — this repo. Every change is tracked; nothing is ever
  silently lost.
- **Cloudflare Pages** (planned) — free hosting that deploys automatically
  every time this repo's `main` branch changes.

## Running it on your own computer

You need [Node.js](https://nodejs.org) installed (the LTS version). Then, in
this folder:

```
npm install
npm run dev
```

That starts a local preview at `http://localhost:4321` that updates live as
files change. `npm run build` produces the production files in `dist/`.

## Project structure

```
src/
  content/articles/   ← every article, as a .md file (see the README in there)
  pages/               ← the actual site pages (home, articles, about, contact)
  components/          ← reusable pieces (article cards, header, footer, series pill)
  layouts/              ← the shared page shell (SEO tags, header/footer)
  lib/series.ts         ← the 8 editorial series: names, descriptions, palette
  styles/global.css     ← every color, font, and reusable visual style lives HERE
public/                 ← files copied as-is (favicon, robots.txt)
```

## Adding an article

Copy one of the sample files in `src/content/articles/` (delete the
`placeholder: true` line and the sample content), fill in the frontmatter
(title, deck, series, date, etc.), write the piece in Markdown below the
`---`. It shows up on the site automatically — no other file needs to change.

## Changing the design

Everything visual is controlled from **`src/styles/global.css`**, at the top,
in the `:root` block:

- **Colors** — `--accent-1`, `--accent-2`, `--accent-3` etc. There are 6
  named palettes (`red-pen`, `archive`, `field-notes`, `public-record`,
  `electric`, `chalkboard`) — see the big comment at the top of that file
  for what's assigned where and why. `chalkboard` is the odd one out: it
  also flips the background dark, used for "Receipts or It Didn't Happen"
  and for the reusable `ChalkCallout` component (`src/components/ChalkCallout.astro`,
  usable from `.mdx` articles) — see the comment above that palette block.
- **Fonts** — `--font-headline`, `--font-body`, etc.
- **Reusable visual pieces** — `.tape`, `.torn-edge`, `.stamp`, `.note`,
  `.pill`, `.mark` (the red-pen circle around a word). Add a new one here and
  it's available on every page.

Which series uses which palette is set in `src/lib/series.ts` (the `palette`
field on each series).

## Still outstanding (not blockers to previewing/building, but need your
input before real launch)

- Exact logo/wordmark files (currently a plain text wordmark)
- Contact form provider + destination inbox + the actual "reason for
  contact" options (currently a placeholder)
- Analytics decision (currently none)
- Final homepage copy and About bio
- 3–5 real launch articles (currently 3 samples marked `placeholder: true`)
- Privacy policy / copyright text
- Social links for the footer
- DNS cutover from IONOS (site is already live at Cloudflare Pages, see below)

## Newsletter signup

Connected to Kit (kit.com) as of 1 Sep 2026 — `src/components/EmailSignup.astro`
submits directly to Lori's Kit form (ID `9871140`). Subscribers land in her
Kit account and get Kit's default double opt-in confirmation email. If the
form ID ever needs to change (new Kit form, different account), get the
HTML embed code from Kit → Landing Pages & Forms → that form → Embed → HTML,
and swap the `action`, `data-sv-form`, and `data-uid` values in that file —
the visual styling is custom and doesn't need to change.

## Deploying

Connected. This repo is live on Cloudflare Pages, connected to the `main`
branch — every push rebuilds and redeploys automatically, no extra steps.
DNS gets repointed from IONOS to Cloudflare only when ready to go live on
the real domain — nothing here does that automatically.
