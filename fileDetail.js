const fs = require('fs')

// 处理字符串，把转义符去除，返回每行的数据
function removeEscapeChar(str) {
  let [arr, newArr] = [str.split('\r'), []] // 将\r去除
  arr.map((item) => {
    newArr.push(item.trim())  // 将\n去除
  })
  return newArr
}

// 获取文件内容
async function getFileDetail(parameters, filePath) {
  try {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        console.log(error);
        return
      }
      switch (parameters) {
        case '-c':
          getFileCharsNum(data)
          return
        case '-w':
          getFileWordsNum(data)
          return
        case '-l':
          getFileLinesNum(data)
          return
        case '-a': 
          getFileAllNum(data)
          return
        default:
          console.log('无此命令，请重新输入');
      }
    })
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

// -c
function getFileCharsNum(data) {
  const str = removeEscapeChar(data).join('')  // 获得处理掉转义符后的字符串
  console.log(`该文件的字符数为：${str.length}`);
}

// -l
function getFileLinesNum(data) {
  const arr = removeEscapeChar(data)
  console.log(arr);
  console.log(`该文件的行数为：${arr.length}`);
}

// -w
function getFileWordsNum(data) {
  const arr = removeEscapeChar(data)  // 获取处理掉转义符后的数组，每个元素代表一行
  let res = 0;
  arr.map((item) => { // 通过空格判断单词
    console.log(item);
    let isSpace = true
    for (let i = 0; i < item.length; i++) {
      if (item[i] == ' ')
        isSpace = true
      else {
        if (isSpace)
          res++
        isSpace = false
      }
    }
  })
  console.log(res);
}

// -a
function getFileAllNum(data) {
  let [spaceLines, commentLines, codeLines] = [0, 0, 0]
  const arr = removeEscapeChar(data)
  arr.map((item) => {
    if (isNullLine(item))
      spaceLines++
    else if (isCommentLine(item))
      commentLines++
    else
      codeLines++
  })
  console.log(`该文件的空行数为：${spaceLines}`);
  console.log(`该文件的注释行数为：${commentLines}`);
  console.log(`该文件的代码行数为：${codeLines}`);
}

// 判断是否为空行
function isNullLine(str) {
  if (str == '')
    return true
  return false
}

// 判断是否为代码行，只能判断//，不能判断/**/，/** */和某些编程语言的特定语法
function isCommentLine(str) {
  if (str.includes('//'))  // 未找到
    return false
  return true
}

module.exports = getFileDetail