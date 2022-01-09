const Order = require("../model/order.model");

exports.addOrder = async (payload) => {
    const newOrder = await Order.create(payload);
    return newOrder;
};
exports.ordersbyUserId = async userId => {
    const orders = await Order.find({ userId: userId });
    return orders;
}
// exports.createFoodItem = async payload => {
//     const newFoodItem = await FoodItem.create(payload);
//     return newFoodItem
// }
// exports.removeProduct = async id => {
//     const product = await Product.findByIdAndRemove(id);
//     return product
// }