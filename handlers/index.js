const iUserHandler = require('./userHandler');
// const UsersInMemoryDbWrapper = require('../db-wrappers/users_inMemoryDbWrapper');
const UsersMongoWrapper = require('../db-wrappers/users_mongoWrapper');

const iQuestionHandler = require('./questionHandler');
// const QuestionsInMemoryDbWrapper = require('../db-wrappers/questions_inMemoryDbWrapper');
const QuestionsMongoWrapper = require('../db-wrappers/questions_mongoWrapper');

const userHandler = new iUserHandler(new UsersMongoWrapper());
const questionHandler = new iQuestionHandler(new QuestionsMongoWrapper());

module.exports = {
    userHandler,
    questionHandler
};