const fs = require('fs')
const path = require('path')

const BLACK_LIST = ['router', 'shared', 'store']

const project = process.argv[2]
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
fs.stat(projectDir,(err, stats) => {
  if (err || !stats.isDirectory()) {
    throw new Error('找不到目标项目')
  }
})

const result = {}
result.project = project

module.exports = result
