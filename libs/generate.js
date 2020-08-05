/*
 * @Descripttion: generate.js
 * @Author: heidous
 * @Date: 2020-08-04 14:57:19
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-05 18:08:45
 */

const chalk = require('chalk');
const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');
const async = require('async');
const render = require('consolidate').handlebars.render;
const path = require('path');
const multimatch = require('multimatch');
const getOptions = require('./options');
const ask = require('./ask');
const match = require('minimatch');
const evaluate = require('./eval');

const filter = (files, filters, data, done) => {
  if (!filters) {
    return done();
  }
  const fileNames = Object.keys(files);
  Object.keys(filters).forEach((glob) => {
    fileNames.forEach((file) => {
      if (match(file, glob, { dot: true })) {
        const condition = filters[glob];
        if (!evaluate(condition, data)) {
          delete files[file];
        }
      }
    });
  });
  done();
};

Handlebars.registerHelper('if_eq', function(a, b, opts) {
  return a === b ? opts.fn(this) : opts.inverse(this);
});

Handlebars.registerHelper('unless_eq', function(a, b, opts) {
  return a === b ? opts.inverse(this) : opts.fn(this);
});

module.exports = function generate(name, src, dest, done) {
  const opts = getOptions(name, src);
  const metalsmith = Metalsmith(path.join(src, 'template'));
  const data = Object.assign(metalsmith.metadata(), {
    destDirName: name,
    inPlace: dest === process.cwd(),
    noEscape: true
  });
  opts.helpers &&
    Object.keys(opts.helpers).map((key) => {
      Handlebars.registerHelper(key, opts.helpers[key]);
    });
    const helpers
};
