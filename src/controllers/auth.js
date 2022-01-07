const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error(errors.array());
        /* #swagger.responses[400] = { 
            schema: { $ref: "#/definitions/ValidationErrorResponse" },
            description: 'Validation error.' 
        } */
        return res.status(400).send(errors.array());
    }

    const username = req.body['user-details']['username'];
    const password = req.body['user-details']['password'];    

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
                res.locals.user = u;                
                next();
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