import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopProducts } from "../../actions/productActions";
import Section from "./section/Section";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getShop , getShopById,getProductsByShopId} from "../../actions/shopActions";
import Product from "../product/Product";
import ManageSection from "./section/ManageSection";
import { getCategoryAll } from "../../actions/categoryActions";
import ChangeAvatar from "./ChangeAvatar";
import ChangeCover from "./ChangeCover";

const ShopSetup = () => {
  // const { products } = useSelector((state) => state.shopProducts);
  const { shop, shopData,products } = useSelector((state) => state.shop);
  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [changeCover, setChangeCover] = useState(false);
  const shopId = localStorage.getItem("shopid");
  console.log("Stored Shop ID:", shopId); // In ra giá trị shopid đã lưu
  useEffect(() => {
    dispatch(getShopById(shopId));
    
    
  }, [dispatch]); 


  useEffect(() => {
   
    dispatch(getShopProducts(shopId));
    dispatch(getCategoryAll());
  }, []);

  
  const handleChangeCover = () => {
    setChangeCover(true); 
  };
  const handleChangeAvatar = () => {
    setChangeAvatar(true);
  };

  useEffect(() => {
    if (shop) {
      console.log(shop);
    }
  }, [shop]);
  useEffect(() => {
    console.log("shoopdata",shopData);
  }, [shopData]);
  
  return (
    <>
      <ToastContainer />

      {changeAvatar && (
        <ChangeAvatar onClose={() => setChangeAvatar(false)} avatar={shop.avatar} />
      )}
      {changeCover && (
        <ChangeCover onClose={() => setChangeCover(false)} cover={shop.cover} />
      )}
      <div className="shop-home-container">
      <div className="cover-shophome">
      {shop && shop.cover && (
            <img
              className="shop-cover-img"
              src={shop.cover.url}
              alt="Ảnh Bìa"
              onClick={handleChangeCover}
            />
          )}
          <figure className="avatar-shophome">
            {shop && shop.avatar && (
              <img
                className="rounded-circle img-fluid"
                src={shop.avatar.url}
                alt="Ảnh Đại Diện"
                onClick={handleChangeAvatar}
              />
            )}
          </figure>
        </div>  
        <div className="shop-name">
        <h1>{shop.shopName}</h1> {/* Hiển thị tên cửa hàng */}
      </div>

      <div className="shop-details-box">
            <h3 className="shop-title">Thông tin cửa hàng</h3>
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


            </div>

          {/* <div className="home-component">
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
              </div> */}
  
      </div>
    </>
  );
};

export default ShopSetup;
