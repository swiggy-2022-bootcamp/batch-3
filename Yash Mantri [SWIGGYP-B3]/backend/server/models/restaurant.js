module.exports = (sequelize, DataTypes) => {
    const restaurant = sequelize.define('restaurant', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });

    restaurant.associate = (models) => {
        restaurant.hasMany(models.restaurantmenu, {
            foreignKey: 'restaurantId',
            as: 'restaurantmenu',
        });
    };

    return restaurant;
};