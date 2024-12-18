import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { convertCurrency } from "../utils/helpers/convertCurrency";
import { create } from "../utils/api/order";
import { notify } from "../utils/helpers/notify";
import { resetCart, updateCart } from "../utils/redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { resetCheckout } from "../utils/redux/checkoutSlice";
import PaypalButtonCustom from "../components/common/PaypalButtonCustom";
import { checkVoucher } from "../utils/api/voucher";
import axios from "axios";

const InputText = styled("input")({
  outline: "none",
  border: "1px solid #ddd",
  boxShadow: "inset 0 1px 2px rgba(0,0,0,.1)",
  boxSizing: "border-box",
  color: "#333",
  height: "2.507em",
  width: "100%",
  padding: "0 0.75em",
  fontSize: "0.97em",

  "&:focus": {
    boxShadow: "0 0 5px #ccc",
  },
});

const TextArea = styled("textarea")({
  outline: "none",
  border: "1px solid #ddd",
  boxShadow: "inset 0 1px 2px rgba(0,0,0,.1)",
  boxSizing: "border-box",
  color: "#333",
  width: "100%",
  padding: "0.75em 0.75em",
  fontSize: "0.97em",
  resize: "none",

  "&:focus": {
    boxShadow: "0 0 5px #ccc",
  },
});

