const fs = require('fs')

// 处理字符串，把转义符去除
function removeEscapeChar(str) {
  let [arr, newArr] = [str.split('\r'), []] // 将\r去除
  arr.map((item) => {
    newArr.push(item.trim())  // 将\n去除
  })
  return newArr.join('')
}

// 获取文件内容
async function getFileDetail(event, filePath) {
  try {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        console.log(error);
        return
      }
      switch (event) {
        case '-c':
          getFileCharsNum(data)
          return
        case '-w':
          getFileWordsNum(data)
          return
        case '-l':
          getFileLinesNum(data)
          return
        default:
          console.log('无此命令，请重新输入');
      }
    })
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

// 获取文件字符数
function getFileCharsNum(data) {
  const str = removeEscapeChar(data)  // 获得处理掉转义符后的字符串
  console.log(`该文件的字符数为：${str.length}`);
}

// 获取文件行数
function getFileLinesNum(data) {
  let arr = data.split('\r')
  console.log(`该文件的行数为：${arr.length}`);
}

// 获取文件词数
function getFileWordsNum(data) {
  
}

module.exports = getFileDetail