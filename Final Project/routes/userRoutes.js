const express=require('express')

const authController=require('../controllers/authController')

const route=express.Router()

route.post('/register',authController.signup);
route.post('/login',authController.login);

module.exports=route;