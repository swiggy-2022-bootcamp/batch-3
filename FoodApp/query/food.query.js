const FoodItem = require("../model/food.model");

exports.getFoodItems = async () => {
    const foodItems = await FoodItem.find();
    return foodItems;
};
exports.getFoodItemById = async foodId => {
    const foodItem = await FoodItem.find({ foodId: foodId });
    return foodItem;
}
exports.addFoodItem = async payload => {
    const newFoodItem = await FoodItem.create(payload);
    return newFoodItem
}