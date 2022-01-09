const router = require("express").Router();
const order = require("../controller/order.controller");

/* Get all the orders for a single user */
router.get("/", order.getOrdersbyUserId);

/* Post a order as a user */
router.post("/", order.addOrder);

module.exports = router;
