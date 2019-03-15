const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const questions = require('./questions')
const template = require('./template')

/**
 * @prop {string} files[number].path
 * @prop {string} files[number].data
 */
const createFiles = (files) => {
  files.forEach((file) => {
    if (!file.data) {
      fs.ensureDirSync(file.path)
      return
    }
    fs.outputFileSync(file.path, file.data)
  })
}

const argv = process.argv.slice(2)
const projectName = argv[0]

if (!projectName) {
  throw new Error(`请输入项目名`)
}

const resolveProject = (_path = '') => {
  return path.resolve(process.cwd(), 'src', projectName, _path)
}

if (fs.existsSync(resolveProject())) {
  throw new Error(`已存在该项目`)
}

inquirer.prompt(questions).then(answer => {
  const files = []
  const isTs = answer.language === 'typescript'
  const routeIndex = `routes/index.${isTs ? 'tsx' : 'js'}`
  const pageHomeIndex = `page/home/index.${isTs ? 'tsx' : 'js'}`
  const storeIndex = `store/index.${isTs ? 'ts' : 'js'}`
  const indexHtml = `index.html`

  files.push({
    path: resolveProject(routeIndex),
    data: template[routeIndex]
  })

  files.push({
    path: resolveProject(pageHomeIndex),
    data: template[pageHomeIndex]
  })

  if (answer.store) {
    files.push({
      path: resolveProject(storeIndex),
      data: template[storeIndex]
    })
  }

  if (answer.customHtml) {
    files.push({
      path: resolveProject(indexHtml),
      data: template[indexHtml](projectName)
    })
  }

  createFiles(files)
})