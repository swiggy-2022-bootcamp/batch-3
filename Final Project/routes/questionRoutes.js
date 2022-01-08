const express=require('express')

const authController=require('../controllers/authController')
const questionController=require('../controllers/questionController')

const route=express.Router()

route.use(authController.protect);
route.post('/',questionController.setUserId,questionController.create)
route.patch('/:id',questionController.setUserId,questionController.update)
module.exports=route;