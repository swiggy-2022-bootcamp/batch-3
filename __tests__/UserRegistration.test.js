const app = require('../app');
const request = require('supertest');
const { sequelize } = require('../config/database');

// Constants
const {
    USER_REGISTERATION_SUCCESS,
} = require('../utils/constants');
const { User } = require('../models/user.model');

/* Dummy User Details */
const newUser = {
    username: 'sachinsom93',
    email: 'sachinsom507@gmail.com',
    password: 'test123',
    name: 'sachin som'
};

const loginUser = {
    username: 'sachinsom93',
    password: 'test123'
};

beforeAll(() => {
    return sequelize.sync();
})

beforeEach(() => {
    return User.destroy({ truncate: true })
})

/* Test Suites */
describe('User Registration', () => {
    function postUser () {
        return request(app)
        .post(`/users/registration/`)
        .send(newUser);
    }
    it('Should Return 201 Status on Successfull Registration.', async () => {
        const res = await postUser();
        expect(res.status).toBe(201);
    });
    it('Should Return Success Message on Successfull Registeration.', async () => {
        const res = await postUser();
        expect(res.body.message).toBe(USER_REGISTERATION_SUCCESS);
        expect(res.body["registration-name"]).toBe(newUser.name);
    });
    it('Should Create a New Row in the Database.', async () => {
        await postUser();
        const userList = await User.findAll();
        expect(userList.length).toBe(1);
    });
    it('Should Save Username and Email to Database.', async () => {
        await postUser();
        const userList = await User.findAll();
        const savedUser = userList[0];
        expect(savedUser.username).toBe(newUser.username);
        expect(savedUser.email).toBe(newUser.email);
    });
    it('Should Show Error on Duplicate Email Address', async () => {
        await postUser();
        const res = await postUser();
        expect(res.body.message).not.toBe(USER_REGISTERATION_SUCCESS);
    })
    it('Should Hash The Password Before Storing in Database.', async () => {
        await postUser();
        const userList = await User.findAll();
        const savedUser = userList[0];
        expect(savedUser.password).not.toBe(newUser.password);
    });
})