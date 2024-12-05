import axios from 'axios';
import {
  SHOP_STATS_REQUEST,
  SHOP_STATS_SUCCESS,
  SHOP_STATS_FAIL,
  REVENUE_ADMIN_REQUEST,
  REVENUE_ADMIN_SUCCESS,
  REVENUE_ADMIN_FAIL,
} from '../constants/statisticsConstants';

// Action để lấy thống kê shop
export const getShopStatistics = () => async (dispatch) => {
  try {
    // Bắt đầu yêu cầu API
    dispatch({ type: SHOP_STATS_REQUEST });

    // Gửi yêu cầu GET đến API thống kê shop
    const { data } = await axios.get('/api/v1/shop-statsic');

    // Nếu thành công, dispatch thành công
    dispatch({
      type: SHOP_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Nếu thất bại, dispatch thất bại
    dispatch({
      type: SHOP_STATS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


export const getRevenueAdmin = () => async (dispatch) => {
    try {
      // Dispatch action yêu cầu dữ liệu
      dispatch({ type: REVENUE_ADMIN_REQUEST });
  
      // Gửi yêu cầu GET tới API để lấy doanh thu admin và tổng số đơn hàng
      const { data } = await axios.get('/api/v1/revenueAdmin');
  
      // Dispatch thành công
      dispatch({
        type: REVENUE_ADMIN_SUCCESS,
        payload: {
          revenueAdmin: data.revenueAdmin,
          totalOrders: data.totalOrders,
        }, // Payload chứa doanh thu admin và tổng số đơn hàng
      });
    } catch (error) {
      // Dispatch thất bại nếu có lỗi
      dispatch({
        type: REVENUE_ADMIN_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };