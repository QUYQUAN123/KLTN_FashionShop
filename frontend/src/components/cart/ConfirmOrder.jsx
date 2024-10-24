import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { checkCartQuantities } from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  clearErrors,
  momoPayment,
} from "../../actions/orderActions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatToVNDWithVND } from "../../utils/formatHelper";

const ConfirmOrder = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.newOrder);

  const [items, setItems] = useState([]);
  const [infor, setInfor] = useState("");

  const itemsPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
  const discountedTotalPrice = localStorage.getItem('discountedTotalPrice');
  const totalPrice = discountedTotalPrice ? parseFloat(discountedTotalPrice) : (itemsPrice + shippingPrice + taxPrice).toFixed(2);
  const discountAmount = itemsPrice - totalPrice;

  const checkQuantitiesBeforePayment = async () => {
    try {
      await dispatch(checkCartQuantities(items));
      return true;
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra khi kiểm tra số lượng sản phẩm");
      return false;
    }
  };


  function generateRandomId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000000);
    const randomId = `${timestamp}${random}`;
    return randomId;
  }

  const momoPay = async () => {
    if (await checkQuantitiesBeforePayment()) {
      const integerTotalPrice = Math.floor(totalPrice);
      const data = {
        totalPrice: integerTotalPrice,
      };
      const order = {
        itemsPrice: itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        userName: user.name,
        orderItems: items,
        shippingInfo: infor,
      };
  
      order.paymentInfo = {
        id: generateRandomId(),
        status: "Progress",
      };
  
      await dispatch(momoPayment(data));
      sessionStorage.setItem("momoOrder", JSON.stringify(order));
      history("/waiting");
    }
  };
  
  const processToCashPayment = async () => {
    if (await checkQuantitiesBeforePayment()) {
      const order = {
        itemsPrice: itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        userName: user.name,
        orderItems: items,
        shippingInfo: infor,
      };
  
      order.paymentInfo = {
        id: generateRandomId(),
        status: "Progress",
      };
  
      dispatch(createOrder(order));
      history("/success");
    }
  };
  
  const processToPayment = async () => {
    if (await checkQuantitiesBeforePayment()) {
      const data = {
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice,
        taxPrice,
        totalPrice,
      };
  
      sessionStorage.setItem("orderInfo", JSON.stringify(data));
      history("/payment");
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  useEffect(() => {
    const storedSelectedItems =
      JSON.parse(localStorage.getItem("itemsToCheckout")) || [];

    setItems(storedSelectedItems);

    if (!shippingInfo.address) {
      const storedShippingInfo =
        JSON.parse(localStorage.getItem("shippingInfo")) || [];

      setInfor(storedShippingInfo);
    } else {
      setInfor(shippingInfo);
    }
  }, [cartItems, shippingInfo]);

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />
      <CheckoutSteps shipping confirmOrder />

      <div className="confirm-order-container">
        <div className="confirm-order-form-info">
          <h4 className="mb-3" style={{ fontSize: "27px", fontWeight: "bold" }}>
            Thông tin giao hàng
          </h4>

          <p>
            <b>Họ Tên :</b> {user && user.name}
          </p>
          <p>
            <b>Số Điện Thoại:</b> {infor.phone}
          </p>
          <p className="mb-4">
            <b>Địa Chỉ:</b>{" "}
            {`${infor.province}, ${infor.district}, ${infor.town}, ${infor.location}`}
          </p>

          <hr />
          <h4 className="mt-4" style={{ fontSize: "27px", fontWeight: "bold" }}>
            Giỏ Hàng:
          </h4>

          {items.map((item) => (
            <Fragment key={item.product}>
              <hr />
              <div className="cart-item-confirm my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img src={item.image} alt="Laptop" height="45" width="65" />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x {formatToVNDWithVND(item.price)} ={" "}
                      <b>{formatToVNDWithVND(item.quantity * item.price)}</b>
                    </p>
                  </div>
                </div>
              </div>

              <hr />
            </Fragment>
          ))}
        </div>

        <div className="confirm-order-form">
          <h4>Hóa Đơn </h4>
          <hr />
          <p>
            Tổng giá trị sản phẩm:
            <span className="order-summary-values">
              {formatToVNDWithVND(itemsPrice)}
            </span>
          </p>
          <p>
          Số tiền khuyến mãi:
            <span className="order-summary-values">
              {formatToVNDWithVND(discountAmount)}
            </span>
          </p>
          <p>
            Vận Chuyển :
            <span className="order-summary-values">
              {formatToVNDWithVND(shippingPrice)}
            </span>
          </p>
          <p>
            Thuế:
            <span className="order-summary-values">
              {formatToVNDWithVND(taxPrice)}
            </span>
          </p>

          <hr />

          <p>
            Tổng:
            <span className="order-summary-values">
              {formatToVNDWithVND(totalPrice)}
            </span>
          </p>

          <hr />
          <button className="confirm-order-card-btn momo" onClick={momoPay}>
            Thanh toán MoMo
          </button>
          <button className="confirm-order-card-btn" onClick={processToPayment}>
            Ngân Hàng (Bank card)
          </button>
          <button
            className="confirm-order-cash-btn"
            onClick={processToCashPayment}
          >
            Trực Tiếp (COD)
          </button>
          <div>
            <Link
              to="/shipping"
              className="btn btn-outline-danger btn-sm"
              style={{ marginTop: "1rem", marginLeft: "175px" }}
            >
              Quay lại
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
