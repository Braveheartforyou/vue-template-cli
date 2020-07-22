/*
 * @Descripttion: 本地文件操作 config 增删改查
 * @Author: all
 * @Date: 2020-07-21 18:00:48
 * @LastEditors: all
 * @LastEditTime: 2020-07-22 11:14:03
 */

import { decode, encode } from 'ini';
import { promisify } from 'util';
import chalk from 'chalk';
import fs from 'fs';
import { RC, Default } from './config';

const exits = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

//RC 是配置文件
//Default 是默认的配置
export const get = async (key) => {
  const exit = await exits(RC);
  let opts;
  if (exit) {
    opts = await readFile(RC, 'utf8');
    opts = decode(opts);
    return opts[key];
  }
  return '';
};

export const getAll = async () => {
  const exit = await exits(RC);
  let opts;
  if (exit) {
    opts = await readFile(RC, 'utf8');
    opts = decode(opts);
    return opts;
  }
  return {}.registry;
};

export const set = async (key, value) => {
  const exit = await exits(RC);
  let opts;
  let newOption = {};
  if (key && value) {
    newOption = {
      [key]: value
    };
  }

  if (exit) {
    opts = await readFile(RC, 'utf8');
    opts = decode(opts);
    if (!key) {
      console.log(
        chalk.red(chalk.bold('Error:')),
        chalk.red('key is required')
      );
      return;
    }
    if (!value) {
      console.log(
        chalk.red(chalk.bold('Error:')),
        chalk.red('value is required')
      );
      return;
    }
    opts = Object.assign(opts, newOption);
  } else {
    opts = Object.assign(Default, newOption);
  }
  // npm install 之后会执行 package的 postinstall的：config set
  // 写文件 没有文件会创建文件
  await writeFile(RC, encode(opts), 'utf8');
};

export const remove = async (key) => {
  const exit = await exits(RC);
  let opts;
  if (exit) {
    opts = await readFile(RC, 'utf8');
    opts = decode(opts);
    delete opts[key];
    await writeFile(RC, encode(opts), 'utf8');
  }
};
