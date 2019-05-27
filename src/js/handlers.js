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

const onMainArticleClick = evt => {
  if (!evt) {
    return;
  }
  if (!evt.target) {
    return;
  }
  if (
    evt.target.nodeName.toLowerCase() !== 'a' &&
    evt.target.parentNode &&
    evt.target.parentNode.nodeName.toLowerCase() !== 'a'
  ) {
    return;
  }

  evt.preventDefault();

  if (
    evt.target.parentNode &&
    evt.target.parentNode.nodeName.toLowerCase() === 'a'
  ) {
    window.open(evt.target.parentNode.href);
    return;
  }

  window.open(evt.target.href);
};

const onAsideClick = evt => {
  evt.preventDefault();

  const target = findTarget(evt);

  if (!target) {
    return;
  }

  selectNode(target);

  const path = target.getAttribute(ATTR_PATH);
  const file = target.getAttribute(ATTR_FILE);

  window
    .fetch(dataPath({ path, file }))
    .then(res => res.text())
    .then(html => renderArticleContent({ file, html }));
};

export { onMainArticleClick, onAsideClick };
