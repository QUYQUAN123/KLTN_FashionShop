import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import {
  Container,
  Box,
  Grid,
  styled,
  Typography,
  Stack,
  useMediaQuery,
  TextField,
  Button,
} from "@mui/material";
import { convertCurrency } from "../utils/helpers/convertCurrency";
import { getOrderById } from "../utils/api/order";
import { useParams } from "react-router-dom";
import ModalUpdate from "../components/common/ModalUpdate";
import { useSelector } from "react-redux";
import { notify } from "../utils/helpers/notify";
import {
  create,
  findOne,
  deleteReview,
  updateReview,
} from "../utils/api/review";

const TitleHeader = styled(Typography)({
  fontSize: 14,
  fontWeight: 600,
});

function DetailOrder() {
  const user = useSelector((state) => state?.user?.user);

  const [listCart, setListCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [contentUpdate, setContentUpdate] = useState(null);
  const [idUpdate, setIdUpdate] = useState(null);

  const [info, setInfo] = useState();
  const [review, setReview] = useState("");
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const isMoblie = useMediaQuery("(max-width:600px)");

  const getStatusLabel = (status) => {
    switch (status) {
      case "active":
        return { label: "Đặt thành công", color: "blue" };
      case "shipping":
        return { label: "Chờ giao hàng", color: "orange" };
      case "cancel":
        return { label: "Đã hủy", color: "red" };
      case "complete":
        return { label: "Hoàn thành", color: "green" };
      default:
        return { label: "Không xác định", color: "grey" };
    }
  };

  const handleReview = async (e) => {
    try {
      setProduct(e?.product?._id);
      setIsOpen(true);
    } catch (error) {
      throw error;
    }
  };

  const handleRemoveReview = async (content) => {
    try {
      const userConfirmed = window.confirm(
        "Bạn có chắc chắn muốn xóa nội dung này?"
      );
      if (userConfirmed) {
        await deleteReview(content._id);
        notify("success", "Xóa review thành công");
        window.location.reload();
      }
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateReview = async (content) => {
    setIdUpdate(content._id);
    setContentUpdate(content?.review);
    setIsOpenUpdate(true);
  };

  const handleSubmit = async () => {
    try {
      if (!review) return notify("warn", "Bạn chưa review");
      await create({ product, review, user: user._id, order: id });
      setReview("");
      notify("success", "Review thành công");
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      throw error;
    }
  };

  const handleSubmitUpdate = async () => {
    try {
      if (!contentUpdate) return notify("warn", "Bạn chưa review");

      await updateReview(idUpdate, { review: contentUpdate });
      setContentUpdate("");
      notify("success", "Review thành công");
      setIsOpenUpdate(false);
      window.location.reload();
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getOrderById(id);
        setListCart(res?.data?.cart);
        setInfo(res.data);
      } catch (error) {}
    };
    getData();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <MainLayout>
      <Container>
        <Box
          py={"40px"}
          display={"flex"}
          gap={4}
          alignItems={"flex-start"}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          {!isMoblie ? (
            <Box flex={{ xs: 1, sm: 2 }}>
              <Grid container spacing={1.5}>
                <Grid item xs={3}>
                  <TitleHeader>SẢN PHẨM</TitleHeader>
                </Grid>
                <Grid item xs={1}>
                  <TitleHeader>GIÁ</TitleHeader>
                </Grid>
                <Grid item xs={1.55}>
                  <TitleHeader>ĐIA CHI</TitleHeader>
                </Grid>
                <Grid item xs={1}>
                  <TitleHeader>SỐ LƯỢNG</TitleHeader>
                </Grid>
                <Grid item xs={1.5}>
                  <TitleHeader>THÀNH TIỀN</TitleHeader>
                </Grid>
                <Grid item xs={1.55}>
                  <TitleHeader>Trạng Thái</TitleHeader>
                </Grid>
                <Grid item xs={1}>
                  <TitleHeader>REVIEW</TitleHeader>
                </Grid>
              </Grid>
              <Box mt={1} width={"100%"} height={"2px"} bgcolor={"#ddd"} />
              {listCart?.map((e) => (
                <Box key={e?.product?._id + e?.type}>
                  <Grid container mt={1} spacing={2}>
                    <Grid item xs={3}>
                      <Box
                        display={"flex"}
                        gap={1}
                        alignItems={"center"}
                        sx={{ cursor: "pointer" }}
                      >
                        <Box
                          component={"img"}
                          src={e?.product?.img1}
                          display={"block"}
                          width={100}
                          height={100}
                          sx={{ objectFit: "cover", objectPosition: "center" }}
                        />
                        <Stack gap={0.5}>
                          <Typography
                            fontSize={12}
                            color={"#0F0F0F"}
                            fontWeight={600}
                          >
                            {e?.product?.name}
                          </Typography>
                          <Typography
                            fontSize={12}
                            color={"#dd3333"}
                            fontWeight={600}
                          >
                            {e?.type1} {e?.type2 && `- ${e?.type2}`}
                          </Typography>
                        </Stack>
                      </Box>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack justifyContent={"center"} height={"100%"}>
                        <Typography
                          color={"#dd3333"}
                          fontSize={14}
                          fontWeight={600}
                        >
                          {`${convertCurrency(e?.product?.discountPrice)}đ`}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1.55}>
                      <Stack justifyContent={"center"} height={"100%"}>
                        <Typography fontSize={14} fontWeight={600}>
                          {info?.address}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        justifyContent={"center"}
                        alignItems={"flex-start"}
                        height={"100%"}
                      >
                        <Typography fontSize={14} fontWeight={600}>
                          {e?.amount} cái
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1.5}>
                      <Stack
                        justifyContent={"center"}
                        alignItems={"flex-start"}
                        height={"100%"}
                      >
                        <Typography
                          color={"#dd3333"}
                          fontSize={14}
                          fontWeight={700}
                        >
                          {`${convertCurrency(info?.total)}₫`}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1.5}>
                      <Stack
                        justifyContent={"center"}
                        alignItems={"flex-start"}
                        height={"100%"}
                      >
                        <Typography
                          fontSize={14}
                          fontWeight={600}
                          sx={{
                            color: getStatusLabel(info?.status).color,
                          }}
                        >
                          {getStatusLabel(info?.status).label}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Stack
                        justifyContent={"center"}
                        alignItems={"flex-start"}
                        height={"100%"}
                      >
                        <ReviewComponent
                          order={id}
                          product={e?.product?._id}
                          user={user?._id}
                          orderStatus={info?.status}
                          handleReview={() => handleReview(e)}
                          handleUpdateReview={(content) =>
                            handleUpdateReview(content)
                          }
                          handleRemoveReview={(content) =>
                            handleRemoveReview(content)
                          }
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                  <Box mt={1} width={"100%"} height={"1px"} bgcolor={"#ddd"} />
                </Box>
              ))}
            </Box>
          ) : (
            <Box flex={{ xs: 1, sm: 2 }} width={"100%"}>
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <TitleHeader>SẢN PHẨM</TitleHeader>
                </Grid>
                <Grid item xs={4}>
                  <TitleHeader>SỐ LƯỢNG</TitleHeader>
                </Grid>
              </Grid>
              <Box mt={1} width={"100%"} height={"2px"} bgcolor={"#ddd"} />
              {listCart?.map((e) => (
                <Box key={e?.product?._id + e?.type}>
                  <Grid container mt={1} spacing={1}>
                    <Grid item xs={8}>
                      <Box
                        display={"flex"}
                        gap={0.5}
                        alignItems={"center"}
                        sx={{ cursor: "pointer" }}
                      >
                        <Box
                          component={"img"}
                          src={e?.product?.img1}
                          display={"block"}
                          width={100}
                          height={100}
                          sx={{ objectFit: "cover", objectPosition: "center" }}
                        />
                        <Stack gap={"1px"}>
                          <Typography
                            fontSize={12}
                            color={"#0F0F0F"}
                            fontWeight={600}
                          >
                            {`${e?.product?.name} • ${e?.type}`}
                          </Typography>

                          <Typography
                            color={"#dd3333"}
                            fontSize={12}
                            fontWeight={600}
                            mt={1}
                          >
                            {`${e.amount} x ${convertCurrency(
                              e?.product?.discountPrice
                            )}₫`}
                          </Typography>
                        </Stack>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack justifyContent={"center"} height={"100%"}>
                        <Typography fontSize={14} fontWeight={600}>
                          {e?.amount} cái
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Box mt={1} width={"100%"} height={"1px"} bgcolor={"#ddd"} />
                </Box>
              ))}
            </Box>
          )}
          <ModalUpdate
            open={isOpen}
            title={"Bình luận"}
            handleClose={() => setIsOpen(false)}
            handleOk={handleSubmit}
          >
            <Box>
              <TextField
                placeholder="Reivew"
                fullWidth
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </Box>
          </ModalUpdate>
          <ModalUpdate
            open={isOpenUpdate}
            title={"Cập Nhật Bình Luận "}
            handleClose={() => setIsOpenUpdate(false)}
            handleOk={handleSubmitUpdate}
          >
            <Box>
              <TextField
                placeholder="Reivew"
                fullWidth
                value={contentUpdate}
                onChange={(e) => setContentUpdate(e.target.value)}
              />
            </Box>
          </ModalUpdate>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default DetailOrder;

const ReviewComponent = ({
  order,
  user,
  product,
  handleReview,
  handleUpdateReview,
  orderStatus,
  handleRemoveReview,
}) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchReviewStatus = async () => {
      try {
        const res = await findOne(user, product, order);
        setContent(res.data);
      } catch (error) {
        console.error("Error fetching review status:", error);
      }
    };

    fetchReviewStatus();
  }, [product, order, user]);

  return (
    <Stack justifyContent={"center"} height={"100%"}>
      {content?.review ? (
        <Stack gap={1}>
          <Typography>{content?.review}</Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleUpdateReview(content)}
              sx={{ width: "max-content" }}
            >
              Cập nhật
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ width: "max-content" }}
              color="error"
              onClick={() => handleRemoveReview(content)}
            >
              Xóa
            </Button>
          </Box>
        </Stack>
      ) : (
        <Box textAlign={"center"} width="100%">
          <Button
            variant="contained"
            size="small"
            onClick={handleReview}
            sx={{ width: "max-content" }}
            color="success"
            disabled={orderStatus === "active" || orderStatus=== "cancel"} 
          >
            Review
          </Button>
        </Box>
      )}
    </Stack>
  );
};
