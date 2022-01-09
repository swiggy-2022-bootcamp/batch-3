const Restaurant=require("./../Model/restaurants.js")
const logger=require("./../config/logger.js");

// Function to fetch restaurant by ID
module.exports.getRestaurantByID=async (req,res)=>{
    try{
        // if the restaurant is found in the database send response
        const restaurant = await Restaurant.findById(req.params.id).populate(["maincourse","drink","starter","bread"]);
        res.send(restaurant,200);
    }
    catch(err)
    {
        logger.error("Error while getting restaurant by ID")
        return res.send({"message":"error fetching restaurant by ID","error":err.message},500);
    }
}

// Fetch all the restaurants present in database
module.exports.getAllRestaurants=async (req,res)=>{
   try{
    const restaurants=await Restaurant.find({})
    return res.send(restaurants,200);
   }
   catch(err)
   {
       logger.error("Getting all restaurants")
       return res.send({"message":"error fetching all restaurants","error":err.message},500);
    }
}

// Fetching all the local restaurants
module.exports.getLocalRestaurants=async (req,res)=>{
    try{
        const restaurants = await Restaurant.find({}).select(["-drink","-maincourse","-starter","-bread"])
        var inarea=restaurants.filter(val=>val.address.zip==req.user.address.zip)
        return res.send(inarea,200);
    }
    catch(err)
    {
        logger.error("getting location by restaurants")
        return res.send({"message":"error fetching local restaurants","error":err.message},500);
    }
}

// Function to add new restaurant to DB
module.exports.addNewRestaurant=async (req,res)=>{
   try{
        const restaurant = await Restaurant.create(req.body);
        return res.send(restaurant,201);
   }
   catch(err)
   {
       logger.error("adding new restaurant");
       return res.send({"message":"error adding new restaurant","error":err.message},500);
    }
}

