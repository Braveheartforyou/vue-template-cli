/*
 * @Descripttion: commitlint配置
 * @Author: all
 * @Date: 2020-07-20 09:21:36
 * @LastEditors: all
 * @LastEditTime: 2020-07-20 09:26:56
 */ 

 module.exports = {
   extends: ['@commitlint/config-angular'],
   rules: {
     'type-enum': [2, 'always', [
       'upd',
       'feat',
       'fix',
       'refactor',
       'docs',
       'chore',
       'style',
       'revert'
     ]],
     'header-max-length': [0, 'always', 72]
   }
 }