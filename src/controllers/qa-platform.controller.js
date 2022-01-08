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
const ServerError = require('../error/server.error');

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
            throw new ServerError(err);
        });
}

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

    const questionId = req.body['question']['question-id'];
    const answerTxt = req.body['question']['answer'];
    const user = res.locals.user;

    const answer = new Answer({
        answer: answerTxt,    
        createdBy: user,
        updatedBy: user
    });


    let question;
    try {
        question = await Question.findOne({ id: questionId }).exec();
    } catch(err) {
        throw new ServerError(err);
    }

    if (!question) {
        return res.status(404).json({ message: 'Question with id ' + questionId + ' not found' });
    }

    question.answers.push(answer);
    
    let savedQuestion;
    try {
        savedQuestion = await question.save();
    } catch(err) {
        throw new ServerError(err);
    }

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
    
    const questionId = req.body['question']['question-id'];
    const answerTxt = req.body['question']['answer'];
    const user = res.locals.user;

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

    if (!question) {
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

exports.getAllQuestions = (req, res) => {
    // #swagger.tags = ['QA-Platform']
    // #swagger.description = 'Endpoint for fetching all questions.'

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
                    .select("title body answers.answer -_id");
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

exports.getQuestion = async (req, res) => {
    // #swagger.tags = ['QA-Platform']
    // #swagger.description = 'Endpoint for fetching a question.'

    // #swagger.parameters['id'] = { description: 'Question ID' }
    const questionId = req.params.questionId;

    let question;
    try {
        question = await Question.findOne({ id: questionId })
                                    .select("title body answers.answer -_id")
                                    .exec();
    } catch(err) {
        throw new ServerError(err);
    }

    if (!question) {
        return res.status(404).json({ message: 'Question with id ' + questionId + ' not found' });
    }

    /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/FetchQuestionSuccessResponse" },
        description: 'Fetch question successful.' 
    } */    
    res.status(200).send(question);
}

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
            throw new ServerError(err);
        })  
}

exports.upvoteAnswer = async (req, res) => {
    // #swagger.tags = ['QA-Platform']
    // #swagger.description = 'Upvote an answer.'

    // #swagger.parameters['questionId'] = { description: 'Question ID' }
    const questionId = req.params.questionId;

    // #swagger.parameters['answerId'] = { description: 'Answer ID' }
    const answerId = req.params.answerId;

    const user = res.locals.user;

    let question;
    try {
        question = await Question.findOneAndUpdate(
                        {
                            id: questionId,
                            'answers.id': answerId,
                            'answers.createdBy': { '$ne': user }
                        },
                        {
                            '$push': { 'answers.$.upvotes': user }
                        }
                    )
    } catch(err) {
        throw new ServerError(err);
    }

    if (!question) {
        return res.status(404).json({ message: 'Did not find any relevant answer to upvote' });
    }
             
    /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/AnswerUpdateSuccessResponse" },
        description: 'Answer update successful.' 
    } */    
    res.status(200).send({
        message: "answer upvoted successfully"
    });

}