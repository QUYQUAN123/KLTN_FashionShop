import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div class="App-container-shop">
    <div className="sidebar-wrapper-shop">
      <nav className="sidebar-form">
        <ul className="sidebar-element-container-shop">
          <li>
            <Link to="/shopkeeper/dashboard" className="sidebar-element-shop">
              <i className="fa fa-tachometer"></i> Thống kê
            </Link>
          </li>

          <li>
            <Link to="/shopkeeper/shop" className="sidebar-element-shop">
              <i className="fa fa-product-hunt"></i> Quản lý Cửa Hàng
            </Link>
          </li>

          <li>
            <Link to="/shopkeeper/products" className="sidebar-element-shop">
              <i className="fa fa-product-hunt"></i> Quản lý Sản Phẩm
            </Link>
          </li>

          <li>
            <Link to="/shopkeeper/orders" className="sidebar-element-shop">
              <i className="fa fa-shopping-basket"></i> Quản lý Đơn Hàng
            </Link>
          </li>

          <li>
            <Link to="/shopkeeper/reviews" className="sidebar-element-shop">
              <i className="fa fa-star"></i> Quản lý Đánh Giá
            </Link>
          </li>

          <li>
            <Link to="/" className="sidebar-element-shop" style={{ color: "red" }}>
              <i className="fa fa-user"></i> Thoát
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    </div>
  );
};

export default Sidebar;
