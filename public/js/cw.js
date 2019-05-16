(window => {
  window._cwq = window._cwq || [];

  const root = document.querySelector('[data-clearwhite-root]');
  const style = document.createElement('style');

  const COLOR_MAIN_BG = '#ffffff';
  const COLOR_ASIDE_BG = '#f0f0f0';
  const WIDTH_MAIN_MAX = '850px';
  const WIDTH_MAIN_ASIDE = '240px';
  const GUTTER = 7;

  style.innerHTML = `
    .clw-wrapper {
      display: grid;
      grid-gap: ${2 * GUTTER}px;
      grid-template-areas: 'aside main';
      grid-template-columns: ${WIDTH_MAIN_ASIDE} 1fr;
    }
    
    .clw-main {
      max-width: ${WIDTH_MAIN_MAX};
      background: ${COLOR_MAIN_BG};
    }
    
    .clw-aside {
      grid-area: aside;
      padding-top: ${GUTTER}px;
      background: ${COLOR_ASIDE_BG};
    }
    
    .clw-main {
      grid-area: main;
      padding: ${GUTTER}px;
    }
  `;

  document.getElementsByTagName('head')[0].appendChild(style);

  root.innerHTML = `
    <div class="clw-wrapper">
      <article class="clw-main clw-panel">
        <h1>Welcome to ClearWhite</h1>
        <p>All your learning are belong to us!</p>
      </article>
      <aside class="clw-aside clw-panel">
        <p>File list comes here</p>
      </aside>
    </div>
  `;
})(window);
