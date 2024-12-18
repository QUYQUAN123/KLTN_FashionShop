import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrderByUserId } from "../utils/api/order";
import moment from "moment";
import { convertCurrency } from "../utils/helpers/convertCurrency";
import { updateOrder } from "../utils/api/order";
import { notify } from "../utils/helpers/notify";

const TitleHeader = styled(Typography)({
  fontSize: 16,
  fontWeight: 600,
});

function MyOrder() {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false); 
  const [selectedOrderId, setSelectedOrderId] = useState(null); 

  
  const handleOpenModal = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenModal(true);
  };
  
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrderId(null);
  };

 const handleConfirmCancel = async () => {
  try {
    await updateOrder(selectedOrderId, { status: "cancel" });
    notify("success","Đơn hàng đã được hủy thành công!");
    setOpenModal(false);
    window.location.reload();
  } catch (error) {
    console.error("Lỗi khi hủy đơn hàng:", error);
    notify("error","Có lỗi xảy ra khi hủy đơn hàng!");
  }
};
  useEffect(() => {
    if (!user?.username) return navigate("/");
    const getData = async () => {
      try {
        const res = await getOrderByUserId(user?._id);
        setData(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [user]);
  console.log("data", data);
  return (
    <MainLayout>
      <Container>
        <Box py={"40px"}>
          <Grid container spacing={2}>
            <Box
              component={Grid}
              item
              display={{ xs: "none", sm: "block" }}
              sm={2.4}
            >
              <TitleHeader>ĐƠN HÀNG</TitleHeader>
            </Box>
            <Grid item xs={3} sm={2.4}>
              <TitleHeader>NGÀY</TitleHeader>
            </Grid>
            <Grid item xs={3} sm={2.4}>
              <TitleHeader>THANH TOÁN</TitleHeader>
            </Grid>
            <Grid item xs={3} sm={2.4}>
              <TitleHeader>TỔNG</TitleHeader>
            </Grid>
            <Grid item xs={3} sm={2.4}>
              <TitleHeader>THAO TÁC</TitleHeader>
            </Grid>
          </Grid>
          <Box mt={1} width={"100%"} height={"2px"} bgcolor={"#ddd"} />
          {data?.map((e) => (
            <Box id={e?._id} mt={2}>
              <Grid container spacing={2}>
                <Box
                  component={Grid}
                  item
                  display={{ xs: "none", sm: "block" }}
                  sm={2.4}
                >
                  <Typography fontSize={14}>#{e?._id}</Typography>
                </Box>
                <Grid item xs={3} sm={2.4}>
                  <Typography fontSize={14}>
                    {moment(e?.createdAt).format("DD/MM/YYYY - HH:mm:ss")}
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={2.4}>
                  <Typography fontSize={14}>
                    {`${convertCurrency(e.total)}₫ (${
                      e?.cart?.length
                    } sản phẩm)`}
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={2.4}>
                  <Typography fontSize={14}>
                    {e.type === 2
                      ? "ĐÃ THANH TOÁN"
                      : "THANH TOÁN KHI NHẬN HÀNG"}
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={2.4}>
                  <Box display="flex" gap={1} alignItems="center">
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => navigate(`/detail-order/${e?._id}`)}
                    >
                      Chi tiết
                    </Button>
                    <Button
  variant="outlined"
  size="small"
  color="warning"
  onClick={() => handleOpenModal(e?._id)}
  disabled={e.status !== "active"}
  sx={{
    cursor: e.status === "active" ? "pointer" : "not-allowed",
    opacity: e.status === "active" ? 1 : 0.5,
  }}
>
  Hủy đơn
</Button>
                  </Box>
                </Grid>
              </Grid>
              <Box mt={2} width={"100%"} height={"1px"} bgcolor={"#ddd"} />
            </Box>
          ))}
        </Box>

        {openModal && (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1300,
    }}
  >
    <Box
      sx={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "400px",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" mb={2}>
        Xác nhận hủy đơn hàng
      </Typography>
      <Typography variant="body1" mb={3}>
        Bạn có chắc chắn muốn hủy đơn hàng này?
      </Typography>
      <Box display="flex" justifyContent="center" gap={2}>
        <Button variant="outlined" color="primary" onClick={handleCloseModal}>
          Hủy
        </Button>
        <Button variant="contained" color="error" onClick={handleConfirmCancel}>
          Đồng ý
        </Button>
      </Box>
    </Box>
  </Box>
)}

      </Container>
    </MainLayout>
    
  );
}

export default MyOrder;
