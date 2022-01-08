const mongoose = require("mongoose");
const {AutoIncrement} = require("../config/database")

const FoodSchema = new mongoose.Schema({
  foodId: { type: Number, default: null, required: true, unique: true },
  foodName: { type: String, default: null, required: true },
  foodCost: { type: Number, default: null, required: true },
  foodType: { type: String, required: true },
});
FoodSchema.plugin(AutoIncrement, {id: 'food_id_counter', inc_field: "id" });

module.exports = mongoose.model("foodItem", FoodSchema);
