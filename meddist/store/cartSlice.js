/** @format */

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalPrice: 0,
    totalItemsQuantity: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
        state.totalPrice += action.payload.price;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
        state.totalPrice += action.payload.price;
        state.totalItemsQuantity++;
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
      state.totalPrice += item.price;
    },
    setQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      state.totalPrice -= item.price * item.quantity;
      item.quantity = action.payload.quantity;
      state.totalPrice += item.price * item.quantity;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item != null) {
        if (item.quantity === 1) {
          const removeItem = state.cart.filter(
            (item) => item.id !== action.payload
          );
          state.totalItemsQuantity--;
          state.cart = removeItem;
          state.totalPrice = 0;
          for (const item of state.cart) {
            state.totalPrice += item.quantity * item.price;
          }
        } else {
          item.quantity--;
          state.totalPrice -= item.price;
          if (item.quantity === 0) {
            state.totalItemsQuantity--;
          }
        }
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.totalItemsQuantity--;
      state.cart = removeItem;
      state.totalPrice = 0;
      for (const item of state.cart) {
        state.totalPrice += item.quantity * item.price;
      }
    },
    resetCart: (state, action) => {
      state.cart = [];
      state.totalPrice = 0;
      state.totalItemsQuantity = 0;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  setQuantity,
  decrementQuantity,
  removeItem,
  resetCart,
} = cartSlice.actions;
