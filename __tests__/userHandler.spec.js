const iUserHandler = require('../handlers/userHandler');
const UsersInMemoryDbWrapper = require('../db-wrappers/users_inMemoryDbWrapper');
const bcryptWrapper = require('../wrappers/bcryptWrapper');

const userHandler = new iUserHandler(new UsersInMemoryDbWrapper(), new bcryptWrapper());

test('should register a user successfully', async () => {
    let username = "abcd@gmail.com";
    let password = "123";
    let registrationName = "prafful";
    let result = await userHandler.register(registrationName, username, password);
    expect(result.status).toBe(201);
})

test('should not allow duplicate users', async () => {
    let username = "abcd@gmail.com";
    let password = "123";
    let registrationName = "prafful";
    await expect(userHandler.register(registrationName, username, password)).rejects.toHaveProperty("message", "User already exists");
})

test('should allow login to registered users', async () => {
    let username = "abcd@gmail.com";
    let password = "123";
    let result = await userHandler.login(username, password);
    expect(result.status).toBe(200);
})

test('should not allow login to incorrect credentials', async () => {
    let username = "abcd@gmail.com";
    let password = "12345";
    await expect(userHandler.login(username, password)).rejects.toHaveProperty("status", 401);
    await expect(userHandler.login(username, password)).rejects.toHaveProperty("message", "Sorry invalid credentials");
})