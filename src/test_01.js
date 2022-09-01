const express = require('express');
const session = require('express-session')
const router = require('./router/index');
const path = require('path');
const mysql = require('mysql');
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
console.log(fpath);
app.use(session({
  secret:'keyboard cat',
  resave: 'false',
  saveUninitialized: true,
}))
app.use(express.static(fpath));
app.use(mw);
app.use(mw2);
app.use(router);
app.use((err, req, res, next) => {
  res.send('errr' + err.message);
});
app.listen('8082', () => {
  console.log('server running at http://127.0.0.1:8082')
});
// app.get('/', (req, res) => {
//   console.log(req.url, req.method);
//   res.end(`${req.url + req.method}`);
// });

