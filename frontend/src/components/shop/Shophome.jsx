import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Nếu id shop là từ URL params
import { getShopById,getProductsByShopId } from "../../actions/shopActions"; // Import hàm getShopById
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "../product/Product";

const ShopHome = () => {
  const { id } = useParams(); 
  const { shop, shopData ,products} = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopById(id));
    dispatch(getProductsByShopId(id));
  }, [dispatch, id]); 

  console.log("san pham",products);
  return (
    <>
      <ToastContainer />
      <div className="shop-home-container">
        <div className="cover-shophome">
          {shop && shop.cover && (
            <img
              className="shop-cover-img"
              src={shop.cover.url}
              alt="Ảnh Bìa"
            />
          )}
          <figure className="avatar-shophome">
            {shop && shop.avatar && (
              <img
                className="rounded-circle img-fluid"
                src={shop.avatar.url}
                alt="Ảnh Đại Diện"
              />
            )}
          </figure>
        </div>  
        <h2>{shop.shopName}</h2>
     
          </div>
            <div className="shop-details-box">
              <h3>Thông tin cửa hàng</h3>
              <div className="shop-detail-item">
                <strong>Địa chỉ:</strong>{" "}
                {shop && shop.pickupAddress && shop.pickupAddress.address.detailed},{" "}
                {shop && shop.pickupAddress && shop.pickupAddress.address.ward},{" "}
                {shop && shop.pickupAddress && shop.pickupAddress.address.district},{" "}
                {shop && shop.pickupAddress && shop.pickupAddress.address.province}
              </div>
              <div className="shop-detail-item">
                <strong>Số điện thoại:</strong> {shop && shop.pickupAddress && shop.pickupAddress.contactPhone}
              </div>
              <div className="shop-detail-item">
                <strong>Liên hệ:</strong> {shop && shop.pickupAddress && shop.pickupAddress.contactName}
              </div>


          <div className="home-component">
              <h3>Sản phẩm của cửa hàng:</h3>
              <div className="home-new-products">
              {products.length > 0 ? (
                products.map((product) => (
                  <Product key={product._id} product={product} />
               ))
               ) : (
                  <p>Không có sản phẩm nào trong cửa hàng.</p>
                )}
              </div>
                 <button className="more-text-btn">Xem Thêm</button>
              </div>
  </div>  
    </>
    
  );
};

export default ShopHome;
