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
} from "@mui/material";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { convertCurrency } from "../utils/helpers/convertCurrency";
import { updateCart } from "../utils/redux/cartSlice";
import { notify } from "../utils/helpers/notify";
import {
  updateCheckout,
  setDiscountAmount,
  setAppliedVoucher,
} from "../utils/redux/checkoutSlice";
import ModalVoucher from "../components/screens/admin/voucher/ModalVoucher";

const TitleHeader = styled(Typography)({
  fontSize: 14,
  fontWeight: 600,
});

const ButtonRemove = styled(IoMdRemoveCircleOutline)({
  fontSize: 30,
  color: "#ccc",
  fontWeight: "bold",
  "&:hover": {
    color: "#dd3333",
  },
});

const AmountWrap = styled(Box)({
  display: "flex",
  alignItems: "center",
  border: "1px solid #ddd",
  width: "min-content",
  gap: 12,
});

const ButtonConfig = styled("button")({
  border: "none",
  background: "transparent",
  padding: "12px",
  fontSize: 16,
  transition: "all .3s ease",

  "&:hover": {
    background: "#f1f1f1",
  },
});

const AmountWrapMB = styled(AmountWrap)({
  gap: 8,
});

const ButtonConfigMB = styled(ButtonConfig)({
  padding: "10px",
  fontSize: 14,
  height: "100%",
  "&:hover": {
    background: "#f1f1f1",
  },
});

