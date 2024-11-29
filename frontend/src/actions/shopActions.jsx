import axios from "axios";
import {
  GET_SHOP_FAIL,
  GET_SHOP_SUCCESS,
  UPDATE_SHOP_FAIL,
  UPDATE_SHOP_SUCCESS,
  GET_SHOPID_REQUEST, 
  GET_SHOPID_SUCCESS, 
  GET_SHOPID_FAIL,
  GET_SHOP_PRODUCTS_REQUEST,
  GET_SHOP_PRODUCTS_SUCCESS,
  GET_SHOP_PRODUCTS_FAIL,
} from "../constants/shopConstants";

export const updateShop = (newData, field) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.put(`/api/v1/shop/me`, { newData, field }, config);

    dispatch({
      type: UPDATE_SHOP_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SHOP_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateShopSection = (index, newData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.put(`/api/v1/shop/section`, { index, newData }, config);

    dispatch({
      type: UPDATE_SHOP_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SHOP_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteShopSection = (index, newData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.delete(`/api/v1/shop/section`, { index }, config);

    dispatch({
      type: UPDATE_SHOP_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SHOP_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getShop = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/shop/me`);

    dispatch({
      type: GET_SHOP_SUCCESS,
      payload: { shop: data.shop, shopData: data.shopData },
    });
  } catch (error) {
    dispatch({
      type: GET_SHOP_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getShopById = (shopId) => async (dispatch) => {
  try {
    dispatch({ type: GET_SHOPID_REQUEST }); 
    const { data } = await axios.get(`/api/v1/shop/${shopId}`); 
    dispatch({
      type: GET_SHOPID_SUCCESS,
      payload: { shop: data.shop, shopData: data.shopData },
    });
  } catch (error) {
    dispatch({
      type: GET_SHOPID_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
export const getProductsByShopId = (shopId) => async (dispatch) => {
  try {
    dispatch({ type: GET_SHOP_PRODUCTS_REQUEST }); 

    const { data } = await axios.get(`/api/v1/shop/${shopId}/products`);
    dispatch({
      type: GET_SHOP_PRODUCTS_SUCCESS,
      payload: data.products, 
    });
  } catch (error) {

    dispatch({
      type: GET_SHOP_PRODUCTS_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};