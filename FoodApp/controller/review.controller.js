const reviewQuery = require("../query/review.query");
const orderQuery = require("../query/order.query");

async function getReviews(req, res) {
  try {
    let { foodId } = req.body;
    userId = parseInt(foodId);
    const reviews = await reviewQuery.getReviews(foodId); //returns reviews corresponding to food id in array
    if (reviews.length == 0) {
      res.status(200).json("This item have any reviews");
    } else {
      res.status(200).json(reviews);
    }
  } catch (err) {
    console.log(err);
  }
}

async function addReview(req, res) {
  try {
    let { userId, foodId, description, rating } = req.body;
    userId = parseInt(userId);
    foodId=parseInt(foodId)
    const orders = await orderQuery.ordersbyUserId(userId)
    let foodItemFound=0;
    orders.forEach(order=>{
        order.items.forEach(item=>{
            if(item.foodId==foodId){
                foodItemFound=1
            }
        })
    })
    if(foodItemFound==0){
        res.status(403).json("you have not ordered this food item")
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
    console.log(err);
  }
}

module.exports = { getReviews, addReview };
