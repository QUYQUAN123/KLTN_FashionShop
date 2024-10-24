import axios from "axios";
import {
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  REMOVE_ITEM_FROM_CART_SUCCESS,
  REMOVE_ITEM_FROM_CART_FAIL,
  SAVE_SHIPPING_INFO,
  LOAD_CART_ITEMS_SUCCESS,
  LOAD_CART_ITEMS_FAIL,
  UPDATE_QUANTITY_SUCCESS,
  CHECK_CART_QUANTITIES_REQUEST,
  CHECK_CART_QUANTITIES_SUCCESS,
  CHECK_CART_QUANTITIES_FAIL,
} from "../constants/cartConstants";

export const getUserCart = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`/api/v1/cart/me`);
    const { cartItems } = response.data;

    dispatch({
      type: LOAD_CART_ITEMS_SUCCESS,
      payload: cartItems,
    });
  } catch (error) {
    dispatch({
      type: LOAD_CART_ITEMS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addItemToCart = (item) => async (dispatch) => {
  try {
    const newData = await axios.post("/api/v1/cart", {
      cartItems: [item],
    });
    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: newData,
    });
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAIL,
      payload: error.message,
    });
  }
};

export const removeItemFromCart =
  (id, variant, size) => async (dispatch, getState) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/cart/${id}/${variant}/${size}`
      );

      dispatch({
        type: REMOVE_ITEM_FROM_CART_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_ITEM_FROM_CART_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

export const getUserCartProduct = (infor) => async (dispatch, getState) => {
  try {
    const response = await axios.post(`/api/v1/cart/product`, {
      item: [infor],
    });

    const { success } = response.data;

    return success;
  } catch (error) {
    return false;
  }
};


export const checkCartQuantities = (selectedItems) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: CHECK_CART_QUANTITIES_REQUEST });

      const { data } = await axios.post('/api/v1/cart/check-quantities', { selectedItems });

      if (!data.success) {
        dispatch({
          type: CHECK_CART_QUANTITIES_FAIL,
          payload: data.message,
        });
        return reject(data.message);
      }

      dispatch({
        type: CHECK_CART_QUANTITIES_SUCCESS,
        payload: data,
      });
      resolve();
    } catch (error) {
      dispatch({
        type: CHECK_CART_QUANTITIES_FAIL,
        payload: error.response.data.message,
      });
      reject(error.response.data.message);
    }
  });
};



