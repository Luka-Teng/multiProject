const { Parser } = require('acorn')
const stage3 = require('acorn-stage3')
const { generate } = require('astring')
const walk = require('acorn-walk')

/* 解析整段代码 */
const parser = Parser.extend(stage3).parse.bind(Parser)
const parse = (sourceCode) => parser(sourceCode, {
  locations: true,
  ecmaVersion: 2017
})

/* 获取单个node，如果是expressStatement则获取内部expression */
const getAstNode = (sourceCode) => {
  try {
    const rootNode = parse(sourceCode)
    if (rootNode.type !== 'Program') {
      return rootNode
    }

    if (rootNode.body.length > 1) {
      return rootNode.body
    }

    return rootNode.body[0].type === 'ExpressionStatement'
      ? rootNode.body[0].expression
      : rootNode.body[0]
  } catch (e) {
    throw new Error('ast 语法错误')
  }
}

// 在最外层进行遍历
const walkProgram = (node, visitors) => {
  if (node.type === 'Program') {
    walk.base.Program(node, null, (childNode) => {
      const type = childNode.type
      const visitor = visitors[type]
      if (visitor) visitor(childNode)
    })
  }
}

const isModuleExports = (node) => {
  return node
    && node.type === 'AssignmentExpression'
    && node.left.type === 'MemberExpression'
    && node.left.object.name === 'module'
    && node.left.property.name === 'exports'
}

module.exports = {
  parse,
  getAstNode,
  walk,
  generate,
  walkProgram,
  isModuleExports
}