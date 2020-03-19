console.log('hello world');
// 发送ajax请求
$.ajax({
  url: 'http://localhost:8080/getAllFile',
  type: 'GET',
  dataType: 'json',
  success: (data) => {
    console.log('data :', data);
  },
  error: (error) => {
    console.log(error);
  }
})