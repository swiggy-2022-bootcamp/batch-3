const router = require("express").Router();
const cart = require("../controller/cart.controller");

router.get("/", cart.getCartItem);

router.post("/", cart.addCartItem);

router.delete("/", cart.deleteCartItem);

module.exports = router;
