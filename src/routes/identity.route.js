const express = require('express');
const { body } = require('express-validator');
const identityController = require('../controllers/identity.controller');

const router = express.Router();

router.post(
    '/login', 
    [ 
        body('username')
            .notEmpty().withMessage('Required')
            .isEmail().withMessage('Username should be a valid email')
            .normalizeEmail(),
        body('password')
            .notEmpty().withMessage('Required')
            .isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long'),
    ],
    identityController.login
)

router.post(
    '/register',
    [ 
        body('username')
            .notEmpty().withMessage('Required')
            .isEmail().withMessage('Username should be a valid email')
            .normalizeEmail(),
        body('password')
            .notEmpty().withMessage('Required')
            .isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long'),
        body('registration-name')
            .notEmpty().withMessage('Required')
            .isAlpha('en-US', {ignore: ' '}).withMessage('Name can only be composed of letters and spaces')        
    ],
    identityController.register
)

module.exports = router;