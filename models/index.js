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
    // /* User (One) ==> Question (Many)*/
    await User.hasMany(Question);
    await Question.belongsTo(User);
    // /* Question (One) ==> Answer (Many) */
    await Question.hasMany(Answer);
    await Answer.belongsTo(Question);
})();

console.log('SQLite: ✔ Association Established.')