'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

require('bluebird');

require('isomorphic-fetch');

var _Review = require('./Review');

var _Review2 = _interopRequireDefault(_Review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Review2.default;