const express = require("express");
const router = express.Router();

const {questionHandler} = require('../handlers');
const verifyUserInfo = require("../middleware/verifyUserInfo");
/**
 * @swagger
 * /questions:
 *   post:
 *     tags: 
 *       - questions
 *     summary: Create Question
 *     security:
 *       - BearerAuth: []
 *     Description: Post a new question
 *     produces:
 *       - application/json
 *     responses:
 *       - 200:
 *         summary: Question created successfully
 *       - 401:
 *         summary: Invalid login credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   body: 
 *                     type: string
 */
router.post('/', verifyUserInfo, (req, res) => {
    const {username} = req.user;
    const {title, body} = req.body.question;
    questionHandler.postQuestion(username, title, body)
        .then(data => {
            const {success, status, ...otherData} = data;
            res.status(status).json(otherData);
        })
        .catch(err => {
            const {success, status, ...otherData} = err;
            res.status(status).json(otherData);
        })
})


/**
 * @swagger
 * /questions/{questionId}/answer:
 *   post:
 *     tags: 
 *       - questions
 *     summary: Answer a question
 *     security:
 *       - BearerAuth: []
 *     description: post an answer to a question
 *     parameters:
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: string
 *         required: true
 *         description: Question id
 *     produces:
 *       - application/json
 *     responses:
 *       - 201:
 *          description: created
 *       - 404:
 *          description: question not found
 *       - 401:
 *          description: invalid credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: object
 *                 properties:
 *                   answer:
 *                     type: string
 */
router.post('/:questionId/answer', verifyUserInfo, (req, res) => {
    const {questionId} = req.params;
    const {username} = req.user;
    const {answer} = req.body.question;
    questionHandler.answerQuestion(questionId, username, answer)
        .then(data => {
            const {success, status, ...otherData} = data;
            res.status(status).json(otherData);
        })
        .catch(err => {
            const {success, status, ...otherData} = err;
            res.status(status).json(otherData);
        })
});

/**
 * @swagger
 * /questions/{questionId}/answer:
 *   put:
 *     tags:
 *       - questions
 *     summary: Edit an answer to a question
 *     security:
 *       - BearerAuth: []
 *     description: post an answer to a question
 *     parameters:
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: string
 *         required: true
 *         description: Question id
 *     produces:
 *       - application/json
 *     responses:
 *       - 201:
 *          description: created
 *       - 404:
 *          description: question not found
 *       - 401:
 *          description: invalid credentials
 *       - 400:
 *          description: cannot edit answer if not already answered
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: object
 *                 properties:
 *                   answer:
 *                     type: string
 */
router.put('/:questionId/answer', verifyUserInfo, (req, res) => {
    const {questionId} = req.params;
    const {username} = req.user;
    const {answer} = req.body.question;
    questionHandler.updateAnswer(questionId, username, answer)
        .then(data => {
            const {success, status, ...otherData} = data;
            res.status(status).json(otherData);
        })
        .catch(err => {
            const {success, status, ...otherData} = err;
            res.status(status).json(otherData);
        })
});


/**
 * @swagger
 * /questions:
 *   get:
 *     tags: 
 *       - questions
 *     summary: Get All questions with answers
 *     security:
 *        - BearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       - 200:
 *         summary: list of questions with their answers
 */
router.get('/', (req, res) => {
    questionHandler.getAllQuestionsWithAnswers()
        .then(data => {
            const {success, status, ...otherData} = data;
            res.status(status).json(otherData);
        })
        .catch(err => {
            const {success, status, ...otherData} = err;
            res.status(status).json(otherData);
        })
});

module.exports = router;