const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:id', (req, res) => {
  console.log('todos')
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(e => console.log(e))
})

router.post('/new', (req, res) => {
  return Todo.create({ 
    name: req.body.name,
    UserId: req.user.id
  })
    .then(() => res.redirect('/'))
    .catch(e => console.log(e))
})

module.exports = router