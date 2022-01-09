const foodQuery = require("../query/food.query");

async function addFoodItem(req, res) {
  try {
    const { foodId, foodName, foodCost, foodType } = req.body;
    const payload={
      foodId,
      foodName,
      foodCost,
      foodType,
    }
    const newFoodItem = await foodQuery.createFoodItem(payload);
    res.status(201).json(newFoodItem);
  } catch (err) {
    res.json(["Submission Failed", err]);
  }
}

async function getSingleFoodItem(req, res) {
  try {
    let { foodId } = req.params;
    foodId = parseInt(foodId);
    let foodItem = await foodQuery.foodItemById(foodId);
    if (foodItem.length == 0) {
      res.status(404).json(`Sorry user with food item ${foodId} not found`);
    }
    res.status(200).json(foodItem[0]);
  } catch (err) {
    res.json({"error":err});
  }
}

async function getAllFoodItems(req, res) {
  try {
    let foodItems = await foodQuery.foodItems();
    res.status(200).json(foodItems);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  addFoodItem,
  getSingleFoodItem,
  getAllFoodItems,
};
