const { addHook } = require('pirates')
const { parse, getAstNode, walkProgram, generate, walk, isModuleExports } = require('./utils')
const { projectName } = require('./const')

/* 只需要对 react-scripts-ts/config/path 和 react-scripts-ts/config/env 进行拦截 */
const options = {
  ignoreNodeModules: false
}

/**
 * 对模块的解析，遍历，修改
 */
addHook((code, filename) => {
  if (filename.includes('react-scripts/config/paths.js')) {
    const ast = parse(code)

    walk.ancestor(ast, {
      Property: (node, ancestors) => {
        /* 获取最近的AssiginExpression */
        const ancestor = ancestors[ancestors.length - 3]

        if (node.key.type === 'Identifier' && isModuleExports(ancestor)) {
          /* 修改paths.js的appBuild属性，使其构建在build/projectName下 */
          if (node.key.name === 'appBuild') {
            node.value = getAstNode(`resolveApp(\`build/\${process.env['${projectName}_PROJECT']}\`)`)
          }

          /* 修改paths.js的appHtml属性，使其有自定义HTML能力 */
          if (node.key.name === 'appHtml') {
            node.value = getAstNode(`
              (() => {
                const projectHtml = resolveApp(path.join('src', process.env['${projectName}_PROJECT'] || '', 'index.html'))
                if (fs.existsSync(projectHtml)) {
                  return projectHtml
                }
                return resolveApp('public/index.html')
              })()
            `)
          }
        }
      }
    })

    code = generate(ast)
  }

  if (filename.includes('react-scripts/config/env.js')) {
    /* 修改env.js，替换环境变量过滤REACT_APP_为XIAOYA_ */
    const ast = parse(code)

    walkProgram(ast, {
      VariableDeclaration: (node) => {
        node.declarations.some((declarator) => {
          if (declarator.id.type === 'Identifier' && declarator.id.name === 'REACT_APP') {
            declarator.init = getAstNode(`/^${projectName}_/i`)
            return true
          }
          return false
        })
      }
    })

    code = generate(ast)
  }

  if (filename.includes('react-scripts/scripts/utils/verifyTypeScriptSetup.js')) {
    /* 禁止CRA对项目做TS预检测 */
    code = `module.exports = () => {}`
  }

  return code
}, options)
