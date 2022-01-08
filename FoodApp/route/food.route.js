const router = require("express").Router();
const foodItems = require("../controller/food.controller");

router.post("/", foodItems.addFoodItem);

router.get("/:userId", foodItems.getSingleFoodItem);


module.exports = router;
