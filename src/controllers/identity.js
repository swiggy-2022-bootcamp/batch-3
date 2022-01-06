const UsersDao = require('../dao/users-dao');
const User = require('../models/user');

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

    const username = req.body['username'];
    const password = req.body['password'];

    const user = UsersDao.getUser(username, password);
    if (!user) {
        /* #swagger.responses[401] = { 
            schema: { $ref: "#/definitions/Login401ErrorResponse" },
            description: 'Unauthorized.' 
        } */
        res.status(401).send({
            message: 'Sorry invalid credentials'
        });
    }

    /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/LoginSuccessResponse" },
            description: 'Login successful.' 
    } */
    res.status(200).send({
        message: 'user logged in successfully'
    });   
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

    const fullName = req.body['registration-name'];
    const username = req.body['username'];
    const password = req.body['password'];
    
    const user = new User(fullName, username, password);
    UsersDao.addUser(user);

    /* #swagger.responses[201] = { 
            schema: { $ref: "#/definitions/RegisterSuccessResponse" },
            description: 'User registration successful.' 
    } */
    res.status(201).send({
        message: "User Registered Successfully",
        "registration-name": fullName
    });
}