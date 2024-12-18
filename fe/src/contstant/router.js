import Home from "../pages";
import Account from "../pages/account";
import CategoryManagement from "../pages/admin/CategoryManagement";
import OrderManagement from "../pages/admin/OrderManagement";
import ProductManagement from "../pages/admin/ProductManagement";
import StatisticalManagement from "../pages/admin/StatisticalManagement";
import UserManagement from "../pages/admin/UserManagement";
import VoucherManagement from "../pages/admin/VoucherManagement";
import Auth from "../pages/auth";
import Cart from "../pages/cart";
import Category from "../pages/category";
import Checkout from "../pages/checkout";
import DetailOrder from "../pages/detail-order";
import Guarantee from "../pages/guarantee";
import LostPassword from "../pages/lost-password";
import MyOrder from "../pages/my-order";
import Product from "../pages/product";
import Promotion from "../pages/promotion";
import ResetPassword from "../pages/reset-password";
import Search from "../pages/search";
import Transport from "../pages/transport";

export const listRouter = [
  { path: "/admin/product", element: <ProductManagement /> },
  { path: "/admin/category", element: <CategoryManagement /> },
  { path: "/admin/order", element: <OrderManagement /> },
  { path: "/admin/user", element: <UserManagement /> },
  { path: "/admin/voucher", element: <VoucherManagement /> },
  { path: "/admin/statistical", element: <StatisticalManagement /> },
  { path: "/search", element: <Search /> },
  { path: "/account", element: <Account /> },
  { path: "/lost-password", element: <LostPassword /> },
  { path: "/reset-password/:id", element: <ResetPassword /> },
  { path: "/product/:id", element: <Product /> },
  { path: "/check-out", element: <Checkout /> },
  { path: "/cart", element: <Cart /> },
  { path: "/auth", element: <Auth /> },
  { path: "/category/:id", element: <Category /> },
  { path: "/transport", element: <Transport /> },
  { path: "/guarantee", element: <Guarantee /> },
  { path: "/promotion", element: <Promotion /> },
  { path: "/my-order", element: <MyOrder /> },
  { path: "/detail-order/:id", element: <DetailOrder /> },
  { path: "/", element: <Home /> },
];
