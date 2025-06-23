import axios from "../../utils/axiosConfig";
import {loadCart} from "../reducers/cartSlice";


// function to get all cart items
export const asyncGetAllCartItems = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.get("/carts");
        dispatch(loadCart(data));
    } catch (error) {
        console.log(error);
    }
};

// function to add a product to the user's cart (create or update)
export const asyncAddToCart = ({ userId, productId }) => async (dispatch) => {
  try {
    // 1. Check if a cart already exists for this user
    const { data: userCarts } = await axios.get(`/carts?userId=${userId}`);
    if (userCarts.length > 0) {
      // Cart exists, update it (PATCH)
      const cart = userCarts[0];
      // Check if product already in cart
      const productIndex = cart.productsArray.findIndex(p => p.productId === productId);
      if (productIndex !== -1) {
        // Product exists, increase quantity
        cart.productsArray[productIndex].quantity += 1;
      } else {
        // Product not in cart, add it
        cart.productsArray.push({ productId, quantity: 1 });
      }
      await axios.patch(`/carts/${cart.id}`, cart);
    } else {
      // No cart for user, create new (POST)
      await axios.post("/carts", {
        userId,
        productsArray: [{ productId, quantity: 1 }]
      });
    }
    // Refresh carts in Redux
    dispatch(asyncGetAllCartItems());
  } catch (error) {
    console.log(error);
  }
};

// function to update the user's existing cart 
export const asyncUpdateCart = (cart) => async (dispatch) => {
  try {
    await axios.patch(`/carts/${cart.id}`, cart);
    dispatch(asyncGetAllCartItems());
  } catch (error) {
    console.log(error);
  }
};

// function to increase the quantity of a product in the cart
export const asyncIncreaseQuantity = ({ userId, productId }) => async (dispatch) => {
  try {
    const { data: userCart } = await axios.get(`/carts?userId=${userId}`);
    console.log({data:userCart});
    if (userCart.length > 0) {
      const cart = userCart[0];
      const productIndex = cart.productsArray.findIndex(p => p.productId === productId);
      if (productIndex !== -1) {
        cart.productsArray[productIndex].quantity += 1;
        await axios.patch(`/carts/${cart.id}`, cart);
        dispatch(asyncGetAllCartItems());
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// function to decrease the quantity of a product in the cart
export const asyncDecreaseQuantity = ({ userId, productId }) => async (dispatch) => {
  try {
    const { data: userCart } = await axios.get(`/carts?userId=${userId}`);
    if (userCart.length > 0) {
      const cart = userCart[0];
      const productIndex = cart.productsArray.findIndex(p => p.productId === productId);
      if (productIndex !== -1 && cart.productsArray[productIndex].quantity > 1) {
        cart.productsArray[productIndex].quantity -= 1;
        await axios.patch(`/carts/${cart.id}`, cart);
        dispatch(asyncGetAllCartItems());
      } else if (productIndex !== -1 && cart.productsArray[productIndex].quantity === 1) {
            // If quantity is 1, remove the product from the cart
            cart.productsArray.splice(productIndex, 1);
            await axios.patch(`/carts/${cart.id}`, cart);
            dispatch(asyncGetAllCartItems());
        }
    }
  } catch (error) {
    console.log(error);
  }
}