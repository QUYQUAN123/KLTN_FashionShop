import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AuthLayout";
import { Box, Paper, Stack, Typography, Grid } from "@mui/material";
import { FaUser, FaShoppingCart, FaMoneyBillAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import {
  featchTopUser,
  fetchTopProduct,
  item,
} from "../../utils/api/statistical";
import { convertCurrency } from "../../utils/helpers/convertCurrency";
import { getRandomGoogleColor } from "../../utils/helpers/randomColor";

function StatisticalManagement() {
  const [param, setParam] = useState(null);
  const [topProduct, setTopProduct] = useState(null);
  const [topUser, setTopUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await item();
        const res2 = await fetchTopProduct();
        const res3 = await featchTopUser();

        setParam(res1?.data);
        setTopProduct(res2?.data);
        setTopUser(res3?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontWeight={"bold"} fontSize={20}>
          Thống kê
        </Typography>
      </Box>
      <Grid container spacing={2} mt={4}>
        <Grid item xs={3}>
          <Paper elevation={3}>
            <Box p={2}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack gap={1}>
                  <Typography variant="subtitle" fontWeight={600}>
                    Tổng số tài khoản
                  </Typography>
                  <Box>
                    <Typography variant="subtitle" fontWeight={500}>
                      {param?.user}
                    </Typography>
                  </Box>
                </Stack>
                <Box
                  p={1}
                  bgcolor={"#4FD1C5"}
                  borderRadius={2}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <FaUser width={30} color="#fff" />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={3}>
            <Box p={2}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack gap={1}>
                  <Typography variant="subtitle" fontWeight={600}>
                    Tổng số đơn hàng
                  </Typography>
                  <Box>
                    <Typography variant="subtitle" fontWeight={500}>
                      {param?.order}
                    </Typography>
                  </Box>
                </Stack>
                <Box
                  p={1}
                  bgcolor={"#4FD1C5"}
                  borderRadius={2}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <FaShoppingCart color="#fff" />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={3}>
            <Box p={2}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack gap={1}>
                  <Typography variant="subtitle" fontWeight={600}>
                    Tổng số doanh thu
                  </Typography>
                  <Box>
                    <Typography variant="subtitle" fontWeight={500}>
                      {convertCurrency(param?.total)} VNĐ
                    </Typography>
                  </Box>
                </Stack>
                <Box
                  p={1}
                  bgcolor={"#4FD1C5"}
                  borderRadius={2}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <FaMoneyBillAlt color="#fff" />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={3}>
            <Box p={2}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack gap={1}>
                  <Typography variant="subtitle" fontWeight={600}>
                    Tổng số sản phẩm
                  </Typography>
                  <Box>
                    <Typography variant="subtitle" fontWeight={500}>
                      {param?.product}
                    </Typography>
                  </Box>
                </Stack>
                <Box
                  p={1}
                  bgcolor={"#4FD1C5"}
                  borderRadius={2}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <MdCategory color="#fff" />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid container mt={2} spacing={4}>
        <Grid xs={6} item>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant={"h6"} fontWeight={600}>
                Top sản phẩm
              </Typography>
              <Grid container spacing={4} mt={1}>
                <Grid item xs={6}>
                  <Box
                    component={"img"}
                    src={topProduct?.detail?.img1}
                    width={"100%"}
                    height={200}
                    sx={{ objectFit: "cover" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Stack justifyContent={"space-between"} height={"100%"}>
                    <Typography variant="subtitle">
                      Tên sản phẩm: {topProduct?.detail?.name}
                    </Typography>
                    <Typography variant="subtitle">
                      Số lượt mua: {topProduct?.top?.totalAmount}
                    </Typography>
                    <Typography variant="subtitle">
                      Doanh thu: {convertCurrency(topProduct?.top?.totalPrice)}{" "}
                      VNĐ
                    </Typography>
                    <Typography variant="subtitle">
                      Số lượt đánh giá: {topProduct?.review}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid xs={6} item>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant={"h6"} fontWeight={600}>
                Top khách hàng
              </Typography>
              <Grid container spacing={4} mt={1}>
                <Grid item xs={6}>
                  <Box
                    width={200}
                    height={200}
                    bgcolor={getRandomGoogleColor()}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderRadius={"50%"}
                    color={"white"}
                    fontSize={100}
                    fontWeight={500}
                  >
                    {topUser?.top?.userName.charAt(0).toUpperCase()}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Stack justifyContent={"space-between"} height={"100%"}>
                    <Typography variant="subtitle">
                      Họ tên: {topUser?.top?.userName}
                    </Typography>
                    <Typography variant="subtitle">
                      Số lượt mua: {topUser?.top?.orderCount}
                    </Typography>
                    <Typography variant="subtitle">
                      Tổng chi: {convertCurrency(topUser?.top?.totalSpent)} VNĐ
                    </Typography>
                    <Typography variant="subtitle">
                      Số lượt đánh giá: {topUser?.review}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}

export default StatisticalManagement;
