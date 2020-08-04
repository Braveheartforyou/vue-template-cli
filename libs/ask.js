/*
 * @Descripttion: inquire 实现
 * @Author: heidous
 * @Date: 2020-08-04 16:18:15
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-04 18:04:50
 */

const async = require('async');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { down } = require('inquirer/lib/utils/readline');

function evaluate(exp, data) {
  const fn = new Function('data', 'with (data) { return' + exp + '}');
  try {
    return fn(data);
  } catch (e) {
    console.error(chalk.red('Error when evaluating filter conition: ' + exp));
  }
}

const promptMapping = {
  string: 'input',
  boolean: 'confirm'
};

module.exports = function ask(prompts, data, done) {
  async.eachSeries(
    Object.keys(prompts),
    (key, next) => {
      prompt(data, key, prompts[key], next);
    },
    done
  );
};

function prompt(data, key, prompt, done) {
  if (prompt.when && !evaluate(prompt.when, data)) {
    return done();
  }

  let promptDefault = prompt.default;
  if (typeof prompt.default === 'function') {
    promptDefault = function() {
      return prompt.default.bind(this)(data);
    };
  }

  inquirer.prompt([
    {
      type: promptMapping[prompt.type] || prompt.type,
      name: key,
      message: prompt.message || prompt.label || key,
      default: promptDefault,
      choices: prompt.choices || [],
      validate: prompt
    }
  ]);
}
