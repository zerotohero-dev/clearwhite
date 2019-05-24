/*
 *  Clearwhite: Lesson notes, clarified.
 *
 *  Clearwhite is a “Zero to Hero” project:
 *  https://clearwhite.zerotohero.dev/
 *
 *  MIT Licensed—see LICENSE.md
 */

const endsWithMarkdownRegExp = /\.md$/i;
const isMarkdown = a => a && endsWithMarkdownRegExp.test(a);

const endsWithTextRegExp = /\.txt$/i;
const isText = a => a && endsWithTextRegExp.test(a);

const dataPath = ({ path, file }) =>
  DATA_ROOT + `${path}/${file}`.replace(/\//g, SLASH) + '.html';

export { isMarkdown, isText, dataPath };
