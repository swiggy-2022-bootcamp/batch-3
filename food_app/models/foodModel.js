import mongoose, { Schema } from 'mongoose';

/* Create database schema for foods */
const FoodSchema = new Schema({
    foodID: Number,
    foodName: {
        type: String,
        required: true,
        description: "What is the food name? - must be string and is required"
    },
    foodCost: Number,
    foodType: {
        type: String,
        required: true,
        enum: ["Indian", "Chinese", "Mexican"],
        description: "What is the food type? - can only be one of the enum values and is required"
    },
});

export default mongoose.model('Food', FoodSchema);