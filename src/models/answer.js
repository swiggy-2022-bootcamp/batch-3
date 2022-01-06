const { v4: uuidv4 } = require('uuid');

class Answer {
    
    constructor(answer, userId) {
        this.id = uuidv4();
        this.answer = answer;        

        this.createdBy = userId;        
        this.updatedBy = userId;

        const currentTs = new Date().toISOString();
        this.createdTs = currentTs;
        this.updatedTs = currentTs;
    }

}

module.exports = Answer;