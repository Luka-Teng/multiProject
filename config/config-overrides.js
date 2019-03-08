const { 
  addLessLoader,
  addDecoratorsLegacy,
  addWebpackAlias
} = require('customize-cra')
const path = require('path')
const ReplaceModulePlugin = require('./webpackPlugins/ReplaceModulePlugin')

/* 删除原来的ForkTsCheckerWebpackPlugin， 引入自定义的 */
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin')
const typescriptFormatter = require('react-dev-utils/typescriptFormatter')

module.exports = function override(config, env) {
  const isEnvProduction = env === 'production'

  config = addLessLoader()(config)
  config = addDecoratorsLegacy()(config)
  config = addWebpackAlias({
    '~': path.resolve('src', process.env['XIAOYA_PROJECT']),
    '@': path.resolve('src')
  })(config)

  config.plugins.unshift(new ReplaceModulePlugin([{
    target: /\/store$/,
    replace: 'src/store.temp.js'
  }]))

  config.plugins.push(new ForkTsCheckerWebpackPlugin({
    typescript: require.resolve('typescript'),
    compilerOptions: {
      paths: {
        '@/*': ['src/*'],
        '~/*': [`${process.env['XIAOYA_PROJECT']}/*`]
      }
    },
    async: !isEnvProduction,
    useTypescriptIncrementalApi: true,
    checkSyntacticErrors: true,
    reportFiles: [
      '**',
      '!**/*.json',
      '!**/__tests__/**',
      '!**/?(*.)(spec|test).*',
      '!**/src/setupProxy.*',
      '!**/src/setupTests.*',
    ],
    watch: path.resolve('src'),
    silent: true,
    // The formatter is invoked directly in WebpackDevServerUtils during development
    formatter: isEnvProduction ? typescriptFormatter : undefined,
  }))
  console.log(config)
  return config
}