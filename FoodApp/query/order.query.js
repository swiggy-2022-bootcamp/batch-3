const Order = require("../model/order.model");

exports.addOrder = async (payload) => {
    const newOrder = await Order.create(payload);
    return newOrder;
};
exports.ordersbyUserId = async userId => {
    const orders = await Order.find({ userId: userId });
    return orders;
}