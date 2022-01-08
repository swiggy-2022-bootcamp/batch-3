/* Import Dependencies */
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { udpateBadge } = require('../utils/updateBadge');

/* Define the User class */
class User extends Model {

    static async generateJWT ( username ) {
        const SECRET = process.env.JWT_SECRET;
        const token = await jwt.sign(
            { username: username },
            SECRET,
            { expiresIn: '24h' }
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
        },
        reputation_point: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 0,
        },
        badge: {
            type: DataTypes.ENUM,
            values: ['NewBie', 'Apprentice', 'Advanced', 'Experienced', 'Superior', 'Ultra', 'Professional', 'Expert', 'Champion', 'Master', 'Celebrity', 'Legendary'],
            defaultValue: 'NewBie',
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

/*
 * Hook for Updating badge according fto reputation_point.
 */
User.addHook('afterUpdate', async (user, options) => {
    await udpateBadge(user, options)
})


/*
 * Hook for factoring Date types.
 */
User.addHook('beforeCreate', (user, options) => {
    user.dataValues.createdAt = new Date().toISOString().replace(/T/, ' '). replace(/\.. + /g, '');
    user.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' '). replace(/\.. + /g, '');
});

module.exports = { User }