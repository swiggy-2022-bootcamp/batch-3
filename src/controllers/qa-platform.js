const User = require('../models/user');
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
    const user = res.locals.user;

    let question = new Question({ 
        title: questionTitle,
        body: questionBody,            
        createdBy: user,
        updatedBy: user
    });
    question.save()
        .then(q => {

            user.questions.push(q);
            user.save();

            /* #swagger.responses[201] = { 
                schema: { $ref: "#/definitions/QuestionAddSuccessResponse" },
                description: 'Question add successful.' 
            } */
            res.status(201).send({
                message: 'Question posted successfully.',
                'question-id': q.id
            });
        })
        .catch(err => {
            console.log(err);
            /* #swagger.responses[500] = { 
                schema: { $ref: "#/definitions/InternalServerError" },
                description: 'Internal Server Error' 
            } */
            res.status(500).send({
                message: 'Internal Server Error'
            });
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
    const user = res.locals.user;

    const answer = new Answer({
        answer: answerTxt,    
        createdBy: user,
        updatedBy: user
    });

    Question.findOne({ id: questionId })
        .then(question => {            
            question.answers.push(answer);
            return question.save();
        })
        .then(question => {

            user.answers.push(answer);
            user.save();

            /* #swagger.responses[201] = { 
                schema: { $ref: "#/definitions/AnswerAddSuccessResponse" },
                description: 'Answer add successful.' 
            } */
            res.status(201).send({
                message: "answer posted successfully",
                'question-id': question.id
            });
        })
        .catch(err => {
            console.log(err);
            /* #swagger.responses[500] = { 
                schema: { $ref: "#/definitions/InternalServerError" },
                description: 'Internal Server Error' 
            } */
            res.status(500).send({
                message: 'Internal Server Error'
            });
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
    const user = res.locals.user;

    Question.findOneAndUpdate(
        {
            id: questionId,
            'answers.createdBy': user 
        },
        {
            'answers.$.answer': answerTxt
        })        
        .then(question => {            
            /* #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/AnswerUpdateSuccessResponse" },
                description: 'Answer update successful.' 
            } */    
            res.status(200).send({
                message: "answer updated successfully",
                'question-id': question.id
            })
        })
        .catch(err => {
            console.log(err);
            /* #swagger.responses[500] = { 
                schema: { $ref: "#/definitions/InternalServerError" },
                description: 'Internal Server Error' 
            } */
            res.status(500).send({
                message: 'Internal Server Error'
            });
        });
};

exports.getAllQuestions = (req, res) => {
    // #swagger.tags = ['QA-Platform']
    // #swagger.description = 'Endpoint for fetching all questions.'

    Question.find()
        .then(questions => {
            /* #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/FetchAllQuestionsSuccessResponse" },
                description: 'Fetch all questions successful.' 
            } */
            res.status(200).send(questions);
        })
        .catch(err => {
            console.log(err);
            /* #swagger.responses[500] = { 
                schema: { $ref: "#/definitions/InternalServerError" },
                description: 'Internal Server Error' 
            } */
            res.status(500).send({
                message: 'Internal Server Error'
            });
        });
};

exports.getQuestion = (req, res) => {
    // #swagger.tags = ['QA-Platform']
    // #swagger.description = 'Endpoint for fetching a question.'

    // #swagger.parameters['id'] = { description: 'Question ID' }
    const questionId = req.params.questionId;

    Question.findOne({ id: questionId })
        .then(question => {
            /* #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/FetchQuestionSuccessResponse" },
                description: 'Fetch question successful.' 
            } */    
            res.status(200).send(question);
        })
        .catch(err => {
            console.log(err);
            /* #swagger.responses[500] = { 
                schema: { $ref: "#/definitions/InternalServerError" },
                description: 'Internal Server Error' 
            } */
            res.status(500).send({
                message: 'Internal Server Error'
            });
        })    
};

exports.deleteQuestion = (req, res) => {
    // #swagger.tags = ['QA-Platform']
    // #swagger.description = 'Endpoint for deleting a question.'

    // #swagger.parameters['id'] = { description: 'Question ID' }
    const questionId = req.params.questionId;

    Question.findOneAndRemove({ id: questionId })
        .then(q => {
            /* #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/FetchQuestionSuccessResponse" },
                description: 'Fetch question successful.' 
            } */    
            res.status(200).send({
                message: 'Question deleted successfully',            
            });
        })
        .catch(err => {
            console.log(err);
            /* #swagger.responses[500] = { 
                schema: { $ref: "#/definitions/InternalServerError" },
                description: 'Internal Server Error' 
            } */
            res.status(500).send({
                message: 'Internal Server Error'
            });
        })  
};