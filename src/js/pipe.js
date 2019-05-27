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

import { tick } from './shims';

import { initialize, change } from './actions';

import { COMMAND_INIT, COMMAND_CHANGE } from './constants';

const consume = () => {
  if (!window._cwq) {
    console.log('Clearwhite: Initialize window._cwq before using Clearwhite.');
    console.log('Clearwhite: Exiting.');
    return;
  }

  if (!window._cwq.length) {
    tick(consume);
    return;
  }

  const tuple = window._cwq.shift();

  if (!tuple) {
    tick(consume);
    return;
  }

  if (tuple.length <= 1) {
    tick(consume);
    return;
  }

  const command = tuple[0];

  switch (command) {
    case COMMAND_INIT:
      const payload = tuple[1];
      initialize(payload);
      break;
    case COMMAND_CHANGE:
      if (tuple.length <= 2) {
        break;
      }

      const section = tuple[1] || 1;
      const lesson = tuple[2] || 1;

      change({ section, lesson });
      tick(consume);
      break;
    default:
      tick(consume);
      break;
  }
};

const init = () => {
  let supported = true;

  if (!document.querySelector) {
    console.log('Clearwhite: document.querySelector API not found. Exiting.');
    console.log('Clearwhite: Clearwhite cannot run in you browser.');
    console.log('Clearwhite: Switch to a modern browser to use Clearwhite.');

    supported = false;
  }

  if (!window.fetch) {
    console.log('Clearwhite: window.fetch API not found. Exiting.');
    console.log('Clearwhite: Clearwhite cannot run in you browser.');
    console.log('Clearwhite: Switch to a modern browser to use Clearwhite.');

    supported = false;
  }

  if (supported) {
    tick(consume);
  }
};

export default init;
