import {
    GET_ALL_COUPONS_REQUEST,
    GET_ALL_COUPONS_SUCCESS,
    GET_ALL_COUPONS_FAIL,
    DELETE_COUPON_REQUEST,
    DELETE_COUPON_SUCCESS,
    DELETE_COUPON_FAIL,
    DELETE_COUPON_RESET,
    UPDATE_COUPON_REQUEST,
    UPDATE_COUPON_SUCCESS,
    UPDATE_COUPON_FAIL,
    UPDATE_COUPON_RESET,
    CREATE_COUPON_REQUEST,
    CREATE_COUPON_SUCCESS,
    CREATE_COUPON_FAIL,
    CREATE_COUPON_RESET,
    TOGGLE_STATUS_REQUEST,
    TOGGLE_STATUS_SUCCESS,
    TOGGLE_STATUS_FAIL,
    TOGGLE_STATUS_RESET,
    CLEAR_ERRORS,
    GET_ACTIVE_COUPONS_REQUEST,
    GET_ACTIVE_COUPONS_SUCCESS,
    GET_ACTIVE_COUPONS_FAIL,
    GET_COUPONS_ON_SHOP_REQUEST,
    GET_COUPONS_ON_SHOP_SUCCESS,
    GET_COUPONS_ON_SHOP_FAIL,
    GET_COUPONS_BY_SHOPID
  } from "../constants/couponConstants";
  
  export const couponReducer = (state = { coupons: [],couponsByShop: [], }, action) => {
    switch (action.type) {
      case GET_COUPONS_BY_SHOPID:
        return {
          ...state,
          couponsByShop: action.payload,  
        };
      
      case GET_ALL_COUPONS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_ALL_COUPONS_SUCCESS:
        return {
          ...state,
          loading: false,
          coupons: action.payload.coupons,
          totalCoupons: action.payload.totalCoupons,
        };
      case GET_ALL_COUPONS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case DELETE_COUPON_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_COUPON_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_COUPON_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_COUPON_RESET:
        return {
          ...state,
          isDeleted: false,
        };
  
      case UPDATE_COUPON_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_COUPON_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case UPDATE_COUPON_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_COUPON_RESET:
        return {
          ...state,
          isUpdated: false,
        };
  
      case CREATE_COUPON_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_COUPON_SUCCESS:
        return {
          ...state,
          loading: false,
          success: action.payload,
        };
      case CREATE_COUPON_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CREATE_COUPON_RESET:
        return {
          ...state,
          success: false,
        };
  
      case TOGGLE_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case TOGGLE_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          coupons: state.coupons.map((coupon) =>
            coupon._id === action.payload._id ? { ...coupon, status: action.payload.status } : coupon
          ),
          isStatusUpdated: true, // Set the flag here
        };
      case TOGGLE_STATUS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case TOGGLE_STATUS_RESET:
        return {
          ...state,
          isStatusUpdated: false,
        };
     case GET_ACTIVE_COUPONS_REQUEST:
        return {
            ...state,
            loading: true
        };
     case GET_ACTIVE_COUPONS_SUCCESS:
        return {
            ...state,
            loading: false,
            coupons: action.payload.coupons
        };
      case GET_ACTIVE_COUPONS_FAIL:
        return {
            ...state,
            loading: false,
            error: action.payload
        };
        case GET_COUPONS_ON_SHOP_REQUEST:
          return { ...state, loading: true };
        
          case GET_COUPONS_ON_SHOP_SUCCESS:
            return {
              ...state,
              loading: false,
              coupons: action.payload.coupons,  
              totalCouponshop: action.payload.totalCoupons,
              currentPage: action.payload.currentPage,
              resPerPage: action.payload.resPerPage,
            };
          
        case GET_COUPONS_ON_SHOP_FAIL:
          return { ...state, loading: false, error: action.payload };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  