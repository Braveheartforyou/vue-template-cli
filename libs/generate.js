/*
 * @Descripttion: generate.js
 * @Author: heidous
 * @Date: 2020-08-04 14:57:19
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-13 11:21:06
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
const logger = require('./logger');

const filter = (files, filters, data, done) => {
  console.log('done: ', done);
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
  const helpers = { chalk, logger };
  if (opts.metalsmith && typeof opts.metalsmith.before === 'function') {
    opts.metalsmith.before(metalsmith, opts, helpers);
  }
  metalsmith
    .use(askQuestions(opts.prompts))
    .use(filterFiles(opts.filters))
    .use(renderTemplateFiles(opts.skipInterpolation));
  if (typeof opts.metalsmith === 'function') {
    opts.metalsmith(metalsmith, opts, helpers);
  } else if (opts.metalsmith && typeof opts.metalsmith.after === 'function') {
    opts.metalsmith.after(metalsmith, opts, helpers);
  }

  console.log('done: ', done);
  metalsmith
    .clean(false)
    .source('.')
    .destination(dest)
    .build((err, files) => {
      done(err);
      if (typeof opts.complete === 'function') {
        const helpers = { chalk, logger, files };
        opts.complete(data, helpers);
      } else {
        logMessage(opts.completeMessage, data);
      }
    });
  return data;
};

function askQuestions(prompts) {
  return (files, metalsmith, done) => {
    ask(prompts, metalsmith.metadata(), done);
  };
}

function filterFiles(filters) {
  return (files, metalsmith, done) => {
    filter(files, filters, metalsmith.metadata(), done);
  };
}

function renderTemplateFiles(skipInterpolation) {
  skipInterpolation =
    typeof skipInterpolation === 'string'
      ? [skipInterpolation]
      : skipInterpolation;
  return (files, metalsmith, done) => {
    const keys = Object.keys(files);
    const metalsmithMetadata = metalsmith.metadata();
    async.each(
      keys,
      (file, next) => {
        if (
          skipInterpolation &&
          metalsmith([file], skipInterpolation, { dot: true }).length
        ) {
          return next();
        }
        const str = files[file].contents.toString();
        if (!/{{([^{}]*)}}/g.test(str)) {
          return next();
        }
        render(str, metalsmithMetadata, (err, res) => {
          if (err) {
            err.message = `[${file}] ${err.message}`;
            return next(err);
          }
          files[file].contents = new Buffer.alloc(res);
          next();
        });
      },
      done
    );
  };
}

function logMessage(message, data) {
  if (!message) return;
  render(message, data, (err, res) => {
    if (err) {
      console.error(
        '\n   Error when rendering template complete message: ' +
          err.message.trim()
      );
    } else {
      console.log(
        '\n' +
          res
            .split(/\r?\n/g)
            .map((line) => '   ' + line)
            .join('\n')
      );
    }
  });
}
