const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = 3000

app.get('/',(req, res) => {
  res.send(`It's a web app !`)
})

app.listen(PORT, () => console.log(`The express server is listening on http://localhost:${PORT}`))