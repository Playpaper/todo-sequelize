const express = require('express')
const exphbs = require('express-handlebars')
const bcrypt = require('bcryptjs')
const app = express()
const PORT = 3000

const db = require('./models')
const Todo = db.Todo
const User = db.User

const session = require('express-session')
// 引用 passport，放在文件上方
const passport = require('passport')
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(express.urlencoded({ extended: true }))

app.get('/',(req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true
  })
  .then(todos => res.render('index', {todos}))
  .catch(e => res.status(422).json(e))
})

app.get('/users/login', (req, res) => {
  res.render('login')
})

app.post('/users/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

app.get('/users/register', (req, res) => {
  res.render('register')
})

app.post('/users/register', (req, res) => {
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


app.get('/users/logout', (req, res) => {
  res.render('logout')
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(e => console.log(e))
})



app.listen(PORT, () => console.log(`The express server is listening on http://localhost:${PORT}`))