const router = require('express').Router()
const _ = require('../controllers/userController')

router.post('/', _.addUser)

module.exports = router
