import React, { useMemo } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminLogin from "./Login";
import AdminDashboard from "./Dashboard";
import ManageUsers from "./ManageUsers";
import Sidebar from "./Sidebar";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import ManageApplications from "./ManageApplications";
import ManageCategories from "./ManageCategories";
import UpdateCategory from "./UpdateCategory";
import ManageProducts from "./ManageProducts";
import ManageCoupons from "./ManageCoupons";
import NewCoupon from "./NewCoupon";

const Centre = () => {
  const location = useLocation();

  const showSidebar = useMemo(() => {
    const sidebarPaths = [
      "/admin/users",
      "/admin/dashboard",
      "/admin/applications",
      "/admin/categories",
      "/admin/products",
      "/admin/coupons",
    ];
    return sidebarPaths.some((path) => location.pathname.startsWith(path));
  }, [location.pathname]);

  return (
    <div className={`Centre-container background-2`}>
      {showSidebar && <Sidebar path={location.pathname} />}
      <div className="Centre">
        <Routes>
          <Route path="login" element={<AdminLogin />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="addUser" element={<AddUser />} />
          <Route path="user/:id" element={<UpdateUser />} />
          <Route path="applications" element={<ManageApplications />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="category/update/:id" element={<UpdateCategory />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="coupons" element={<ManageCoupons />} />
          <Route path="/coupon/new" element={<NewCoupon />} />
        </Routes>
      </div>
    </div>
  );
};

export default Centre;
