/*
 * @Descripttion: 
 * @Author: heidous
 * @Date: 2020-08-05 09:17:02
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-14 17:25:17
 */
const chalk = require('chalk')

/**
 * Evaluate an expression in meta.json in the context of
 * prompt answers data.
 */

module.exports = function evaluate (exp, data) {
  /* eslint-disable no-new-func */
  const fn = new Function('data', 'with (data) { return ' + exp + '}')
  try {
    return fn(data)
  } catch (e) {
    console.error(chalk.red('Error when evaluating filter condition: ' + exp))
  }
}
