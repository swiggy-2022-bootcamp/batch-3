const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.login = (req, res) => {
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
 
    User.findOne({ username: username })
        .then(u => {
            if (!u) {
                /* #swagger.responses[401] = { 
                    schema: { $ref: "#/definitions/Login401ErrorResponse" },
                    description: 'Unauthorized.' 
                } */
                return res.status(401).send({
                    message: 'Sorry invalid credentials'
                });
            }
            bcrypt.compare(password, u.password)
            .then(isEqual => {
                if (!isEqual) {
                    return res.status(401).send({
                        message: 'Sorry invalid credentials'
                    });
                }
                /* #swagger.responses[200] = { 
                    schema: { $ref: "#/definitions/LoginSuccessResponse" },
                    description: 'Login successful.' 
                } */
                return res.status(200).send({
                    message: 'user logged in successfully'
                });
            })
            .catch(err => {
                console.log(err);
                /* #swagger.responses[500] = { 
                    schema: { $ref: "#/definitions/InternalServerError" },
                    description: 'Internal Server Error' 
                } */
                res.status(500).send({
                    message: 'Internal Server Error'
                });
            })
        })
        .catch(err => {
            console.log(err);
            /* #swagger.responses[500] = { 
                schema: { $ref: "#/definitions/InternalServerError" },
                description: 'Internal Server Error' 
            } */
            res.status(500).send({
                message: 'Internal Server Error'
            });
        })
}

exports.register = (req, res) => {
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
    
    
    bcrypt.hash(password, 12)
        .then(hashPassword => {
            const user = new User({
                fullName: fullName,
                username: username, 
                password: hashPassword
            });
        
            user.save()
                .then(u => {
                    /* #swagger.responses[201] = { 
                        schema: { $ref: "#/definitions/RegisterSuccessResponse" },
                        description: 'User registration successful.' 
                    } */
                    return res.status(201).send({
                            message: 'User Registered Successfully',
                            "registration-name": fullName
                        });
                })
                .catch(err => {
                    console.log(err);
                    /* #swagger.responses[500] = { 
                        schema: { $ref: "#/definitions/InternalServerError" },
                        description: 'Internal Server Error' 
                    } */
                    return res.status(500).send({
                            message: 'Internal Server Error'
                        });
                });
        });
}