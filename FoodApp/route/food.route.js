const router = require("express").Router();
const foodItems = require("../controller/food.controller");

/* Get all the food items */
router.get("/", foodItems.getFoodItems);

/* Post a food item */
router.post("/", foodItems.addFoodItem);

/* Get a single food item by its id */
router.get("/:foodId", foodItems.getFoodItemById);

module.exports = router;
