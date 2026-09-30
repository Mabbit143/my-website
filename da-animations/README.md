# DA site animations: drop-in guide

Built 28 Sep 2026 from your current `my-website` working copy. Your repo itself was not touched.

## What's in this folder

| File | New or changed? | What it does |
|---|---|---|
| `src/styles/motion.css` | **New** | All the animation styles: page transitions, scroll reveals, hover effects, marker draws, and the homepage hero entrance |
| `src/scripts/motion.js` | **New** | Watches the page as you scroll and triggers the reveals. The list at the top controls *what* animates |
| `src/layouts/BaseLayout.astro` | Changed (3 small additions) | Loads the two files above |
| `src/components/ArticleCard.astro` | Changed (2 lines) | Tags each card's cover image so it can morph into the article page |
| `src/pages/articles/[slug].astro` | Changed (2 lines) | The matching tag on the article's cover image |
| `changes.diff` | Reference only | Exactly what changed in the 3 existing files, line by line |
| `_test-build-delete-me.tgz` | **Delete this** | Temporary test build Claude used to check everything. Not needed |

## How to install it (about 5 minutes)

1. Copy the `src` folder from here into `C:\Users\mabbi\my-website\`. When Windows asks, choose **Replace the files in the destination**. This adds 2 new files and replaces 3.
2. In your terminal, from the `my-website` folder, run `npm run dev` and open `localhost:4321`.
3. Check the effects listed below. When you're happy, open GitHub Desktop. You should see 5 files changed. Commit with something like `Add motion layer` and push. Cloudflare deploys it like always.

**Heads-up:** your `[slug].astro` had edits that weren't committed yet. This copy is based on your current working version, so those edits are kept. GitHub Desktop will show them in the same commit.

## What you should see

- **Homepage hero:** the two headline strips get slapped on, the text fades up in order, Mabbit rises into frame, Whonah hops in after, the dashed circle swings into place, and the sticky note lands last. Plays once, on load.
- **Scrolling down any page:** sections fade up. Cards in a row come in one after another instead of all at once. Stamps and the "Read this first" label get slapped down crooked, and splatters burst in.
- **Shop page:** the neon circle around "Keep the receipt." draws itself.
- **Hovering an article card** (mouse only, not phones): it lifts, brightens, and the cover image zooms a little. Buttons get a hard paper-white shadow and "press" when you click them. The three "01 · 02 · 03" route tiles thicken their top bar and nudge their arrow.
- **Clicking between pages** in Chrome, Edge or Safari: the old page lifts away and the new one settles in while the header stays pinned. When the article you click has a cover image, the image morphs from the card into the article. Firefox just loads the page normally, which is fine.

## Accessibility is built in

If someone's device is set to **reduce motion**, none of this runs. Nothing is hidden and nothing moves; the site looks exactly like it does today. The same happens if JavaScript fails for some reason, so content can never get stuck invisible.

## Tweaking it yourself

- **Speed:** at the top of `motion.css`, change `--reveal-dur: 0.7s` (bigger = slower).
- **What animates on scroll:** edit the `REVEAL` list at the top of `motion.js`. Each line is a CSS selector plus a style: `'up'`, `'slap'`, `'splat'` or `'draw'`.
- **One-off:** add `data-reveal` (or `data-reveal="slap"`) to any element in a page to make it animate.
- **Turn everything off:** delete the line `import '../styles/motion.css';` in `BaseLayout.astro`.

## Notes

- Google Analytics keeps counting page views like before. The page transitions are native browser ones, so every click is still a real page load.
- If you ever add a new `<ArticleCard>` somewhere that shows **the same article twice on one page**, browsers skip the page transition on that page (it just loads normally). Nothing else breaks.
