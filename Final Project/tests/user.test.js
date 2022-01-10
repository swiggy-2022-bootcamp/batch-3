const request = require('supertest')
const app = require('../app')
const User = require('../models/userModel')
const { userOneId, userOne, setupDatabase, token } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
    const response = await request(app).post('/register').send({
        name: 'Andrew',
        email: 'andrew@example.com',
        password: 'MyPass777'
    }).expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.data.user._id)
    expect(user).not.toBeNull()

    expect(user.password).not.toBe('MyPass777')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(201)
    const user = await User.findById(userOneId)
    expect(response.body.data.user.id).toBe(user.id)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'thisisnotmypass'
    }).expect(401)
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/updateMe')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'Karan'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Karan')
})