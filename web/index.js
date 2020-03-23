// 发送ajax请求
$.ajax({
  url: 'http://localhost:8080/getAllFile',
  type: 'GET',
  dataType: 'json',
  success: (data) => {
    console.log('data :', data);
    setFileList(data)
  },
  error: (error) => {
    console.log(error);
  }
})

function setFileList(data) {
  const FileList = document.getElementsByClassName('fileList')[0]
  data.map(item => {
    let li = document.createElement('li')
    li.setAttribute('class', 'item')
    li.innerHTML = item.fileName
    li.addEventListener('click', () => showAllNums(item))
    FileList.appendChild(li)
  })
}

function showAllNums(data) {
  const numList = document.getElementsByClassName('numList')[0]
  numList.innerHTML = `详情：${data.fileName}`

  for (let i in data.value) {
    let innerHTML = ''
    let li = ''
    if (i != 'AllNum') {
      innerHTML = `${i}: ${data.value[i].res}`
      li = createLi(innerHTML)
      numList.appendChild(li)
    } else {
      const { spaceLines, commentLines, codeLines } = data.value[i].res

      innerHTML = `spaceLines: ${spaceLines}`
      li = createLi(innerHTML)
      numList.appendChild(li)

      innerHTML = `commentLines: ${commentLines}`
      li = createLi(innerHTML)
      numList.appendChild(li)

      innerHTML = `codeLines: ${codeLines}`
      li = createLi(innerHTML)
      numList.appendChild(li)
    }
  }
}

function createLi(innerHTML) {
  const li = document.createElement('li')
  li.setAttribute('class', 'item')
  li.innerHTML = innerHTML
  return li
}