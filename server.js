const http = require('http')
const url = require('url')
const fs = require('fs')
const c = require('child_process')
const path = require('path')
const { getAllFileDetail } = require('./fileDetail')

const server = http.createServer((req, res) => {
  let url_obj = url.parse(req.url, true);
  //进入路由判断并返回相应文件
  route(url_obj, req, res);
})

server.listen(8080, () => {
  console.log('服务器已开启8080')
  c.exec('start http://localhost:8080/');
})


function route(url_obj, req, res) {
  let pathname = url_obj.pathname;
  switch (pathname) {
    case '/': {
      openHTML(pathname, res)
      return 
    }
    case '/getAllFile': {
      getAllFileDetail(res)
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