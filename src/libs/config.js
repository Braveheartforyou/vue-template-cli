/*
 * @Descripttion: config.js
 * @Author: asyncnode
 * @Date: 2020-07-20 23:39:15
 * @LastEditors: all
 * @LastEditTime: 2020-07-21 18:08:19
 */
// 用户的根目录
const home = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
module.exports = {
  default: {
    registry: 'Braveheartforyou',
    templateName: 'vue-template'
  },
  // 全局读取
  home: `${home}/.vuetemplaterc`
};
