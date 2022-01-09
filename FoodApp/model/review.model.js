const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  foodId: { type: Number, required: true },
  userId: { type: Number, required: true },
  rating: { type: Number, required: true },
  description: { type: String, default: "" },
});

module.exports = mongoose.model("review", ReviewSchema);
