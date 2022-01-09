const router = require("express").Router();
const order = require("../controller/order.controller");

router.get("/", order.getOrdersbyUserId);

router.post("/", order.addOrder);

module.exports = router;
