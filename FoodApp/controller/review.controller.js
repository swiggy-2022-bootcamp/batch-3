const reviewQuery = require("../query/review.query");
const orderQuery = require("../query/order.query");

/* To get all the reviews for a food item */
async function getReviewsbyFoodId(req, res) {
  try {
    let { foodId } = req.body;
    userId = parseInt(foodId);
    const reviews = await reviewQuery.getReviewsbyFoodId(foodId); //returns reviews corresponding to food id in array
    if (reviews.length == 0) {
      res.status(200).json("This item dosen't have any reviews");
    } else {
      res.status(200).json(reviews);
    }
  } catch (err) {
    res.json({error:err})
  }
}

/* To add review for a food item */
async function addReview(req, res) {
  try {
    let { userId, foodId, description, rating } = req.body;
    if(!(userId && foodId && rating)){
      res.json("Please provide userId, foodId and rating")
    }
    userId = parseInt(userId);
    foodId=parseInt(foodId)
    const orders = await orderQuery.getOrdersbyUserId(userId)
    let foodItemFound=0;
    orders.forEach(order=>{
        order.items.forEach(item=>{
            if(item.foodId==foodId){
                foodItemFound=1
            }
        })
    })
    if(foodItemFound==0){
        res.status(403).json("You have not ordered this food item")
    }
    else{
        const reviewData = {
            foodId,
            userId,
            description,
            rating
        }
        const review = await reviewQuery.addReview(reviewData)
        res.status(201).json(review)
    }

  } catch (err) {
    res.json({error:err})
  }
}

module.exports = { getReviewsbyFoodId, addReview };
