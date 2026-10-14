import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { initCharacterVignettes } from '../src/scripts/character-vignettes.js';

const TIMELINE_NAME = 'vignette-timeline';

class FakeClassList {
  constructor(initial = []) {
    this.values = new Set(initial);
    this.addCalls = new Map();
  }

  add(...names) {
    for (const name of names) {
      this.values.add(name);
      this.addCalls.set(name, (this.addCalls.get(name) ?? 0) + 1);
    }
  }

  remove(...names) {
    for (const name of names) this.values.delete(name);
  }

  contains(name) {
    return this.values.has(name);
  }
}

class FakeEventTarget {
  constructor() {
    this.listeners = new Map();
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) ?? new Set();
    listeners.add(listener);
    this.listeners.set(type, listeners);
  }

  removeEventListener(type, listener) {
    this.listeners.get(type)?.delete(listener);
  }

  dispatch(type, event = {}) {
    for (const listener of this.listeners.get(type) ?? []) {
      listener({ type, target: this, ...event });
    }
  }

  listenerCount(type) {
    return this.listeners.get(type)?.size ?? 0;
  }
}

class FakeVignette extends FakeEventTarget {
  constructor() {
    super();
    this.classList = new FakeClassList();
    this.replay = new FakeEventTarget();
    this.reflowReads = 0;
  }

  querySelector(selector) {
    return selector === '[data-vignette-replay]' ? this.replay : null;
  }

  get offsetWidth() {
    this.reflowReads += 1;
    return 320;
  }
}

class FakeObserver {
  static instances = [];

  constructor(callback) {
    this.callback = callback;
    this.observed = [];
    this.disconnected = false;
    FakeObserver.instances.push(this);
  }

  observe(target) {
    this.observed.push(target);
  }

  disconnect() {
    this.disconnected = true;
  }

  emit(target, isIntersecting) {
    this.callback([{ target, isIntersecting }]);
  }
}

function setup(options = {}) {
  const motionReady = options.motionReady ?? true;
  const reduceMotion = options.reduceMotion ?? false;
  const Observer = Object.hasOwn(options, 'Observer') ? options.Observer : FakeObserver;
  FakeObserver.instances = [];
  const vignette = new FakeVignette();
  const documentElement = { classList: new FakeClassList(motionReady ? ['motion-ready'] : []) };
  const root = {
    documentElement,
    querySelectorAll(selector) {
      return selector === '[data-character-vignette]' ? [vignette] : [];
    },
  };
  const view = {
    matchMedia() {
      return { matches: reduceMotion };
    },
  };

  return { documentElement, Observer, root, view, vignette };
}

test('reduced motion leaves the final state visible without observing', () => {
  const fixture = setup({ motionReady: false, reduceMotion: true });

  const cleanup = initCharacterVignettes(fixture);

  assert.equal(FakeObserver.instances.length, 0);
  assert.deepEqual([...fixture.vignette.classList.values], []);
  assert.equal(typeof cleanup, 'function');
});

test('missing IntersectionObserver removes motion-ready', () => {
  const fixture = setup({ Observer: undefined });

  initCharacterVignettes(fixture);

  assert.equal(fixture.documentElement.classList.contains('motion-ready'), false);
  assert.deepEqual([...fixture.vignette.classList.values], []);
});

test('the first intersection starts one play cycle', () => {
  const fixture = setup();

  initCharacterVignettes(fixture);
  const observer = FakeObserver.instances[0];
  observer.emit(fixture.vignette, true);

  assert.equal(fixture.vignette.classList.contains('is-playing'), true);
  assert.equal(fixture.vignette.classList.addCalls.get('is-playing'), 1);

  fixture.vignette.dispatch('animationend', { animationName: TIMELINE_NAME });

  assert.equal(fixture.vignette.classList.contains('is-playing'), false);
  assert.equal(fixture.vignette.classList.contains('is-complete'), true);
});

