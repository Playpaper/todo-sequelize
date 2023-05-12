const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = 3000

const db = require('./models')
const Todo = db.Todo
const User = db.User

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

app.get('/',(req, res) => {
  res.render('index')
})

app.get('/users/login', (req, res) => {
  res.render('login')
})

app.post('/users/login', (req, res) => {
  res.render('login')
})

app.get('/users/register', (req, res) => {
  res.render('register')
})
  
app.post('/users/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.create({ name, email, password })
    .then(() => res.redirect('/'))
})

app.get('/users/logout', (req, res) => {
  res.render('logout')
})

app.listen(PORT, () => console.log(`The express server is listening on http://localhost:${PORT}`))