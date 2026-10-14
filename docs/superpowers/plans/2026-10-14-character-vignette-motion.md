# Contextual Character Vignettes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a replayable Whonah frisbee scene to the homepage and a contextual Mabbit-at-the-computer scene to `use-the-damn-tool` articles.

**Architecture:** A reusable Astro component owns the two scene variants and their accessible replay control. A small controller module, initialized by the existing motion entry point, manages play-once, replay, viewport pausing, and fallback state; CSS in the existing motion layer supplies the timelines without a new runtime dependency.

**Tech Stack:** Astro 7, TypeScript-flavored Astro components, browser JavaScript modules, CSS keyframes, Node's built-in test runner.

**Spec:** `docs/superpowers/specs/2026-10-14-character-vignette-motion-design.md`

## Global Constraints

- Add no canvas or general-purpose animation dependency.
- The homepage gets the frisbee vignette; only `series: use-the-damn-tool` articles get the computer vignette.
- Each scene plays once automatically, pauses off-screen, and can be replayed intentionally.
- Reduced-motion, missing-`IntersectionObserver`, and no-JavaScript states show a clear static final composition.
- Use transforms and opacity for animated properties and explicit image dimensions to prevent layout shift.
- Do not add sound, continuous loops, or animation to every page.
- Do not modify unrelated article content or invalid front matter.

## Review Focus

- Reduced motion at first paint: show final static art, install no observer, and never hide content (Task 1 unit test; Task 5 browser check).
- Missing `IntersectionObserver`: remove `motion-ready` and leave the final static composition visible (Task 1 unit test).
- Repeated replay activation: restart one clean timeline without accumulating event listeners (Task 1 unit test).
- Leaving and re-entering the viewport: pause and resume the current cycle instead of restarting it (Task 1 unit test; Task 5 browser check).
- Page mapping: render computer Mabbit for `use-the-damn-tool` and no character vignette for every other series (Task 4 source-contract test; Task 5 route check).

---

### Task 1: Character vignette motion controller

**Files:**
- Create: `src/scripts/character-vignettes.js`
- Create: `tests/character-vignettes.test.mjs`
- Modify: `src/scripts/motion.js:50-100`
- Modify: `package.json:6-12`

**Interfaces:**
- Consumes: vignette roots matching `[data-character-vignette]`, replay controls matching `[data-vignette-replay]`, and the root `motion-ready` class.
- Produces: `initCharacterVignettes(options?)`, plus `is-playing`, `is-complete`, and `is-paused` state classes consumed by Task 2 CSS.

- [ ] **Step 1: Write controller tests with small fake class-list, event-target, document, and observer objects**

Add tests named:

```js
test('reduced motion leaves the final state visible without observing')
test('missing IntersectionObserver removes motion-ready')
test('the first intersection starts one play cycle')
test('leaving and returning to the viewport pauses and resumes without restarting')
test('replay resets a completed vignette without adding another listener')
```

Assert exact class transitions and observer call counts. Import only the public `initCharacterVignettes` function.

- [ ] **Step 2: Run the tests and verify they fail because the controller does not exist**

Run: `node --test tests/character-vignettes.test.mjs`

Expected: FAIL with module-not-found for `src/scripts/character-vignettes.js`.

- [ ] **Step 3: Implement `initCharacterVignettes(options = {})`**

Use dependency-injection keys `root`, `view`, and `Observer` so tests do not require a DOM package. Observe every vignette, start only its first visible cycle, toggle `is-paused` on later visibility changes, mark completion only when the root's named timeline animation ends, and wire each replay control once. Return a cleanup function that disconnects the observer and removes installed listeners.

- [ ] **Step 4: Import and initialize the controller from the existing `init()` path in `motion.js`**

Call it after the existing capability guard and before scroll-reveal observation. Preserve the current behavior that removes `motion-ready` when motion cannot run.

- [ ] **Step 5: Add a focused test script and run it**

Add `"test:vignettes": "node --test tests/character-vignettes.test.mjs"` to `package.json`.

Run: `npm run test:vignettes`

Expected: all five tests PASS.

- [ ] **Step 6: Commit the controller**

```bash
git add package.json src/scripts/character-vignettes.js src/scripts/motion.js tests/character-vignettes.test.mjs
git commit -m "Add character vignette motion controller"
```

### Task 2: Reusable vignette component, artwork, and timelines

**Files:**
- Create: `src/components/CharacterVignette.astro`
- Create: `public/images/characters/Mabbit-at-computer.png`
- Modify: `src/styles/motion.css:240-329`
- Modify: `tests/character-vignettes.test.mjs`

