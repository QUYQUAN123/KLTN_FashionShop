import {
  CLEAR_ERRORS,
  GET_SHOP_FAIL,
  GET_SHOP_SUCCESS,
  UPDATE_SHOP_FAIL,
  UPDATE_SHOP_RESET,
  UPDATE_SHOP_SUCCESS,
  GET_SHOPID_REQUEST,
  GET_SHOPID_SUCCESS, 
  GET_SHOPID_FAIL,
  GET_SHOP_PRODUCTS_REQUEST,
  GET_SHOP_PRODUCTS_SUCCESS,
  GET_SHOP_PRODUCTS_FAIL,
} from "../constants/shopConstants";

export const shopReducer = (state = { shop: {}, shopData: {},products: [], }, action) => {
  switch (action.type) {
    case GET_SHOP_SUCCESS:
      return {
        ...state,
        shop: action.payload.shop,
        shopData: action.payload.shopData,
      };

    case GET_SHOP_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_SHOP_SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };

    case UPDATE_SHOP_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_SHOP_RESET:
      return {
        ...state,
        isUpdated: false,
      };

      case GET_SHOPID_REQUEST:
        return {
          ...state,
          loading: true,  
        };
      case GET_SHOPID_SUCCESS:
        return {
          ...state,
          loading: false,
          shop: action.payload.shop,
          shopData: action.payload.shopData,
        };
      case GET_SHOPID_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case GET_SHOP_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,  
      };
    case GET_SHOP_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,  
      };
    case GET_SHOP_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload, 
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
