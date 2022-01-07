// /* Defining Association Between Models */
// /*

// 1. One to Many Relationship b/w User ( parent ) and Question ( child ).
// 2. One to Many Relationship b/w Question ( parent ) and Answer ( child ).

// */

/* Import Models */
const { User } = require('./user.model');
const { Question } = require('./question.model');
const { Answer } = require('./answer.model');

(async () => {

    await User.hasMany(Question);
    await Question.belongsTo(User);

    await Question.hasMany(Answer);
    await Answer.belongsTo(Question);

    await User.hasMany(Answer);
    await Answer.belongsTo(User);
})();

console.log('SQLite: ✔ Association Established.')