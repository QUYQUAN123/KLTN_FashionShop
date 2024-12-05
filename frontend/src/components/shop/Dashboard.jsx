import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";

import { getShopProducts } from "../../actions/productActions";
import { allOrders, fetchOrderStats } from "../../actions/orderActions";
import ChartComponent from "../Chart";
import OrderChart from "../OrderChart";
import { formatToVNDWithVND } from "../../utils/formatHelper";
import { getShop , getShopById,getProductsByShopId} from "../../actions/shopActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { shop, shopData } = useSelector((state) => state.shop);
  const { products } = useSelector((state) => state.products);
  const {
    monthlyRevenue,
    monthlyOrderCount,
    orders,
    totalAmount,
    totalPaidAmount,
    totalPendingAmount,
    loading,
  } = useSelector((state) => state.allOrders);


  console.log(totalAmount,"totalAmount");
  let outOfStock = 0;
  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getShopProducts());
    dispatch(fetchOrderStats());
  
  }, [dispatch]);

 
  useEffect(() => {
    dispatch(getShop());
    dispatch(allOrders(1, "", "", 10)); 
  }, [dispatch]);


  useEffect(() => {
    if (shop && shop._id) {
      console.log("shopid", shop._id);
      
      localStorage.setItem("shopid", shop._id);
    }
  }, [shop]); 
  
  useEffect(() => {
    dispatch(fetchOrderStats());
  }, [dispatch]);

  return (
    <div className="content-container">
      <h1
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          textAlign: "center", 
          padding: "20px 0",  
          margin: "10px auto",  
          width: "100%", 
          maxWidth: "800px",  
          color: "#333",  
          textTransform: "uppercase", 
          boxSizing: "border-box",  
        }}
      >
        Quản Lí Shop
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Admin Dashboard"} />
          <div className="row pr-4">
            <div className="col-xl-4 col-sm-12 mb-3">
              <div className="card-custom text-white o-hidden h-100">
                <div className="card-body">
                  <div
                    className="image-container"
                    style={{
                      backgroundImage: `url('../images/Screenshot 2024-06-16 033242.png')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "200px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="text-overlay">
                      Tổng Cộng <br /> <b>{formatToVNDWithVND(totalAmount)} </b>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-sm-12 mb-3">
              <div className="card-custom">
                <div className="card-body">
                  <div
                    className="image-container"
                    style={{
                      backgroundImage: `url('../images/hinh-nen-iphone-11-26.webp')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "200px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="overlay"></div>
                    <div className="text-overlay">
                      Đã Thanh Toán <br />{" "}
                      <b>{formatToVNDWithVND(totalPaidAmount)} </b>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-sm-12 mb-3">
              <div className="card-custom text-white o-hidden h-100">
                <div className="card-body">
                  <div
                    className="image-container"
                    style={{
                      backgroundImage: `url('../images/Screenshot 2024-06-16 033139.png')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "200px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="text-overlay">
                      Chưa Thanh Toán <br />{" "}
                      <b>{formatToVNDWithVND(totalPendingAmount)} </b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row pr-4" style={{ marginLeft:'4rem' }}>
                      <ChartComponent monthlyRevenue={monthlyRevenue} />
                      </div> */}
          {/* <Fragment>
            <div className="chart-wrapper">
              <ChartComponent monthlyRevenue={monthlyRevenue} />

              <OrderChart monthlyOrderCount={monthlyOrderCount} />
            </div>
          </Fragment> */}

          <div className="row pr-4">
            <div className="col-xl-3 col-sm-6 mb-3"style={{
                 marginLeft:"350px",
                  }}>
              
              <div
                className="image-container"
                style={{
                  
                  backgroundImage: `url('../images/Screenshot 2024-06-17 222645.png')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <div
                  className="card-body text-center"
                  style={{
                    color: "white",
                    padding: "10px",
                  }}
                >
                  <div
                    className="card-font-size"
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
                      marginTop: "2rem",
                    }}
                  >
                    Sản Phẩm <br /> <b>{products && products.length}</b>
                  </div>
                </div>
                <div
                  className="card-body"
                  style={{
                    width: "100%",
                  }}
                >
                  <div
                    className="link-container text-center"
                    style={{
                      width: "100%",
                    }}
                  >
                    <Link
                      className="card-footer btn btn-primary"
                      to="/shopkeeper/products"
                      style={{
                        width: "100%",
                        display: "block",
                        textAlign: "center",
                        marginBottom: "-1rem",
                      }}
                    >
                      Chi Tiết
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div
                className="image-container"
                style={{
                  backgroundImage: `url('../images/images (6).jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <div
                  className="card-body text-center"
                  style={{
                    color: "white",
                    padding: "10px",
                  }}
                >
                  <div
                    className="card-font-size"
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
                      marginTop: "2rem",
                    }}
                  >
                    Đơn Hàng <br /> <b>{orders && orders.length}</b>
                  </div>
                </div>
                <div
                  className="card-body"
                  style={{
                    width: "100%",
                  }}
                >
                  <div
                    className="link-container text-center"
                    style={{
                      width: "100%",
                    }}
                  >
                    <Link
                      className="card-footer btn btn-primary"
                      to="/shopkeeper/orders"
                      style={{
                        width: "100%",
                        display: "block",
                        textAlign: "center",
                        marginBottom: "-1rem",
                      }}
                    >
                      Chi Tiết
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            

            
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
