const Restaurant=require("./../Model/restaurants.js")
const logger=require("./../config/logger.js");

module.exports.getRestaurantByID=async (req,res)=>{
    try{
        const restaurant = await Restaurant.findById(req.params.id).populate(["maincourse","drink","starter","bread"])
        if(err)
            return res.send({"message":"please send valid id"},404);
        res.send(restaurant,200);
    }
    catch(err)
    {
        logger.error("Error while getting restaurant by ID")
        return res.send(404);
    }
}

module.exports.getAllRestaurants=async (req,res)=>{
   try{
    const restaurants=await Restaurant.find({})
    return res.send(restaurants);
   }
   catch(err)
   {
       logger.error("Getting all restaurants")
       return res.send(404);
   }
}

module.exports.getLocalRestaurants=async (req,res)=>{
    try{
        const restaurants = await Restaurant.find({}).select(["-drink","-maincourse","-starter","-bread"])
        var inarea=restaurants.filter(val=>val.address.zip==req.user.address.zip)
        return res.send(inarea);
    }
    catch(err)
    {
        logger.error("getting location by restaurants")
        return res.send(404);
    }
}

module.exports.addNewRestaurant=async (req,res)=>{
   try{
        const restaurant = await Restaurant.create(req.body);
        if(err)
            return res.send(404);
        return res.send(restaurant,200);
   }
   catch(err)
   {
       logger.error("adding new restaurant");
       return res.send(404);
   }
}

