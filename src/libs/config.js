/*
 * @Descripttion: config.js
 * @Author: asyncnode
 * @Date: 2020-07-20 23:39:15
 * @LastEditors: all
 * @LastEditTime: 2020-07-22 10:23:54
 */
// 用户的根目录
const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
// 配置文件目录
export const RC = `${HOME}/.vuetemplaterc`; // 全局读取
console.log('RC: ', RC);
// export const RC = '../.vuetemplaterc'; // 全局读取

export const Default = {
  registry: 'Braveheartforyou',
  type: 'users'
};
// module.exports = {
//   default: {
//     registry: 'Braveheartforyou',
//     templateName: 'vue-template'
//   },
//   // 全局读取
//   home: `${HOME}/.vuetemplaterc`
// };
