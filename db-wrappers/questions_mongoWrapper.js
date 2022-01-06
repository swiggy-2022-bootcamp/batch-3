const Question = require('../models/Question');
const mongoose = require('mongoose');

class QuestionsMongoWrapper {
    async createQuestion(username, title, body) {
        const question = await new Question({
            id: mongoose.Types.ObjectId(),
            username,
            title,
            body,
            answers: []
        }).save();
        return question;
    }

    async verifyQuestionExists(questionId) {
        const question = await Question.findOne({id: questionId}).exec();
        return question !== null;
    }

    async verifyUserHasNotAnsweredQuestion(questionId, username) {
        const question = await Question.findOne({id: questionId}).exec();
        return question.answers.filter(answer => answer.username === username).length === 0;
    }

    async verifyUserHasAnsweredQuestion(questionId, username) {
        const question = await Question.findOne({id: questionId}).exec();
        return question.answers.find(answer => answer.username === username) !== undefined;
    }

    async answerQuestion(questionId, username, answer) {
        const question = await Question.findOne({id: questionId}).exec();
        question.answers.push({
            username, answer
        });
        await question.save();
    }

    async updateAnswer(questionId, username, updatedAnswer) {
        const question = await Question.findOne({id: questionId}).exec();
        question.answers = question.answers.map(answer => {
            if(answer.username === username) {
                answer.answer = updatedAnswer;
            }
            return answer;
        })
        question.markModified('answers');
        await question.save();
    }

    async getAllQuestionsWithAnswers() {
        return Question.find({}).exec();
    }
}

module.exports = QuestionsMongoWrapper;