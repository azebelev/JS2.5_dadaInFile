const { Router } = require('express')
const router = Router()
const path = require('path')
const User = require('../model/user')

router.get('/', (req, res) => {
  const user = req.session.user

  if (!user) {
    res.send({ error: 'forbidden' })
  } else {
    res.send({ items: user.items })
  }
})

router.post('/', async (req, res) => {
  const user = new User(req.session.user)
  const id = await user.addTask(req.body.text)
  req.session.user.items.push({ id, text: req.body.text, "checked": false })
  res.send({ id })

})

router.delete('/', async (req, res) => {
  try {
    req.session.user.items = req.session.user.items.filter(task => task.id !== req.body.id)
    const user = new User(req.session.user)
    await user.deleteTaskById(req.body.id)

  } catch (error) {
    console.log(error)
  }
  res.send({ ok: true })
})

router.put('/', async (req, res) => {
  const taskChange = req.body
  const tasks = req.session.user.items

  req.session.user.items = tasks.map(task => {
    if (task.id === taskChange.id) {
      task = taskChange
    }
    return task
  })

  await User.editTask(req.session.user, taskChange)

})

module.exports = router