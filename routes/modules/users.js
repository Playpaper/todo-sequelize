const express = require('express')
const router = express.Router()
const db = require('../../models')
const User = db.User
const passport = require('passport')

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

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ where: { email } }).then(user => {
    if (user) {
      console.log('The user is already exists !')
      return res.render('register', { ...req.body })
    }

    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({ name, email, password: hash }))
      .then(() => res.redirect('/'))
      .catch(e => console.log(e))
  })
})


router.get('/logout', (req, res) => {
  console.log('logout !')
  req.logout()
  req.flash('success_msg', `You've logout !`)
  res.redirect('/users/login')
})

module.exports = router