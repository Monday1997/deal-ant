'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index.js');
var button = require('./src/button.vue.js');
var withInstall = require('../../utils/with-install.js');

"use strict";
const daButton = withInstall.withInstall(button.default);

exports.daButton = daButton;
exports.default = daButton;
