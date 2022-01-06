const express = require('express');

const router = express.Router();

const identityController = require('../controllers/identity');

router.post('/login', identityController.login)

router.post('/register', identityController.register)

module.exports = router;