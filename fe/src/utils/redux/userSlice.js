import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
    },

    favourite: (state, action) => {
      if (state.user) {
        const index = state.user?.favourite.findIndex(
          (item) => item._id === action.payload._id
        );

        if (index !== -1) {
          state.user?.favourite.splice(index, 1);
        } else {
          state.user?.favourite.push(action.payload);
        }
      }
    },

    cart: (state, action) => {
      console.log(action.payload);
      // state.user = {
      //   ...state.user,
      //   cart: action.payload,
      // };
    },
  },
});

export const { login, logout, favourite, cart } = userSlice.actions;

export default userSlice.reducer;
