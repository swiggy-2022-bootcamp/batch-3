/* Defining Answer Model */

const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

/* Declare Answer Model */
class Answer extends Model {
    upVote(userID) {
        this.votes += 1;
    }
};

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
        },
        votes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'votes'
        },
        votersID: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false,
            field: 'votersID',
            defaultValue: null
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
