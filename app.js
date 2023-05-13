const express = require('express')
const exphbs = require('express-handlebars')
const app = express() 
const routes = require('./routes')
const PORT = 3000

const session = require('express-session')
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

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

app.use(express.urlencoded({ extended: true }))
app.use(routes)



app.listen(PORT, () => console.log(`The express server is listening on http://localhost:${PORT}`))