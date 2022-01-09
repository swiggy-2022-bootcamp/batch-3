const { Question } = require('../models/question.model');

/**
 * Check which user can have access
 * to edit question.
*/
async function canEditQuestion(req, res, next) {
    try {
        const user = req.user;
        const question_id = req.body.question["question-id"];
        const question = await Question.findByPk(question_id);
        const hasAsked = await user.hasQuestion(question);
        if(hasAsked) {
            next();
        }
        else {
            const err = new Error('You don\'t have right to edit this question');
            err.status = 401;
            throw(err);
        }
    }
    catch(error) {
        next(error);
    }
};

module.exports = { canEditQuestion };