/*
 * ______________                            ______ __________
 * __  ____/__  /__________ __________      ____  /____(_)_  /_____
 * _  /    __  /_  _ \  __ `/_  ___/_ | /| / /_  __ \_  /_  __/  _ \
 * / /___  _  / /  __/ /_/ /_  /   __ |/ |/ /_  / / /  / / /_ /  __/
 * \____/  /_/  \___/\__,_/ /_/    ____/|__/ /_/ /_//_/  \__/ \___/
 *                                         Lesson notes, clarified.
 * A “Zero to Hero” Project
 *   https://clearwhite.zerotohero.dev/
 * MIT License
 *   https://github.com/zerotohero-dev/clearwhite/blob/master/LICENSE.md
 */

import startQueue from './pipe';

import { CLASS_ASIDE, CLASS_MAIN, CLASS_PANEL, CLASS_WRAPPER, SELECTOR_ROOT } from './constants';

window._cwq = window._cwq || [];

const mount = () => {
  const root = document.querySelector(SELECTOR_ROOT);

  if (!root) {
    console.log(`Clearwhite: Missing ${SELECTOR_ROOT}. Exiting.`);

    return false;
  }

  root.innerHTML = `<div class="${CLASS_WRAPPER}">
    <article class="${CLASS_MAIN} ${CLASS_PANEL}"></article>
    <aside class="${CLASS_ASIDE} ${CLASS_PANEL}"></aside>
  </div>`;

  return true;
};

const mounted = mount();

if (mounted) {
  startQueue();
}
