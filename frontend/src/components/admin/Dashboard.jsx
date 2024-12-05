import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getShopStatistics,getRevenueAdmin } from '../../actions/statisticsActions';
import Userchart from './chart/Userchart';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('revenue');
  // Lấy dữ liệu thống kê shop từ Redux store
  const { loading, shopStats, totalShops, error,revenueData } = useSelector(
    (state) => state.Statistics
  );

  useEffect(() => {
    dispatch(getShopStatistics());
    dispatch(getRevenueAdmin());
  }, [dispatch]);

  return (
    <div className="admin-statistics-container">
      {/* Thống kê shop */}
      <div className="shop-statistics">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="shop-statistics__grid">
            {shopStats.length > 0 ? (
              shopStats.map((shop) => (
                <div className="shop-statistics__card" key={shop.shopId}>
                  {/* Tên Shop */}
                  <div className="shop-statistics__name">{shop.shopName}</div>
                  {/* Thông tin số sản phẩm và tổng số lượng */}
                  <div className="shop-statistics__details">
                    <div className="shop-statistics__product-count">
                      <strong>Sản phảm:</strong> {shop.productCount}
                    </div>
                    <div className="shop-statistics__total-quantity">
                      <strong>Số lượng:</strong> {shop.totalQuantity}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No shops found.</p>
            )}
          </div>
        )}
      </div>

  
      <Userchart />



      <div className="revenue-statistics">
        <h2>Doanh Số Bán Hàng</h2>
        {/* Tab Navigation */}
        <div className="revenue-tab-container">
          <button
            className={`tab-button ${activeTab === 'revenue' ? 'active' : ''}`}
            onClick={() => setActiveTab('revenue')}
          >
            Doanh thu
          </button>
          <button
            className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Số Đơn 
          </button>
        </div>

        {/* Tab Content: Doanh thu */}
        <div className={`revenue-tab-content ${activeTab === 'revenue' ? 'active' : ''}`}>
        <span className="revenue-amount">Tổng Doanh Thu : {revenueData.revenueAdmin}</span>
        </div>

        {/* Tab Content: Hóa đơn */}
        <div className={`revenue-tab-content ${activeTab === 'orders' ? 'active' : ''}`}>
        <span className="revenue-amount">Số Lượng Đơn Hàng: {revenueData.totalOrders}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
