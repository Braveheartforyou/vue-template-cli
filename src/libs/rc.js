/*
 * @Descripttion: 本地文件操作 config 增删改查
 * @Author: all
 * @Date: 2020-07-21 18:00:48
 * @LastEditors: all
 * @LastEditTime: 2020-07-22 00:00:50
 */

import { decode, encode } from 'ini';
import { promisify } from 'util';
import chalk from 'chalk';
import fs from 'fs';
const config = require('./config');

const exist = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);


export const getAll = async () => {
  const exit = await exist(config.home);
  let opts;
  if (exit) {
    opts = await readFile(config.home, 'utf-8');
    opts = decode(opts);
    return opts[key];
  }
  return '';
}

