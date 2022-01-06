const { v4: uuidv4 } = require('uuid');

class User {
    
    constructor(fullName, username, password) {
        this.id = uuidv4();
        this.fullName = fullName;
        this.username = username;
        this.password = password;        

        this.createdBy = this.id;        
        this.updatedBy = this.id;

        const currentTs = new Date().toISOString();
        this.createdTs = currentTs;
        this.updatedTs = currentTs;
    }

}

module.exports = User;