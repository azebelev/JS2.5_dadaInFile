const { Router } = require('express')
const router = Router()
const path = require('path')
const User = require('../model/user')

router.post('/', async (req, res) => {
  const user = await User.findUser(req.body);
  if (!user) {
    await User.saveNewUser(req.body)
    res.send({ 'ok': true })

  } else {
    console.log('данный юзер уже зарегистрирован, нажмите "войти"  ')
  }

})

module.exports = router