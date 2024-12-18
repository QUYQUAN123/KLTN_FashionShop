import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Select, MenuItem } from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";
import { DataGrid } from "@mui/x-data-grid";
import { convertCurrency } from "../../../../utils/helpers/convertCurrency";
import { updateOrder } from "../../../../utils/api/order";
import { notify } from "../../../../utils/helpers/notify";

function ModalDetailOrder({ open, handleClose, info }) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [Ftotal, setFTotal] = useState(0);

  const [status, setStatus] = useState(info?.status || "");
  useEffect(() => {
    if (info && info.status) {
      setStatus(info.status);
    }
  }, [info]);

  const columns = [
    {
      field: "product.img1",
      headerName: "Hình ảnh",
      width: 180,
      renderCell: (params) => (
        <Box
          component={"img"}
          src={params?.row?.product?.img1 || "/img/noImage.jpg"}
          width={120}
          height={120}
          sx={{ objectFit: "cover", borderRadius: 2, border: "1px solid #ddd" }}
        />
      ),
    },
    {
      field: "product.name",
      headerName: "Tên sản phẩm",
      width: 180,
      renderCell: (params) => <>{params?.row?.product?.name}</>,
    },
    { field: "type1", headerName: "Phân loại 1", width: 150 },
    { field: "type2", headerName: "Phân loại 2", width: 150 },

    {
      field: "product.discountPrice",
      headerName: "Giá",
      width: 150,
      renderCell: (params) => (
        <Typography variant="subtitle2" fontWeight={600}>
          {convertCurrency(params?.row?.product?.discountPrice)}
        </Typography>
      ),
    },

    { field: "amount", headerName: "Số lượng", width: 150 },
    {
      field: "total",
      headerName: "Thành tiền",
      width: 150,
      renderCell: (params) => (
        <Typography variant="subtitle2" fontWeight={600} color={"#dd3333"}>
          {convertCurrency(
            Number(params?.row?.amount) *
              Number(params?.row?.product?.discountPrice)
          )}
        </Typography>
      ),
    },
  ];

  useEffect(() => {
    setFTotal(info?.total);
    setData(info?.cart?.map((e) => ({ id: e?._id, ...e })));
    const result = () => {
      return info?.cart?.reduce((totalPrice, item) => {
        const itemPrice =
          Number(item?.product?.discountPrice) * Number(item.amount);
        return totalPrice + itemPrice;
      }, 0);
    };
    setTotal(result);
  }, [info]);

  const handleUpdateStatus = async () => {
    if (info?.status === "cancel" || info?.status === "complete") {
      notify("error", "Không thể cập nhật đơn hàng đã hoàn thành hoặc đã hủy!");
      return;
    }
    try {
      await updateOrder(info._id, { status });
      notify("success", "Cập nhật Trạng thái  thành công");
      handleClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      notify("error", "Cập nhật thất bại!");
    }
  };

  return (
    <ModalUpdate
      open={open}
      title={
        <Box>
          <Typography
  variant="h4" // Phóng to chữ
  fontWeight="bold" // Làm đậm chữ
  align="center" // Căn giữa tiêu đề
  gutterBottom // Tạo khoảng cách phía dưới
>
  Chi tiết đơn hàng
</Typography>


          
          <Box mt={4} p={2} borderTop={"1px solid #ddd"}>
            <Typography fontWeight={"bold"} variant="h6">
              Thông tin người mua
            </Typography>
            <Box sx={{ ml: 4 }}>
            <Box mt={1} display={"flex"} flexDirection={"column"} gap={1}>
              <Typography>
                <strong>Họ tên:</strong> {info?.name || "N/A"}
              </Typography>
              <Typography>
                <strong>Số điện thoại:</strong> {info?.phone || "N/A"}
              </Typography>
              <Box
                display="flex"
                alignItems="flex-start"
                gap={1}
                flexWrap="wrap"
              >
                <Typography fontWeight={600} variant="subtitle1">
                  Địa chỉ:
                </Typography>
                <Typography
                  sx={{
                    wordBreak: "break-word",
                    flex: "1",
                    maxWidth: "400px", // Giới hạn chiều rộng tùy ý
                  }}
                >
                  {info?.address || "N/A"}
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="flex-start"
                gap={1}
                flexWrap="wrap"
              >
                <Typography fontWeight={600} variant="subtitle1">
                  Ghi chú: 
                </Typography>
                <Typography
                  sx={{
                    wordBreak: "break-word",
                    flex: "1",
                    maxWidth: "400px", 
                  }}
                >
                  {info?.note || " "}
                </Typography>
              </Box>
            </Box>
            </Box>
          </Box>

          <Box mt={2} display="flex" alignItems="center" gap={1}>
            <Typography fontWeight={600} variant="subtitle1">
              Trạng thái đơn hàng:
            </Typography>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              size="small"
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="active">Đặt thành công</MenuItem>
              <MenuItem value="shipping">Chờ giao hàng</MenuItem>
              <MenuItem value="cancel">Hủy Đơn</MenuItem>
              <MenuItem value="complete">Hoàn thành</MenuItem>
            </Select>
          </Box>
        </Box>
      }
      handleClose={handleClose}
      handleOk={handleUpdateStatus}
      maxWidth={"lg"}
    >
      <Grid container spacing={2}>
        {data?.length > 0 && (
          <DataGrid
            rowHeight={150}
            disableRowSelectionOnClick
            rows={data}
            columns={columns}
            hideFooter
          />
        )}
      </Grid>

      <Box mt={2} display={"flex"} justifyContent={"center"} gap={1}>
        <Typography fontWeight={600} variant="subtitle1">
          Tổng hóa đơn:
        </Typography>
        <Typography fontWeight={600} variant="subtitle1" color={"#dd3333"}>
          {convertCurrency(total)}
        </Typography>
      </Box>
      <Box mt={2} display={"flex"} justifyContent={"center"} gap={1}>
        <Typography fontWeight={600} variant="subtitle1">
          Hóa đơn thanh toán sau giảm giá:
        </Typography>
        <Typography fontWeight={600} variant="subtitle1" color={"#dd3333"}>
          {convertCurrency(Ftotal)}
        </Typography>
      </Box>
    </ModalUpdate>
  );
}

export default ModalDetailOrder;
