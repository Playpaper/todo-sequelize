const express = require('express')
const router = express.Router()
const db = require('../../models')
const User = db.User
const bcrypt = require('bcryptjs')
const passport = require('passport')

// validator
const { body } = require('express-validator')
const registerAuth = require('../../middleware/registerAuth')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

// router.post('/register', (req, res) => {
//   const { name, email, password, confirmPassword } = req.body
//   User.findOne({ where: { email } }).then(user => {
//     if (user) {
//       // console.log('The user is already exists !')
//       req.flash('warning_msg', 'The user is already exists !')
//       // return res.render('register', { ...req.body })
//       return res.redirect('/users/register')
//     }

//     return bcrypt
//       .genSalt(10)
//       .then(salt => bcrypt.hash(password, salt))
//       .then(hash => User.create({ name, email, password: hash }))
//       .then(() => res.redirect('/'))
//       .catch(e => console.log(e))
//   })
// })

router.post('/register', [
  body('name')
    .trim() // 去除空白的 Sanitizer
    .isLength({ min: 1 }) // 長度至少 > 0
    .withMessage('名字不可輸入空白 !'), // 驗證失敗的客製化訊息
  body('password') 
    .trim() 
    .isLength({ min: 5 }) 
    // .matches(/[-_$#]/)
    .withMessage('密碼長度至少需要5個字元 !'), 
  body('confirmPassword') 
    .trim() 
    .custom((confirmPassword, { req }) => { // 加入客製化驗證函式，並保留請求 req 做後續使用
      if (confirmPassword !== req.body.password) { // 確認密碼欄位的值需要和密碼欄位的值相符
        throw new Error('兩次輸入的密碼不相同') // 驗證失敗時的錯誤訊息
      }
      return true // 成功驗證回傳 true
    })
], registerAuth)

router.get('/logout', (req, res) => {
  console.log('logout !')
  req.logout()
  req.flash('success_msg', `You've logout !`)
  res.redirect('/users/login')
})

module.exports = router