#!/usr/bin/env node

const fs = require('fs');
const { resolve, join } = require('path');

// to be used:
// const hljs = require('highlight.js');

const readDir = (dir) => new Promise((resolve, reject) => {
  fs.readdir(dir, (err, list) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(list);
  });
});

const statFile = (file) => new Promise((resolve, reject) => {
  fs.stat(file, (err, stat) => {
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

const run = async () => {
  const results = await walk(join(__dirname, '..'));

  console.log(results);
};

run().then(() => {});
