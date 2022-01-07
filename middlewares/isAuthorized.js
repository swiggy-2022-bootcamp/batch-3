const jwt = require('jsonwebtoken');
const { USER_AUTHORIZATION_FAILED } = require('../utils/constants');

async function isAuthorized (req, res, next) {
    const token = req.headers['authorization'];
    if(!token) {
        const err = new Error('You are not authorized, please log in.');
        err.status = 401;
        next(err);
        return;
    }
    try {
        var decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { username: decoded.username }});
        if(!req.user) {
            req.user = user;
        }
        next();
        return;
    }
    catch(err) {
        err.status = 401;
        err.message = USER_AUTHORIZATION_FAILED;
        next(err);
        return;
    }
}

module.exports = { isAuthorized };