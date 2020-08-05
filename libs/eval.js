/*
 * @Descripttion: eval.js
 * @Author: heidous
 * @Date: 2020-08-05 09:17:02
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-05 09:19:47
 */
const chalk = require('chalk');

module.exports = function evaluate(exp, data) {
  const fn = new Function('data', 'with (data) { return' + exp + '}');
  try {
    return fn(data);
  } catch (e) {
    console.error(chalk.red('Error when evaluating filter conition: ' + exp));
  }
};
