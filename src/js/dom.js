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

const findTarget = evt => {
  if (evt.target.nodeName.toLowerCase() === 'a') {
    return evt.target;
  }
  if (evt.target.nodeName.toLowerCase() === 'p') {
    return evt.target.querySelector('a');
  }
  return null;
};

const selectNode = target => {
  const treeRoot = target.parentNode.parentNode;
  treeRoot
    .querySelectorAll('a')
    .forEach(node => node.classList.remove(CLASS_SELECTED));
  target.classList.add(CLASS_SELECTED);
};

const addFileLink = ({ section, file, frag }) => {
  const f = `${file}`;

  const p = document.createElement('p');
  p.className = CLASS_FILE_BLOCK;

  const a = document.createElement('a');
  a.href = 'javascript:void(0)';
  a.className = CLASS_FILE_LINK;

  a.setAttribute('draggable', 'false');
  a.setAttribute(ATTR_PATH, section);
  a.setAttribute(ATTR_FILE, f);

  const t = document.createTextNode(f);

  a.appendChild(t);
  p.appendChild(a);
  frag.appendChild(p);
};

const renderArticleContent = ({ file, html }) => {
  if (isMarkdown(file)) {
    document.querySelector(
      SELECTOR_DOC_BODY
    ).innerHTML = `<div class="${CLASS_CONTENT} ${CLASS_PAPER}">${html}</div>`;
    return;
  }

  const codeClassname = isText(file) ? CLASS_NO_HIGHLIGHT : '';

  document.querySelector(
    SELECTOR_DOC_BODY
  ).innerHTML = `<pre class="${CLASS_CODE} ${CLASS_PAPER}"><code 
        class="${codeClassname}">${html}</code></pre>`;
};

export { renderArticleContent };
