const express = require('express');
const controller = require('../controllers/answerController')
const router = express.Router();

router.post('/', controller.answer );

router.get('/getall', controller.getall);

router.post('/upvote', controller.upvote);

router.post('/downvote', controller.downvote);

module.exports = router;