const Cart = require("../model/cart.model");

/* To add a single quantity of an item to cart for a particular user */
const addCartItem = async (payload) => {
  let { userId, foodItem } = payload;
  userId = parseInt(userId);
  let cart = await getCartDetailsByUserId(userId); //gets cart object in an array
  if (cart.length == 0) {
    //cart does not exit, create new cart
    const cartData = {
      userId,
      total: foodItem.foodCost,
      items: [
        {
          foodId: foodItem.foodId,
          quantity: 1,
        },
      ],
    };
    const newCartItem = await Cart.create(cartData);
    return newCartItem;
  } else {
    //cart already exits, add item
    cart = cart[0]; //extract cart details from the array
    let itemsList = cart.items;
    let itemIndex = itemsList.findIndex((el) => el.foodId == foodItem.foodId);
    if (itemIndex == -1) {
      //item does not exist in cart, add item to list
      itemsList.push({
        foodId: foodItem.foodId,
        quantity: 1,
      });
    } else {
      //item exists in cart, increase the quantity of item
      itemsList[itemIndex].quantity = 1 + itemsList[itemIndex].quantity;
    }
    cart.items = itemsList;
    cart.total += foodItem.foodCost;
    const updatedCart = await updateCart(cart);
    return updatedCart;
  }
};

/* To get cart details for a particular user */
const getCartDetailsByUserId = async (userId) => {
  userId = parseInt(userId);
  const cart = await Cart.find({ userId: userId });
  return cart;
};

/* To remove a single quantity of an item to cart for a particular user */
const deleteCartItem = async (payload) => {
  let { userId, foodItem } = payload;
  userId = parseInt(userId);
  let cart = await getCartDetailsByUserId(userId); //gets cart object in an array
  if (cart.length == 0) {
    //cart does not exist
    return "cart does not exist";
  } else {
    //cart already exits, check if item exists
    cart = cart[0]; //extract cart details from the array
    let itemsList = cart.items;
    let itemIndex = itemsList.findIndex((el) => el.foodId == foodItem.foodId);
    if (itemIndex == -1) {
      //item does not exist in cart
      return "item does not exist";
    } else {
      //item exists in cart, decrease the quantity of item
      itemsList[itemIndex].quantity = itemsList[itemIndex].quantity - 1;
      if (itemsList[itemIndex].quantity == 0) {
        itemsList.splice(itemIndex, 1);
      }
    }

    if (itemsList.length == 0) {
      Cart.findOneAndDelete({ userId: userId });
      return "cart empty";
    } else {
      cart.items = itemsList;
      cart.total -= foodItem.foodCost;
      const updatedCart = await updateCart(cart);
      return updatedCart;
    }
  }
};

/* To update the cart with new data */
const updateCart = async (payload) => {
  const updatedCart = await Cart.findOneAndUpdate(
    { userId: payload.userId },
    payload,
    {
      new: true,
    }
  );
  return updatedCart;
};

module.exports = { addCartItem, getCartDetailsByUserId, deleteCartItem };
