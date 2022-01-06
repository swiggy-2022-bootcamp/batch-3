const express = require('express');

const router = express.Router();

const qaPlatformController = require('../controllers/qa-platform');

router.post('/question', qaPlatformController.addQuestion)

router.post('/question/:questionId/answer', qaPlatformController.addAnswer)

router.put('/question/:questionId/answer', qaPlatformController.updateAnswer)

router.get('/question', qaPlatformController.getAllQuestions)

router.get('/question/:questionId', qaPlatformController.getQuestion)

router.delete('/question/:questionId', qaPlatformController.deleteQuestion)

module.exports = router;