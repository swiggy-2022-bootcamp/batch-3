/*
 * Copyright 2022 Debdyut Hajra
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const ServerError = require('../error/server.error');
const IdentityError = require('../error/identity.error');
const ValidationError = require('../error/validation.error');
const { validationResult } = require('express-validator');

/**
 * This function validates user credentials and returns a jwt token for authentication to access business end-points.
 * 
 * @param {*} req 
 * @param {*} res
 */
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

    // If request is invalid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return validation error response        
        throw new ValidationError(errors.array());   
    }

    // Extract the username and password
    const username = req.body['username'];
    const password = req.body['password'];
 
    // Find the username in db by provided username
    let user;
    try {
        user = await User.findOne({ username: username }).exec();
    } catch(err) {
        throw new ServerError(err);
    }

    // If no such user is present
    if (!user) {        
        // return error response
        throw new IdentityError('Sorry invalid credentials', 401);
    }
    
    // Try to compare the provided password with the one in system
    let doMatch;
    try {
        doMatch = await bcrypt.compare(password, user.password);        
    } catch(err) {
        throw new ServerError(err);
    }

    // If passwords do not match
    if (!doMatch) {
        // Return error response
        throw new IdentityError('Sorry invalid credentials', 401);
    }
    
    // Create the JWT token
    const token = jwt.sign(
        { user_id: user._id, email: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: parseInt(process.env.JWT_EXP),
        }
    );

    /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/LoginSuccessResponse" },
        description: 'Login successful.' 
    } */
    return res.status(200).send({
        message: 'user logged in successfully',
        token: token,
        expiresIn: parseInt(process.env.JWT_EXP)
    });
}

/**
 * This function helps to register a new user in system.
 * 
 * @param {*} req 
 * @param {*} res
 */
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

    // If request is invalid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return validation error response
        throw new ValidationError(errors.array());        
    }

    // Extract request details
    const fullName = req.body['registration-name'];
    const username = req.body['username'];
    const password = req.body['password'];

    // Check if email is already present in system
    let exisitingUser;
    try {
        exisitingUser = await User.findOne({ username: username });
    } catch(err) {
        throw new ServerError(err);
    }

    // If email is already registered 
    if (exisitingUser) {
        // return error response
        throw new ValidationError([
            {
                "value": username,
                "msg": "Provided email is already registered in the system.",
                "param": "username",
                "location": "body"
            }
        ]);
    }
    
    // Hash the password before storing for security
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        fullName: fullName,
        username: username, 
        password: hashedPassword
    });

    // Save the new user in db
    let savedUser;
    try {
        savedUser = await user.save();
    } catch(err) {
        throw new ServerError(err);
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

/**
 * This function helps to fetch a user profile.
 * 
 * @param {*} req 
 * @param {*} res
 */
exports.getUserProfile = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Get profile of a user.'

    // #swagger.parameters['userId'] = { description: 'User ID' }
    const userId = req.params.userId;

    // Retrieve user details from db
    const user = await User.findOne({ id: userId })
                            .select("id fullName username reputations -_id")
                            .exec();

    // If user is not found
    if (!user) {
        /* #swagger.responses[404] = { 
            schema: { $ref: "#/definitions/NotFoundError" },
            description: 'Not found.' 
        } */
        return res.status(404).json({ message: `User with id ${questionId} not found` });
    }

    /* #swagger.responses[200] = {
        schema: { $ref: "#/definitions/FetchUserSuccessResponse" },
        description: 'Fetch user successful.' 
    } */
    return res.status(200).json(user);
}