const ButtonCustom = styled("button")({
  marginTop: "20px",
  border: "none",
  background: "#dd3333",
  fontSize: 16,
  color: "white",
  fontWeight: 600,
  transition: "all .3s ease",
  width: "100%",
  padding: "10px 0",
  "&:hover": {
    boxShadow: "inset 0 0 0 100px rgba(0,0,0,.2)",
  },
});

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const [listCart, setListCart] = useState(
    cart.map((item) => ({
      ...item,
      isSelected: false,
    }))
  );

  const toggleSelectItem = (item) => {
    const updatedCart = listCart.map((e) =>
      e.info._id === item.info._id && e.type === item.type
        ? { ...e, isSelected: !e.isSelected }
        : e
    );
    setListCart(updatedCart);
  };

  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const isMoblie = useMediaQuery("(max-width:600px)");

  const handleDecreaseAmount = (item) => {
    const updatedAmount = item?.amount - 1;
    if (updatedAmount >= 1) {
      const updatedItem = {
        ...item,
        amount: updatedAmount,
      };
      const updatedCart = listCart.map((e) =>
        e.info._id === item.info._id && e.type === item.type ? updatedItem : e
      );
      setListCart(updatedCart);
    }
  };

  const handleIncreaseAmount = (item) => {
    let updatedAmount = item?.amount + 1;
    if (updatedAmount >= Number(item.info.amount)) {
      notify("warn", "Đã quá số lượng trong kho");
      updatedAmount = item.info.amount;
    }
    const updatedItem = {
      ...item,
      amount: updatedAmount,
      totalPrice: updatedAmount * item.info.price,
    };
    const updatedCart = listCart.map((e) =>
      e.info._id === item.info._id && e.type === item.type ? updatedItem : e
    );
    setListCart(updatedCart);
  };

  const handleRemoveItem = (item) => {
    const updatedCart = listCart.filter((e) => e != item);
    dispatch(updateCart(updatedCart));
    setListCart(updatedCart);
    notify("success", "Xóa khỏi giỏ hàng thành công");
  };

  const handleCheckout = () => {
    if (total <= 0) {
      return notify("warn", "Vui lòng chọn sản phẩm để thanh toán");
    }
    sessionStorage.setItem(
      "checkoutDiscountInfo",
      JSON.stringify({
        discountAmount: discountAmount || 0,
        appliedVoucher: appliedVoucher || null,
      })
    );
    dispatch(updateCart(listCart));
    dispatch(updateCheckout(listCart.filter((e) => e.isSelected === true)));
    navigate("/check-out");
  };

  useEffect(() => {
    setListCart(cart);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [cart]);

  const toggleSelectAll = (isChecked) => {
    const updatedCart = listCart.map((item) => ({
      ...item,
      isSelected: isChecked,
    }));
    setListCart(updatedCart);
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice = 0;

      listCart
        .filter((item) => item.isSelected)
        .forEach((item) => {
          totalPrice += Number(item.info?.discountPrice) * Number(item.amount);
        });

      setTotal(totalPrice);
    };
    calculateTotalPrice();
  }, [listCart]);

  const handleOpenVoucherModal = () => {
    setIsVoucherModalOpen(true);
  };

  const handleCloseVoucherModal = () => {
    setIsVoucherModalOpen(false);
  };
  const calculateDiscount = (total, voucher) => {
    if (!voucher) return 0;

    const discountValue = (total * voucher.discountValue) / 100;
    // Kiểm tra xem số tiền giảm có vượt quá mức giảm tối đa không
    return Math.min(discountValue, voucher.maxDiscount);
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice = 0;

      listCart
        .filter((item) => item.isSelected)
        .forEach((item) => {
          totalPrice += Number(item.info?.discountPrice) * Number(item.amount);
        });

      setTotal(totalPrice);
    };
    calculateTotalPrice();
  }, [listCart]);
  // Tính tổng tiền cuối cùng sau khi áp dụng voucher
  const calculateFinalTotal = () => {
    const voucherDiscount = calculateDiscount(total, appliedVoucher);
    return Math.max(total - voucherDiscount, 0); // Tổng tiền không âm
  };
  useEffect(() => {
    const voucherDiscount = calculateDiscount(total, appliedVoucher);
    setDiscountAmount(voucherDiscount); // Cập nhật số tiền giảm giá
  }, [total, appliedVoucher]);

  const handleApplyVoucher = (voucher) => {
    const discount = calculateDiscount(total, voucher);
    setAppliedVoucher(voucher);
    setDiscountAmount(discount);
    console.log("discount", discount);
    dispatch(setDiscountAmount(discount));
    dispatch(setAppliedVoucher(voucher));
    notify("success", "Áp dụng mã giảm giá thành công");
    handleCloseVoucherModal();
  };

  // Xử lý hủy voucher
  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setDiscountAmount(0);
    notify("success", "Đã hủy mã giảm giá");
  };

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
              <Grid container spacing={2}>
                <Grid item xs={1}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <input
                      type="checkbox"
                      checked={listCart.every((item) => item.isSelected)}
                      onChange={(e) => toggleSelectAll(e.target.checked)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={5}>
                  <TitleHeader>SẢN PHẨM</TitleHeader>
                </Grid>
                <Grid item xs={2}>
                  <TitleHeader>GIÁ</TitleHeader>
                </Grid>
                <Grid item xs={2}>
                  <TitleHeader>SỐ LƯỢNG</TitleHeader>
                </Grid>
                <Grid item xs={2}>
                  <TitleHeader>TẠM TÍNH</TitleHeader>
                </Grid>
              </Grid>
              <Box mt={1} width={"100%"} height={"2px"} bgcolor={"#ddd"} />
              {listCart?.map((e) => (
                <Box key={e?.info?._id + e?.type}>
                  <Grid container mt={1} spacing={2}>
                    <Grid item xs={1}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                      >
                        <input
                          type="checkbox"
                          checked={e.isSelected}
                          onChange={() => toggleSelectItem(e)}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={5}>
                      <Box
                        display={"flex"}
                        gap={1}
                        alignItems={"center"}
                        sx={{ cursor: "pointer" }}
                      >
                        <ButtonRemove onClick={() => handleRemoveItem(e)} />
                        <Box
                          component={"img"}
                          src={e?.info?.img1}
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
                            {e?.info?.name}
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
                    <Grid item xs={2}>
                      <Stack justifyContent={"center"} height={"100%"}>
                        <Typography
                          color={"#dd3333"}
                          fontSize={14}
                          fontWeight={600}
                        >
                          {`${convertCurrency(e?.info?.discountPrice)}đ`}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Stack justifyContent={"center"} height={"100%"}>
                        <AmountWrap>
                          <ButtonConfig onClick={() => handleDecreaseAmount(e)}>
                            -
                          </ButtonConfig>
                          <Typography fontSize={16}>{e?.amount}</Typography>
                          <ButtonConfig onClick={() => handleIncreaseAmount(e)}>
                            +
                          </ButtonConfig>
                        </AmountWrap>
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Stack justifyContent={"center"} height={"100%"}>
                        <Typography
                          color={"#dd3333"}
                          fontSize={14}
                          fontWeight={600}
                        >
                          {`${convertCurrency(
                            Number(e?.amount) * Number(e?.info?.discountPrice)
                          )}đ`}
                        </Typography>
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
                <Grid item xs={1}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <input
                      type="checkbox"
                      checked={listCart.every((item) => item.isSelected)}
                      onChange={(e) => toggleSelectAll(e.target.checked)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={7}>
                  <TitleHeader>SẢN PHẨM</TitleHeader>
                </Grid>
                <Grid item xs={4}>
                  <TitleHeader>SỐ LƯỢNG</TitleHeader>
                </Grid>
              </Grid>
              <Box mt={1} width={"100%"} height={"2px"} bgcolor={"#ddd"} />
              {listCart?.map((e) => (
                <Box key={e?.info?._id + e?.type}>
                  <Grid container mt={1} spacing={1}>
                    <Grid item xs={8}>
                      <Box
                        display={"flex"}
                        gap={0.5}
                        alignItems={"center"}
                        sx={{ cursor: "pointer" }}
                      >
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          height="100%"
                        >
                          <input
                            type="checkbox"
                            checked={e.isSelected}
                            onChange={() => toggleSelectItem(e)}
                          />
                        </Box>
                        <ButtonRemove onClick={() => handleRemoveItem(e)} />
                        <Box
                          component={"img"}
                          src={e?.info?.img1}
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
                            {`${e?.info?.name} • ${e?.type}`}
                          </Typography>

                          <Typography
                            color={"#dd3333"}
                            fontSize={12}
                            fontWeight={600}
                            mt={1}
                          >
                            {`${e.amount} x ${convertCurrency(
                              e?.info?.discountPrice
                            )}₫`}
                          </Typography>
                        </Stack>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack justifyContent={"center"} height={"100%"}>
                        <AmountWrapMB>
                          <ButtonConfigMB
                            onClick={() => handleDecreaseAmount(e)}
                          >
                            -
                          </ButtonConfigMB>
                          <Typography fontSize={12}>{e?.amount}</Typography>
                          <ButtonConfig onClick={() => handleIncreaseAmount(e)}>
                            +
                          </ButtonConfig>
                        </AmountWrapMB>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Box mt={1} width={"100%"} height={"1px"} bgcolor={"#ddd"} />
                </Box>
              ))}
            </Box>
          )}

          <Box flex={{ xs: 1, sm: 1 }} width={"100%"}>
            <Typography fontSize={14} fontWeight={600}>
              CỘNG GIỎ HÀNG
            </Typography>
            <Box mt={1} width={"100%"} height={"2px"} bgcolor={"#ddd"} />
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              p={2}
              borderBottom={"1px solid #ddd"}
            >
              <Typography color={"#0A0A0A"} fontSize={14}>
                Tạm tính
              </Typography>
              <Typography color={"#dd3333"} fontSize={14} fontWeight={600}>
                {`${convertCurrency(total)}₫`}
              </Typography>
            </Box>

            {/* Hiển thị thông tin voucher đã áp dụng */}
            {appliedVoucher && (
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                p={2}
                borderBottom={"1px solid #ddd"}
              >
                <Box>
                  <Typography color={"#0A0A0A"} fontSize={14}>
                    Mã giảm giá ({appliedVoucher.discountValue}%)
                  </Typography>
                  <Typography color={"#666"} fontSize={12}>
                    Giảm tối đa {convertCurrency(appliedVoucher.maxDiscount)}₫
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography color={"#dd3333"} fontSize={14} fontWeight={600}>
                    -{convertCurrency(discountAmount)}₫
                  </Typography>
                  <ButtonRemove
                    onClick={handleRemoveVoucher}
                    style={{ fontSize: 20 }}
                  />
                </Box>
              </Box>
            )}
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              p={2}
              borderBottom={"2px solid #ddd"}
            >
              <Typography color={"#0A0A0A"} fontSize={14}>
                Tổng tính
              </Typography>
              <Typography color={"#dd3333"} fontSize={14} fontWeight={600}>
                {`${convertCurrency(calculateFinalTotal())}₫`}
              </Typography>
            </Box>
            <ButtonCustom onClick={handleOpenVoucherModal}>
              ÁP DỤNG MÃ GIẢM GIÁ
            </ButtonCustom>
            <ButtonCustom onClick={handleCheckout}>
              TIẾN HÀNH THANH TOÁN
            </ButtonCustom>
          </Box>
        </Box>
        <ModalVoucher
          open={isVoucherModalOpen}
          handleClose={handleCloseVoucherModal}
          onApply={(voucher) => {
            setAppliedVoucher(voucher);
            handleCloseVoucherModal();
          }}
          total={total}
        />
      </Container>
    </MainLayout>
  );
}

export default Cart;
