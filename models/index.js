/* Defining Association Between Models */
/*

1. One to Many Relationship b/w User ( parent ) and Question ( child ).
2. One to Many Relationship b/w Question ( parent ) and Answer ( child ).

*/

/* Import Models */
const { User } = require('./user.model');
const { Question } = require('./question.model');
const { Answer } = require('./answer.model');

/* User (One) ==> Question (Many)*/
User.hasMany(Answer);
Answer.belongsTo(User);

/* Question (One) ==> Answer (Many) */
Question.hasMany(Answer);
Answer.belongsTo(Question);