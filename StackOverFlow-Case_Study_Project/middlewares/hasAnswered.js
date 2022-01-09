/*
*   Middleware to check if User
*   has already answered the question or
*   not.
*   @required => Must be used after loginRequired middleware.
*/

const { Question } = require('../models/question.model');

async function hasAnswered (req, res, next) {
    try {
        const question_id  = req.body.question["question-id"];
        if(!question_id) {
            const err = new Error('Question Id is required.');
            err.status = 406;
            next(err);
            return;
        }
        const user = req.user;
        const questionInstane = await Question.findByPk(question_id);
        if(!questionInstane) {
            const err = new Error('Please Provide a valid question Id.');
            err.status = 406;
            next(err);
            return;
        }
        const answers = await questionInstane.getAnswers();
        const answered = answers.find((answer) => answer.UserId == user.id );
        if(answered) {
            req.answerObj = answered;
            next();
            return;
        }
        const err = new Error('You have not answered the question.')
        err.status = 406;
        next(err);
        return;
    }
    catch(err) {
        next(err);
        return;
    }
}

module.exports = { hasAnswered };