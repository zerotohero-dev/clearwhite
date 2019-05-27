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

const sortLessonFiles = (a, b) => {
  if (isMarkdown(a) && isMarkdown(b)) {
    if (a.toLowerCase() === LESSON_NOTES_FILE_NAME.toLowerCase()) {
      return -1;
    }
    if (b.toLowerCase() === LESSON_NOTES_FILE_NAME.toLowerCase()) {
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
};

export { sortLessonFiles };
