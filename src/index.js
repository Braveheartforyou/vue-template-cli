/*
 * @Descripttion: index.js
 * @Author: asyncnode
 * @Date: 2020-07-20 23:55:11
 * @LastEditors: asyncnode
 * @LastEditTime: 2020-07-20 23:59:53
 */ 

 let apply = (action, ...args) => {
   require(`./${action}`)(...args);
 }

export default apply;