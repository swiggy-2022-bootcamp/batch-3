const router = require("express").Router();
const review = require("../controller/review.controller");

router.get("/", review.getReviews);

router.post("/", review.addReview);

module.exports = router;
