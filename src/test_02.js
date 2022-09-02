const express = require('express');
const router = require('./router/index2');
const path = require('path');
const mysql = require('mysql');
// const expressJWT = require('express-jwt');
// const secretKey = 'itheima No2 haha';
const app = express();
const fpath = path.join(__dirname ,'./clock')
const mw = (req, res, next) => {
  res.name = '张森云';
  next();
}
const mw2 = (req, res, next) => {
  res.name2 = res.name + 100;
  next();
}
// app.use(expressJWT({secret: secretKey,algorithms:['HS256']}).unless({path: [/^\/api\//]}));
app.use(express.static(fpath));
app.use(mw);
app.use(mw2);
app.use(router);
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.send({status: 401, message: '无效的token'})
  }
  // 其他原因导致的错误
  if (err) {
    res.send({status: 500, message: '未知错误'})
  }
});
app.listen('8082', () => {
  console.log('server running at http://127.0.0.1:8082')
});
// app.get('/', (req, res) => {
//   console.log(req.url, req.method);
//   res.end(`${req.url + req.method}`);
// });

