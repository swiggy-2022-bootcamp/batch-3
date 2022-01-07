const fs = require('fs');
const path = require('../utils/path');
const Question = require('../models/question'); 

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
        // this.questions.push(question);
        // this.updateFile();

        const q = new Question({
            title: question.title,
            body: question.body,            
            createdBy: question.userId,
            updatedBy: question.userId
        });
        q.save()
            .then(res => {
                console.log(res);
                return res;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static addAnswer = (questionId, answer) => {        
        const question = this.questions.find(q => q.id == questionId);
        question.answers.push(answer);
        this.updateFile();
    }

    static updateAnswer = (questionId, answerTxt, userId) => {        
        const question = this.questions.find(q => q.id == questionId);
        const answer = question.answers.find(ans => ans.createdBy == userId);
        answer.answer = answerTxt;
        answer.updatedTs = new Date().toISOString();
        this.updateFile();
    }

    static updateFile = () => {
        fs.writeFileSync(path + "/data/questions.json", JSON.stringify(this.questions, null, 4));
    } 
}

module.exports = QuestionsDao;