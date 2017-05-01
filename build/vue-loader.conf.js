var utils = require('./utils');
var config = require('../config');

var isProduction = process.env.NODE_ENV === 'production';
var cssLoaders = utils.cssLoaders({
  sourceMap: isProduction ? config.build.productionSourceMap : config.dev.cssSourceMap,
  extract: isProduction,
});
var i18nLoader = {
  i18n: '@kazupon/vue-i18n-loader',
};
var i18nPreLoader = {
  i18n: 'yaml-loader',
};

module.exports = {
  preLoaders: Object.assign({}, i18nPreLoader),
  loaders:  Object.assign({}, cssLoaders, i18nLoader),
};
