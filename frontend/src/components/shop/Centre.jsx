import React, { useMemo } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import ProductsList from "./ProductsList";
import NewProduct from "./NewProduct";
import UpdateProduct from "./UpdateProduct";
import OrdersList from "./OrdersList";
import ProcessOrder from "./ProcessOrder";
import ProductReviews from "./ProductReviews";
import ShopSetup from "./ShopSetup";
import NewCouponShop from "./NewCouponShop";
import ShopCoupon from "./ShopCoupon";

const Centre = () => {
  const location = useLocation();

  const showSidebar = useMemo(() => {
    const sidebarPaths = [
      "/shopkeeper/dashboard",
      "/shopkeeper/products",
      "/shopkeeper/shop",
      "/shopkeeper/orders",
      "/shopkeeper/reviews",
      "/shopkeeper/product",
      "/shopkeeper/order/",
      "/shopkeeper/user/",
      "/shopkeeper/coupons/",
    ];
    return sidebarPaths.some((path) => location.pathname.startsWith(path));
  }, [location.pathname]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Sidebar />
      </div>
      <div style={{ flex: 8 }}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="product" element={<NewProduct />} />
          <Route path="product/:id" element={<UpdateProduct />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="order/:id" element={<ProcessOrder />} />
          <Route path="reviews" element={<ProductReviews />} />
          <Route path="shop" element={<ShopSetup />} />
          <Route path="newCoupon" element={<NewCouponShop />} />
          <Route path="coupons" element={<ShopCoupon />} />
        </Routes>
      </div>
    </div>
  );
};

export default Centre;
