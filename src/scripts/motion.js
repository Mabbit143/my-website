// ============================================================
// DECONSTRUCTING ACADEMIA — scroll reveals
// Pairs with src/styles/motion.css.
//
// WHAT REVEALS: edit the REVEAL list below. Each line is
//   [CSS selector, style]
// style is one of:
//   'up'    fade + rise   (default, for most blocks)
//   'slap'  sticker slapped down crooked (stamps, notes, labels)
//   'splat' paint burst (splatter art)
//   'draw'  marker draws itself (.mark circles, .hl highlighter)
//
// To reveal something one-off without editing this file, put
// data-reveal (or data-reveal="slap") on it in the page markup.
// ============================================================

const REVEAL = [
  // section intros and big blocks
  ['.section-heading', 'up'],
  ['.lead-story__card', 'up'],
  ['.product-card', 'up'],
  ['.character-section > *', 'up'],
  ['.signup-wrap > *', 'up'],
  ['.reading-desk', 'up'],
  ['.method-grid > *, .values-grid > *, .contact-grid > *', 'up'],
  ['.prose p:has(> img:only-child)', 'up'],

  // grids — items that scroll in together get staggered
  ['.route-strip > a', 'up'],
  ['.latest__grid > *', 'up'],
  ['.series-grid > *', 'up'],
  ['#article-grid > *', 'up'],
  ['.related .grid > *', 'up'],

  // collage pieces
  ['.lead-story__label, .note, .stamp, .stamp-label', 'slap'],
  ['.splat-head__art', 'splat'],

  // markers
  ['.mark, .hl', 'draw'],
];

const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 5;

function init() {
  const root = document.documentElement;

  // Reduced motion or no IntersectionObserver → motion-ready was never
  // added (or can't work); leave everything visible and stop here.
  if (!root.classList.contains('motion-ready') || !('IntersectionObserver' in window)) {
    root.classList.remove('motion-ready');
    return;
  }

  const targets = new Set();

  for (const [selector, style] of REVEAL) {
    document.querySelectorAll(selector).forEach((el) => {
      if (el.closest('.hero')) return; // the hero has its own on-load entrance
      if (style === 'draw') {
        el.dataset.draw = '';
      } else if (!el.hasAttribute('data-reveal')) {
        el.dataset.reveal = style;
      }
      targets.add(el);
    });
  }

  // anything hand-tagged in markup
  document.querySelectorAll('[data-reveal], [data-draw]').forEach((el) => targets.add(el));

  const io = new IntersectionObserver(
    (entries) => {
      let step = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        // things that scroll into view in the same moment go one after another
        el.style.setProperty('--reveal-delay', `${Math.min(step, MAX_STAGGER_STEPS) * STAGGER_MS}ms`);
        step += 1;
        el.classList.add('is-revealed');
        io.unobserve(el);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  targets.forEach((el) => io.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
