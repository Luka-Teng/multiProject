module.exports = [{
  type: 'list',
  name: 'language',
  message: '请选择需要开发的语言',
  choices: ['javascript', 'typescript']
}, {
  type: 'confirm',
  name: 'customHtml',
  message: '是否要自定义HTML'
}, {
  type: 'confirm',
  name: 'store',
  message: '是否需要自定义的store (mobx)'
}]