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

const Question = require('../models/question.model');
const Answer = require('../models/answer.model');
const User = require('../models/user.model');
const ServerError = require('../error/server.error');

/**
 * This function helps to add a new question.
 * 
 * @param {*} req 
 * @param {*} res
 */
exports.addQuestion = async (req, res) => {
    // #swagger.tags = ['QA-Platform']
    // #swagger.description = 'Endpoint for adding a new question.'

    /* #swagger.parameters['question'] = {
            in: 'body',
            description: 'Question details.',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/Question" }
    } */

    // Extract request details
    const questionTitle = req.body['question']['title'];
    const questionBody = req.body['question']['body'];
    const user = res.locals.user;

    // Build the question model
    let question = new Question({ 
        title: questionTitle,
        body: questionBody,            
        createdBy: user,
        updatedBy: user
    });

    // Save question to db
    let savedQuestion;
    try {
        savedQuestion = await question.save()
    } catch(err) {
        throw new ServerError(err);
    }
    
    // Add the question reference to user object
    user.questions.push(savedQuestion);
    try {
        await user.save();
    } catch(err) {
        throw new ServerError(err);
    }

    /* #swagger.responses[201] = { 
        schema: { $ref: "#/definitions/QuestionAddSuccessResponse" },
        description: 'Question add successful.' 
    } */
    res.status(201).send({
        message: 'Question posted successfully.',
        'question-id': savedQuestion.id
    });       
}

/**
 * This function helps to add a new question.
 * 
 * @param {*} req 
 * @param {*} res
 */
exports.updateQuestion = async (req, res) => {
    // #swagger.tags = ['QA-Platform']
    // #swagger.description = 'Endpoint for adding a new question.'

    /* #swagger.parameters['question'] = {
            in: 'body',
            description: 'Question details.',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/Question" }
    } */

    // Extract request details
    const questionId = req.params['questionId'];
    const questionTitle = req.body['question']['title'];
    const questionBody = req.body['question']['body'];
    const user = res.locals.user;

    // Update the question if available
    let question;
    try {
        question = await Question.findOneAndUpdate(
                                    { 
                                        id: questionId,
                                        'createdBy': user
                                    },
                                    {
                                        title: questionTitle,
                                        body: questionBody
                                    });
    } catch(err) {
        throw new ServerError(err);
    }

    if (!question) {
        /* #swagger.responses[404] = { 
            schema: { $ref: "#/definitions/NotFoundError" },
            description: 'Not found.' 
        } */
        return res.status(404).json({ message: 'No relevant question found to be updated' });
    }

    /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/QuestionUpdateSuccessResponse" },
        description: 'Question update successful.' 
    } */
    return res.status(200).send({
            message: 'Question updated successfully.',
            'question-id': question.id
        });       
}

/**
 * This function helps to add an answer to a question.
 * 
 * @param {*} req 
 * @param {*} res
 */
exports.addAnswer = async (req, res) => {
    // #swagger.tags = ['QA-Platform']
    // #swagger.description = 'Endpoint for adding a new answer for a question.'

    /* #swagger.parameters['answer'] = {
            in: 'body',
            description: 'Answer details.',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/Answer" }
    } */

    // Extract request details 
    const questionId = req.body['question']['question-id'];
    const answerTxt = req.body['question']['answer'];
    const user = res.locals.user;

    // Prepare the answer model
    const answer = new Answer({
        answer: answerTxt,    
        createdBy: user,
        updatedBy: user
    });

    // Retrieve the question from db
    let question;
    try {
        question = await Question.findOne(
                                    { 
                                        id: questionId,
                                        'answers.createdBy': { '$ne': user }
                                    })
                                    .exec();
    } catch(err) {
        throw new ServerError(err);
    }

    // If question not found in db
    if (!question) {
        /* #swagger.responses[400] = { 
            schema: { $ref: "#/definitions/BadRequestError" },
            description: 'Bad Request.' 
        } */
        return res.status(400).json({ message: 'Question not found or user has already added an answer to the question' });
    }

    // Add answer to the retrieved question model
    question.answers.push(answer);
    
    // Update the question
    let savedQuestion;
    try {
        savedQuestion = await question.save();
    } catch(err) {
        throw new ServerError(err);
    }

    // Add answer reference to user model
    user.answers.push(answer);
    try {
        await user.save();
    } catch(err) {
        throw new ServerError(err);
    }

    /* #swagger.responses[201] = { 
        schema: { $ref: "#/definitions/AnswerAddSuccessResponse" },
        description: 'Answer add successful.' 
    } */
    res.status(201).send({
        message: "answer posted successfully",
        'question-id': savedQuestion.id
    });
}

/**
 * This function helps to update an answer to a question.
 * 
 * @param {*} req 
 * @param {*} res
 */
