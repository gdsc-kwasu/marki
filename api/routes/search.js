const router = require('express').Router()
const _c = require('../controllers/searchController')

router.get('/', _c.searchByName)

module.exports = router
