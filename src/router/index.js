const express = require('express');
const router = express.Router();
router.get('/api/user', (req,res) => {
  const resData = {
    type: 'get',
    name: res.name,
    name2: res.name2
  }
  res.send(resData);
})
const mw2 = (req, res, next) => {
  res.age = 24;
  next();
}
router.post('/api/user',mw2, (req,res) => {
  const resData = {
    name: res.name,
    name2: res.name2,
    age: res.age,
  }
  res.send(resData);
})
router.post('/api/err',mw2, (req,res) => {
  throw new Error('服务器内部发生错误');
  res.send('err');
})
module.exports = router;