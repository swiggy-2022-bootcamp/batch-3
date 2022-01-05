/* Model Definition for Users table */

/* Import Dependencies */
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

/* Define the User class */
class User extends Model {

    // Static Method to find User by Username
    static async getByUsername (username) {
        const user = await User.findOne({ where: { username: username }});
        console.log(user)
        return user && user.dataValues;
    }

    checkPassword (password) {
        return bcrypt.compareSync(password, this.password);
    }

    // Offcial Representation of User Entries
    getUser () {
        return `${this.id} ${this.email} - ${this.name}`;
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
        updatedAt: 'updatedTimeStamp'
    }
)


module.exports = { User }