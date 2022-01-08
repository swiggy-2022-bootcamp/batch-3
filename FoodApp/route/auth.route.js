const router = require('express').Router()
const auth = require('../controller/auth.controller')

router.post('/register',auth.register)

router.post('/authenticate',auth.login)

module.exports = router