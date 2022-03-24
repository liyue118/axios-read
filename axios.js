'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

// 入口
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // 继承原型
  utils.extend(instance, Axios.prototype, context);

  utils.extend(instance, context);

  // 创建单独的实例 隔离作用域
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

var axios = createInstance(defaults);

axios.Axios = Axios;

// 取消请求
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');
axios.VERSION = require('./env/data').version;

axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

axios.isAxiosError = require('./helpers/isAxiosError');

module.exports = axios;

module.exports.default = axios;
