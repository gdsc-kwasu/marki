const router = require('express').Router()
const _ = require('../controllers/attendeeController')

router.get('/', _.getAll)
router.post('/', _.create)
router.get('/:id', _.getById)
router.delete('/:id', _.delete)
router.post('/:id', _.markAttendance.call())
router.patch('/:id', _.markAttendance.call(false))

module.exports = router
