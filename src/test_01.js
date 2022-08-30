const fs = require('fs');
const path = require('path');
const http = require('http');
// 读取文件
fs.readFile('src/file/files.js', 'utf8', (err, dataStr) => {
  if (err) {
    return console.log('文件读取失败！'+ err.message);
  }
  console.log(dataStr);
});
fs.writeFile('src/file/files.js', 'const age= 23;', (err) => {
  if (err) {
    return console.log('文件写入失败！' + err.message);
  }
});
// 路径
// 路径拼接
const pathArr = ['./a/','b/','c/d/','a.js'];
const myPath = path.join(__dirname,...pathArr);
console.log('myPath:' + myPath);
// 字符串解析文件名
// path <string> 必选参数，表示一个路径的字符串
// ext <string> 可选参数，表示文件扩展名,会和路径中最后一部分从末尾往前匹配，匹配成功则减去匹配成功的部分。
// 返回: <string> 表示路径中的最后一部分
const fileName = path.basename(myPath, '');
// 文件扩展名
//使用 path.extname() 方法，可以获取路径中的扩展名部分
const fileExtName = path.extname(myPath);
console.log('fileName:' + fileName);
console.log('fileExtName:' + fileExtName);
//创建服务器
const server = http.createServer();
// 监听请求
server.on('request', (req, res) => {
  console.log('someone visit');
  const str = `${req.url}, ${req.method}`;
  res.setHeader('Content-Type','text/html;charset=utf-8');
  res.end(str);
});
// 启动服务器
server.listen(8083, () => {
  console.log('run at 8083');
})