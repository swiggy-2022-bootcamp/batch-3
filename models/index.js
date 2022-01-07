/**
*   Defining Association Between Models
*
*   1. One to Many Relationship b/w User ( parent ) and Question ( child ).
*   2. One to Many Relationship b/w Question ( parent ) and Answer ( child ).
*   3. One to Many Relationship b/w User ( parent ) and Answer ( child ).
*/


const { User } = require('./user.model');
const { Question } = require('./question.model');
const { Answer } = require('./answer.model');

(async () => {
    await User.hasMany(Question);
    await Question.belongsTo(User);

    await Question.hasMany(Answer, { foreignKey: 'question_id'});
    await Answer.belongsTo(Question);

    await User.hasMany(Answer);
    await Answer.belongsTo(User);
})();

console.log('SQLite: ✔ Association Established.')