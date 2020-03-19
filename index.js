#!/usr/bin/env node

const fileDetail = require('./fileDetail')
const fs = require('fs')
console.log(fileDetail);
const parameters = {
  char: '-c',
  word: '-w',
  line: '-l',
  all: '-a',
  space: '-s',
  web: '-x',
}

const argvs = process.argv.slice(2) // 命令行中输入的参数
const params = argvs.filter(item => item.includes('-')) || [] // 获取所有命令
const [fileName = 'file.c'] = argvs.filter(item => item.includes('.')) || '' // 获取文件名

// 判断参数中是否有-s
function includeS(params) {
  for (let param of params) {
    if (param == '-s') 
      return true
    return false
  }
}
// 判断是不是全选文件
function isSearchAllFiles(fileName) {
  // 如果选择的是全部文件
  if (fileName.includes('*')) {
    const fileType = fileName.substr(fileName.indexOf('.'))
    const files = fs.readdirSync('./test')
    return files.filter(item => item.includes(fileType))
  } else {
    return [fileName]
  }
}

const isIncludeS = includeS(params)
newParams = params.filter(item => item != '-s')
const fileArr = isIncludeS ? fs.readdirSync('./test') : isSearchAllFiles(fileName)

// 遍历每一个符合要求的文件，分别传入参数
fileArr.map((file) => {
  let filePath = `${__dirname}/test/${file}`
  newParams.map(async (item) => {
    await fileDetail(item, filePath, file)
  })
})