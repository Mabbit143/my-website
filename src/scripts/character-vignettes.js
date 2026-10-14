const TIMELINE_ANIMATION = 'vignette-timeline';

export function initCharacterVignettes(options = {}) {
  const root = options.root ?? document;
  const view = options.view ?? window;
  const Observer = options.Observer ?? view.IntersectionObserver;
  const html = root.documentElement;
  const reduceMotion = view.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  if (!html?.classList.contains('motion-ready') || reduceMotion) {
    return () => {};
  }

  if (!Observer) {
    html.classList.remove('motion-ready');
    return () => {};
  }

  const vignettes = [...root.querySelectorAll('[data-character-vignette]')];
  const listeners = [];
  const started = new WeakSet();
  const completed = new WeakSet();

  const play = (vignette) => {
    completed.delete(vignette);
    vignette.classList.remove('is-complete', 'is-paused', 'is-playing');
    void vignette.offsetWidth;
    vignette.classList.add('is-playing');
    started.add(vignette);
  };

  const observer = new Observer((entries) => {
    for (const entry of entries) {
      const vignette = entry.target;

      if (entry.isIntersecting) {
        if (!started.has(vignette)) {
          vignette.classList.add('is-playing');
          started.add(vignette);
        } else {
          vignette.classList.remove('is-paused');
        }
      } else if (started.has(vignette) && !completed.has(vignette)) {
        vignette.classList.add('is-paused');
      }
    }
  }, { threshold: 0.25 });

  for (const vignette of vignettes) {
    const onAnimationEnd = (event) => {
      if (event.target !== vignette || event.animationName !== TIMELINE_ANIMATION) return;
      vignette.classList.remove('is-playing', 'is-paused');
      vignette.classList.add('is-complete');
      completed.add(vignette);
    };
    vignette.addEventListener('animationend', onAnimationEnd);
    listeners.push(() => vignette.removeEventListener('animationend', onAnimationEnd));

    const replay = vignette.querySelector('[data-vignette-replay]');
    if (replay) {
      const onReplay = () => play(vignette);
      replay.addEventListener('click', onReplay);
      listeners.push(() => replay.removeEventListener('click', onReplay));
    }

    observer.observe(vignette);
  }

  return () => {
    observer.disconnect();
    listeners.forEach((remove) => remove());
  };
}
