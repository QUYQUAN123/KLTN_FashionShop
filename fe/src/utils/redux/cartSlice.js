import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { payload } = action;
      const index = state.cart.findIndex(
        (item) =>
          item.info._id === payload.info._id &&
          item?.type1 === payload?.type1 &&
          item?.type2 === payload?.type2
      );

      if (index !== -1) {
        state.cart[index].amount += payload.amount;
      } else {
        state.cart.push(payload);
      }
    },

    updateCart: (state, action) => {
      state.cart = [...action.payload];
    },

    resetCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, updateCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
