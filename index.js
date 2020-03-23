#!/usr/bin/env node

const fileDetail = require('./fileDetail')
const fs = require('fs')
const c = require('child_process')

const argvs = process.argv.slice(2) // 命令行中输入的参数
const params = argvs.filter(item => item.includes('-')) || [] // 获取命令
const [fileName = 'file.c'] = argvs.filter(item => item.includes('.')) || '' // 获取文件名

// 判断参数中是否有-s
function includeS(params) {
  for (let param of params) {
    if (param == '-s') 
      return true
    return false
  }
}

// 判断参数中是否有-x，有则打开server.js
function isGUI(params) {
  for (let param of params) {
    if (param == '-x') {
      c.fork(__dirname + '/server.js')
      console.log(__dirname + '/server.js');
    }
  }
}
isGUI(params)

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