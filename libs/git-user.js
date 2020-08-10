/*
 * @Descripttion: get local git config
 * @Author: heidous
 * @Date: 2020-08-03 16:52:07
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-10 22:28:19
 */
const exec = require('child_process').execSync;

module.exports = () => {
  let name;
  let email;

  try {
    name = exec('git config --get user.name');
    email = exec('git config --get user.email');
  } catch (e) {}

  name = name && JSON.stringify(name.toString().trim()).slice(1, -1);
  email = email && ' <' + email.toString().trim() + '>';
  return (name || '') + (email || '');
};
