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
const { body, header, param } = require('express-validator')

const router = express.Router();

const qaPlatformController = require('../controllers/qa-platform.controller');

/* Route to add a new question */
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
        body('question.title').notEmpty().withMessage('Question title cannot be empty'),
        body('question.body').notEmpty().withMessage('Question body cannot be empty')
    ],
    authenticate, 
    qaPlatformController.addQuestion
)

/* Route to add a new question */
router.put(
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
        param('questionId')
            .isInt({ min: 1 }), 
        body('question.title').notEmpty().withMessage('Question title cannot be empty'),
        body('question.body').notEmpty().withMessage('Question body cannot be empty')
    ],
    authenticate, 
    qaPlatformController.updateQuestion
)

/* Route to add an answer to a question */
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
        param('questionId')
            .isInt({ min: 1 }), 
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

/* Route to update an answer to a question */
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
        param('questionId')
            .isInt({ min: 1 }), 
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

/* Route to fetch all questions */
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

/* Route to fetch a question */ 
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
        param('questionId')
            .isInt({ min: 1 }), 
    ], 
    authenticate, 
    qaPlatformController.getQuestion
)

/* Route to upvote an answer */
router.post(
    '/question/:questionId/answer/:answerId', 
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
        param('questionId')
            .isInt({ min: 1 }), 
        param('answerId')
            .isInt({ min: 1 })
    ],
    authenticate, 
    qaPlatformController.upvoteAnswer
)

module.exports = router;