const request = require('supertest')
const app = require('../app')
const Question = require('../models/questionModel')
const { userTwoId, userTwo, setupDatabase2, token2 } = require('./fixtures/db')


beforeEach(setupDatabase2)

test('Should create question for user', async () => {
    const response = await request(app)
        .post('/question')
        .set('Authorization', `Bearer ${token2}`)
        .send({
            title:"python",
            body:"is python fun",
            tags:["python"],
        })
        .expect(201)
    const question = await Question.findById(response.body.doc.id)
    expect(question).not.toBeNull()

})