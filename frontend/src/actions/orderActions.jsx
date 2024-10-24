import axios from "axios";

import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CHECK_ORDER_REVIEW_REQUEST,
  CHECK_ORDER_REVIEW_SUCCESS,
  CHECK_ORDER_REVIEW_FAIL,
  CLEAR_ERRORS,
  MOMO_TRANSACTION_START,
  MOMO_TRANSACTION_SUCCESS,
  FETCH_ORDER_STATS_REQUEST,
  FETCH_ORDER_STATS_SUCCESS,
  FETCH_ORDER_STATS_FAIL
} from "../constants/orderConstants";
import {
  EMPTY_CART_FAIL,
  EMPTY_CART_SUCCESS,
  LOAD_CART_ITEMS_FAIL,
  LOAD_CART_ITEMS_SUCCESS,
} from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/order/new", order, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });

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
  } catch (error) {
    console.log(error);
  }
};

export const momoPayment = (info) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/momo", info, config);

    dispatch({
      type: MOMO_TRANSACTION_START,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const momoDone = (orderId) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/momoCheckStatus",
      orderId,
      config
    );

    dispatch({
      type: MOMO_TRANSACTION_SUCCESS,
      payload: data.resultCode,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get curretly logged in user orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get("/api/v1/orders/me");

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/order/${id}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const allOrders = (currentPage = 1, keyword = "", status = "all", resPerPage = 10) => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get(`/api/v1/shop/orders?page=${currentPage}&keyword=${keyword}&orderStatus=${status}&resPerPage=${resPerPage}`);

    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: {
        orders: data.orders,
        totalOrders: data.totalOrders,
        totalAmount: data.totalAmount,
        totalPaidAmount: data.totalPaidAmount,
        totalPendingAmount: data.totalPendingAmount,
        resPerPage: data.resPerPage,
        filteredOrdersCount: data.filteredOrdersCount,
      },
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update order
export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/shop/order/${id}`,
      orderData,
      config
    );

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/api/v1/shop/order/${id}`);

    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const checkOrderReview = (userId, productId) => async (dispatch) => {
  try {
    dispatch({ type: CHECK_ORDER_REVIEW_REQUEST });
    console.log("userid", userId, "proid", productId);

    const { data } = await axios.post("/api/v1/orders/me/checkOrderReview", {
      userId,
      productId,
    });

    dispatch({
      type: CHECK_ORDER_REVIEW_SUCCESS,
      payload: data,
    });
    console.log("data", data);
  } catch (error) {
    dispatch({
      type: CHECK_ORDER_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};




export const fetchOrderStats = () => async (dispatch) => {
  try {
      dispatch({ type: FETCH_ORDER_STATS_REQUEST });

      // Gửi yêu cầu tới máy chủ
      const response = await fetch("/api/v1/order-stats");
      const data = await response.json();

      // Gửi dữ liệu thành công đến reducer
      dispatch({
          type: FETCH_ORDER_STATS_SUCCESS,
          payload: {
            monthlyRevenue:data.monthlyRevenue,
            monthlyOrderCount:data.monthlyOrderCount,
          }
      });
      console.log("Data from server:", data);
  } catch (error) {
      // Gửi thông báo lỗi đến reducer
      dispatch({
          type: FETCH_ORDER_STATS_FAIL,
          payload: error.message
      });
  }
};