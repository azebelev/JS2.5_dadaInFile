const { Router } = require('express')
const router = Router()
const path = require('path')
const User = require('../model/user')

router.post('/', async (req, res) => {
  const user = await User.findUser(req.body)

  if (user) {
    req.session.user = user
    res.send({ 'ok': true })
  } else {
    res.send({ 'error': 'not found' })
  }
})

module.exports = router