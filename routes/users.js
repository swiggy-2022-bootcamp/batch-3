var express = require('express');
const { hasNotVoted } = require('../middlewares/hasNotVoted');
const { isAuthorized } = require('../middlewares/isAuthorized');
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
    if(error.message == 'Validation error') {
      error.message = error.errors[0].message;
    }
    return res.status(406).json({
      message: error.message
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


router.put('/update', hasNotVoted , async (req, res) => {
  try{
    const username = req.body.username;
    const user = await User.findOne({ where: { username: username } });
    user.reputation_point += 100;
    await user.save();
    return res.json({ msg: 'udpated', user})
  }
  catch(e) {
    console.log(e)
    return res.json({ msg: e.message })
  }
})


router.get('/', isAuthorized, (req, res) => {
  const user = req.user;
  return res.json({user})
})


module.exports = router;
