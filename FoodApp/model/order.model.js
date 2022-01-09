const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let ItemSchema = new Schema(
  {
    foodId: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
  },
  {
    timestamps: true,
  }
);
const OrderSchema = new Schema(
  {
    items: [ItemSchema],
    userId: {
      type: Number,
      required: true,
    },
    total: {
      default: 0,
      type: Number,
    },
    discount: {
      default: 0,
      type: Number,
    },
    coupon:{
        default:null,
        type: String,
    },
    finalPrice: {
        default: 0,
        type: Number
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", OrderSchema);
