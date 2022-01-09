var mongoose = require("mongoose");

var FoodSchema = mongoose.Schema({
  foodId: {
    type: Number,
    required: true,
  },
  foodName: {
    type: String,
    required: true,
  },
  foodCost: {
    type: Number,
    required: true,
  },
  foodType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Food", FoodSchema);
