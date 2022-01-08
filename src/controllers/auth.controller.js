const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { validationResult } = require('express-validator');
const IdentityError = require('../error/identity.error');
const ValidationError = require('../error/validation.error');

module.exports = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }

    const token = req.headers['authorization'].split(" ")[1];
    
    let decoded;
    try {
        decoded = jwt.verify(token, "SECRET123");        
    } catch (err) {
        throw new IdentityError('Invalid token', 401);
    }

    const user = await User.findById(decoded.user_id);
    res.locals.user = user;
    next();
}