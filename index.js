#!/usr/bin/env node

const fileDetail = require('./fileDetail')


const parameters = {
  char: '-c',
  word: '-w',
  line: '-l',
  all: '-a',
  space: '-s',
  web: '-x',
}

// fileDetail('./test/test1.txt', '-c')

const argv = process.argv.slice(2)   // 命令行中输入的参数，暂未实现乱序输入

const [parameter = '-c', fileName = 'testChar.txt'] = argv // 命令行输入的参数，第一个是parameter，第二个是fileName

let filePath = `${__dirname}/test/${fileName}`

fileDetail(parameter, filePath)
