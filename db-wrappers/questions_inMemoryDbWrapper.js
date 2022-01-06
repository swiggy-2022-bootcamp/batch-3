const {randomBytes} = require("crypto");

class QuestionsInMemoryDbWrapper {
    constructor() {
        this.questions = [];
    }

    async createQuestion(username, title, body) {
        const questionId = randomBytes(8).toString('hex');
        const question = {
            id: questionId,
            username,
            title,
            body,
            answers: []
        };
        this.questions.push(question);
        return question;
    }

    async verifyQuestionExists(questionId) {
        return this.questions.find(question => question.id === questionId) !== undefined;
    }

    async verifyUserHasNotAnsweredQuestion(questionId, username) {
        const question = this.questions.find(question => question.id === questionId);
        return question.answers.filter(answer => answer.username === username).length === 0;
    }

    async verifyUserHasAnsweredQuestion(questionId, username) {
        const question = this.questions.find(question => question.id === questionId);
        return question.answers.find(answer => answer.username === username) !== undefined;
    }

    async answerQuestion(questionId, username, answer) {
        let question = this.questions.find(question => question.id === questionId);
        question.answers.push({
            username, answer
        });
    }

    async updateAnswer(questionId, username, updatedAnswer) {
        let question = this.questions.find(question => question.id === questionId);
        question.answers = question.answers.map(answer => {
            if(answer.username === username) {
                answer.answer = updatedAnswer;
            }
            return answer;
        })
    }

    async getAllQuestionsWithAnswers() {
        return this.questions;
    }
}

module.exports = QuestionsInMemoryDbWrapper;