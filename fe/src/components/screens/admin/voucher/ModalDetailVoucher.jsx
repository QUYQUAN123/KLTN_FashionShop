import React, { useEffect, useState } from "react";
import { Typography, TextField, Grid, MenuItem, Select } from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";
import { updateVoucher } from "../../../../utils/api/voucher";
import { notify } from "../../../../utils/helpers/notify";

function ModalDetailVoucher({ open, handleClose, reloadData, info }) {
  const [description, setDescription] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [minPurchase, setMinPurchase] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("active");

  const handleReset = () => {
    handleClose();
    setDescription("");
    setDiscountValue("");
    setMaxDiscount("");
    setMinPurchase("");
    setStartDate("");
    setEndDate("");
    setQuantity("");
    setStatus("active");
  };

  const handleUpdateVoucher = async () => {
    try {
      await updateVoucher(info?._id, {
        description,
        discountValue: Number(discountValue),
        maxDiscount: Number(maxDiscount),
        minPurchase: Number(minPurchase),
        startDate,
        endDate,
        quantity: Number(quantity),
        status,
      });
      notify("success", "Cập nhật phiếu giảm giá thành công");
      handleReset();
      reloadData();
    } catch (error) {
      notify("error", error?.response?.data?.message || "Đã xảy ra lỗi");
    }
  };

  useEffect(() => {
    setDescription(info?.description || "");
    setDiscountValue(info?.discountValue || "");
    setMaxDiscount(info?.maxDiscount || "");
    setMinPurchase(info?.minPurchase || "");
    setStartDate(info?.startDate || "");
    setEndDate(info?.endDate || "");
    setQuantity(info?.quantity || "");
    setStatus(info?.status || "active");
  }, [info]);

  return (
    <ModalUpdate
      open={open}
      title={"Cập nhật phiếu giảm giá"}
      handleClose={handleReset}
      handleOk={handleUpdateVoucher}
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
        <Grid item xs={12}>
          <Typography>Trạng thái:</Typography>
          <Select
            fullWidth
            size="small"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="active">Hoạt động</MenuItem>
            <MenuItem value="inactive">Không hoạt động</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </ModalUpdate>
  );
}

export default ModalDetailVoucher;
