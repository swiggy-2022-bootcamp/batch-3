var express = require('express');
const { User } = require('../models/user.model');
const { USER_REGISTERATION_SUCCESS, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED } = require('../utils/constants');
var router = express.Router();


/* POST user registration */
router.post('/registration', async (req, res, next) => {

  // Destrcuture request body
  const { name, username, email, password } = req.body;

  /* Need to check Null value exception of req.body */

  // Create new user
  const user = User.build({
    name: name,
    username: username,
    email: email,
    password: password
  });

  try {
    // Save to database
    await user.save();

    // return
    return res.status(201).json({
        message: USER_REGISTERATION_SUCCESS,
        "registration-name": user.name
      })
  }
  catch(error) {
    return res.status(406).json({
      message: error.errors[0].message
    })
  }
})


/* POST: User LOGIN */
router.post('/login', async (req, res) => {

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
  })
})

module.exports = router;
