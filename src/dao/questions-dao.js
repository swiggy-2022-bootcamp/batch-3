const fs = require('fs');
const path = require('../utils/path');

class QuestionsDao {
    questions = [];

    static init = () => {
        const contents = fs.readFileSync(path + "/data/questions.json", "utf8");
        if (!contents) {
            this.questions = [];
        } else {
            this.questions = JSON.parse(contents);
        }
    }

    static getAllQuestions = () => {
        return this.questions;
    }

    static getQuestionById = (id) => {
        return this.questions.find(q => q.id == id);
    }

    static addQuestion = (question) => {
        this.questions.push(question);
        this.updateFile();
    }

    static addAnswer = (questionId, answer) => {        
        const question = this.questions.find(q => q.id == questionId);
        question.answers.push(answer);
        this.updateFile();
    }

    static updateAnswer = (questionId, answer) => {        
        const question = this.questions.find(q => q.id == questionId);
        question.answers = question.answers.filter(ans => ans.createdBy != answer.createdBy);
        question.answers.push(answer);
        this.updateFile();
    }

    static updateFile = () => {
        fs.writeFileSync(path + "/data/questions.json", JSON.stringify(this.questions, null, 4));
    } 
}

module.exports = QuestionsDao;