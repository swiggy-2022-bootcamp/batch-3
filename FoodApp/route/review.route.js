const router = require("express").Router();
const review = require("../controller/review.controller");

/* Get all the reviews for a single food item */
router.get("/", review.getReviewsbyFoodId);

/* Post review for a single food item */
router.post("/", review.addReview);

module.exports = router;