exports.updateAnswer = async (req, res) => {    
    // #swagger.tags = ['QA-Platform']
    // #swagger.description = 'Endpoint for updating an answer.'

    /* #swagger.parameters['answer'] = {
            in: 'body',
            description: 'Answer details.',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/Answer" }
    } */
    
    // Extract the request details
    const questionId = req.body['question']['question-id'];
    const answerTxt = req.body['question']['answer'];
    const user = res.locals.user;

    // Update the answer if present in system
    let question;
    try {
        question = await  Question.findOneAndUpdate(
                            {
                                id: questionId,
                                'answers.createdBy': user 
                            },
                            {
                                'answers.$.answer': answerTxt
                            });
    } catch(err) {
        throw new ServerError(err);
    }

    // If no such answer present
    if (!question) {
        /* #swagger.responses[404] = { 
            schema: { $ref: "#/definitions/NotFoundError" },
            description: 'Not found.' 
        } */
        return res.status(404).json({ message: 'Did not find any relevant answer to update' });
    }
             
    /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/AnswerUpdateSuccessResponse" },
        description: 'Answer update successful.' 
    } */    
    res.status(200).send({
        message: "answer updated successfully",
        'question-id': question.id
    });
}

/**
 * This function helps to retrieve all questions.
 * 
 * @param {*} req 
 * @param {*} res
 */
exports.getAllQuestions = (req, res) => {
    // #swagger.tags = ['QA-Platform']
    // #swagger.description = 'Endpoint for fetching all questions.'

    // Extract pagination parametes from request
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    let total;
    Question.find()
        .count()
        .then(numQuestions => {
            total = numQuestions;
            return Question.find()
                    .skip((page-1) * limit)
                    .limit(limit)
                    .select("title body id answers.id answers.answer answers.upvotesCount -_id");
        })
        .then(questions => {
            /* #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/FetchAllQuestionsSuccessResponse" },
                description: 'Fetch all questions successful.' 
            } */
            return res.status(200)
                .set({
                    total: total,
                    hasNextPage: (limit * page) < total,
                    hasPreviousPage: page > 1,
                    nextPage: page + 1,
                    previousPage: page - 1,
                    lastPage: Math.ceil(total / limit)
                })
                .send(questions);
        })
        .catch(err => {
            throw new ServerError(err);
        });
}

/**
 * This function helps to retrieve a question.
 * 
 * @param {*} req 
 * @param {*} res
 */
exports.getQuestion = async (req, res) => {
    // #swagger.tags = ['QA-Platform']
    // #swagger.description = 'Endpoint for fetching a question.'

    const questionId = req.params.questionId;

    // Retrieve the question from db
    let question;
    try {
        question = await Question.findOne({ id: questionId })
                                    .select("title body id answers.id answers.answer answers.upvotesCount -_id")
                                    .exec();
    } catch(err) {
        throw new ServerError(err);
    }

    // If question was not found
    if (!question) {
        /* #swagger.responses[404] = { 
            schema: { $ref: "#/definitions/NotFoundError" },
            description: 'Not found.' 
        } */
        return res.status(404).json({ message: 'Question with id ' + questionId + ' not found' });
    }

    const resModel = question.toObject();
    resModel.answers.sort((a, b) => {
        if (a.upvotesCount > b.upvotesCount) {
          return -1;
        }
        if (a.upvotesCount < b.upvotesCount) {
          return 1;
        }
        return 0;
      });

    /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/FetchQuestionSuccessResponse" },
        description: 'Fetch question successful.' 
    } */    
    res.status(200).send(resModel);
}

/**
 * This function helps a user to upvote an answer.
 * 
 * @param {*} req 
 * @param {*} res
 */
exports.upvoteAnswer = async (req, res) => {
    // #swagger.tags = ['QA-Platform']
    // #swagger.description = 'Upvote an answer.'

    // #swagger.parameters['questionId'] = { description: 'Question ID' }
    const questionId = req.params.questionId;

    // #swagger.parameters['answerId'] = { description: 'Answer ID' }
    const answerId = req.params.answerId;

    const user = res.locals.user;

    // Find and upvote answer if available
    let question;
    try {
        question = await Question.findOneAndUpdate(
                        {
                            id: questionId,
                            'answers.id': answerId,
                            'answers.createdBy': { '$ne': user },
                            'answers.upvotes': { '$ne': user }
                        },
                        {
                            '$push': { 'answers.$.upvotes': user },
                            '$inc': { 'answers.$.upvotesCount': 1 }
                        }
                    );
    } catch(err) {
        throw new ServerError(err);
    }

    // If unable to upvote the answer
    if (!question) {
        /* #swagger.responses[400] = { 
            schema: { $ref: "#/definitions/BadRequestError" },
            description: 'Bad Request.' 
        } */
        return res.status(400).json({ message: 'Did not find any relevant answer to upvote or user has already voted for the answer or attempting to answer one\'s own answer.' });
    }

    // Retrieve the corresponding answer id
    let desAnswerId;
    for (let i = 0; i < question.answers.length; i++) {
        if (question.answers[i].id == answerId) {
            desAnswerId = question.answers[i]._id;
            break;
        }
    }

    // Increase the reputation of the user who had answered the corresponding question
    try {
        await User.findOneAndUpdate(
            {
                answers: desAnswerId
            },
            {
                '$inc': { 'reputations': 10 }
            }
        )
    } catch(err) {
        throw new ServerError(err);
    }
             
    /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/AnswerUpdateSuccessResponse" },
        description: 'Answer update successful.' 
    } */    
    res.status(200).send({
        message: "answer upvoted successfully"
    });

}