const express = require('express')
const _c = require('../controllers/searchController')

const router = express.Router()

router.get('/', _c.searchByName)

module.exports = router
