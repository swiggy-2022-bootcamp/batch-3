const express=require('express')

const authController=require('../controllers/authController')
const userController = require('../controllers/userController');

const route=express.Router()

route.post('/register',authController.signup);
route.post('/login',authController.login);

// Protect all routes after this middleware
route.use(authController.protect);

// route.get('/me',userController.getMe)
route.patch('/updateMyPassword', authController.updatePassword)
route.patch(
    '/updateMe',
    userController.updateMe
  );
route.delete('/deleteMe',userController.deleteMe)
module.exports=route;