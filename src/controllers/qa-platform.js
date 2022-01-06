const QuestionsDao = require('../dao/questions-dao');
const Question = require('../models/question');
const Answer = require('../models/answer');

exports.addQuestion = (req, res) => {
    const questionTitle = req.body['question']['title'];
    const questionBody = req.body['question']['body'];
    const userId = 'b0a23ed0-64e9-43d7-9f57-87d88043e116';
    const question = new Question(questionTitle, questionBody, userId);
    QuestionsDao.addQuestion(question);
    res.status(201).send({
        message: 'Question posted successfully',
        'question-id': question.id
    });        
};

exports.addAnswer = (req, res) => {
    const questionId = req.body['question']['question-id'];
    const answerTxt = req.body['question']['answer'];
    const userId = 'b0a23ed0-64e9-43d7-9f57-87d88043e116';
    const answer = new Answer(answerTxt, userId);
    QuestionsDao.addAnswer(questionId, answer);

    res.status(201).send({
        message: "answer posted successfully",
        'question-id': questionId
    });
};

exports.updateAnswer = (req, res) => {    
    const questionId = req.body['question']['question-id'];
    const answerTxt = req.body['question']['answer'];
    const userId = 'b0a23ed0-64e9-43d7-9f57-87d88043e116';
    const answer = new Answer(answerTxt, userId);
    QuestionsDao.updateAnswer(questionId, answer);

    res.status(200).send({
        message: "answer updated successfully",
        'question-id': questionId
    });
};

exports.getAllQuestions = (req, res) => {
    res.status(200).send(QuestionsDao.getAllQuestions());
};

exports.getQuestion = (req, res) => {    
    const questionId = req.params.questionId;
    res.status(200).send(QuestionsDao.getQuestionById(questionId));
};

exports.deleteQuestion = (req, res) => {    
    res.status(200).send('Deleted a question');
};