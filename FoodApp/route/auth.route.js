const router = require('express').Router()
const auth = require('../controller/auth.controller')

/* Registeration endpoint */
router.post('/register',auth.register)

/* Login endpoint */
router.post('/authenticate',auth.login)

module.exports = router