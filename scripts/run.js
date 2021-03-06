const fs = require('fs')
const path = require('path')
const packageJson = require('../package.json')

const BLACK_LIST = ['router', 'shared', 'store', 'declare', 'template']

const argv = process.argv.slice(2)
const project = argv[1]
const script = argv[0]

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

process.env['XIAOYA_PROJECT'] = project
process.env['PUBLIC_URL'] = path.join(packageJson.homepage || '', project)

/**
 * 必须在所有process.env都加载后运行
 * hook不能改变子进程的模块编译，因此不能spawn新进程
 * 需要手动赋值argv
 */
require('../config/requireHookConf')

/* 运行响应脚本 */
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
