const express = require('express');
const authenticate = require('../controllers/auth')
const { body, header } = require('express-validator')

const router = express.Router();

const qaPlatformController = require('../controllers/qa-platform');

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