require("dotenv").config();

const iQuestionHandler = require('../handlers/questionHandler');
const QuestionsInMemoryDbWrapper = require('../db-wrappers/questions_inMemoryDbWrapper');

const questionHandler = new iQuestionHandler(new QuestionsInMemoryDbWrapper());

let questionId = null;

test('should allow users to post questions', async () => {
    let username = "abcd@gmail.com";
    let title = "sample question";
    let body = "sample body";
    let result = await questionHandler.postQuestion(username, title, body);
    expect(result.status).toBe(201);
    expect(result.questionId.length).toBe(16);
    questionId = result.questionId;
})

test('should allow users to post answers to questions', async () => {
    let username = "abcd@gmail.com";
    let answer = "sample answer";
    let result = await questionHandler.answerQuestion(questionId, username, answer);
    expect(result.status).toBe(201);
})

test('should throw an error when questionId is not found', async () => {
    let id = "1234456";
    let username = "abcd@gmail.com";
    let answer = "sample answer";
    await expect(questionHandler.answerQuestion(id, username, answer)).rejects.toHaveProperty("message", "Cannot find question");
})


test('should not allow users to post answers to questions twice', async () => {
    let username = "abcd@gmail.com";
    let answer = "duplicate answer";
    await expect(questionHandler.answerQuestion(questionId, username, answer)).rejects.toHaveProperty("message", "Cannot answer a question more than once");
})

test('should allow users to edit their own answers', async () => {
    let username = "abcd@gmail.com";
    let answer = "updated answer";
    let result = await questionHandler.updateAnswer(questionId, username, answer);
    expect(result.status).toBe(200);
})

test('should throw an error if questionId is not found', async () => {
    let questionId = "1234";
    await expect(questionHandler.updateAnswer(questionId, "abc@gmail.com", "dummy update")).rejects.toHaveProperty("message", "Cannot find question");
})


test('should not allow users to edit answers if not already answered', async () => {
    let username = "abcd2@gmail.com";
    let answer = "updated answer";
    await expect(questionHandler.updateAnswer(questionId, username, answer)).rejects.toHaveProperty("message", "Cannot edit answer if not answered already");
})

test('should return all questions with answers correctly', async () => {
    let result = await questionHandler.getAllQuestionsWithAnswers();
    expect(result.questions.length).toBe(1);
})
