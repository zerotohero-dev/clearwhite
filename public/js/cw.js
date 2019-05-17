(window => {
  window._cwq = window._cwq || [];

  // console.log('command queue', window._cwq);

  const root = document.querySelector('[data-clearwhite-root]');
  const style = document.createElement('style');

  const COLOR_MAIN_BG = '#ffffff';
  const COLOR_ASIDE_BG = '#f0f0f0';
  const WIDTH_MAIN_MAX = '850px';
  const WIDTH_MAIN_ASIDE = '240px';
  const GUTTER = 7;

  style.innerHTML = `.clw-wrapper {display: grid;grid-gap: ${2 *
    GUTTER}px;grid-template-areas: 'aside main';grid-template-columns: ${WIDTH_MAIN_ASIDE} 1fr;}
.clw-main {max-width: ${WIDTH_MAIN_MAX};background: ${COLOR_MAIN_BG};}
.clw-aside {grid-area: aside;padding-top: ${GUTTER}px;background: ${COLOR_ASIDE_BG};}
.clw-main {grid-area: main;padding: ${GUTTER}px;}
.clw-fh {font-size: 18px; padding-left: 7px; padding-right: 7px; margin: 0;padding-top: 7px; padding-bottom: 0;}
.clw-fl {color: #000000; padding-left: 21px; padding-right: 14px; padding-top: 7px; padding-bottom: 7px; display:block;transition: all .35s ease-out}
.clw-fl:hover {background: #ffffff;}
.clw-fb {margin: 0}
`;

  document.getElementsByTagName('head')[0].appendChild(style);

  root.innerHTML = `<div class="clw-wrapper"><article class="clw-main clw-panel"></article><aside class="clw-aside clw-panel"></aside></div>`;

  window._cwq.forEach(tuple => {
    const command = tuple[0];
    const payload = tuple[1];

    if (command !== 'cw:tree:init') {
      return;
    }

    const sections = Object.keys(payload).sort();

    const frag = document.createDocumentFragment();

    sections.forEach(section => {
      const h2 = document.createElement('h2');
      h2.appendChild(document.createTextNode(section));
      h2.className = 'clw-fh';
      frag.appendChild(h2);

      console.log(payload[section]);

      const files = payload[section];

      const isMarkdown = a => a.indexOf('.md') > -1;

      files
        .sort((a, b) => {
          if (isMarkdown(a) && isMarkdown(b)) {
            if (a === 'README.md') {
              return -1;
            }

            if (b === 'README.md') {
              return 1;
            }

            return a > b ? 1 : -1;
          }

          if (isMarkdown(a)) {
            return -1;
          }

          if (isMarkdown(b)) {
            return 1;
          }

          return a > b ? 1 : -1;
        })
        .forEach(file => {
          const p = document.createElement('p');
          p.className = 'clw-fb';
          const a = document.createElement('a');
          a.href = 'javascript:void(0)';
          a.className = 'clw-fl';
          const t = document.createTextNode(file);
          a.appendChild(t);
          p.appendChild(a);
          frag.appendChild(p);
        });
    });

    const aside = document.querySelector('aside.clw-aside');

    aside.appendChild(frag);

    // debugger;
  });
})(window);
