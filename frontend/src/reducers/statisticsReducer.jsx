import {
    SHOP_STATS_REQUEST,
    SHOP_STATS_SUCCESS,
    SHOP_STATS_FAIL,
    REVENUE_ADMIN_REQUEST,
    REVENUE_ADMIN_SUCCESS,
    REVENUE_ADMIN_FAIL,
  } from '../constants/statisticsConstants';
  
  // Trạng thái ban đầu
  const initialState = {
    loading: false,
    shopStats: [],
    totalShops: 0,
    error: null,
    revenueData: {
      revenueAdmin: 0,  
      totalOrders: 0,   
    },
  };
  
  export const statisticsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SHOP_STATS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case SHOP_STATS_SUCCESS:
        return {
          ...state,
          loading: false,
          shopStats: action.payload.shopStats,
          totalShops: action.payload.totalShops,
        };
      case SHOP_STATS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

        case REVENUE_ADMIN_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case REVENUE_ADMIN_SUCCESS:
          return {
            ...state,
            loading: false,
            revenueData: {
              revenueAdmin: action.payload.revenueAdmin,
              totalOrders: action.payload.totalOrders,
            },
          };
        case REVENUE_ADMIN_FAIL:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
      default:
        return state;
    }
  };
  