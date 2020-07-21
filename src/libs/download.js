/*
 * @Descripttion: download.config.js 下载远程库
 * @Author: all
 * @Date: 2020-07-22 00:01:19
 * @LastEditors: all
 * @LastEditTime: 2020-07-22 00:06:11
 */

import { getAll } from './rc';
import downloadGit from 'download-git-repo';

export const downlodaLocal = async (projectName) => {
  let config = await getAll();
  let repoSite = `${config.registry}/${config.templateName}`;
  console.log('仓库地址、项目名', repoSite, projectName);
  return new Promise((resolve, reject) => {
    downloadGit(repoSite, projectName, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};
