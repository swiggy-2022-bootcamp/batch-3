var express = require('express');
const { User } = require('../models/user.model');
const { USER_REGISTERATION_SUCCESS, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED } = require('../utils/constants');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


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
        registration_name: user.name
      })
  }
  catch(error) {
    return res.status(500).json({
      message: error.errors[0].message
    })
  }
})


/* POST: User LOGIN */
router.post('/login', async (req, res) => {

  // Destructure Request Body
  const { username, password } = req.body;

  // Get User by Username
  console.log(await User.getByUsername(username));
  const user = await User.findOne({where: { username: username }})

  // Check for valid password
  if(user && user.checkPassword(password)) {
    return res.status(201).json({
      message: USER_LOGIN_SUCCESS,
      user: user
    })
  }

  // Invalid Credentials
  return res.status(401).json({
    message: USER_LOGIN_FAILED
  })
})


module.exports = router;
