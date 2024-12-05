import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Finish = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Tự động quay về trang chủ sau 1 phút (60.000ms)
    const timer = setTimeout(() => {
      localStorage.removeItem("applicationFormData"); // Xóa dữ liệu 'applicationFormData' trong localStorage
      navigate("/"); // Quay về trang chủ
    }, 60000);

    // Dọn dẹp nếu component unmount hoặc có sự thay đổi
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleBackToHome = () => {
    localStorage.removeItem("applicationFormData"); // Xóa 'applicationFormData' khi quay về trang chủ
    navigate("/"); // Quay về trang chủ
  };

  return (
    <div className="box-container">
      <div className="order-sucess-container">
        <img
          className="my-5 img-fluid d-block mx-auto"
          src="/images/order_success.png"
          alt="Order Success"
          width="200"
          height="200"
        />

        <h1>Đã hoàn thành đăng ký, hãy chờ phản hồi từ quản trị viên</h1>
        <button onClick={handleBackToHome}>Quay về trang chủ</button>
      </div>
    </div>
  );
};

export default Finish;
