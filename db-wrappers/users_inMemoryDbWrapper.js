class UsersInMemoryDbWrapper {
    constructor() {
        this.users = [];
    }

    addUser(registrationName, username, password) {
        const newUser = {registrationName, username, password};
        this.users.push(newUser);
        return newUser;
    }

    verifyUserExists(username, password) {
        return this.users.filter(user => user.username === username && user.password === password).length === 1;
    }

    verifyUniqueUser(username) {
        return this.users.filter(user => user.username === username).length === 1;
    }
}

module.exports = UsersInMemoryDbWrapper;