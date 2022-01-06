const QuestionsDao = require('../dao/questions-dao');
const Question = require('../models/question');
const Answer = require('../models/answer');

exports.addQuestion = (req, res) => {
    // #swagger.tags = ['QA-Platform']
    // #swagger.description = 'Endpoint for adding a new question.'

    /* #swagger.parameters['question'] = {
            in: 'body',
            description: 'Question details.',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/Question" }
    } */

    const questionTitle = req.body['question']['title'];
    const questionBody = req.body['question']['body'];
    const userId = 'b0a23ed0-64e9-43d7-9f57-87d88043e116';
    const question = new Question(questionTitle, questionBody, userId);
    QuestionsDao.addQuestion(question);

    /* #swagger.responses[201] = { 
            schema: { $ref: "#/definitions/QuestionAddSuccessResponse" },
            description: 'Question add successful.' 
    } */
    res.status(201).send({
        message: 'Question posted successfully',
        'question-id': question.id
    });        
};

exports.addAnswer = (req, res) => {
    // #swagger.tags = ['QA-Platform']
    // #swagger.description = 'Endpoint for adding a new answer for a question.'

    /* #swagger.parameters['answer'] = {
            in: 'body',
            description: 'Answer details.',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/Answer" }
    } */

    const questionId = req.body['question']['question-id'];
    const answerTxt = req.body['question']['answer'];
    const userId = 'b0a23ed0-64e9-43d7-9f57-87d88043e116';
    const answer = new Answer(answerTxt, userId);
    QuestionsDao.addAnswer(questionId, answer);

    /* #swagger.responses[201] = { 
            schema: { $ref: "#/definitions/AnswerAddSuccessResponse" },
            description: 'Answer add successful.' 
    } */
    res.status(201).send({
        message: "answer posted successfully",
        'question-id': questionId
    });
};

exports.updateAnswer = (req, res) => {   
    // #swagger.tags = ['QA-Platform']
    // #swagger.description = 'Endpoint for updating an answer.'

    /* #swagger.parameters['answer'] = {
            in: 'body',
            description: 'Answer details.',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/Answer" }
    } */
    
    const questionId = req.body['question']['question-id'];
    const answerTxt = req.body['question']['answer'];
    const userId = 'b0a23ed0-64e9-43d7-9f57-87d88043e116';  
    QuestionsDao.updateAnswer(questionId, answerTxt, userId);

    /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/AnswerUpdateSuccessResponse" },
            description: 'Answer update successful.' 
    } */    
    res.status(200).send({
        message: "answer updated successfully",
        'question-id': questionId
    })
};

exports.getAllQuestions = (req, res) => {
    // #swagger.tags = ['QA-Platform']
    // #swagger.description = 'Endpoint for fetching all questions.'

    /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/FetchAllQuestionsSuccessResponse" },
            description: 'Fetch all questions successful.' 
    } */
    res.status(200).send(QuestionsDao.getAllQuestions());
};

exports.getQuestion = (req, res) => {
    // #swagger.tags = ['QA-Platform']
    // #swagger.description = 'Endpoint for fetching a question.'

    // #swagger.parameters['id'] = { description: 'Question ID' }

    /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/FetchQuestionSuccessResponse" },
            description: 'Fetch question successful.' 
    } */
    const questionId = req.params.questionId;
    res.status(200).send(QuestionsDao.getQuestionById(questionId));
};

exports.deleteQuestion = (req, res) => {
    // #swagger.tags = ['QA-Platform']
    // #swagger.description = 'Endpoint for deleting a question.'

    // #swagger.parameters['id'] = { description: 'Question ID' }

    res.status(200).send('Deleted a question');
};