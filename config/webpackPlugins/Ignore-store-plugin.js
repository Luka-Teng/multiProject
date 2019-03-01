const fs = require('fs')
const path = require('path')

class IgonreStore {
  apply(compiler) {
    const alias = (compiler.options.resolve && compiler.options.resolve.alias) || {}

    compiler.hooks.normalModuleFactory.tap('nmf', (nmf) => {
      nmf.hooks.beforeResolve.tap("bs", (result) => {  
        let { context, request } = result
        const tempStore = path.resolve(process.cwd(), 'src/store.temp.js')

        for (let key in alias) {
          const reg = new RegExp(key, 'g')
          request = request.replace(reg, alias[key])
        }

        let filePath = path.resolve(context, request)
        if (/\/store/.test(request) && !fs.existsSync(filePath)) {
          result.request = tempStore
        }
        return result
      })
    })
  }
}

module.exports = IgonreStore