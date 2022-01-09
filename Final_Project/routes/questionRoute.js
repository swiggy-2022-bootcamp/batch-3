const express = require('express');
const controller = require('../controllers/questionController')
const router = express.Router();


router.post('/', controller.question );

router.get('/getall', controller.getall);

router.post('/upvote', controller.upvote);

router.post('/downvote', controller.downvote);

module.exports = router;