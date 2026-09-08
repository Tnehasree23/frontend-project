import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({

  reducer: {

    cart: cartReducer,

    wishlist: wishlistReducer,

    auth: authReducer

  }

});

store.subscribe(() => {

  const state = store.getState();

  localStorage.setItem(
    "beautybloom-cart",
    JSON.stringify(state.cart.items)
  );

  localStorage.setItem(
    "beautybloom-wishlist",
    JSON.stringify(state.wishlist.items)
  );

  if (state.auth.user) {

    localStorage.setItem(
      "beautybloom-user",
      JSON.stringify(state.auth.user)
    );

  } else {

    localStorage.removeItem(
      "beautybloom-user"
    );

  }

});