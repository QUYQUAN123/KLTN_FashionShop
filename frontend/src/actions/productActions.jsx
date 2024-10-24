import axios from "axios";

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_FAIL,
  GET_REVIEWS_IN_PRODUCT_REQUEST,
  GET_REVIEWS_IN_PRODUCT_SUCCESS,
  GET_REVIEWS_IN_PRODUCT_FAIL,
  GET_PRODUCT_CATEGORIES_REQUEST,
  GET_PRODUCT_CATEGORIES_SUCCESS,
  GET_PRODUCT_CATEGORIES_FAIL,
  CLEAR_ERRORS,
  GET_SHOP_PRODUCTS_REQUEST,
  GET_SHOP_PRODUCTS_SUCCESS,
  GET_SHOP_PRODUCTS_FAIL,
} from "../constants/productConstants";

export const getProducts =
  ({
    keyword = "",
    currentPage = 1,
    resPerPage = 9,
    price = [0, 1000000000],
    category = "",
    rating = 0,
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&limit=${resPerPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(link, config);

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
      throw error;
    }
  };

export const uploadImages = (image) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      `/api/v1/shop/uploadImages`,
      image,
      config
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadSectionImages = (image) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      `/api/v1/shop/section/upload/images`,
      image,
      config
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const newProduct = (productData) => async (dispatch) => {
  try {
    console.log("productData", productData);
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/shop/product/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v1/shop/product/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/shop/product/${id}`,
      productData,
      config
    );
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: {
        success: data.success,
        product: data.product,
      },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateProductBasic = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/shop/product/update/${id}`,
      productData,
      config
    );
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: {
        success: data.success,
      },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
    throw error;
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getShopProducts =
  (shopId, approved = "", keyword = "", currentPage = 1, resPerPage = 10) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_SHOP_PRODUCTS_REQUEST });

      let url = `/api/v1/shop/products?shopId=${shopId}&approved=${approved}&keyword=${keyword}&page=${currentPage}&resPerPage=${resPerPage}`;
      const { data } = await axios.get(url);

      dispatch({
        type: GET_SHOP_PRODUCTS_SUCCESS,
        payload: { products: data.products, productsCount: data.productsCount },
      });
    } catch (error) {
      dispatch({
        type: GET_SHOP_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getAdminProducts =
  (approved = "pending", keyword = "", currentPage = 1, resPerPage = 5) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADMIN_PRODUCTS_REQUEST });
      const { data } = await axios.get(
        `/api/v1/admin/products?approved=${approved}&keyword=${keyword}&page=${currentPage}&resPerPage=${resPerPage}`
      );
      dispatch({
        type: ADMIN_PRODUCTS_SUCCESS,
        payload: { products: data.products, total: data.total },
      });
    } catch (error) {
      dispatch({
        type: ADMIN_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getProductReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteReview = (id, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${id}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log(error.response);

    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getReviewsInProduct =
  (productId, page = 1, limit = 10) =>
  async (dispatch) => {
    console.log("productId", productId, page, limit);
    try {
      dispatch({ type: GET_REVIEWS_IN_PRODUCT_REQUEST });

      const { data } = await axios.get(
        `/api/v1/ReviewsInProduct?id=${productId}&page=${page}&limit=${limit}`
      );
      console.log("data", data);

      dispatch({
        type: GET_REVIEWS_IN_PRODUCT_SUCCESS,
        payload: {
          reviews: data.reviews,
          totalReviews: data.totalReviews,
          currentPage: data.currentPage,
          totalPages: data.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_REVIEWS_IN_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const getProductCategories = (productIds) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_CATEGORIES_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/product/coupon/categories",
      { productIds },
      config
    );
    dispatch({
      type: GET_PRODUCT_CATEGORIES_SUCCESS,
      payload: data.categories,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};
