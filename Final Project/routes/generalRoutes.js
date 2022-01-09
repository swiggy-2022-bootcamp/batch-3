const express = require('express')

const authController = require('../controllers/authController')
const questionController = require('../controllers/questionController')
const handleController = require('../controllers/handlerController')

const route=express.Router()

route.get('/questions',questionController.getAll)

//protected routes after this
route.use(authController.protect);

route.post('/vote',handleController.vote)

module.exports=route;