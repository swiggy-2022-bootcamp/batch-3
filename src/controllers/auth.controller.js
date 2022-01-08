const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { validationResult } = require('express-validator');

module.exports = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error(errors.array());
        /* #swagger.responses[400] = { 
            schema: { $ref: "#/definitions/ValidationErrorResponse" },
            description: 'Validation error.' 
        } */
        return res.status(400).send(errors.array());
    }

    const token = req.headers['authorization'].split(" ")[1];
    
    let decoded;
    try {
        decoded = jwt.verify(token, "SECRET123");
        
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    const user = await User.findById(decoded.user_id);
    res.locals.user = user;
    next();
}