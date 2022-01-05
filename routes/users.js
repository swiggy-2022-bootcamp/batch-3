var express = require('express');
const { User } = require('../models/user.model');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/* POST user registration */
router.post('/registration', async (req, res, next) => {

  // Destrcuture request body
  const { name, username, email, password } = req.body;

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
        msg: 'Registration Successfull',
        user: user
      })
  }
  catch(error) {
    console.log(error)
    return res.status(500).json({
      msg: error.errors[0].message
    })
  }
})

module.exports = router;
