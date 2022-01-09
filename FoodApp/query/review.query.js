const Review = require("../model/review.model");

exports.addReview = async (payload) => {
    const newReview = await Review.create(payload);
    return newReview;
};

exports.getReviews = async foodId => {
    const reviews = await Review.find({ foodId: foodId });
    return reviews;
}