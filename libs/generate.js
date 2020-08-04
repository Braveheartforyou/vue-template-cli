/*
 * @Descripttion: generate.js
 * @Author: heidous
 * @Date: 2020-08-04 14:57:19
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-04 16:06:06
 */

const chalk = require('chalk');
const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');
const async = require('async');
const render = require('consolidate').handlebars.render;
const path = require('path');
const multimatch = require('multimatch');
const getOptions = require('./options');
