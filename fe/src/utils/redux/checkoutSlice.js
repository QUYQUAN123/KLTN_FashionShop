import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkout: [],
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    updateCheckout: (state, action) => {
      state.checkout = [...action.payload];
    },

    resetCheckout: (state) => {
      state.checkout = [];
    },
  },
});

export const { resetCheckout, updateCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;
