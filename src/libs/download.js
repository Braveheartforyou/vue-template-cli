/*
 * @Descripttion: download.config.js 下载远程库
 * @Author: all
 * @Date: 2020-07-22 00:01:19
 * @LastEditors: all
 * @LastEditTime: 2020-07-22 11:16:06
 */

import { getAll } from './rc';
var downloadGit = require('download-git-repo');

export const downloadLocal = async (templateName, projectName) => {
  console.log('templateName, projectName: ', templateName, projectName);
  let config = await getAll();
  console.log('config: ', config);
  let api = `github:${config.registry}/${templateName}#vue-template-sap`;
  console.log('api:', api);
  return new Promise((resolve, reject) => {
    downloadGit(api, projectName, (err) => {
      console.log('err: ', err);
      if (err) {
        console.log('err: ', err);
        reject(err);
      }
      resolve();
    });
  }).catch((err) => {
    console.log(err);
  });
};
