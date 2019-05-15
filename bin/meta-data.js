#!/usr/bin/env node

const { stat, readFile, readdir } = require('fs');
const { resolve, join, extname } = require('path');

const showdown = require('showdown');
const converter = new showdown.Converter();

// to be used:
// const hljs = require('highlight.js');

const readDir = (dir) => new Promise((resolve, reject) => {
  readdir(dir, (err, list) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(list);
  });
});

const statFile = (file) => new Promise((resolve, reject) => {
  stat(file, (err, stat) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(stat);
  });
});

const isDir = (stat) => !!stat && stat.isDirectory();

const shouldWalk = (dir) => !dir.endsWith('node_modules') &&
  !dir.endsWith('.git') && !dir.endsWith('.idea');

const walk = async (dir) => {
  const results = [];

  try {
    await Promise.all((await readDir(dir)).map(async (f) => {
      try {
        const file = resolve(dir, f);

        if (isDir(await statFile(file))) {
          if (shouldWalk(file)) {
            results.push(...await walk(file));
          }

          return;
        }

        results.push(file);
      } catch (ex) {
        console.error(ex);
      }
    }));
  } catch (err) {
    console.error(err);
  }

  return results;
};

const readCode = (path) => new Promise((resolve, reject) =>
  readFile(path, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      reject(err);
    }

    resolve(data);
  })
);

const convertMarkdownToHtml = (md) => converter.makeHtml(md);


const run = async () => {
  const results = await walk(join(__dirname, '..'));

  results.forEach(async (path) => {
    console.log(path);

    try {
      const sourceCode = await readCode(path);
      const extension = extname(path);

      console.log('---------');
      console.log(path, '::', extension);

      switch (extension.toLowerCase()) {
        case '.md':
          const markdown = convertMarkdownToHtml(sourceCode);
          console.log(markdown);
          break;
        case '.css':
          console.log('unhandled:', path);
          break;
        case '.js':
          console.log('unhandled:', path);
          break;
        case '.html':
          console.log('unhandled:', path);
          break;
        case '.sass':
          console.log('unhandled:', path);
          break;
        default:
          // assume text file by default.
          console.log('unhandled:', path)
      }

      console.log('---------');
      // create highlighted markup
      // save the highlighted markup to public/cw/$path$extension.html
      // markdown files are an exception:
      //     convert them directly to html public/cw/$path.html by showdown or something.
    } catch (err) {
      console.error(err);
    }
  });
};

run().then(() => {});
