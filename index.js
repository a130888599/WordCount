#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')
const fileDetail = require('./fileDetail')


// fileDetail('./test/test1.txt', '-c')

const argv = process.argv.slice(2)   // 命令行中输入的参数，暂未实现乱序输入

const [cmd = '-c', fileName = 'testChar.txt'] = argv  // 命令行输入的参数，第一个是选择输出的方式，第二个是文件名

let filePath = `${__dirname}/test/${fileName}`

fileDetail(cmd, filePath)