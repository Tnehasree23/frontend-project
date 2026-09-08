import { createSlice } from "@reduxjs/toolkit";

const savedUser =
  JSON.parse(
    localStorage.getItem("beautybloom-user")
  ) || null;

const initialState = {
  user: savedUser,
  isLoggedIn: savedUser !== null
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    login: (state, action) => {

      state.user = action.payload;
      state.isLoggedIn = true;

    },

    register: (state, action) => {

      state.user = action.payload;
      state.isLoggedIn = true;

    },

    logout: (state) => {

      state.user = null;
      state.isLoggedIn = false;

    }

  }
});

export const {
  login,
  register,
  logout
} = authSlice.actions;

export default authSlice.reducer;