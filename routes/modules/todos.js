const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:id/detail', (req, res) => {
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

router.get('/:id/edit', (req, res) => {
  return Todo.findByPk(req.params.id)
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(e => console.log(e))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId} })
    .then(todo => {
      todo.name = req.body.name
      todo.isDone = req.body.isDone === 'on'
      todo.save()
    })
    .then(() => res.redirect('/'))
    .catch(e => console.log(e))
})

router.delete('/:id', (req,res) => {
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => todo.destroy())
    .then(() => res.redirect('/'))
    .catch(e => console.log(e))
})

module.exports = router