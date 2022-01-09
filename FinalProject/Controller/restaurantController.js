const Restaurant=require("./../Model/restaurants.js")

module.exports.getRestaurantByID=async (req,res)=>{
    try{
        const restaurant = await Restaurant.findById(req.params.id).populate(["maincourse","drink","starter","bread"])
        if(err)
            return res.send({"message":"please send valid id"},404);
        res.send(restaurant,200);
    }
    catch(err)
    {
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
       return res.send(404);
   }
}

