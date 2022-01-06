const fs = require('fs');
const path = require('../utils/path');

class UsersDao {
    users = [];

    static init = () => {
        const contents = fs.readFileSync(path + "/data/users.json", "utf8");
        if (!contents) {
            this.users = [];
        } else {
            this.users = JSON.parse(contents);
        }
    }

    static getUser = (username, password) => {
        return this.users.find(u => u.username == username && u.password == password);
    }

    static addUser = (user) => {
        this.users.push(user);
        this.updateFile();
    }

    static updateFile = () => {
        fs.writeFileSync(path + "/data/users.json", JSON.stringify(this.users, null, 4));
    } 
}

module.exports = UsersDao;