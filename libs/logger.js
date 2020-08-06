/*
 * @Descripttion: logger.js
 * @Author: heidous
 * @Date: 2020-08-06 09:05:44
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-06 17:59:23
 */
const chalk = require('chalk');
const format = require('util').format;
const prefix = '   vuetemplate-cli';
const sep = chalk.gray('.');

exports.log = function(...args) {
  const msg = format.apply(format, args);
  console.log(chalk.white(prefix), sep, msg);
};

exports.fatal = function(...args) {
  if (args[0] instanceof Error) {
    args[0] = args[0].message.trim();
  }
  const msg = format.apply(format, args);
  console.error(chalk.red(prefix), sep, msg);
};

exports.success = function(...args) {
  const msg = format.apply(format, args);
  console.log(chalk.white(prefix), sep, msg);
};
