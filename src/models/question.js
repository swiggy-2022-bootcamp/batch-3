const { v4: uuidv4 } = require('uuid');

class Question {
    answers = [];

    constructor(title, body, userId) {
        this.id = uuidv4();
        this.title = title;
        this.body = body;

        this.createdBy = userId;        
        this.updatedBy = userId;

        const currentTs = new Date().toISOString();
        this.createdTs = currentTs;
        this.updatedTs = currentTs;
    }

    addAnswer(ans) {
        this.answers.push(ans);
    }

    getAnswer(id) {
        this.answers.find(ans => ans.id == id);
    }

    updateAnswer(userId, updatedAns) {
        this.answers = this.answers.filter(a => a.userId == userId);        
        this.answers.push(updatedAns);
    }

}

module.exports = Question;