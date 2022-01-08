class UsersInMemoryDbWrapper {
    constructor() {
        this.users = [];
    }

    addUser(registrationName, username, password) {
        const newUser = {registrationName, username, password};
        this.users.push(newUser);
        return newUser;
    }

    findUserByUsername(username) {
        return this.users.find(user => user.username === username);
    }

    verifyUniqueUser(username) {
        return this.users.filter(user => user.username === username).length === 1;
    }
}

module.exports = UsersInMemoryDbWrapper;