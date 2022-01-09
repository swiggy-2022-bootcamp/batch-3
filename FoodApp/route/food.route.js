const router = require("express").Router();
const foodItems = require("../controller/food.controller");

router.get("/", foodItems.getFoodItems)
router.post("/", foodItems.addFoodItem);

router.get("/:foodId", foodItems.getFoodItemById);


module.exports = router;
