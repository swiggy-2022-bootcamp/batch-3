const express=require('express')

const authController=require('../controllers/authController')
const questionController=require('../controllers/questionController')
const answerController = require('../controllers/answerController')

const route=express.Router({mergeParams:true})
route.get('/:id',questionController.getQuestion)
route.use(authController.protect);
//answer routes
route.route('/:id/answer').post(answerController.setUserId,answerController.create)
route.route('/:id/answer').patch(answerController.setUserId,answerController.update)
//question routes
route.post('/',questionController.setUserId,questionController.create)
route.patch('/:id',questionController.setUserId,questionController.update)
module.exports=route;