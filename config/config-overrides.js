const { 
  addLessLoader,
  addDecoratorsLegacy,
  addWebpackAlias
} = require('customize-cra')
const path = require('path')
const ReplaceModulePlugin = require('./webpackPlugins/ReplaceModulePlugin')

module.exports = function override(config, env) {
  config = addLessLoader()(config)
  config = addDecoratorsLegacy()(config)
  config = addWebpackAlias({
    '@': path.resolve('src', process.env['XIAOYA_PROJECT']),
    '~': path.resolve('src')
  })(config)

  config.plugins.unshift(new ReplaceModulePlugin([{
    target: /\/store$/,
    replace: 'src/store.temp.js'
  }]))

  return config
}