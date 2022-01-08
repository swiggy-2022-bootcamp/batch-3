const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.login = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint for user login.'

    /* #swagger.parameters['login-details'] = {
            in: 'body',
            description: 'User credentials for user login.',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/UserAuthDtls" }
    } */

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error(errors.array());
        /* #swagger.responses[400] = { 
            schema: { $ref: "#/definitions/ValidationErrorResponse" },
            description: 'Validation error.' 
        } */
        return res.status(400).send(errors.array());
    }

    const username = req.body['username'];
    const password = req.body['password'];
 
    let user;
    try {
        user = await User.findOne({ username: username }).exec();
    } catch(err) {
        console.error(err);
        /* #swagger.responses[500] = { 
            schema: { $ref: "#/definitions/InternalServerError" },
            description: 'Internal Server Error' 
        } */
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }

    if (!user) {
        /* #swagger.responses[401] = { 
            schema: { $ref: "#/definitions/Login401ErrorResponse" },
            description: 'Unauthorized.' 
        } */
        return res.status(401).send({
            message: 'Sorry invalid credentials'
        });
    }
    
    try {
        const doMatch = await bcrypt.compare(password, user.password);
        if (!doMatch) {
            return res.status(401).send({
                message: 'Sorry invalid credentials'
            });
        }
    } catch(err) {
        console.error(err);
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
    
    const token = jwt.sign(
        { user_id: user._id, email: user.username },
        "SECRET123",
        {
          expiresIn: "2h",
        }
    );

    // save user token
    user.token = token;
    try {
        await user.save();
    } catch(err) {
        console.error(err);
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }

    /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/LoginSuccessResponse" },
        description: 'Login successful.' 
    } */
    return res.status(200).send({
        message: 'user logged in successfully',
        token: token,
        expiresIn: 7200
    });
}

exports.register = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint for user registration.'

    /* #swagger.parameters['user-details'] = {
            in: 'body',
            description: 'User credentials for user register.',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/UserDtls" }
    } */

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error(errors.array());
        /* #swagger.responses[400] = { 
            schema: { $ref: "#/definitions/ValidationErrorResponse" },
            description: 'Validation error.' 
        } */
        return res.status(400).send(errors.array());
    }

    const fullName = req.body['registration-name'];
    const username = req.body['username'];
    const password = req.body['password'];
    
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        fullName: fullName,
        username: username, 
        password: hashedPassword
    });

    let savedUser;
    try {
        savedUser = await user.save();
    } catch(err) {
        console.error(err);
        /* #swagger.responses[500] = { 
            schema: { $ref: "#/definitions/InternalServerError" },
            description: 'Internal Server Error' 
        } */
        return res.status(500).send({
                message: 'Internal Server Error'
            });
    }

    /* #swagger.responses[201] = { 
        schema: { $ref: "#/definitions/RegisterSuccessResponse" },
        description: 'User registration successful.' 
    } */
    return res.status(201).send({
        message: 'User Registered Successfully',
        "registration-name": savedUser.fullName
    });
}