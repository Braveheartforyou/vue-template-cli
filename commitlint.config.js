/*
 * @Descripttion: commitlint配置
 * @Author: all
 * @Date: 2020-07-20 09:21:36
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-11 13:59:02
 */

module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['upd', 'feat', 'fix', 'refactor', 'docs', 'chore', 'style', 'revert']
    ],
    'header-max-length': [0, 'always', 72]
  }
};
