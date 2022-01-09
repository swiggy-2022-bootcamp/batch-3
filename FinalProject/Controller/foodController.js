const Food=require("./../Model/itemSchema.js");
const Restaurant=require("./../Model/restaurants.js");
const logger=require("./../config/logger.js");


module.exports.addReview=async (req,res)=>{
    try{
        const food = await Food.findById(req.params.id);
        req.body.rating=1*req.body.rating
        food.review.push(req.body);
        if(food.rating==undefined)
            food.rating=0;
        food.rating=(food.rating*(food.review.length-1)+req.body.rating)/food.review.length;
        food.save();
        return res.send(food);
    }
    catch(err)
        {
            logger.error("Adding review");
            return res.send(404);
        }
}



module.exports.getFoodItemByID=async (req,res)=>{
    try{
        const foodItem = await Food.findById(req.params.id)
        if(err)
            return res.send(404);
        return res.send(foodItem,200);
    }
    catch(err)
    {
        logger.error("Error while fetching food items");
        return res.send(404);
    }
}


module.exports.addFoodItem=async (req,res)=>{
   try{
    const restaurant = await Restaurant.findById(req.body.restaurant)
    if(restaurant==null || err!=null)
            return res.send(404);
    const food = await Food.create(req.body)
    if(err)
        return res.send(403);
    restaurant[food.foodCategory].push(food._id);
    restaurant.save();
    return res.send(food,200);   
   }
   catch(err)
   {
       logger.error("Error adding food item");
       res.send(404);
   }
}


