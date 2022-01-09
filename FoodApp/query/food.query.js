const FoodItem = require("../model/food.model");

exports.foodItems = async () => {
    const foodItems = await FoodItem.find();
    return foodItems;
};
exports.foodItemById = async foodId => {
    const foodItem = await FoodItem.find({ foodId: foodId });
    return foodItem;
}
exports.createFoodItem = async payload => {
    const newFoodItem = await FoodItem.create(payload);
    return newFoodItem
}
// exports.removeProduct = async id => {
//     const product = await Product.findByIdAndRemove(id);
//     return product
// }