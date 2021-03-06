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

import { sortLessonFiles } from './collection';

import { onMainArticleClick } from './handlers';

let initialized = false;
const initialize = payload => {
  if (initialized) {
    return;
  }

  const sections = Object.keys(payload).sort();
  const frag = document.createDocumentFragment();

  sections.forEach(section => {
    const h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode(section));
    h2.classList.add(CLASS_FILE_LIST_HEADER);
    frag.appendChild(h2);

    const files = payload[section];

    files
      .sort(sortLessonFiles)
      .forEach(file => addFileLink({ frag, section, file }));
  });

  const aside = document.querySelector(SELECTOR_ASIDE);

  if (!aside) {
    console.log('Clearwhite: Cannot find aside.clw-aside.');
    console.log('Clearwhite: Won’t attach the event listeners.');
    return;
  }

  aside.onclick = onAsideClick;
  aside.ondragstart = evt => evt.preventDefault();

  aside.appendChild(frag);

  document.querySelector(SELECTOR_DOC_BODY).onclick = onMainArticleClick;

  initialized = true;
};

const change = ({ section, lesson }) => {
  const s = section < 10 ? `0${section}` : `${section}`;
  const e = lesson < 10 ? `0${lesson}` : `${lesson}`;
  const selector = selectorAsideLink({ section: s, lesson: e });

  document.querySelector(selector).click();
};

export { initialize, change };
