const express=require('express')

const authController=require('../controllers/authController')
const userController = require('../controllers/userController');

const route=express.Router({mergeParams:true})

route.post('/register',authController.signup);
route.post('/login',authController.login);
route.get('/logout', authController.logout);
route.route('/user/:id').get(userController.getUser)
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