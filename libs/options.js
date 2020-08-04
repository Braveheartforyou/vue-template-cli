/*
 * @Descripttion:
 * @Author: heidous
 * @Date: 2020-08-04 15:10:34
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-04 16:00:11
 */

const path = require('path');
const metadata = require('read-metadata');
const exists = require('fs').existsSync;
const getGitUser = require('./git-user');
const validateName = require('validate-npm-package-name');

/**
 * Gets the metadata meta.json or mets.js file 读取模板项目中的 meta.js/meta.json
 * @param {String} dir
 * @return {Object}
 */
function getMetadata(dir) {
  const json = path.join(dir, 'meta.json');
  const js = path.join(dir, 'meta.js');
  let opts = {};
  if (exists(json)) {
    opts = metadata.sync(json);
  } else if (exists(js)) {
    const req = require(path.resolve(js));
    if (req !== Object(req)) {
      throw new Error('meta.js needs to expose an object');
    }
    opts = req;
  }
  return opts;
}
/**
 * 设置默认配置项
 * @param {Object} opts 配置项
 * @param {String} key
 * @param {String} val
 */
function setDefault(opts, key, val) {
  if (opts.schema) {
    opts.prompts = opts.schema;
    delete opts.schema;
  }
  const prompts = opts.prompts || (opts.prompts = {});
  if (!prompts[key] || typeof prompts[key] !== 'object') {
    prompts[key] = {
      type: 'string',
      default: val
    };
  } else {
    prompts[key]['default'] = val;
  }
}

function setValidateName(opts) {
  const name = opts.prompts.name;
  const customVaildate = name.validate;
  name.validate = (name) => {
    const its = validateName(name);
    if (!its.validForNewPackages) {
      const errors = (its.errors || []).concat(its.warnings || []);
      return 'Sorry,' + errors.join(' and') + '.';
    }
    if (typeof customVaildate === 'function') {
      return customVaildate(name);
    }
    return true;
  };
}

module.exports = function options(name, dir) {
  const opts = getMetadata(dir);
  setDefault(opts, 'name', name);
  setValidateName(opts);

  const author = getGitUser();
  if (author) {
    setDefault(opts, 'author', author);
  }
  return opts;
};
