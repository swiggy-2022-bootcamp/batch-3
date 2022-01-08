const express = require('express');
const User = require('../models/user.model');
const { body } = require('express-validator');

const router = express.Router();

const identityController = require('../controllers/identity.controller');

router.post(
    '/login', 
    [ 
        body('username').exists().isEmail().withMessage('Username should be a valid email').normalizeEmail(),
        body('password').exists().isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long')
    ],
    identityController.login
)

router.post(
    '/register',
    [ 
        body('username').exists().isEmail().withMessage('Username should be a valid email').normalizeEmail(),
        body('password').exists().isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long'),
        body('registration-name').exists().isAlpha('en-US', {ignore: ' '}).withMessage('Name can only be composed of letters and spaces'),
        body('username').custom(async val => {
            // Add try catch
            const u = await User.findOne({ username: val });
            if (u) {
                return Promise.reject('Given email is already registered.');
            }
        })
    ],
    identityController.register
)

module.exports = router;