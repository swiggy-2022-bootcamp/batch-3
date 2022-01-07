/* Model Definition for Users table */

/* Import Dependencies */
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* Define the User class */
class User extends Model {

    static async generateJWT ( username ) {
        const SECRET = process.env.JWT_SECRET;
        const token = await jwt.sign(
            { username: username },
            SECRET,
            { expiresIn: '1h' }
        );
        return token;
    }

    // Static Method to Verify Password
    static async checkPassword (username, password) {
        const user = await User.findOne({ where: { username: username }});
        if(user) {
            return user.isMatched(password);
        }
        return false;
    }

    // Method for matching password
    async isMatched (password) {
        return bcrypt.compareSync(password, this.password);
    }

};

/* Initialize User Model */
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'user-id'
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
            unique: true,
            field: 'email',
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            field: 'password',
            set(value) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(value, salt);
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
        updatedAt: 'updatedTimeStamp'
    }
)


module.exports = { User }