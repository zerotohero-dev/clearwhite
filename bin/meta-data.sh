#!/usr/bin/env node

const fs = require('fs');
const { resolve } = require('path');

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
        const shouldWalk = stat && stat.isDirectory();

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

        results.push(file);
        pending--;

        if (pending === 0) {
          done(null, results);
        }
      });
    });
  });
};
