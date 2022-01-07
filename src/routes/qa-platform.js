const express = require('express');
const authenticate = require('../controllers/auth')

const router = express.Router();

const qaPlatformController = require('../controllers/qa-platform');

router.post('/question', authenticate, qaPlatformController.addQuestion)

router.post('/question/:questionId/answer', authenticate, qaPlatformController.addAnswer)

router.put('/question/:questionId/answer', authenticate, qaPlatformController.updateAnswer)

router.get('/question', authenticate, qaPlatformController.getAllQuestions)

router.get('/question/:questionId', authenticate, qaPlatformController.getQuestion)

router.delete('/question/:questionId', authenticate, qaPlatformController.deleteQuestion)

module.exports = router;