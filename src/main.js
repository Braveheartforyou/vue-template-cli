/*
 * @Descripttion: 进口文件
 * @Author: asyncnode
 * @Date: 2020-07-20 23:22:07
 * @LastEditors: all
 * @LastEditTime: 2020-07-21 17:40:31
 */

import apply from './index';
const program = require('commander');
const config = require('./libs/config');
const userHome = require('user-home');
const chalk = require('chalk');
const symbol = require('log-symbols');
const version = require('../package.json');

/**
 * action Map 命令行配置
 */

let actionMap = {
  init: {
    descripttion: 'generate a new project from a template',
    usages: ['vueTemplate init templateName projectName']
  },
  config: {
    alias: 'cfg',
    descripttion: '配置 .vuesrc',
    useages: [
      'vuetemplate config set <k> <v>',
      'vuetemplate config get <k>',
      'vuetemplate config remove <k>'
    ]
  }
};
program
  .command('clone <source> [destination]')
  .description('clone a repository into a newly created directory')
  .action((source, destination) => {
    console.log('clone command called');
  });
for (let actionkey in actionMap) {
  let programParams = process.argv.slice(3); // 命令行参数数组
  program
    .command(actionkey)
    .description(actionMap[actionkey].description)
    .alias(actionMap[actionkey].alias) // 命令别名
    .action(() => {
      // 执行命令的回调
      switch (actionkey) {
        case 'config':
          //配置
          apply(config, ...programParams);
          break;
        case 'init':
          !programParams[0]
            ? console.log(
                symbol.error,
                chalk.red('需要一个输入模板命名成 && 项目名称')
              )
            : !programParams[1]
            ? console.log(symbol.error, chalk.red('项目名称'))
            : apply(config, ...programParams);
          // programParams[0]
          // if (programParams[0]) {
          //   apply(config, ...programParams);
          // } else {
          //   console.log(symbol.error, chalk.red('项目名是必须的！'));
          // }
          break;
        default:
          break;
      }
    });
}

// console.log('Object.keys(actionMap): ', Object.keys(actionMap));
function help() {
  console.log('\r\nUsage:');
  for (let actionkey in actionMap) {
    let len = actionMap[actionkey].usages
      ? actionMap[actionkey].usages.length
      : 0;
    let usages = actionMap[actionkey].usages ? actionMap[actionkey].usages : [];
    for (let index = 0; index < len; index++) {
      console.log('  - ' + usages[index]);
    }
  }
  console.log('\r');
}

program.usage('<command> [options]');
program.on('-h', help);
program.on('--help', help);
program.version(version, '-V --version').parse(process.argv);

function make_green(txt) {
  return chalk.green(txt);
}

if (!process.argv.slice(2).length) {
  program.outputHelp(make_green);
}
