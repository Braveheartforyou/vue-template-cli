/*
 * @Descripttion: localpath
 * @Author: heidous
 * @Date: 2020-08-03 13:53:26
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-03 13:58:20
 */
const path = require('path');

module.exports = {
  isLocalPath(templatePath) {
    return /^[./]|(^[a-zA-Z]:)/.test(templatePath);
  },
  getTemplatePath(templatePath) {
    return path.isAbsolute(templatePath)
      ? templatePath
      : path.normalize(path.join(process.cwd(), templatePath));
  }
};
