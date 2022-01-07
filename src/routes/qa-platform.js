const express = require('express');
const authenticate = require('../controllers/auth')
const { body, param } = require('express-validator')

const router = express.Router();

const qaPlatformController = require('../controllers/qa-platform');

router.post(
    '/question',
    [ 
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
        body('user-details.username')
            .exists().withMessage('Required')
            .isEmail().withMessage('Username should be a valid email')
            .normalizeEmail(),
        body('user-details.password')
            .exists().withMessage('Required')
            .isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long'),
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
        body('user-details.username')
            .exists().withMessage('Required')
            .isEmail().withMessage('Username should be a valid email')
            .normalizeEmail(),
        body('user-details.password')
            .exists().withMessage('Required')
            .isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long'),
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
        body('user-details.username')
            .exists().withMessage('Required')
            .isEmail().withMessage('Username should be a valid email')
            .normalizeEmail(),
        body('user-details.password')
            .exists().withMessage('Required')
            .isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long')        
    ], 
    authenticate, 
    qaPlatformController.getAllQuestions
)

router.get(
    '/question/:questionId',
    [ 
        body('user-details.username')
            .exists().withMessage('Required')
            .isEmail().withMessage('Username should be a valid email')
            .normalizeEmail(),
        body('user-details.password')
            .exists().withMessage('Required')
            .isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long')        
    ], 
    authenticate, 
    qaPlatformController.getQuestion
)

router.delete('/question/:questionId', authenticate, qaPlatformController.deleteQuestion)

module.exports = router;