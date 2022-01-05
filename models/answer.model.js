/* Defining Answer Model */

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

/* Declare Answer Model */
class Answer extends Model {};

/* Initialize Answer Model */
Answer.init(
    {
        answer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            field: 'answer-id'
        },
        answer: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'answer'
        }
    },
    {
        sequelize,
        modelName: 'Answer',
        tableName: 'Answers',
        timestamps: true,
        createdAt: 'postedTimeStamp',
        updatedAt: 'updatedTimeStamp'
    }
);

module.exports = { Answer };
