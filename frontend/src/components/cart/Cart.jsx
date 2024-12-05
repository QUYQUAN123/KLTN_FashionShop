import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  getUserCart,
  getUserCartProduct,
  checkCartQuantities,
} from "../../actions/cartActions";
import DeleteNotify from "../layout/DeleteNotify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatToVNDWithVND } from "../../utils/formatHelper";
import Header from "../layout/Header";
import DisplayCoupons from "./DisplayCoupons";


const Cart = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [all, setAll] = useState(false);
  const [appliedCoupons, setAppliedCoupons] = useState([]);
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [showCoupons, setShowCoupons] = useState(false);


  const [selectedShop, setSelectedShop] = useState(null);
 


  const handleCloseCoupons = (selectedCoupons) => {
    setShowCoupons(false);
    if (selectedCoupons && selectedCoupons.length > 0) {
      setAppliedCoupons(selectedCoupons);
      localStorage.setItem("appliedCoupons", JSON.stringify(selectedCoupons));
    }
  };


  const calculateDiscountedPrice = (item) => {
    let discountedPrice = item.price;
    appliedCoupons.forEach((coupon) => {
      if (coupon.target.ids.includes(item.category)) {
        discountedPrice -= (discountedPrice * coupon.percentage) / 100;
      }
    });
    return discountedPrice;
  };

  const calculateTotalPrice = () => {
    const total = selected.reduce((acc, item) => {
      const discountedPrice = calculateDiscountedPrice(item);
      return acc + discountedPrice * item.quantity;
    }, 0);
    return total;
  };

  const calculateTotalDiscount = () => {
    return selected.reduce((acc, item) => {
      const originalPrice = item.price * item.quantity;
      const discountedPrice = calculateDiscountedPrice(item) * item.quantity;
      return acc + (originalPrice - discountedPrice);
    }, 0);
  };

  const handleCouponsClick = async () => {
    const itemsToCoupon = cartItems
      .filter((item, index) => selectedItems[index])
      .map((item) => ({
        ...item,
        category: item.category, // Ensure category is included
      }));
    try {
      await dispatch(checkCartQuantities(itemsToCoupon));
      localStorage.setItem("itemsToCoupon", JSON.stringify(itemsToCoupon));
      console.log("itemsToCouponcart", itemsToCoupon);
      setShowCoupons(!showCoupons);
    } catch (error) {
      toast.error(error); // Display the error message from the action
    }
  };

  const removeCartItemHandler = async (id, variant, size) => {
    for (const item of selected) {
      await dispatch(removeItemFromCart(item.product, item.variant, item.size));
    }
    dispatch(getUserCart());
    setSelected([]);
    setSelectedShop(null);
    setShow(false);
  };

  const increaseQty = async (shopId,index) => {
    const itemsInShop = cartItems.filter(item => item.shopId === shopId);
    const choosed = itemsInShop[index];

    const item = {
      product: choosed.product,
      variant: choosed.variant,
      inventory: choosed.inventory,
      name: choosed.name,
      variantName: choosed.variantName,
      price: choosed.price,
      image: choosed.image,
      quantity: 1,
      size: choosed.size,
    };

    const check = await dispatch(getUserCartProduct(item));

    if (check) {
      await dispatch(addItemToCart(item));
      dispatch(getUserCart());
      toast.success("Sản phẩm đã tăng số lượng trong giỏ hàng");
    } else {
      return toast.error("Giỏ hàng đã đạt số lượng hiện hữu của sản phẩm");
    }
  };

  const decreaseQty = async (shopId,index) => {
    const itemsInShop = cartItems.filter(item => item.shopId === shopId);
    const choosed = itemsInShop[index];


    const item = {
      product: choosed.product,
      variant: choosed.variant,
      inventory: choosed.inventory,
      name: choosed.name,
      variantName: choosed.variantName,
      price: choosed.price,
      image: choosed.image,
      quantity: -1,
      size: choosed.size,
    };

    if (choosed.quantity === 1) {
      return;
    }

    const check = await dispatch(getUserCartProduct(item));

    if (check) {
      await dispatch(addItemToCart(item));
      dispatch(getUserCart());
      toast.success("Sản phẩm đã giảm số lượng trong giỏ hàng");
    } else {
      return toast.error("Giỏ hàng đã đạt số lượng hiện hữu của sản phẩm");
    }
  };

  const checkoutHandler = async () => {
    const discountedTotalPrice = calculateTotalPrice();
    localStorage.setItem("discountedTotalPrice", discountedTotalPrice);
    const itemsToCheckout = cartItems.filter(
      (item, index) => selectedItems[index]
    );

    try {
      await dispatch(checkCartQuantities(itemsToCheckout));
      localStorage.setItem("itemsToCheckout", JSON.stringify(itemsToCheckout));
      const discountedTotalPrice = calculateTotalPrice();
      history("/login?redirect=/shipping", {
        state: {
          totalPrice: discountedTotalPrice,
          appliedCoupons: appliedCoupons,
        },
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const handlerQuantity = (e) => {
    setNewQuantity(e.target.value);
  };

  const handleBlur = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
    }
  };




  // const handleCheckboxChange = (index) => {
  //   const newSelectedItems = [...selectedItems];
  //   newSelectedItems[index] = !newSelectedItems[index];
  //   setSelectedItems(newSelectedItems);
  //   if (newSelectedItems[index] === true) {
  //     setSelected((prev) => [...prev, cartItems[index]]);
  //   } else {
  //     setSelected((prev) => prev.filter((item) => item !== cartItems[index]));
  //   }
  // };
  const handleCheckboxChange = (shopId, index) => {
    // Create a new selectedItems array
    const newSelectedItems = [...selectedItems];
    
    // If no shop is selected or the current shop is already selected
    if (!selectedShop || selectedShop === shopId) {
      // Toggle the specific item's selection
      newSelectedItems[index] = !newSelectedItems[index];
      setSelectedItems(newSelectedItems);
      
      // Update the selected items
      if (newSelectedItems[index] === true) {
        setSelected((prev) => [...prev, cartItems[index]]);
        // Set the selected shop if not already set
        if (!selectedShop) {
          setSelectedShop(shopId);
        }
      } else {
        setSelected((prev) => prev.filter((item) => item !== cartItems[index]));
        
        // If no items are selected for this shop, reset the selectedShop
        const shopItems = groupedByShop[shopId];
        const isAnyShopItemSelected = shopItems.some((_, idx) => newSelectedItems[cartItems.indexOf(shopItems[idx])]);
        if (!isAnyShopItemSelected) {
          setSelectedShop(null);
        }
      }
    }
  };









  const Choose = (value) => {
    setAll(value);
    setSelectedItems(new Array(cartItems.length).fill(value));
    if (value) {
      setSelected(cartItems);
    } else {
      setSelected([]);
    }
  };

  useEffect(() => {
    setSelectedItems(new Array(cartItems.length).fill(false));
  }, [cartItems]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [newQuantity, setNewQuantity] = useState();
  
  const openModal = (shopId, index) => {
    setCurrentItemIndex(index);
    const itemsInShop = cartItems.filter(item => item.shopId === shopId);
    setNewQuantity(itemsInShop[index].quantity);
    setModalIsOpen(true);
    setSelectedShop(shopId);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentItemIndex(null);
  };


  const updateQuantity = async () => {
    if (currentItemIndex === null) return;
    let inputValue = parseInt(newQuantity);
    if (isNaN(inputValue) || inputValue < 1) {
      toast.error("Vui lòng nhập lại số lượng hợp lệ");
      return;
    }
    const itemsInShop = cartItems.filter(item => item.shopId === selectedShop);
    const choosed = itemsInShop[currentItemIndex];

    const item = {
      product: choosed.product,
      variant: choosed.variant,
      inventory: choosed.inventory,
      name: choosed.name,
      variantName: choosed.variantName,
      price: choosed.price,
      image: choosed.image,
      quantity: newQuantity - choosed.quantity,
      size: choosed.size,
    };

    const check = await dispatch(getUserCartProduct(item));

    if (check) {
      await dispatch(addItemToCart(item));
      dispatch(getUserCart());
      toast.success("Sản phẩm đã cập nhật số lượng trong giỏ hàng");
      closeModal();
    } else {
      toast.error("Số lượng vượt quá số lượng hiện hữu của sản phẩm");
    }
  };

  const groupedByShop = cartItems.reduce((groups, item) => {
    const { shopId } = item;
  
    // Kiểm tra nếu shopId đã tồn tại trong nhóm, nếu chưa thì khởi tạo mảng trống
    if (!groups.hasOwnProperty(shopId)) {
      groups[shopId] = [];
    }
  
    // Thêm sản phẩm vào nhóm của shopId
    groups[shopId].push(item);
  
    return groups;
  }, {});
  
  
  // Lấy các shopId đã nhóm
  const shopIds = Object.keys(groupedByShop);

console.log("shopIds",shopIds);
console.log("cartItems",cartItems);

  
  
  return (
    <Fragment>
      <Header />
      <MetaData title={"Your Cart"} />
      <div className="cart-container background-2">
        {user ? (
          cartItems.length === 0 ? (
            <h1 className="cart-not-login">Giỏ Hàng Trống </h1>
          ) : (
            <Fragment>
              <ToastContainer />
              <div className="cart-items-container">
                <div className="cart-items">
                  <div style={{ display: "flex", gap: "20px" }}>
                    <h2 className="cart-status">
                      Giỏ Hàng có: <b>{cartItems.length} Sản Phẩm</b>
                    </h2>
                    {/* <button
                      className={`cart-select-all-btn ${all && "active"}`}
                      onClick={() => Choose(!all)}
                    >
                      {all ? "Bỏ Chọn Tất Cả" : "Chọn Tất Cả"}
                    </button> */}
                    {selected.length > 0 && (
                      <button
                        className={`cart-select-all-btn ${all && "active"}`}
                        onClick={() => setShow(true)}
                      >
                        Xóa Đã Chọn
                      </button>
                    )}
                  </div>


            {shopIds.map((shopId) => (
              <div key={shopId}>
                <h2>
                  Tên cửa hàng {groupedByShop[shopId][0].shopName}
                </h2>
                  {groupedByShop[shopId].map((item, index) => (
                    <div key={index}>
                      <div className="cart-item">
                        <div className="item-of-cart">
                          <div className="item-cart-down">
                            <img src={item.image} alt="No image" />
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                height: "100%",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "15px",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "10px",
                                      alignItems: "center",
                                    }}
                                  >
                                    <p style={{ fontWeight: "bold" }}>
                                      Tên sản phẩm:
                                    </p>
                                    <Link
                                      to={`/product/${item.product}`}
                                      style={{ color: "black" }}
                                    >
                                      {item.name}
                                    </Link>
                                  </div>

                                  <div style={{ display: "flex", gap: "80px" }}>
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                      }}
                                    >
                                      <p style={{ fontWeight: "bold" }}>Mẫu:</p>
                                      {item.variantName}
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                      }}
                                    >
                                      <p style={{ fontWeight: "bold" }}>
                                        Kích thước:
                                      </p>
                                      <p className="cart-text">{item.size}</p>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                      }}
                                    >
                                      <p style={{ fontWeight: "bold" }}>
                                        Đơn giá:
                                      </p>
                                      <p className="cart-text">
                                        {formatToVNDWithVND(item.price)}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="cart-item-stock">
                                  <p style={{ fontWeight: "bold" }}>
                                    Số lượng:
                                  </p>
                                  <input
                                    type="text"
                                    className=""
                                    value={item.quantity}
                                    onClick={() => openModal(shopId, groupedByShop[shopId].indexOf(item))}
                                    onBlur={(e) => handleBlur(e)}
                                    readOnly
                                  />
                                  <span
                                    className="cart-item-btn minus"
                                    onClick={() => decreaseQty(shopId, groupedByShop[shopId].indexOf(item))}
                                  >
                                    -
                                  </span>
                                  <span
                                    className="cart-item-btn plus"
                                    onClick={() => increaseQty(shopId, groupedByShop[shopId].indexOf(item))}
                                  >
                                    +
                                  </span>
                                </div>

                                <div
                                  className="input-quantity-container"
                                  style={{
                                    display: modalIsOpen ? "flex" : "none",
                                  }}
                                >
                                  <div className="input-quantity-form">
                                    <h1>Nhập số lượng</h1>
                                    <input
                                      type="text"
                                      value={newQuantity}
                                      onChange={(e) => handlerQuantity(e)}
                                      className="centered-input"
                                    />

                                    <div className="input-quantity-btn-container">
                                    <button
                                      className="input-quantity-btn-container-yes"
                                      onClick={() => updateQuantity()}
                                    >
                                      Cập Nhật
                                    </button>
                                      <button
                                        className="input-quantity-btn-container-no"
                                        onClick={closeModal}
                                      >
                                        Thoát
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                    type="checkbox"
                                    checked={selectedItems[cartItems.indexOf(item)]}
                                    onChange={() => handleCheckboxChange(shopId, cartItems.indexOf(item))}
                                    disabled={selectedShop && selectedShop !== shopId}
                                    className="cart-checkbox"
                                  />
                                                      
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {show && (
                        <DeleteNotify
                          func={removeCartItemHandler}
                          paras={[item.product, item.variant, item.size]}
                          show={setShow}
                        />
                      )}
                    </div>
                  ))}
                </div>
                ))}
                </div>


                <div className="cart-checkout-container">
                  <strong>
                    <h4
                      style={{ display: "flex", justifyContent: "center" }}
                      className="cart-status"
                    >
                      Hóa Đơn
                    </h4>
                  </strong>
                  <hr />
                  <p>
                    Số Lượng:
                    <span className="order-summary-values">
                      {selected.reduce(
                        (acc, item) => acc + Number(item.quantity),
                        0
                      )}{" "}
                      Món
                    </span>
                  </p>
                  <p>
                    Tổng giá:
                    <span className="order-summary-values">
                      {formatToVNDWithVND(
                        selected.reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0
                        )
                      )}
                    </span>
                  </p>
                  <p>
                    Tổng giảm giá:
                    <span className="order-summary-values">
                      {formatToVNDWithVND(calculateTotalDiscount())}
                    </span>
                  </p>
                  <p>
                    Thanh Toán:
                    <span className="order-summary-values">
                      {formatToVNDWithVND(calculateTotalPrice())}
                    </span>
                  </p>

                  <hr />

                  <button
                    className={`cart-checkout-btn ${
                      selected.length === 0 && "disabled"
                    }`}
                    onClick={handleCouponsClick}
                  >
                    Phiếu giảm giá
                  </button>

                  {showCoupons && (
                    <DisplayCoupons onClose={handleCloseCoupons} />
                  )}

                  <button
                    className={`cart-checkout-btn ${
                      selected.length === 0 && "disabled"
                    }`}
                    onClick={checkoutHandler}
                  >
                    Thanh Toán
                  </button>
                </div>
              </div>
            </Fragment>
          )
        ) : (
          <h2 className="cart-not-login">Login to see your cart</h2>
        )}
      </div>
    </Fragment>
  );
};

export default Cart;
