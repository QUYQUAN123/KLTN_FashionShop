import React from "react";
import { Link } from "react-router-dom";

const Sidebar = React.memo(({ path }) => {
  return (
    <div className="sidebar-wrapper">
      <nav className="sidebar-form">
        <ul className="sidebar-element-container">
          <li>
            <Link
              to="/admin/dashboard"
              className={`sidebar-element ${
                path.startsWith("/admin/dashboard") ? "active" : ""
              }`}
            >
              <i className="fa fa-tachometer"></i> Thống kê
            </Link>
          </li>

          <li>
            <Link
              to="/admin/products"
              className={`sidebar-element ${
                path === "/admin/products" ? "active" : ""
              }`}
            >
              <i className="fa fa-shopping-bag "></i> Quản lý sản phẩm
            </Link>
          </li>

          <li>
            <Link
              to="/admin/applications"
              className={`sidebar-element ${
                path === "/admin/applications" ? "active" : ""
              }`}
            >
              <i className="fa fa-handshake-o"></i> Quản lý Đơn Đăng ký Bán Hàng
            </Link>
          </li>

          <li>
            <Link
              to="/admin/users"
              className={`sidebar-element ${
                path === "/admin/users" ? "active" : ""
              }`}
            >
              <i className="fa fa-users"></i> Quản lý Người Dùng
            </Link>
          </li>
          <li>
            <Link
              to="/admin/categories"
              className={`sidebar-element ${
                path === "/admin/categories" ? "active" : ""
              }`}
            >
              <i className="fa fa-th-large"></i> Quản Lý Danh Mục
            </Link>
          </li>
          <li>
            <Link
              to="/admin/coupons"
              className={`sidebar-element ${
                path === "/admin/coupons" ? "active" : ""
              }`}
            >
              <i className="fa fa-ticket"></i> Quản Lý Khuyễn Mãi
            </Link>
          </li>

          <li>
            <Link to="/" className="sidebar-element" style={{ color: "red" }}>
              <i className="fa fa-user"></i> Thoát
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
});

export default Sidebar;
