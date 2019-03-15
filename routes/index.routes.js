const express = require('express')
const router = express.Router()

router.use('/api/airports', require('./udchalo.routes'));

module.exports = router