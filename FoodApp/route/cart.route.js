const router = require("express").Router();
const cart = require("../controller/cart.controller");

/* Get cart details for a user */
router.get("/", cart.getCartDetailsByUserId);

/* Add item to cart as a user */
router.post("/", cart.addCartItem);

/* Delete item from cart as a user */
router.delete("/", cart.deleteCartItem);

module.exports = router;
