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

export const COMMAND_INIT = 'cw:tree:init';
export const COMMAND_CHANGE = 'cw:change';

export const CLASS_SELECTED = 'clw-selected';
export const CLASS_FILE_LIST_HEADER = 'clw-fh';

export const CLASS_WRAPPER = 'clw-wrapper';
export const CLASS_MAIN = 'clw-main';
export const CLASS_ASIDE = 'clw-aside';
export const CLASS_PANEL = 'clw-panel';
export const CLASS_CONTENT = 'clw-content';
export const CLASS_PAPER = 'clw-paper';
export const CLASS_CODE = 'clw-code';

export const CLASS_NO_HIGHLIGHT = 'clw-nohighlight';

export const CLASS_FILE_BLOCK = 'clw-fb';
export const CLASS_FILE_LINK = 'clw-fl';

export const LESSON_NOTES_FILE_NAME = 'readme.md';

export const ATTR_PATH = 'data-path';
export const ATTR_FILE = 'data-file';

export const DATA_ROOT = '/data';

export const SLASH = '-_cw_-';

export const SELECTOR_ROOT = '[data-clearwhite-root]';
export const SELECTOR_DOC_BODY = '.clw-main';
export const SELECTOR_ASIDE = '.clw-aside';

export const selectorAsideLink = ({ section, lesson }) =>
  `.clw-aside a[data-path="/S${section}E${lesson}"]`;
