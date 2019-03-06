const fs = require('fs')
const path = require('path')

const BLACK_LIST = ['router', 'shared', 'store']

const argv = process.argv.slice(2)

const project = argv[1]

if (!project) {
  throw new Error('缺少参数项目名')
}

if (BLACK_LIST.some(name => name === project)) {
  throw new Error('项目名不能使router，shared，store中的任意一个')
}

if (/(^\/.+)|(.+\/$)/i.test(project)) {
  throw new Error('参数的开头和末尾不允许有斜杆')
}

const projectDir = path.join(process.cwd(), 'src', project)
try {
  const stat = fs.lstatSync(projectDir)
  if (!stat.isDirectory()) {
    throw new Error(`找不到目标项目 ${projectDir}`)
  }
} catch {
  throw new Error(`找不到目标项目 ${projectDir}`)
}


// 必须在所有process.env都加载后运行
require('../config/requireHookConf')

// 运行响应脚本
const script = argv[0]
switch (script) {
  case 'build':
    require('./build')
    break

  case 'start':
    require('./start')
    break

  default:
    throw new Error('命令行错误我去')
}
