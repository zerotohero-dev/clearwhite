/*
 *  Clearwhite: Lesson notes, clarified.
 *
 *  Clearwhite is a “Zero to Hero” project:
 *  https://clearwhite.zerotohero.dev/
 *
 *  MIT Licensed—see LICENSE.md
 */

import startQueue from './pipe';

import {
  SELECTOR_ROOT,
  CLASS_MAIN,
  CLASS_PANEL,
  CLASS_ASIDE,
  CLASS_WRAPPER
} from './constants';

window._cwq = window._cwq || [];

const mount = () => {
  const root = document.querySelector(SELECTOR_ROOT);

  if (!root) {
    console.log(`Clearwhite: Missing ${SELECTOR_ROOT}. Exiting.`);

    return false;
  }

  const template = `<div class="${CLASS_WRAPPER}">
    <article class="${CLASS_MAIN} ${CLASS_PANEL}"></article>
    <aside class="${CLASS_ASIDE} ${CLASS_PANEL}"></aside>
  </div>`;

  root.innerHTML = template;

  return true;
};

const mounted = mount();

if (mounted) {
  startQueue();
}
