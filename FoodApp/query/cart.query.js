const Cart = require("../model/cart.model");

const addToCart = async (payload) => {
  let { userId, foodItem } = payload;
  userId = parseInt(userId);
  let cart = await cartbyUserId(userId); //gets cart object in an array
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
    cart = cart[0];
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

const cartbyUserId = async (userId) => {
  userId = parseInt(userId);
  const cart = await Cart.find({ userId: userId });
  return cart;
};

const removeFromCart = async (payload) => {
  let { userId, foodItem } = payload;
  userId = parseInt(userId);
  let cart = await cartbyUserId(userId); //gets cart object in an array
  if (cart.length == 0) {
    //cart does not exist
    return "cart does not exist";
  } else {
    //cart already exits, check if item exists
    cart = cart[0];
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

module.exports = { addToCart, cartbyUserId, removeFromCart };
