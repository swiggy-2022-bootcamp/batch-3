const express=require('express')

const authController=require('../controllers/authController')
const questionController=require('../controllers/questionController')

const route=express.Router()


route.post('/question',authController.protect,questionController.create)

module.exports=route;