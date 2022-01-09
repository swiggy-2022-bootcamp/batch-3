const router = require("express").Router();
const order = require("../controller/order.controller");

router.get("/", order.getOrders);

router.post("/", order.addOrder);

module.exports = router;
