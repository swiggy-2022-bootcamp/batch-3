const cartQuery = require("../query/cart.query");
const orderQuery = require("../query/order.query");

const COUPON_CODE = "FLAT50";

async function getOrdersbyUserId(req, res) {
  try {
    let { userId } = req.body;
    userId = parseInt(userId);
    const orders = await orderQuery.getOrdersbyUserId(userId); //returns cart corresponding to user id in array
    if (orders.length == 0) {
      res.status(200).json("you don't have any orders");
    } else {
      res.status(200).json(orders);
    }
  } catch (err) {
    res.json({error:err})
  }
}

async function addOrder(req, res) {
  try {
    let { userId, coupon } = req.body;
    userId = parseInt(userId);
    const cart = await cartQuery.cartbyUserId(userId); //returns cart corresponding to user id in array
    if (cart.length == 0) {
      res.status(200).json("you don't have any element in cart");
    } else {
      const payload = cart[0];
      let { items, userId, total } = payload;
      let newItems = [];
      items.forEach((item) => {
        let { foodId, quantity } = item;
        newItems.push({ foodId, quantity });
      });
      let orderData = {
        items: newItems,
        userId,
        total,
        discount: 0,
        finalPrice: total,
      };
      if (coupon == COUPON_CODE) {
        let discount = orderData.finalPrice / 2;
        if (discount > 100) discount = 100;
        orderData.discount = discount;
        orderData.finalPrice = orderData.finalPrice - discount;
        orderData.coupon = coupon;
      }
      let order = await orderQuery.addOrder(orderData);
      res.status(200).json(order);
    }
  } catch (err) {
    res.json({error:err})
  }
}

module.exports = { getOrdersbyUserId, addOrder };
