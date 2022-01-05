/* Model Definition for Users table */

// Import Dependencies
const { DataTypes, Model, UniqueConstraintError } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

// Define the User class
class User extends Model {

    /* Need to add more instance level and class level members. */

    // Offcial Representation of User Entries
    getUser () {
        return `${this.id} ${this.email} - ${this.name}`;
    }
};

// Initialize User Model
User.init(
    {
        id: {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            field: 'id'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'registration-name'
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            allowNull: false,
            field: 'username',
        },
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
            field: 'email',
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            // Need to add validation
            field: 'password',
            set(value) {
                // Generate salt
                const salt = bcrypt.genSaltSync(10);
                // Generate hashed password
                const hash = bcrypt.hashSync(value, salt);
                // Substitute hashed password with password
                this.setDataValue('password', hash);
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'User',
        tableName: 'Users',
        createdAt: 'createdTimeStamp',
        updatedAt: 'updateTimeStamp'
    }
)


module.exports = { User }