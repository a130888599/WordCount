let fileName = 'aaa'

// -c
function getFileCharsNum(data) {
  const str = removeEscapeChar(data).join('') // 获得处理掉转义符后的字符串
  console.log(`${fileName} 的字符数为：${str.length}`);
  return {
    res: str.length
  }
}

// -l
function getFileLinesNum(data) {
  const arr = removeEscapeChar(data)
  // console.log(arr);
  console.log(`${fileName} 的行数为：${arr.length}`);
  return {
    res: arr.length
  }
}

// -w
function getFileWordsNum(data) {
  const arr = removeEscapeChar(data) // 获取处理掉转义符后的数组，每个元素代表一行
  let res = 0;
  arr.map((item) => { // 通过空格判断单词
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
  console.log(`${fileName} 的单词数为：${res}`);
  return {
    res
  }
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
  console.log(`${fileName} 的空行数为：${spaceLines}`);
  console.log(`${fileName} 的注释行数为：${commentLines}`);
  console.log(`${fileName} 的代码行数为：${codeLines}`);
  return {
    res: {
      spaceLines: spaceLines,
      commentLines: commentLines,
      codeLines: codeLines
    }
  }
}

// 判断是否为空行
function isNullLine(str) {
  if (str == '')
    return true
  return false
}

// 处理字符串，把转义符去除，返回每行的数据
function removeEscapeChar(str) {
  let [arr, newArr] = [str.split('\r'), []] // 将\r去除
  arr.map((item) => {
    newArr.push(item.trim()) // 将\n去除
  })
  return newArr
}

// 判断是否为代码行，只能判断//，不能判断/**/，/** */和某些编程语言的特定语法
function isCommentLine(str) {
  if (str.includes('//')) // 未找到
    return true
  return false
}

// 设置文件名
function setFileName(name) {
  fileName = name
}

module.exports = {
  getFileCharsNum,
  getFileLinesNum,
  getFileWordsNum,
  getFileAllNum,
  setFileName
}