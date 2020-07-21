/*
 * @Descripttion: index.js
 * @Author: asyncnode
 * @Date: 2020-07-20 23:55:11
 * @LastEditors: all
 * @LastEditTime: 2020-07-22 00:18:19
 */

let apply = (action, ...args) => {
  require(`./${action}`)(...args);
};

export default apply;
