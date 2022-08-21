import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
      state.items = action.payload.items;
    },
    addToCart(state, action) {
      const newProduct = action.payload;
      const existingItem = state.items.find(
        (item) => item.product._id === newProduct._id
      );
      if (!existingItem) {
        state.items.push({ product: newProduct, quantity: 1 });
        state.totalPrice += newProduct.price;
      }
    },
    setQuantity(state, action) {
      const itemToUpdate = state.items.find(
        (item) => item.product._id === action.payload.id
      );
      if (itemToUpdate) {
        state.totalPrice -= itemToUpdate.product.price * itemToUpdate.quantity;
        itemToUpdate.quantity = action.payload.quantity;
        state.totalPrice +=
          itemToUpdate.product.price * action.payload.quantity;
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.product._id !== action.payload
      );
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
