import { createSlice } from "@reduxjs/toolkit";

const savedWishlist =
  JSON.parse(
    localStorage.getItem("beautybloom-wishlist")
  ) || [];

const initialState = {
  items: savedWishlist
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {

    toggleWishlist: (state, action) => {

      const exists = state.items.some(
        (item) => item.id === action.payload.id
      );

      if (exists) {

        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );

      } else {

        state.items.push(action.payload);

      }
    },

    clearWishlist: (state) => {
      state.items = [];
    }

  }
});

export const {
  toggleWishlist,
  clearWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;