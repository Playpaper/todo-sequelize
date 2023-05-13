const express = require('express')
const exphbs = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
const app = express() 
const routes = require('./routes')
const PORT = 3000


// handlebars template
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
// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error = req.flash('error')
  console.log('res.locals = ', res.locals)
  next()
})
app.use(express.urlencoded({ extended: true }))
app.use(routes)


// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.isAuthenticated()
//   res.locals.user = req.user
//   res.locals.success_msg = req.flash('success_msg')
//   res.locals.warning_msg = req.flash('warning_msg')
//   res.locals.login_error = req.flash('error')
//   next()
// })

app.listen(PORT, () => console.log(`The express server is listening on http://localhost:${PORT}`))