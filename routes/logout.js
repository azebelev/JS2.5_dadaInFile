const { Router } = require('express')
const router = Router()
const path = require('path')

router.post('/', (req, res) => {
  req.session.destroy(err => {
    if (!err) {
      req.session.clearCookie('session')
    }
  })
  res.send({ "ok": true })
})

module.exports = router