const Order = require("../model/order.model");

/* To place order */
exports.addOrder = async (payload) => {
    const newOrder = await Order.create(payload);
    return newOrder;
};

/* To get user order history */
exports.getOrdersbyUserId = async userId => {
    const orders = await Order.find({ userId: userId });
    return orders;
}