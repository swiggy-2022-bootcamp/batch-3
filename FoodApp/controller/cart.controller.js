const foodQuery = require("../query/food.query");
const cartQuery = require("../query/cart.query");

/* To get the cart details of a particular user */
async function getCartDetailsByUserId(req, res) {
  try {
    let { userId } = req.body;
    userId = parseInt(userId);
    const cart = await cartQuery.getCartDetailsByUserId(userId); //returns cart corresponding to user id in array
    if (cart.length == 0) {
      res.status(200).json("you don't have any element in cart");
    } else {
      res.json(cart);
    }
  } catch (err) {
    res.json({error:err})
  }
}


/* To add a single item to cart */
async function addCartItem(req, res) {
  try {
    let { foodId, userId } = req.body;

    //converting string to integer
    foodId = parseInt(foodId);
    userId = parseInt(userId);

    //getting food item details
    let foodItem = await foodQuery.getFoodItemById(foodId); //returns array of food item
    if (foodItem.length == 0) {
      res.status(404).json(`Sorry user with food item ${foodId} not found`);
    }
    foodItem = foodItem[0]; //extracting the food item from array

    const payload = {
      userId,
      foodItem,
    };

    //adding food item to cart
    const updatedCart = await cartQuery.addCartItem(payload);
    res.status(201).json(updatedCart);
  } catch (err) {
    res.json({error:err})
  }
}

/* To delete an item from cart */
async function deleteCartItem(req, res) {
  try {
    let { foodId, userId } = req.body;
    foodId = parseInt(foodId);
    userId = parseInt(userId);
    let foodItem = await foodQuery.getFoodItemById(foodId); //returns array of food item
    if (foodItem.length == 0) {
      res.status(404).json(`Sorry user with food item ${foodId} not found`);
    }
    foodItem = foodItem[0]; //extracting the food item from array

    const payload = {
      userId,
      foodItem,
    };
    let updatedCart = await cartQuery.deleteCartItem(payload);
    res.json(updatedCart);
  } catch (err) {
    res.json({error:err})
  }
}

module.exports = { getCartDetailsByUserId, addCartItem, deleteCartItem };
