/*
 * @Descripttion: 进口文件
 * @Author: asyncnode
 * @Date: 2020-07-20 23:22:07
 * @LastEditors: asyncnode
 * @LastEditTime: 2020-07-21 00:02:39
 */

const program = require('commander');
const config = require('./libs/config');
const userHome = require('user-home');
const apply = require('./index');
const chalk = require('chalk');
const symbol = require('log-symbol');

/**
 * action Map 命令行配置
 */

let actionMap = {
  init: {
    descripttion: 'generate a new project from a template',
    usages: [
      'vueTemplate init templateName projectName'
    ]
  }
}