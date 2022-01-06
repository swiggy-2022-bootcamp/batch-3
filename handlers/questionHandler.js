class QuestionHandler {
    constructor(questionDbWrapper) {
        this.questionDbWrapper = questionDbWrapper;
    }

    async postQuestion(username, title, body) {
        try {
            const question = await this.questionDbWrapper.createQuestion(username, title, body);
            return {success: true, status: 201, message: "Question posted successfully", questionId: question.id};
        } catch(err) {
            console.log(err);
            throw err;
        }
    }

    async answerQuestion(questionId, username, answer) {
        try {
            const questionExists = await this.questionDbWrapper.verifyQuestionExists(questionId);
            if(!questionExists) {
                throw {success: false, status: 404, message: "Cannot find question"};
            }
            const notAlreadyAnswered = await this.questionDbWrapper.verifyUserHasNotAnsweredQuestion(questionId, username);
            if(!notAlreadyAnswered) {
                throw {success: false, status: 400, message: "Cannot answer a question more than once"};
            } else {
                await this.questionDbWrapper.answerQuestion(questionId, username, answer);
                return {success: true, status: 201, message: "Answer posted successfully", questionId};
            }
        } catch(err) {
            console.log(err);
            throw err;
        }
    }

    async updateAnswer(questionId, username, updatedAnswer) {
        try {
            const questionExists = await this.questionDbWrapper.verifyQuestionExists(questionId);
            if(!questionExists) {
                throw {success: false, status: 404, message: "Cannot find question"};
            }
            const hasUserAnsweredQuestion = await this.questionDbWrapper.verifyUserHasAnsweredQuestion(questionId, username);
            if(!hasUserAnsweredQuestion) {
                throw {success: false, status: 401, message: "Cannot edit answer if not answered already"};
            }
            await this.questionDbWrapper.updateAnswer(questionId, username, updatedAnswer);
            return {status: 200, success: true, message: "Answer updated successfully", questionId};
        } catch(err) {
            console.log(err);
            throw err;
        }
    }

    async getAllQuestionsWithAnswers() {
        try {
            const questions = await this.questionDbWrapper.getAllQuestionsWithAnswers();
            return {status: 200, success: true, questions};
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
}

module.exports = QuestionHandler;