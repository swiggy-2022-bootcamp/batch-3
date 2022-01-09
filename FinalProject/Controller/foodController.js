const Food=require("./../Model/itemSchema.js");
const Restaurant=require("./../Model/restaurants.js");
const logger=require("./../config/logger.js");

//function to add review
module.exports.addReview=async (req,res)=>{
    try{
        // Check whether the required food item is present or not
        const food = await Food.findById(req.params.id);
        // if food item is not found then return response
        if(food==null || food==undefined)
            return res.send({"message":"food item not found"},404);
        req.body.rating=1*req.body.rating
        food.review.push(req.body);
        // If it is the first review then add zero
        if(food.rating==undefined)
            food.rating=0;
        // Average the rating 
        food.rating=(food.rating*(food.review.length-1)+req.body.rating)/food.review.length;
        food.save();
        return res.send(food,201);
    }
    catch(err)
        {
            logger.error("Adding review");
            return res.send({"message":"error adding review","error":err.message},500);
        }
}


// Adding food item by ID
module.exports.getFoodItemByID=async (req,res)=>{
    try{
        // Find food item
        const foodItem = await Food.findById(req.params.id)
        return res.send(foodItem,200);
    }
    catch(err)
    {
        logger.error("Error while fetching food items");
        return res.send({"message":"error fetching food item by ID","error":err.message},500);
    }
}

// Adding food item to the database 
module.exports.addFoodItem=async (req,res)=>{
   try{
    const restaurant = await Restaurant.findById(req.body.restaurant)
    if(restaurant==null|| restaurant==undefined)
            return res.send({"message":"Restaurant not found to add food item"},404);
    const food = await Food.create(req.body)
    restaurant[food.foodCategory].push(food._id);
    restaurant.save();
    return res.send(food,201);   
   }
   catch(err)
   {
       logger.error("Error adding food item");
       return res.send({"message":"error adding food item","error":err.message},500);
    }
}


