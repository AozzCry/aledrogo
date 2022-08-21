import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
