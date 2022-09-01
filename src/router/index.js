const express = require('express');
const router = express.Router();
const {request} = require('express');
const mysql = require('mysql');
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'village_manage',
})

router.post('/api/login', (req,res) => {
  const user = {
    ...req.query,
  }
  console.log(req.body,req.params, req.query);
  const sqlStr = `SELECT * FROM users`;
  db.query(sqlStr, user, (err, results) => {
    if (err) return res.send(err.message);
    if (results.length === 0) {
      return res.send({status:1, msg:'登陆失败！'});
    }
    req.session.user = req.query;
    req.session.isLogin = true;
    res.send({status:0, msg:'登陆成功！'})
  })
})
router.get('/api/user/:id', (req,res) => {
  db.query(`SELECT * from users where id = ${req.params.id}`, (err, results) => {
    if (err) return console.log(err.message);
    const resData = {
      type: 'get',
      ...results[0],
    }
    res.send(resData);
  })

})
router.post('/api/addUser', (req,res) => {
  const user = {
    ...req.query,
    status:0,
  }
  const sqlStr = `INSERT INTO users SET ?`;
  db.query(sqlStr, user, (err, results) => {
    if (err) return res.send(err.message);
    if (results.affectedRows === 1) {
      console.log('插入成功！');
      const resData = {
        code: 0,
        message: '插入成功!'
      }
      res.send(resData);
    }
  })
})
router.post('/api/updateUser', (req,res) => {
  const user = {
    ...req.query,
  }
  const sqlStr = `UPDATE users SET ? WHERE id = ?`;
  db.query(sqlStr, [user,user.id], (err, results) => {
    if (err) return res.send(err.message);
    if (results.affectedRows === 1) {
      console.log('修改成功！');
      const resData = {
        code: 0,
        message: '修改成功!'
      }
      res.send(resData);
    }
  })
})
router.get('/api/deleteUser/:id', (req,res) => {
  // const sqlStr = `DELETE FROM users WHERE id = ?`;
  // 标记删除
  const sqlStr = `UPDATE users SET status = 1 WHERE id = ?`;
  db.query(sqlStr,req.params.id, (err, results) => {
    if (err) return res.send(err.message);
    if (results.affectedRows === 1) {
      console.log('删除成功！');
      const resData = {
        code: 0,
        message: '删除成功!'
      }
      res.send(resData);
    }
  })
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