const router = require("express").Router();
const foodItems = require("../controller/food.controller");

router.get("/", foodItems.getAllFoodItems)
router.post("/", foodItems.addFoodItem);

router.get("/:foodId", foodItems.getSingleFoodItem);


module.exports = router;
