const Review = require("../model/review.model");

/* To add review */
exports.addReview = async (payload) => {
    const newReview = await Review.create(payload);
    return newReview;
};

/* To get all the reviews for a particular food item */
exports.getReviewsbyFoodId = async foodId => {
    const reviews = await Review.find({ foodId: foodId });
    return reviews;
}