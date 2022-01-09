/* Defining Question Model */

const { User } = require('./user.model');
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');
const { QUESTION_ALREADY_LIKED, QUESTION_NOT_LIKED } = require('../utils/constants');

/* Declare Question Model */
class Question extends Model {

    /* upVoting An Question */
    async upVote(userID) {
        const liked = this.hasLiked(userID);
        if(liked) {
            const err = new Error(QUESTION_ALREADY_LIKED);
            err.status = 406;
            throw(err);
        }
        this.votes += 1;
        this.addVoter(userID);
        const askedByUser = await User.findByPk(this.UserId);
        await askedByUser.addUpvotePoints();
    }

     /* DownVoting an Question */
    async downVote(userID) {
        const liked = this.hasLiked(userID);
        if(!liked) {
            const err = new Error(QUESTION_NOT_LIKED);
            err.status = 406;
            throw(err);
        }
        this.votes -= 1;
        this.removeVoter(userID);
        const askedByUser = await User.findByPk(this.UserId);
        await askedByUser.addUpvotePoints();
    }

    /* Check If Any Particular user liked or not. */
    hasLiked(userID) {
        return (this.votersID.find(val => val == userID)) ? true : false;
    }

    /* Add UserId to voters array */
    addVoter(userID) {
        const voters = this.votersID;
        voters.push(userID);
        this.votersID = voters;
    }

    /* Remove UserId from voters array */
    removeVoter(userID) {
        const updatedVoters = this.votersID.filter(val => val != userID)
        this.votersID = updatedVoters;
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
            type: DataTypes.STRING,
            allowNull: true,
            field: 'votersID',
            defaultValue: "",
            get() {
                return this.getDataValue('votersID').split(";"); // Deserialize
            },
            set(val) {
                this.setDataValue('votersID', val.join(";")); // Serialize
            }
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
