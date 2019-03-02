const path = require('path')
const {
  NodeJsInputFileSystem,
  CachedInputFileSystem,
  ResolverFactory
} = require('enhanced-resolve')

/**
 * @description 将不存在的模块替换成相应模块
 * @param {array} config
 * @param {RegExp} config.target
 * @param {string, 根目录的相对地址} config.replace
 */

class ReplaceModulePlugin {
  constructor (config) {
    this.config = config
    this.chainStart = Promise.resolve()
    this.chain = this.chain.bind(this)
  }
  
  chain (fn, reset) {
    const next = this.chainStart.then(() => new Promise((res) => {
      fn(res)
    }))

    this.chainStart = reset
      ? Promise.resolve()
      : next
    
    return this.chainStart
  }

  apply(compiler) {
    const resolver = ResolverFactory.createResolver({
      fileSystem: new CachedInputFileSystem(new NodeJsInputFileSystem(), 4000),
      ...compiler.options.resolve
    })

    compiler.hooks.normalModuleFactory.tap('ReplaceModulePlugin', (nmf) => {
      nmf.hooks.beforeResolve.tapAsync('ReplaceModulePlugin', (result, cb) => {  
        let { context, request } = result
        
        for (let key in this.config) {
          const { target, replace } = this.config[key]
          if (target.test(request)) {
            this.chain((res) => {
              resolver.resolve({}, context, request, {}, (err, filePath) => {
                if (err) result.request = path.resolve(process.cwd(), replace)
                res()
              })
            })
          }
        }

        this.chain((res) => {
          cb(null, result)
        }, true)
      })
    })
  }
}

module.exports = ReplaceModulePlugin