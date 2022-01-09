const foodQuery = require("../query/food.query");

/* To add food item */
async function addFoodItem(req, res) {
  try {
    const { foodId, foodName, foodCost, foodType } = req.body;
    const payload={
      foodId,
      foodName,
      foodCost,
      foodType,
    }
    const newFoodItem = await foodQuery.addFoodItem(payload);
    res.status(201).json(newFoodItem);
  } catch (err) {
    res.json({"error":err});
  }
}

/* To get a single food item */
async function getFoodItemById(req, res) {
  try {
    let { foodId } = req.params;
    foodId = parseInt(foodId);
    let foodItem = await foodQuery.getFoodItemById(foodId);
    if (foodItem.length == 0) {
      res.status(404).json(`Sorry user with food item ${foodId} not found`);
    }
    res.status(200).json(foodItem[0]);
  } catch (err) {
    res.json({"error":err});
  }
}

/* To get all the food items */
async function getFoodItems(req, res) {
  try {
    let foodItems = await foodQuery.getFoodItems();
    res.status(200).json(foodItems);
  } catch (err) {
    res.json({"error":err});
  }
}

module.exports = {
  addFoodItem,
  getFoodItemById,
  getFoodItems,
};
