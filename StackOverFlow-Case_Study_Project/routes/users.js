var express = require('express');
var router = express.Router();
const { User } = require('../models/user.model');
const {
  USER_REGISTERATION_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED
} = require('../utils/constants');


/**
 * POST: Route for  user registration
 */
router.post('/registration', async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    // Create new user
    const user = User.build({
      name: name,
      username: username,
      email: email,
      password: password
    });
    await user.save();
    return res.status(201).json({
        message: USER_REGISTERATION_SUCCESS,
        "registration-name": user.name
      })
  }
  catch(error) {
    if(error.message == 'Validation error') {
      error.message = error.errors[0].message;
    }
    error.status = 406;
    next(error);
  }
})



/**
 * POST: Route for User Login
 */
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const isMatched = await User.checkPassword(username, password);
    const token = await User.generateJWT(username);
    // Create response
    if(isMatched) {
      return res.status(201).json({
        message: USER_LOGIN_SUCCESS,
        token: token
      })
    }
    // Invalid Credentials
    return res.status(401).json({
      message: USER_LOGIN_FAILED
    });
  }
  catch (error) {
    next(error);
  }
})


module.exports = router;