const Button = styled("button")({
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

function Checkout() {
  const cart = useSelector((state) => state?.checkout?.checkout);
  const cart1 = useSelector((state) => state?.cart?.cart);
  const user = useSelector((state) => state?.user?.user);
  const [discountInfo, setDiscountInfo] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [total, setTotal] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);

  const [finalTotal, setFinalTotal] = useState(0);
  const [voucherId, setvoucherId] = useState(0);

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [location, setLocation] = useState("");
  const [provincesData, setProvincesData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    // Fetch provinces data
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setProvincesData(response.data);
      } catch (error) {
        console.error("Error fetching provinces data: ", error);
      }
    };
    fetchProvinces();
  }, []);

 
  const validateShippingInfo = () => {
    if (!name) {
      notify("warn", "Vui lòng nhập họ và tên!");
      return false;
    }
    if (!phone) {
      notify("warn", "Vui lòng nhập số điện thoại!");
      return false;
    }
    if (!province) {
      notify("warn", "Vui lòng chọn tỉnh/thành phố!");
      return false;
    }
    if (!district) {
      notify("warn", "Vui lòng chọn quận/huyện!");
      return false;
    }
    if (!ward) {
      notify("warn", "Vui lòng chọn phường/xã!");
      return false;
    }
    if (!location) {
      notify("warn", "Vui lòng nhập địa chỉ cụ thể!");
      return false;
    }
    return true;
  };

  const handleProvinceChange = (e) => {
    const selectedProvinceId = e.target.value;
    setProvince(selectedProvinceId);
  
    const selectedProvince = provincesData.find(
      (item) => item.Id === selectedProvinceId
    );
    setDistricts(selectedProvince ? selectedProvince.Districts : []);
    setDistrict("");
    setWard(""); 

  };
  
  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;
    setDistrict(selectedDistrictId);
  
    const selectedDistrict = districts.find(
      (item) => item.Id === selectedDistrictId
    );
    setWards(selectedDistrict ? selectedDistrict.Wards : []);
    setWard("");
  };
  
  const handleWardChange = (e) => {
    const selectedWardId = e.target.value;
    setWard(selectedWardId);


  };

  useEffect(() => {
    const shippingFee = total < 500000 ? 30000 : 0;
    setFinalTotal(total + shippingFee);
  }, [total]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!user) {
      notify("warn", "Vui lòng đăng nhập để đặt hàng");
      return;
    }
      if (!validateShippingInfo()) {
    return;
  }
    const provinceName = provincesData.find(p => p.Id === province)?.Name || '';
    const districtName = districts.find(d => d.Id === district)?.Name || '';
    const wardName = wards.find(w => w.Id === ward)?.Name || '';
    const formattedAddress = `${provinceName} - ${districtName} - ${wardName} - ${location}`;
  

    console.log("formattedAddress",formattedAddress);
    if (voucherId !== 0) {
      try {
        const voucherResponse = await checkVoucher(voucherId);
        if (voucherResponse.status !== 200) {
          notify("warn", voucherResponse.message || "Voucher không hợp lệ");
          return;
        }
      } catch (error) {
        notify("error", "Lỗi khi kiểm tra voucher");
        return;
      }
    }
    setLoading(true);
    try {
      const payload = {
        name,
        phone,
        address:formattedAddress,
        note,
        ...(user && { user }),
        cart: cart,
        total: finalTotal,
        voucherId: voucherId,
      };
      const res = await create(payload);
      if (res.data.status == 400) {
        notify("warn", res?.data?.message);
      } else {
        notify("success", "Đặt hàng thành công");
        dispatch(resetCheckout());
        dispatch(updateCart(cart1?.filter((e) => e.isSelected !== true)));
        navigate("/");
        handleReset();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handlePayment = async () => {
    if (!user) {
      notify("warn", "Vui lòng đăng nhập để đặt hàng");
      return;
    }
      if (!validateShippingInfo()) {
    return;
  }
  
    const provinceName = provincesData.find(p => p.Id === province)?.Name || '';
    const districtName = districts.find(d => d.Id === district)?.Name || '';
    const wardName = wards.find(w => w.Id === ward)?.Name || '';
    const formattedAddress = `${provinceName} - ${districtName} - ${wardName} - ${location}`;

    if (voucherId !== 0) {
      try {
        const voucherResponse = await checkVoucher(voucherId);
        if (voucherResponse.status !== 200) {
          notify("warn", voucherResponse.message || "Voucher không hợp lệ");
          return;
        }
      } catch (error) {
        console.log("Lỗi khi kiểm tra voucher: ", error);
        notify("error", "Có lỗi xảy ra khi kiểm tra voucher");
        return;
      }
    }
    setLoading(true);
    try {
      const payload = {
        name,
        phone,
        address: formattedAddress,
        note,
        ...(user && { user }),
        cart: cart,
        total: finalTotal,
        voucherId: voucherId,
        type: 2,
      };
      const res = await create(payload);
      if (res.data.status == 400) {
        notify("warn", res?.data?.message);
      } else {
        notify("success", "Đặt hàng thành công");
        dispatch(resetCheckout());
        dispatch(updateCart(cart1?.filter((e) => e.isSelected !== true)));
        navigate("/");
        handleReset();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setName("");
    setPhone("");
    setAddress("");
    setNote("");
  };

  useEffect(() => {
    const savedDiscountInfo = JSON.parse(
      sessionStorage.getItem("checkoutDiscountInfo")
    );
    if (savedDiscountInfo) {
      setDiscountInfo(savedDiscountInfo);
    }
    setvoucherId(savedDiscountInfo.appliedVoucher?._id || 0);
    const calculateTotalPrice = () => {
      let totalPrice = 0;

      cart?.forEach((item) => {
        totalPrice += Number(item.info?.discountPrice) * Number(item.amount);
      });

      if (savedDiscountInfo) {
        totalPrice -= savedDiscountInfo.discountAmount;
      }

      setTotal(totalPrice);
    };
    calculateTotalPrice();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [cart]);

  return (
    <MainLayout>
      <Container>
        <Box py={"20px"}>
          <Grid
            container
            spacing={4}
            component={"form"}
            onSubmit={handleCheckout}
          >
            <Grid item xs={12} sm={7}>
              <Grid container mt={{ xs: 0, sm: 1 }} spacing={1}>
                <Box py={"20px"}>
                  <form onSubmit={handleCheckout}>
                    <Typography
                      fontSize={18}
                      color={"#dd3333"}
                      fontWeight={600}
                    >
                      THÔNG TIN THANH TOÁN
                    </Typography>
                    <Box mt={2}>
                      <InputText
                        placeholder="Nhập họ và tên người nhận hàng"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Box>
                    <Box mt={2}>
                      <InputText
                        placeholder="Nhập số điện thoại người nhận hàng"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Box>
                    <Box mt={2}>
                      <select
                        value={province}
                        onChange={handleProvinceChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <option value="">Chọn Tỉnh/Thành phố</option>
                        {provincesData.map((province) => (
                          <option key={province.Id} value={province.Id}>
                            {province.Name}
                          </option>
                        ))}
                      </select>
                      <select
                        value={district}
                        onChange={handleDistrictChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <option value="">Chọn Quận/Huyện</option>
                        {districts.map((district) => (
                          <option key={district.Id} value={district.Id}>
                            {district.Name}
                          </option>
                        ))}
                      </select>
                      <select
                        value={ward}
                        onChange={handleWardChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <option value="">Chọn Phường/Xã</option>
                        {wards.map((ward) => (
                          <option key={ward.Id} value={ward.Id}>
                            {ward.Name}
                          </option>
                        ))}
                      </select>
                      <InputText
                        placeholder="Nhập địa chỉ cụ thể (số nhà, đường, v.v.)"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </Box>
                  </form>
                </Box>
              </Grid>
              <Grid container mt={1}>
                <Grid item xs={12}>
                  <TextArea
                    rows={5}
                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay địa chỉ dẫn địa điểm giao hàng chi tiết hơn"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Box
                padding={"30px"}
                bgcolor={"rgba(0,0,0,.02)"}
                boxShadow={
                  "1px 1px 3px 0 rgba(0,0,0,.2), 0 1px 0 rgba(0,0,0,.07), inset 0 0 0 1px rgba(0,0,0,.05)"
                }
              >
                <Typography color={"#dd3333"} fontSize={18} fontWeight={600}>
                  ĐƠN HÀNG CỦA BẠN
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mt={2}
                >
                  <Typography fontSize={14} color={"#0A0A0A"} fontWeight={600}>
                    SẢN PHẨM
                  </Typography>
                  <Typography fontSize={14} color={"#0A0A0A"} fontWeight={600}>
                    TẠM TÍNH
                  </Typography>
                </Box>
                <Box mt={1} height={"2px"} width={"100%"} bgcolor={"#ddd"} />
                {cart?.map((e, index) => (
                  <Box
                    key={index}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    gap={2}
                    paddingY={"10px"}
                  >
                    <Typography fontSize={12} color={"#0A0A0A"}>
                      {e?.info?.name} {e?.type && "-"} {e?.type} × {e?.amount}
                    </Typography>
                    <Typography
                      fontSize={12}
                      color={"#dd3333"}
                      fontWeight={600}
                    >
                      {`${convertCurrency(
                        e?.info?.discountPrice * e?.amount
                      )}₫`}
                    </Typography>
                  </Box>
                ))}
                {discountInfo && (
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    gap={2}
                    paddingY={"10px"}
                  >
                    <Typography
                      fontSize={12}
                      color={"#0A0A0A"}
                      fontWeight={"bold"}
                    >
                      Giảm giá ({discountInfo.discountPercent}%)
                    </Typography>
                    <Typography
                      fontSize={12}
                      color={"#dd3333"}
                      fontWeight={600}
                    >
                      {`-${convertCurrency(discountInfo.discountAmount)}₫`}
                    </Typography>
                  </Box>
                )}
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={2}
                  paddingY={"10px"}
                >
                  <Typography
                    fontSize={12}
                    color={"#0A0A0A"}
                    fontWeight={"bold"}
                  >
                    Tạm tính
                  </Typography>
                  <Typography fontSize={12} color={"#dd3333"} fontWeight={600}>
                    {`${convertCurrency(total)}₫`}
                  </Typography>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={2}
                  paddingY={"10px"}
                >
                  <Typography
                    fontSize={12}
                    color={"#0A0A0A"}
                    fontWeight={"bold"}
                  >
                    Giao hàng
                  </Typography>
                  <Typography fontSize={12} color={"#0A0A0A"}>
                    {total < 500000 ? "30,000₫" : "Miễn phí"}
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={2}
                  paddingY={"10px"}
                >
                  <Typography
                    fontSize={12}
                    color={"#0A0A0A"}
                    fontWeight={"bold"}
                  >
                    Tổng
                  </Typography>
                  <Typography fontSize={12} color={"#dd3333"} fontWeight={600}>
                    {`${convertCurrency(
                      total + (total < 500000 ? 30000 : 0)
                    )}₫`}
                  </Typography>
                </Box>
                <Box mt={1} height={"2px"} width={"100%"} bgcolor={"#ddd"} />
                <Box paddingY={"10px"}>
                  <Typography
                    fontSize={14}
                    color={"#0A0A0A"}
                    fontWeight={"bold"}
                  >
                    THANH TOÁN KHI NHẬN HÀNG (COD)
                  </Typography>
                  <Typography mt={1} fontSize={14} color={"#0A0A0A"}>
                    Nhập địa chỉ chính xác để nhận hàng nhé!
                  </Typography>
                </Box>
                {cart?.length > 0 && (
                  <Box>
                    {loading ? (
                      <Box display={"flex"} justifyContent={"center"}>
                        <CircularProgress color="error" />
                      </Box>
                    ) : (
                      <>
                        <Button type="submit">ĐẶT HÀNG</Button>
                        <Box display={"flex"} justifyContent={"center"} mt={1}>
                          <PaypalButtonCustom
                            amount={(total / 24230).toFixed(2)}
                            sx={{ width: "100%", height: 50 }}
                            handleOk={handlePayment}
                          />
                        </Box>
                        {/* 
                        sb-9zw4j34719493@personal.example.com
                        _?Qg8SE^
                        */}
                      </>
                    )}
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default Checkout;
