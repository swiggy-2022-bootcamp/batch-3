const express = require("express");
const router = express.Router();
const Food = require("../models/foodModel");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

router.post("/food", auth, async (req, res, next) => {
  try {
    let { foodId, foodName, foodCost, foodType } = req.body;
    let food = new Food({
      foodId,
      foodName,
      foodCost,
      foodType,
    });
    var savedFood = await food.save();
    res.status(201).json({ food: savedFood });
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
});

router.get("/food/:foodID", auth, async (req, res) => {
  try {
    const foodId = req.params.foodID;
    var foodInfo = await Food.findOne({ foodId: foodId });
    if (!foodInfo) {
      res.status(404).json({ message: `Sorry Food not found` });
    }
    res.status(200).json({ food: foodInfo });
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
});

module.exports = router;
