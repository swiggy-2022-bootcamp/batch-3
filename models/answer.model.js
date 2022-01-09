const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');
const { ANSWER_ALREADY_LIKED, ANSWER_NOT_LIKED } = require('../utils/constants');
const { User } = require('./user.model');

/**
 * Declare Answer Model
 */
class Answer extends Model {

    /* upVoting An Answer */
    async upVote(userID) {
        const liked = this.hasLiked(userID);
        if(liked) {
            const err = new Error(ANSWER_ALREADY_LIKED);
            err.status = 406;
            throw(err);
        }
        this.votes += 1;
        this.addVoter(userID);
        const answeredUser = await User.findByPk(this.UserId);
        console.log(answeredUser)
        await answeredUser.addUpvotePoints();
    }

     /* DownVoting an Answer */
    async downVote(userID) {
        const liked = this.hasLiked(userID);
        if(!liked) {
            const err = new Error(ANSWER_NOT_LIKED);
            err.status = 406;
            throw(err);
        }
        this.votes -= 1;
        this.removeVoter(userID);
        const answeredUser = await User.findByPk(this.UserId);
        console.log(answeredUser)
        await answeredUser.addUpvotePoints();
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
        modelName: 'Answer',
        tableName: 'Answers',
        timestamps: true,
        createdAt: 'postedTimeStamp',
        updatedAt: 'updatedTimeStamp'
    }
);

module.exports = { Answer };
