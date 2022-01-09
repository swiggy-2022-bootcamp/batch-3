const { User } = require("../models/user.model");
const { USER_AUTHORIZATION_FAILED } = require("../utils/constants");

/*
    Middleware for checking if the User
    has posted valid credentials and
    authorized to access respective route.

    @req.body.user-details = {
        username: STRING,
        password: STRING
    }
*/

async function loginRequired(req, res, next) {

  const { username, password } = req.body["user-details"];
  const user = await User.findOne({ where: { username: username }});
  if (user && (await user.isMatched(password))) {
    // Attach user instance to req body
    req.user = user;
    return next();
  }
  // Create Error Object
  const err = new Error(USER_AUTHORIZATION_FAILED);
  err.status = 401;
  return next(err);
}

module.exports = { loginRequired };
