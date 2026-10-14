# Contextual Character Vignettes

## Purpose

Add lively, handmade animation to Deconstructing Academia without copying Johanna Basford's visual identity. The motion should translate the feeling of illustrations coming alive into this site's own graffiti-punk collage language: Mabbit, Whonah, torn paper, marker strokes, and paint splatter.

The first release adds two contextual character scenes:

- The homepage tells a short Whonah-and-frisbee story.
- Articles in the `use-the-damn-tool` series show Mabbit working at a computer.

Other pages keep the site's shared paper, marker, card, and splatter motion but do not repeat a character scene.

## Success Criteria

- The scenes feel playful and handcrafted while keeping reading and navigation primary.
- Each scene plays once automatically and can be replayed intentionally.
- Character motion stops when the scene is off-screen.
- Mobile layouts remain uncluttered and do not overflow horizontally.
- Visitors who prefer reduced motion see a clear static composition.
- Content stays visible and usable when JavaScript is unavailable.
- New character scenes can be added later without rewriting page templates or the motion controller.

## Scope

### Included

- A reusable Astro character-vignette component with `frisbee` and `computer` variants.
- Homepage integration for the frisbee scene.
- Tech-article integration based on the existing `use-the-damn-tool` series value.
- Repairs to existing motion selectors needed for the current homepage markup.
- Shared play-once, replay, visibility, and reduced-motion behavior.
- Responsive presentation and accessible controls.

### Deferred

- Character scenes for other article series.
- Frame-by-frame or canvas animation.
- Sound effects.
- Animation on every page.
- Changes to article content or unrelated front matter.

## Architecture

### `CharacterVignette.astro`

Create a focused component that accepts a required variant:

```ts
interface Props {
  variant: 'frisbee' | 'computer';
  class?: string;
}
```

The component owns each scene's semantic wrapper, illustration layers, decorative elements, replay control, and data attributes. Page templates only select the variant and placement.

All meaningful illustration content receives concise alternative text. Pure motion accents are hidden from assistive technology. The replay control is a real button with a variant-specific accessible label.

### Shared motion controller

Extend the existing motion script rather than introducing a second animation runtime. The controller will:

1. Find character vignettes by data attribute.
2. Start each scene once when it first becomes visible.
3. Pause animation when the scene leaves the viewport.
4. Restart the scene when its replay button is activated.
5. Avoid animated initialization when reduced motion is requested.

Animation state will be represented by classes or data attributes such as `is-playing`, `is-complete`, and `is-paused`. The markup remains understandable and visible before the controller runs.

### Motion styles

Keep animation definitions in the existing motion stylesheet. Use CSS transforms and opacity so the browser can composite movement efficiently. Do not add a canvas library or general-purpose animation dependency.

The current homepage uses newer class names than parts of the existing hero motion layer. Stale selectors will be updated or removed so the maintained rules match current markup.

## Scene Design

### Homepage: Whonah's frisbee chase

The homepage initially shows Whonah sitting beside Mabbit. After the main hero entrance settles:

1. A green frisbee crosses the character area along a short curved path.
2. Sitting Whonah perks up and bounds out of frame.
3. Whonah returns using the existing frisbee-in-mouth artwork.
4. The final pose remains in place.

The scene plays once automatically. Clicking or tapping Whonah, or activating the explicit replay control by keyboard, restarts the sequence. The replay control must remain discoverable without covering the primary hero actions.

On narrow screens, distances and timing are shortened to fit the available character area. If the full chase would make the hero crowded, the scene may simplify to the frisbee crossing followed by the final pose. Reduced-motion mode displays the final frisbee-in-mouth pose without a transition.

### Tech articles: Mabbit at the computer

Articles whose front matter uses `series: use-the-damn-tool` show the supplied transparent Mabbit-at-the-computer illustration beside or immediately below the article header, depending on available width.

Because the source is a flattened illustration, the scene suggests typing without distorting the character:

- a tightly clipped duplicate layer provides very small hand-area movement;
- keyboard accents pulse in an alternating rhythm;
- the laptop screen gets a restrained glow;
- a few handwritten code or thought marks appear and drift away.

The animation plays once when the header enters view and leaves the static illustration visible. Replay uses an accessible button. Reduced-motion mode displays the unchanged illustration with no glow pulse or drifting marks.

## Integration Rules

- The homepage explicitly renders `variant="frisbee"` in its existing hero character area.
- The article template renders `variant="computer"` only when the article series is `use-the-damn-tool`.
- No global layout automatically inserts character vignettes.
- Future series-specific scenes should be added as new component variants and explicit template mappings.

This prevents the same character animation from becoming repetitive and keeps the artwork relevant to the page subject.

## Accessibility and Interaction

- Respect `prefers-reduced-motion: reduce` from the first paint.
- Do not hide essential text or controls while waiting for animation.
- The replay control must be keyboard accessible and expose a visible focus state.
- Decorative motion layers use `aria-hidden="true"` and cannot receive focus.
- The scene must not trigger rapid flashes or continuous looping.
- Motion must not shift surrounding document layout after the page becomes interactive.
- Pointer interaction with the illustration is an enhancement; the labeled replay button remains the reliable control.

## Performance and Failure Behavior

- Use existing PNG artwork and CSS-generated accents; do not add a new runtime dependency.
- Set explicit dimensions or aspect ratios for scene artwork to prevent layout shift.
- Use transforms and opacity for animated properties.
- Pause off-screen scenes with `IntersectionObserver`.
- If `IntersectionObserver` is unavailable, leave the final static state visible.
- If JavaScript fails, the scene remains a usable static illustration.
- Load article vignette artwork eagerly only when it is in the initial viewport; otherwise allow normal lazy loading.

## Verification

Verify the following:

- Homepage frisbee sequence, final pose, and replay behavior.
- Tech article computer scene and replay behavior.
- A non-tech article does not receive a character vignette.
- Desktop and narrow mobile layouts have no clipping or horizontal overflow.
- Keyboard focus and activation work for both replay controls.
- Reduced-motion mode shows static final compositions.
- With JavaScript disabled, illustrations and page content remain visible.
- Existing scroll reveals, buttons, cards, and page transitions continue to work.

Run the Astro production build where possible. The repository currently has a pre-existing invalid front matter error in `src/content/articles/my-fave-ai-tools.md`; this work will not modify that article. If the error still blocks the full build, report it separately and use focused checks for the files and runtime behavior changed here.

## Assets

- Reuse `Whonah-sitting-forward.png` for the opening pose.
- Reuse `Whonah-side-view-frisbee=forward.png` for the returning pose.
- Add the transparent Mabbit-at-the-computer artwork supplied in the design conversation to the site's character assets.
- Render the flying frisbee as a lightweight CSS/SVG scene element so its path and scale adapt responsively.

