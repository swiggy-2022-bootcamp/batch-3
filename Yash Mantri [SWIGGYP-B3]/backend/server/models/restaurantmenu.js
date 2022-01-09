module.exports = (sequelize, DataTypes) => {
    const restaurantmenu = sequelize.define('restaurantmenu', {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
        },
    });

    restaurantmenu.associate = (models) => {
        restaurantmenu.belongsTo(models.restaurant, {
            foreignKey: 'restaurantId',
            onDelete: 'CASCADE',
        });
    };

    return restaurantmenu;
};