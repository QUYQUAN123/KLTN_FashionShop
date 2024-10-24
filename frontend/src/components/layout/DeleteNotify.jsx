import React from "react";

const DeleteNotify = (props) => {
  function handlerNo() {
    props.show(false);
  }

  function handlerYes() {
    props.show(false);
    props.func(...props.paras);
  }

  return (
    <div className="delete-notify-container">
      <div className="delete-notify-form">
        <h1>Xác nhận xóa?</h1>
        <div className="delete-notify-btn-container">
          <button
            className="delete-notify-btn-container-no"
            onClick={handlerNo}
          >
            Hủy
          </button>
          <button
            className="delete-notify-btn-container-yes"
            onClick={handlerYes}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNotify;