test('leaving and returning to the viewport pauses and resumes without restarting', () => {
  const fixture = setup();

  initCharacterVignettes(fixture);
  const observer = FakeObserver.instances[0];
  observer.emit(fixture.vignette, true);
  observer.emit(fixture.vignette, false);

  assert.equal(fixture.vignette.classList.contains('is-paused'), true);

  observer.emit(fixture.vignette, true);

  assert.equal(fixture.vignette.classList.contains('is-paused'), false);
  assert.equal(fixture.vignette.classList.addCalls.get('is-playing'), 1);
});

test('replay resets a completed vignette without adding another listener', () => {
  const fixture = setup();

  const cleanup = initCharacterVignettes(fixture);
  const observer = FakeObserver.instances[0];
  observer.emit(fixture.vignette, true);
  fixture.vignette.dispatch('animationend', { animationName: TIMELINE_NAME });

  assert.equal(fixture.vignette.replay.listenerCount('click'), 1);
  fixture.vignette.replay.dispatch('click');

  assert.equal(fixture.vignette.classList.contains('is-complete'), false);
  assert.equal(fixture.vignette.classList.contains('is-playing'), true);
  assert.equal(fixture.vignette.reflowReads, 1);
  assert.equal(fixture.vignette.replay.listenerCount('click'), 1);

  cleanup();
  assert.equal(fixture.vignette.replay.listenerCount('click'), 0);
  assert.equal(observer.disconnected, true);
});

test('the vignette component exposes both accessible scene variants', () => {
  const component = readFileSync(
    new URL('../src/components/CharacterVignette.astro', import.meta.url),
    'utf8',
  );

  assert.match(component, /variant: 'frisbee' \| 'computer'/);
  assert.match(component, /data-character-vignette=\{variant\}/);
  assert.match(component, /data-vignette-replay/);
  assert.match(component, /type="button"/);
  assert.match(component, /Replay Whonah's frisbee chase/);
  assert.match(component, /Replay Mabbit typing/);
  assert.match(component, /\/images\/characters\/Whonah-sitting-forward\.png/);
  assert.match(component, /\/images\/characters\/Whonah-side-view-frisbee=forward\.png/);
  assert.match(component, /\/images\/characters\/Mabbit-at-computer\.png/);
  assert.ok((component.match(/aria-hidden="true"/g) ?? []).length >= 4);
});

test('base and reduced-motion styles preserve a static final composition', () => {
  const component = readFileSync(
    new URL('../src/components/CharacterVignette.astro', import.meta.url),
    'utf8',
  );
  const motion = readFileSync(new URL('../src/styles/motion.css', import.meta.url), 'utf8');

  assert.match(
    component,
    /\.character-vignette__whonah--returning\s*\{[^}]*opacity:\s*1/s,
  );
  assert.match(component, /\.character-vignette__mabbit,[\s\S]*width:\s*100%/);
  assert.match(motion, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.character-vignette/);
  assert.match(motion, /\.character-vignette__whonah--returning,[\s\S]*opacity:\s*1 !important/);
});

test('the homepage renders one frisbee vignette instead of a standalone Whonah image', () => {
  const homepage = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

  assert.match(homepage, /import CharacterVignette from ['"]\.\.\/components\/CharacterVignette\.astro['"]/);
  assert.equal((homepage.match(/variant="frisbee"/g) ?? []).length, 1);
  assert.doesNotMatch(homepage, /Whonah-sitting-forward\.png/);
});

test('the article template maps only use-the-damn-tool to computer Mabbit', () => {
  const article = readFileSync(
    new URL('../src/pages/articles/[slug].astro', import.meta.url),
    'utf8',
  );

  assert.match(
    article,
    /import CharacterVignette from ['"]\.\.\/\.\.\/components\/CharacterVignette\.astro['"]/,
  );
  assert.match(
    article,
    /const hasComputerVignette = entry\.data\.series === ['"]use-the-damn-tool['"];/,
  );
  assert.equal((article.match(/variant="computer"/g) ?? []).length, 1);
  assert.match(
    article,
    /hasComputerVignette\s*&&\s*\(\s*<CharacterVignette\s+variant="computer"/s,
  );
});