**Interfaces:**
- Consumes: `variant: 'frisbee' | 'computer'` and optional `class` from page templates; controller state classes from Task 1.
- Produces: `<CharacterVignette variant="frisbee" />` and `<CharacterVignette variant="computer" />`, with stable data hooks and one keyboard-accessible replay button per scene.

- [ ] **Step 1: Add source-contract tests for both component variants**

Read `CharacterVignette.astro` as text and assert it contains:

- the exact prop union `'frisbee' | 'computer'`;
- `data-character-vignette={variant}` and `data-vignette-replay`;
- a `type="button"` control and variant-specific replay labels;
- both Whonah paths and `/images/characters/Mabbit-at-computer.png`;
- `aria-hidden="true"` on decorative frisbee, glow, key accents, and handwritten marks.

- [ ] **Step 2: Run the focused tests and verify the new contract test fails**

Run: `npm run test:vignettes`

Expected: controller tests PASS; component contract test FAILS because the component is absent.

- [ ] **Step 3: Add the supplied Mabbit artwork**

Store the user-supplied transparent PNG at `public/images/characters/Mabbit-at-computer.png`. Preserve the supplied 500×500 composition and alpha channel.

Run: `identify public/images/characters/Mabbit-at-computer.png`

Expected: PNG, 500x500, with alpha/transparency reported.

- [ ] **Step 4: Implement `CharacterVignette.astro`**

Use `const { variant, class: className } = Astro.props`. Render variant-specific stage content inside one real replay button so clicking the illustration and keyboard activation share the same behavior. Default markup must show the final pose: frisbee-in-mouth Whonah for `frisbee`, unchanged computer Mabbit for `computer`. Include explicit width and height attributes on all images.

- [ ] **Step 5: Add component layout styles locally and animation state/timelines to `motion.css`**

Keep sizing, positioning, focus treatment, and responsive layout in the component. In `motion.css`, make `.motion-ready` switch the frisbee scene to its opening pose before play; animate a CSS/SVG frisbee arc, Whonah exit/return, restrained computer hand crop, keyboard accents, screen glow, and handwritten marks. Add `.is-paused, .is-paused * { animation-play-state: paused; }` scoped to vignettes and a named root timeline animation for completion events.

- [ ] **Step 6: Add reduced-motion and no-JavaScript assertions, then run tests**

Assert the component's default final-state images are not hidden by base styles and `motion.css` contains a `prefers-reduced-motion: reduce` vignette rule that disables its animations.

Run: `npm run test:vignettes`

Expected: all tests PASS.

- [ ] **Step 7: Commit the reusable scenes**

```bash
git add public/images/characters/Mabbit-at-computer.png src/components/CharacterVignette.astro src/styles/motion.css tests/character-vignettes.test.mjs
git commit -m "Build contextual character vignette scenes"
```

### Task 3: Homepage frisbee integration and hero motion repair

**Files:**
- Modify: `src/pages/index.astro:5-7,69-88,232-252`
- Modify: `src/styles/motion.css:240-329`
- Modify: `tests/character-vignettes.test.mjs`

**Interfaces:**
- Consumes: `<CharacterVignette variant="frisbee" />` from Task 2.
- Produces: the homepage-only Whonah frisbee chase inside the existing Mabbit hero composition.

- [ ] **Step 1: Add a homepage source-contract test**

Assert `src/pages/index.astro` imports `CharacterVignette`, renders exactly one `variant="frisbee"`, and no longer renders the direct `Whonah-sitting-forward.png` hero image.

- [ ] **Step 2: Run the test and verify it fails against the current homepage**

Run: `npm run test:vignettes`

Expected: the homepage integration test FAILS.

- [ ] **Step 3: Replace the direct hero Whonah image with the frisbee component**

Keep the existing Mabbit image. Pass a hero-specific class to the vignette and update the scoped hero layout at desktop, 60rem, and 40rem breakpoints so both characters retain their current visual hierarchy without horizontal overflow.

- [ ] **Step 4: Repair the existing hero entrance selectors**

Remove obsolete rules for `.headline-strip--*`, `.hero__kicker`, `.hero__mabbit-frame`, `.hero__circle`, `.hero__note`, and `.hero-splat*`. Keep rules matching the current `.strip`, `.eyebrow`, `.hero__scribble`, `.hero .splat`, `.hero__mabbit`, and new vignette hooks. Ensure the hero entrance finishes before the frisbee timeline begins.

- [ ] **Step 5: Run focused tests and formatting checks**

