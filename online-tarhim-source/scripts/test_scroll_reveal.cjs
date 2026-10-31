const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const source = ts.transpileModule(readFileSync(require.resolve('../src/hooks/useScrollReveal.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function mount(reducedMotion = false) {
  const section = new EventTarget();
  const preference = new EventTarget();
  preference.matches = reducedMotion;
  let state;
  let effect;
  let intersection;
  let disconnected = false;
  const context = {
    exports: {}, window: { matchMedia: () => preference, IntersectionObserver: true },
    IntersectionObserver: class {
      constructor(callback) { intersection = callback; }
      observe() {}
      disconnect() { disconnected = true; }
    },
    require: () => ({
      useRef: () => ({ current: section }),
      useState: initial => { state = initial; return [state, value => { state = value; }]; },
      useEffect: callback => { effect = callback; },
    }),
  };
  vm.runInNewContext(source, context);
  context.exports.useScrollReveal();
  const cleanup = effect();
  return { section, preference, enter: () => intersection?.([{ isIntersecting: true }]),
    state: () => state, disconnected: () => disconnected, cleanup };
}

for (const interaction of ['pointerdown', 'focusin']) {
  test(`${interaction}: entry stays settled after click, blur, repeated focus and queued intersection`, () => {
    const view = mount();
    assert.equal(view.state(), 'pending');
    view.enter();
    assert.equal(view.state(), 'entered');
    view.section.dispatchEvent(new Event(interaction));
    assert.equal(view.state(), 'visible');
    for (const type of ['focusin', 'click', 'focusout', 'pointerdown', 'focusin', 'focusout']) {
      view.section.dispatchEvent(new Event(type));
      assert.equal(view.state(), 'visible');
    }
    view.enter();
    assert.equal(view.state(), 'visible');
    assert.equal(view.disconnected(), true);
    view.cleanup();
  });
}

test('keyboard focus before intersection prevents a later entrance animation', () => {
  const view = mount();
  view.section.dispatchEvent(new Event('focusin'));
  view.enter();
  assert.equal(view.state(), 'visible');
  view.cleanup();
});

test('reduced motion is visible and preference changes settle the entrance permanently', () => {
  assert.equal(mount(true).state(), 'visible');
  const view = mount();
  view.enter();
  view.preference.matches = true;
  view.preference.dispatchEvent(new Event('change'));
  view.preference.matches = false;
  view.preference.dispatchEvent(new Event('change'));
  view.enter();
  assert.equal(view.state(), 'visible');
  view.cleanup();
});

test('cleanup removes interaction listeners', () => {
  const view = mount();
  view.cleanup();
  view.section.dispatchEvent(new Event('pointerdown'));
  view.section.dispatchEvent(new Event('focusin'));
  assert.equal(view.state(), 'pending');
});
