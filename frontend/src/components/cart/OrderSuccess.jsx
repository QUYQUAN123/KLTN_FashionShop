import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Header from "../layout/Header";

const OrderSuccess = () => {
  return (
    <Fragment>
      <Header />
      <MetaData title={"Order Success"} />

      <div className="order-sucess-container background-2">
        <img
          className="my-5 img-fluid d-block mx-auto"
          src="/images/order_success.png"
          alt="Order Success"
          width="200"
          height="200"
        />

        <h1>Mua Hàng Thành Công.</h1>

        <Link to="/orders/me" className="order-success-after">
          Xem hóa Đơn
        </Link>
      </div>
    </Fragment>
  );
};

export default OrderSuccess;
