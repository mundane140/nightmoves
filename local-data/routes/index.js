const router = require('express').Router()

router.use('/profiles', require('./profiles'))
router.use('/components', require('./components'))
router.use('/screens', require('./screens'))
router.get('/', (req, res) => {
  res.sendStatus(200)
})

module.exports = router
