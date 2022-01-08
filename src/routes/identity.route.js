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