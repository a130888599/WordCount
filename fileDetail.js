const {
  getFileCharsNum,
  getFileLinesNum,
  getFileWordsNum,
  getFileAllNum,
  setFileName
} = require('./function')
const fs = require('fs')



// 获取文件内容
async function getFileDetail(parameters, filePath, file) {
  try {
    await fs.readFile(filePath, 'utf-8', async (error, data) => {
      if (error) {
        console.log(error);
        return
      }
      setFileName(file)
      switch (parameters) {
        case '-c': {
          getFileCharsNum(data)
          return
        }
        case '-w': {
          getFileWordsNum(data)
          return
        }
        case '-l': {
          getFileLinesNum(data)
          return
        }
        case '-a': {
          getFileAllNum(data)
          return
        }
        default:
          console.log('无此命令，请重新输入');
      }
    })
    return new Promise(res => {
      res(true)
    })
  } catch (error) {
    console.log("ERROR: ", error);
  }
}


module.exports = getFileDetail