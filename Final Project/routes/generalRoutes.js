const express = require('express')

const authController = require('../controllers/authController')
const questionController = require('../controllers/questionController')
const handleController = require('../controllers/handlerController')
const answerController = require('../controllers/answerController')

const route=express.Router({mergeParams:true})

route.get('/questions',questionController.getAll)
route.get('/answer/:id',answerController.get)
//protected routes after this
route.use(authController.protect);

route.post('/vote',handleController.vote)
route.post('/comment',authController.restrictTo('silver','gold','bronze'),answerController.comment)


module.exports=route;