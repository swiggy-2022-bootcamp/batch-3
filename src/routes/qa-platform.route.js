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
const authenticate = require('../controllers/auth.controller')
const { body, header } = require('express-validator')

const router = express.Router();

const qaPlatformController = require('../controllers/qa-platform.controller');

router.post(
    '/question',
    [ 
        header('authorization')            
            .custom(val => {
                if (!val) {
                    throw new Error('Required');
                }

                const arr = val.split(' ');                
                if (!val.toLowerCase().startsWith("bearer") || !(arr.length == 2)) {
                    throw new Error('Auhtorization token is invalid');
                }
                return true;
            }),
        body('user-details.username')
            .exists().withMessage('Required')
            .isEmail().withMessage('Username should be a valid email')
            .normalizeEmail(),
        body('user-details.password')
            .exists().withMessage('Required')
            .isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long'),
        body('question.title').notEmpty().withMessage('Question title cannot be empty'),
        body('question.body').notEmpty().withMessage('Question body cannot be empty')
    ],
    authenticate, 
    qaPlatformController.addQuestion
)

router.post(
    '/question/:questionId/answer',
    [      
        header('authorization')            
            .custom(val => {
                if (!val) {
                    throw new Error('Required');
                }

                const arr = val.split(' ');                
                if (!val.toLowerCase().startsWith("bearer") || !(arr.length == 2)) {
                    throw new Error('Auhtorization token is invalid');
                }
                return true;
            }), 
        body('question.question-id')
            .notEmpty().withMessage('Required')            
            .isInt({ min: 1 }),
        body('question.answer').notEmpty().withMessage('Answer cannot be empty'),
        body('question.question-id').custom((val, { req }) => {
            if (req.params.questionId != val) {
                throw new Error('The question id in request paramater and request body must match.');
            }
            return true;
        })
    ],
    authenticate, 
    qaPlatformController.addAnswer
)

router.put(
    '/question/:questionId/answer', 
    [
        header('authorization')            
            .custom(val => {
                if (!val) {
                    throw new Error('Required');
                }

                const arr = val.split(' ');                
                if (!val.toLowerCase().startsWith("bearer") || !(arr.length == 2)) {
                    throw new Error('Auhtorization token is invalid');
                }
                return true;
            }),
        body('question.question-id')
            .notEmpty().withMessage('Required')            
            .isInt({ min: 1 }),
        body('question.answer').notEmpty().withMessage('Answer body cannot be empty'),
        body('question.question-id').custom((val, { req }) => {
            if (req.params.questionId != val) {
                throw new Error('The question id in request paramater and request body must match.');
            }
            return true;
        })
    ],
    authenticate, 
    qaPlatformController.updateAnswer
)

router.get(
    '/question',
    [ 
        header('authorization')            
            .custom(val => {
                if (!val) {
                    throw new Error('Required');
                }

                const arr = val.split(' ');                
                if (!val.toLowerCase().startsWith("bearer") || !(arr.length == 2)) {
                    throw new Error('Auhtorization token is invalid');
                }
                return true;
            }),     
    ], 
    authenticate, 
    qaPlatformController.getAllQuestions
)

router.get(
    '/question/:questionId',
    [
        header('authorization')            
            .custom(val => {
                if (!val) {
                    throw new Error('Required');
                }

                const arr = val.split(' ');                
                if (!val.toLowerCase().startsWith("bearer") || !(arr.length == 2)) {
                    throw new Error('Auhtorization token is invalid');
                }
                return true;
            }),
    ], 
    authenticate, 
    qaPlatformController.getQuestion
)

router.delete('/question/:questionId', authenticate, qaPlatformController.deleteQuestion)

module.exports = router;