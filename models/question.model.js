/* Defining Question Model */

const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

/* Declare Question Model */
class Question extends Model {

    upVote (voterID) {
        this.votes += 1;
    }
    downVote () {
        if(this.votes) {
            this.votes -= 1;
        }
    }
};

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
        },
        votes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'votes'
        },
        votersID: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            field: 'votersID'
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
