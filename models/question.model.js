/* Defining Question Model */

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

/* Declare Question Model */
class Question extends Model {};

/* Initialize Question Model */
Question.init(
    {
        question_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            field: 'question-id'
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'title'
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'body'
        }
    },
    {
        sequelize,
        modelName: 'Question',
        tableName: 'Questions',
        timestamps: true,
        createdAt: 'postedTimeStamp',
        updatedAt: 'updatedTimeStamp'
    }
);

module.exports = { Question };
