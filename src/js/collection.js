/*
 *  Clearwhite: Lesson notes, clarified.
 *
 *  Clearwhite is a “Zero to Hero” project:
 *  https://clearwhite.zerotohero.dev/
 *
 *  MIT Licensed—see LICENSE.md
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