Run: `npm run test:vignettes && git diff --check`

Expected: tests PASS and `git diff --check` prints nothing.

- [ ] **Step 6: Commit the homepage scene**

```bash
git add src/pages/index.astro src/styles/motion.css tests/character-vignettes.test.mjs
git commit -m "Add Whonah frisbee scene to homepage"
```

### Task 4: Tech-article computer integration

**Files:**
- Modify: `src/pages/articles/[slug].astro:1-45,47-79,160-205,292-306`
- Modify: `tests/character-vignettes.test.mjs`

**Interfaces:**
- Consumes: `<CharacterVignette variant="computer" />` from Task 2 and `entry.data.series` from the article collection.
- Produces: a computer vignette only when `entry.data.series === 'use-the-damn-tool'`.

- [ ] **Step 1: Add article mapping source-contract tests**

Assert the article template imports `CharacterVignette`, defines the exact `use-the-damn-tool` condition, and renders `variant="computer"` only inside that condition. Assert there is no unconditional computer vignette.

- [ ] **Step 2: Run the test and verify it fails against the current article template**

Run: `npm run test:vignettes`

Expected: the article mapping test FAILS.

- [ ] **Step 3: Add the conditional computer vignette to the article header**

Introduce `const hasComputerVignette = entry.data.series === 'use-the-damn-tool'`. Split the header into a copy region and conditional vignette region without changing title, deck, byline, or placeholder copy.

- [ ] **Step 4: Add responsive article-header layout**

On wide screens, place the illustration beside the header copy without reducing readable text below the existing content width. At the 56rem breakpoint, stack the vignette below the copy; at 40rem, cap its size and remove any decorative overflow. Preserve the existing article splatter and palette behavior.

- [ ] **Step 5: Run focused tests and formatting checks**

Run: `npm run test:vignettes && git diff --check`

Expected: all tests PASS and no whitespace errors.

- [ ] **Step 6: Commit the article scene**

```bash
git add src/pages/articles/'[slug].astro' tests/character-vignettes.test.mjs
git commit -m "Show computer Mabbit on tech articles"
```

### Task 5: Production and browser verification

**Files:**
- Modify if needed: only files changed in Tasks 1-4

**Interfaces:**
- Consumes: the complete vignette component, controller, styles, and page integrations.
- Produces: evidence that the feature works across page types, input methods, responsive sizes, and fallback modes.

- [ ] **Step 1: Run the repository's normal checks and record the known content failure separately**

Run: `npm run test:vignettes && npm run build`

Expected: vignette tests PASS. The build may stop on the pre-existing invalid front matter in `src/content/articles/my-fave-ai-tools.md`; do not edit that article as part of this feature.

- [ ] **Step 2: Build an isolated validation copy without the known-invalid article**

Create a directory with `mktemp -d`, copy the project while excluding `.git`, `node_modules`, `dist`, and `src/content/articles/my-fave-ai-tools.md`, link the existing `node_modules` into that temporary copy, and run `npm run build` there.

Expected: Astro build completes successfully. Delete only the exact temporary directory after verification.

- [ ] **Step 3: Run browser checks with the system Chromium executable**

Serve the successful temporary build and use Playwright with `executablePath: '/usr/bin/chromium'`. Check at 1440×1000 and 390×844:

- homepage contains one frisbee vignette and no horizontal overflow;
- activating replay twice still produces one active `is-playing` state;
- a `use-the-damn-tool` article contains one computer vignette;
- a non-tech article contains none;
- scrolling a playing vignette out of view applies `is-paused`, and returning removes it without restarting;
- emulated reduced motion shows the final static pose with no running animation;
- disabling JavaScript leaves the final character illustration visible;
- Tab reaches the replay control and Enter restarts the scene.

- [ ] **Step 4: Capture desktop and mobile screenshots and inspect them**

Save screenshots under a temporary directory, inspect them for character overlap, clipped focus outlines, illegible text, and crowding, then remove the temporary screenshots after the review.

- [ ] **Step 5: Re-run final checks after any visual fixes**

Run: `npm run test:vignettes && git diff --check && git status --short`

Expected: tests PASS, no whitespace errors, and only intended feature files are changed.

- [ ] **Step 6: Commit verification fixes if any**

```bash
git add src/components/CharacterVignette.astro src/pages/index.astro src/pages/articles/'[slug].astro' src/scripts/character-vignettes.js src/scripts/motion.js src/styles/motion.css tests/character-vignettes.test.mjs
git commit -m "Polish character vignette behavior"
```

