const { addHook } = require('pirates')

/* 只需要对 react-scripts-ts/config/path 和 react-scripts-ts/config/env 进行拦截 */
const options = {
  matcher: /react-scripts\/config\/(paths | env)\.js$/,
  ignoreNodeModules: false
}

/**
 * TODOLIST
 * 对模块的解析，遍历，返回后续改用AST
 */
addHook((code, filename) => {
  if (filename.includes('react-scripts/config/paths.js')) {
    /* 修改paths.js的appBuild属性，使其构建在build/projectName下 */
    const regForAppBuild = /appBuild: resolveApp\('build'\)/g
    const replaceForAppBuild = `appBuild: resolveApp(\`build/\${process.env['XIAOYA_PROJECT']}\`)`

    /* 修改paths.js的index.html入口 */
    const regForAppHtml = /appHtml: resolveApp\('public\/index.html'\)/g
    const replaceForAppHtml = `appHtml: (() => {
        const projectHtml = resolveApp(path.join('src', process.env['XIAOYA_PROJECT'] || '', 'index.html'))
        if (fs.existsSync(projectHtml)) {
          return projectHtml
        }
        return resolveApp('public/index.html')
      })()`
      
    code = code.replace(regForAppBuild, replaceForAppBuild)
    code = code.replace(regForAppHtml, replaceForAppHtml)
  }

  if (filename.includes('react-scripts/config/env.js')) {
    /* 修改env.js，替换环境变量过滤REACT_APP_为XIAOYA_ */
    const reg = /REACT_APP/g
    const replace = `XIAOYA`
    code = code.replace(reg, replace)
  }

  return code
}, options)
