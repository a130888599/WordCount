#!/usr/bin/env node
const http = require('http')
const url = require('url')
const fs = require('fs')
const c = require('child_process')

const {
  getFileCharsNum,
  getFileLinesNum,
  getFileWordsNum,
  getFileAllNum,
  setFileName
} = require('./function')

const server = http.createServer((req, res) => {
  let url_obj = url.parse(req.url, true);
  //进入路由判断并返回相应文件
  route(url_obj, req, res);
})

server.listen(8081, () => {
  console.log('服务器已开启8081')
  c.exec('start http://localhost:8081/');
})

function route(url_obj, req, res) {
  let pathname = url_obj.pathname;
  switch (pathname) {
    case '/': {
      openHTML(pathname, res)
      return 
    }
    case '/getAllFile': {
      console.log('hhhhhh');
      getAllFileDetail(res)
      return
    }
    default: {
      let data = fs.readFileSync(`./web${req.url}`);
      res.end(data);
      return 
    }
  }
}

// 读取html文件
function openHTML(filmName, res) {
  if (filmName == '/') { //如果是主页
    data = fs.readFileSync(`./web/index.html`, 'utf-8');
  } else {
    data = fs.readFileSync(`./web${filmName}`, 'utf-8'); //异步读取会导致undefined
  }
  res.end(data);
}

// web返回:全部数据
function getAllFileDetail(res) {
  const filesArr = fs.readdirSync('./test')
  let resArr = []
  filesArr.map(item => {
    console.log('item :', item);
    setFileName(item)
    let data = fs.readFileSync(`./test/${item}`, 'utf-8')
    let resValue = {
      fileName: item,
      value: {
        charsNum: getFileCharsNum(data),
        LinesNum: getFileLinesNum(data),
        WordsNum: getFileWordsNum(data),
        AllNum: getFileAllNum(data)
      }
    }
    resArr.push(resValue)
  })
  res.end(JSON.stringify(resArr))
}