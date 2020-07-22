/*
 * @Descripttion: 设置本地cofig
 * @Author: all
 * @Date: 2020-07-22 10:20:51
 * @LastEditors: all
 * @LastEditTime: 2020-07-22 10:22:55
 */
import { get, set, getAll, remove } from './libs/rc';

let config = async (action, key, value) => {
  switch (action) {
    case 'get':
      if (key) {
        let result = await get(key);
        console.log(result);
      } else {
        let obj = await getAll();
        Object.keys(obj).forEach((key) => {
          console.log(`${key}=${obj[key]}`);
        });
      }
      break;
    case 'set':
      set(key, value);
      break;
    case 'remove':
      remove(key);
      break;
    default:
      break;
  }
};

module.exports = config;
