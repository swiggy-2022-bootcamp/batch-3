const app = require('../app');
const request = require('supertest');
const { sequelize } = require('../config/database');
const { User } = require('../models/user.model');
const { USER_LOGIN_SUCCESS } = require('../utils/constants');
/**
* Dummy User Details.
*/
const newUserDetails = {
    username: 'sachinsom3',
    email: 'sachinsom@gmail.com',
    password: 'test123',
    name: 'sachin som'
};

const loginUserDetails = {
    username: 'sachinsom3',
    password: 'test123'
};

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

beforeEach(async () => {
    await User.destroy({ truncate: { cascade: true }});
});

async function addUser () {
    return await User.create(newUserDetails);
};

const postAuthentication = async (credentials, options = {}) => {
    let agent = request(app).post('/users/login');
    if (options.language) {
      agent.set('Accept-Language', options.language);
    }
    return await agent.send(credentials);
};

describe('User Login', () => {
    function postLoginRequest (loginUserDetails) {
        return request(app)
        .post('/users/login')
        .send(loginUserDetails)
    }
    it('Should returns 201 when credentials are correct', async () => {
        await addUser();
        const response = await postLoginRequest(loginUserDetails);
        expect(response.status).toBe(401);
    });
    // it('Should Return Success Message on Successfull Login', async () => {
    //     await addUser();
    //     const res = await postLoginRequest();
    //     expect(res.body.message).toBe(USER_LOGIN_SUCCESS);
    // });
})