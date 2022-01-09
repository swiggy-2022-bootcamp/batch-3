const FoodItem = require("../model/food.model");

/* To get all the food items */
exports.getFoodItems = async () => {
    const foodItems = await FoodItem.find();
    return foodItems;
};

/* To get a single food item by its id */
exports.getFoodItemById = async foodId => {
    const foodItem = await FoodItem.find({ foodId: foodId });
    return foodItem;
}

/* To add a food item */
exports.addFoodItem = async payload => {
    const newFoodItem = await FoodItem.create(payload);
    return newFoodItem
}