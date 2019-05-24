window._cwq = window._cwq || [];

const root = document.querySelector('[data-clearwhite-root]');

root.innerHTML = '<div class="clw-wrapper"><article class="clw-main clw-panel"></article><aside class="clw-aside clw-panel"></aside></div>';

const consume = () => {
  if (!window._cwq.length) {
    window.requestAnimationFrame(consume);
    return;
  }

  const tuple = window._cwq.shift();

  const command = tuple[0];
  const payload = tuple[1];

    if (command === 'cw:change') {
        const section = tuple[1];
        const lesson = tuple[2];
        const sectionStr = section < 10 ? `0${section}` : `${section}`;
        const lessonStr = lesson < 10 ? `0${lesson}` : `${lesson}`;
        document.querySelector(`a[data-path="/S${sectionStr}E${lessonStr}"]`).click();
        window.requestAnimationFrame(consume);
        return;
    }
    if (command !== 'cw:tree:init') {
        window.requestAnimationFrame(consume);
        return;
    }
    const sections = Object.keys(payload).sort();
    const frag = document.createDocumentFragment();
    sections.forEach(section => {
        const h2 = document.createElement('h2');
        h2.appendChild(document.createTextNode(section));
        h2.className = 'clw-fh';
        frag.appendChild(h2);
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
        fetch('/data/' + `${path}/${file}`.replace(/\//g, '-_cw_-') + '.html')
                .then(res => {
                    return res.text();
                })
                .then(html => {
                    if (file.endsWith('.md')) {
                        document.querySelector('article.clw-main').innerHTML = '<div class="clw-content clw-paper">'+html+'</div>';
                        return;
                    }
                    const codeClassname = file.endsWith('.txt') ? 'clw-nohighlight' : '';
                    document.querySelector('article.clw-main').innerHTML =
                            `<pre class="clw-code clw-paper"><code class="${codeClassname}">` + html + '</code></pre>';
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
    };
    console.log('re-request af');
    window.requestAnimationFrame(consume);
};
window.requestAnimationFrame(consume);