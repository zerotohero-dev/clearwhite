#!/usr/bin/env node

const fs = require('fs');
const { resolve, join } = require('path');

const walk = (dir, done) =>{
  const results = [];

  fs.readdir(dir, (err, list) => {
    if (err) {
      return done(err);
    }

    let pending = list.length;

    if (pending === 0) {
      return done(null, results);
    }

    list.forEach((file) => {
      file = resolve(dir, file);

      fs.stat(file, (err, stat) => {
        const shouldWalk = stat && stat.isDirectory() && !file.endsWith('node_modules') && !file.endsWith('.git') && !file.endsWith('.idea');

        if (shouldWalk) {
          walk(file, (err, res) => {
            results.push(...res);
            pending--;

            if (pending === 0) {
              done(null, results);
            }
          });

          return;
        }

        if (!file.endsWith('node_modules') && !file.endsWith('.git') && !file.endsWith('.idea')) {
          results.push(file);
        }

        pending--;

        if (pending === 0) {
          done(null, results);
        }
      });
    });
  });
};

walk(join(__dirname, '..'), (err, out) => {
  if (err) {
    console.error(err);
    return;
  }

  if (out) {
    console.log(out);
  }
});
