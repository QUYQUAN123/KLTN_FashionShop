import React, { useState } from "react";
import { Typography, TextField, Grid } from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";
import { createVoucher } from "../../../../utils/api/voucher";
import { notify } from "../../../../utils/helpers/notify";

function ModalAddVoucher({ open, handleClose, reloadData }) {
  const [description, setDescription] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [minPurchase, setMinPurchase] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleReset = () => {
    handleClose();
    setDescription("");
    setDiscountValue("");
    setMaxDiscount("");
    setMinPurchase("");
    setStartDate("");
    setEndDate("");
    setQuantity("");
  };

  const handleAddVoucher = async () => {
    // Kiểm tra các trường không được để trống
    if (
      !description ||
      !discountValue ||
      !maxDiscount ||
      !minPurchase ||
      !startDate ||
      !endDate ||
      !quantity
    ) {
      notify("error", "Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Kiểm tra ngày bắt đầu <= ngày kết thúc
    if (new Date(startDate) > new Date(endDate)) {
      notify("error", "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc!");
      return;
    }

    try {
      await createVoucher({
        description,
        discountValue: Number(discountValue),
        maxDiscount: Number(maxDiscount),
        minPurchase: Number(minPurchase),
        startDate,
        endDate,
        quantity: Number(quantity),
      });
      notify("success", "Thêm phiếu giảm giá thành công");
      handleReset();
      reloadData();
    } catch (error) {
      notify("error", error?.response?.data?.message || "Đã xảy ra lỗi");
    }
  };

  return (
    <ModalUpdate
      open={open}
      title={"Thêm phiếu giảm giá"}
      handleClose={handleReset}
      handleOk={handleAddVoucher}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>Mô tả:</Typography>
          <TextField
            fullWidth
            size="small"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Giảm giá (%):</Typography>
          <TextField
            fullWidth
            size="small"
            type="number"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Giảm tối đa:</Typography>
          <TextField
            fullWidth
            size="small"
            type="number"
            value={maxDiscount}
            onChange={(e) => setMaxDiscount(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Đơn hàng tối thiểu:</Typography>
          <TextField
            fullWidth
            size="small"
            type="number"
            value={minPurchase}
            onChange={(e) => setMinPurchase(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Số lượng:</Typography>
          <TextField
            fullWidth
            size="small"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Ngày bắt đầu:</Typography>
          <TextField
            fullWidth
            size="small"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Ngày kết thúc:</Typography>
          <TextField
            fullWidth
            size="small"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Grid>
      </Grid>
    </ModalUpdate>
  );
}

export default ModalAddVoucher;
