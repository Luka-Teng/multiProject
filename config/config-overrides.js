const { 
  addLessLoader,
  addDecoratorsLegacy,
  addWebpackAlias
} = require('customize-cra')
const path = require('path')
const ReplaceModulePlugin = require('./webpackPlugins/ReplaceModulePlugin')

/* 修改原来的ForkTsCheckerWebpackPlugin， 引入自定义的 */
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin')

const findPlugins = (plugins, constructor) => {
  return plugins.findIndex(plugin => plugin instanceof constructor)
}

module.exports = function override(config, env) {

  config = addLessLoader()(config)
  config = addDecoratorsLegacy()(config)
  config = addWebpackAlias({
    '~': path.resolve('src', process.env['XIAOYA_PROJECT']),
    '@': path.resolve('src')
  })(config)

  config.plugins.unshift(new ReplaceModulePlugin([{
    target: /\/store$/,
    replace: 'src/template/store.temp.js'
  }]))

  const tsIndex = findPlugins(config.plugins, ForkTsCheckerWebpackPlugin)
  if (tsIndex >= 0) {
    config.plugins[tsIndex].compilerOptions = {
      paths: {
        '@/*': ['src/*'],
        '~/*': [`src/${process.env['XIAOYA_PROJECT']}/*`]
      }
    }
  }

  return config
}