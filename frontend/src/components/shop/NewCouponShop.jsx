import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createCoupon, clearErrors } from "../../actions/couponActions";
import { getCategoryAll } from "../../actions/categoryActions";
import { CREATE_COUPON_RESET } from "../../constants/couponConstants";

const NewCouponShop = () => {
  const [percentage, setPercentage] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [role] = useState("shopkeeper");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiry, setExpiry] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.coupon);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoryAll());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Tạo mới phiếu giảm giá thành công");
      setTimeout(() => {
        navigate("/shopkeeper/coupons");
        dispatch({ type: CREATE_COUPON_RESET });
      }, 500);
    }
  }, [dispatch, error, success, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!percentage) newErrors.percentage = "Vui lòng nhập phần trăm giảm giá";
    else if (percentage <= 0 || percentage >= 100)
      newErrors.percentage = "Phần trăm giảm giá phải lớn hơn 0 và nhỏ hơn 100";
    if (!maxDiscount) newErrors.maxDiscount = "Vui lòng nhập số tiền giảm tối đa";
    else if (maxDiscount < 0)
      newErrors.maxDiscount = "Số tiền giảm tối đa phải lớn hơn hoặc bằng 0";
    if (!description) newErrors.description = "Vui lòng nhập mô tả";
    if (!selectedCategory)
      newErrors.selectedCategory = "Vui lòng chọn danh mục";
    if (!quantity) newErrors.quantity = "Vui lòng nhập số lượng";

    if (!expiry) newErrors.expiry = "Vui lòng chọn ngày hết hạn";
    else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const expiryDate = new Date(expiry);
      if (expiryDate <= today)
        newErrors.expiry = "Ngày hết hạn phải lớn hơn ngày hiện tại";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        percentage: Number(percentage),
        maxDiscount: Number(maxDiscount),
        role,
        description,
        target: {
          type: "category",
          ids: [selectedCategory],
        },
        quantity: Number(quantity),
        expiry,
      };
      dispatch(createCoupon(formData));
    }
  };

  return (
    <Fragment>
      <div className="container container-fluid">
        <div className="wrapper my-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Thêm phiếu giảm giá</h1>

            <div className="form-group">
              <label htmlFor="percentage_field">Phần trăm giảm giá</label>
              <input
                type="number"
                id="percentage_field"
                className={`form-control ${
                  errors.percentage ? "is-invalid" : ""
                }`}
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                placeholder="Nhập phần trăm giảm giá"
              />
              {errors.percentage && (
                <div className="invalid-feedback">{errors.percentage}</div>
              )}
            </div>
            {/* Giới hạn giảm giá tối đa */}
            <div className="form-group">
              <label htmlFor="maxDiscount_field">Giới hạn giảm giá tối đa</label>
              <input
                type="number"
                id="maxDiscount_field"
                className={`form-control ${
                  errors.maxDiscount ? "is-invalid" : ""
                }`}
                value={maxDiscount}
                onChange={(e) => setMaxDiscount(e.target.value)}
                placeholder="Nhập số tiền giảm tối đa"
              />
              {errors.maxDiscount && (
                <div className="invalid-feedback">{errors.maxDiscount}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description_field">Mô tả</label>
              <textarea
                id="description_field"
                className={`form-control ${
                  errors.description ? "is-invalid" : ""
                }`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập mô tả"
              ></textarea>
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="category_field">Danh mục</label>
              <select
                id="category_field"
                className={`form-control ${
                  errors.selectedCategory ? "is-invalid" : ""
                }`}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Chọn danh mục</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.vietnameseName}
                    </option>
                  ))}
              </select>
              {errors.selectedCategory && (
                <div className="invalid-feedback">
                  {errors.selectedCategory}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="quantity_field">Số lượng</label>
              <input
                type="number"
                id="quantity_field"
                className={`form-control ${
                  errors.quantity ? "is-invalid" : ""
                }`}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Nhập số lượng"
              />
              {errors.quantity && (
                <div className="invalid-feedback">{errors.quantity}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="expiry_field">Ngày hết hạn</label>
              <input
                type="date"
                id="expiry_field"
                className={`form-control ${errors.expiry ? "is-invalid" : ""}`}
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
              {errors.expiry && (
                <div className="invalid-feedback">{errors.expiry}</div>
              )}
            </div>

            <button
              id="create_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              {loading ? (
                <Fragment>
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </Fragment>
              ) : (
                "Thêm phiếu giảm giá"
              )}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewCouponShop;
