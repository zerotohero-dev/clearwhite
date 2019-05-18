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

    // move some of the other colors to constants too.
    // they will eventually be sass constants.
    style.innerHTML = `.clw-wrapper {display: grid;grid-gap: 0;grid-template-areas: 'aside main';grid-template-columns: ${WIDTH_MAIN_ASIDE} 1fr;}
.clw-main {max-width: ${WIDTH_MAIN_MAX};background: ${COLOR_MAIN_BG};}
.clw-aside {grid-area: aside;padding-top: ${GUTTER}px;background: ${COLOR_ASIDE_BG};}
.clw-main {grid-area: main;padding: ${GUTTER}px; overflow: auto;padding-left: ${2*GUTTER}px;padding-right:${2*GUTTER}px;}
.clw-fh {font-size: 18px; padding-left: 7px; padding-right: 7px; margin: 0;padding-top: 7px; padding-bottom: 0;}
.clw-fl {color: #000000; cursor: default; text-decoration: none; border-right: 6px #f0f0f0 solid; padding-left: 21px; padding-right: 14px; padding-top: 7px; padding-bottom: 7px; display:block;transition: all .35s ease-out}
.clw-fl:hover {background: #ffffff; border-right: 6px #444444 solid;}
.clw-fb {margin: 0}
.clw-code {background: #ffffff;}
.clw-selected {background: #ffffff; border-right: 6px #ffa500 solid; pointer-events: none;}
.clw-selected:hover {background: #ffffff; border-right: 6px #ffa500 solid;}
.clw-aside {-webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;}
.hljs {display: block; overflow-x: auto; padding: 0.5em; background: white; color: black;}
.hljs-comment,
.hljs-quote,
.hljs-variable {color: #008000;}

.hljs-keyword,
.hljs-selector-tag,
.hljs-built_in,
.hljs-name,
.hljs-tag {color: #00f;}

.hljs-string,
.hljs-title,
.hljs-section,
.hljs-attribute,
.hljs-literal,
.hljs-template-tag,
.hljs-template-variable,
.hljs-type,
.hljs-addition {color: #a31515;}

.hljs-deletion,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-meta {color: #2b91af;}

.hljs-doctag {color: #808080;}

.hljs-attr {color: #f00;}

.hljs-symbol,
.hljs-bullet,
.hljs-link {color: #00b0e8;}

.hljs-emphasis {font-style: italic;}

.hljs-strong {font-weight: bold;}
.clw-nohighlight * {color: #000000 !important;}
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
                    a.setAttribute('draggable', false);
                    a.setAttribute('data-path', section);
                    a.setAttribute('data-file', file);

                    const t = document.createTextNode(file);
                    a.appendChild(t);
                    p.appendChild(a);
                    frag.appendChild(p);
                });
        });

        const aside = document.querySelector('aside.clw-aside');

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
                .forEach(node => node.classList.remove('clw-selected'));
            target.classList.add('clw-selected');
        };

        aside.onclick = evt => {
            evt.preventDefault();

            const target = findTarget(evt);

            if (!target) {
                return;
            }

            selectNode(target);

            const path =
                target.getAttribute('data-path') === '/'
                    ? ''
                    : target.getAttribute('data-path');
            const file = target.getAttribute('data-file');

            console.log('file', file);
            console.log('path', path);

            fetch('/data/' + `${path}/${file}`.replace(/\//g, '-_cw_-') + '.html')
                .then(res => {
                    return res.text();
                })
                .then(html => {
                    if (file.endsWith('.md')) {
                        document.querySelector('article.clw-main').innerHTML = html;
                        return;

                    }

                    const codeClassname = file.endsWith('.txt') ? 'clw-nohighlight' : '';

                    document.querySelector('article.clw-main').innerHTML =
                        `<pre class="clw-code"><code class="${codeClassname}">` + html + '</code></pre>';

                })
                .catch(err => {
                    console.log('problem');
                    console.log(err);
                });
        };

        aside.ondragstart = evt => {
            evt.preventDefault();
        };

        aside.appendChild(frag);

        aside.querySelector('a').click();

        document.querySelector('article.clw-main').onclick = (evt) => {
            if (evt.target.nodeName.toLowerCase() === 'a' || evt.target.parentNode
                && evt.target.parentNode.nodeName.toLowerCase() === 'a') {
                evt.preventDefault();

                if (evt.target.parentNode && evt.target.parentNode.nodeName.toLowerCase() === 'a') {
                    window.open(evt.target.parentNode.href);

                    return;
                }

                window.open(evt.target.href);
            }
        }

        // debugger;
    });
})(window);
