import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Box, Container, Typography, styled, Button } from "@mui/material";
import { create, loginAccount, loginGoogleAPI } from "../utils/api/user";
import { notify } from "../utils/helpers/notify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputText } from "../components/common/InputText";
import { login } from "../utils/redux/userSlice";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const ButtonAuth = styled("button")({
  border: "none",
  background: "#dd3333",
  fontSize: 16,
  color: "white",
  fontWeight: 600,
  transition: "all .3s ease",
  padding: "10px 20px",

  "&:hover": {
    boxShadow: "inset 0 0 0 100px rgba(0,0,0,.2)",
  },
});

function Auth() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [location, setLocation] = useState("");
  const [provincesData, setProvincesData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const handleReset = () => {
    setUsername("");
    setUserName("");
    setName("");
    setPassword("");
    setPassWord("");
    setPhone("");
    setAddress("");
    setEmail("");
    setConfirmPassword("");
    setProvince("");
    setDistrict("");
    setWard("");
    setLocation("");
  };

  const validateGmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateGmail(email)) {
      return notify("error", "Gmail chưa đúng định dạng.");
    }
    if (password !== confirmPassword) {
      return notify("error", "Mật khẩu không khớp.");
    }
    const provinceName =provincesData.find((p) => p.Id === province)?.Name || "";
    const districtName = districts.find((d) => d.Id === district)?.Name || "";
    const wardName = wards.find((w) => w.Id === ward)?.Name || "";
    const formattedAddress = `${provinceName} - ${districtName} - ${wardName} - ${location}`;
    try {
      const res = await create({
        name,
        username,
        password,
        phone,
        address: formattedAddress,
        email,
      });
      if (res.data?.status === 400) {
        notify("error", res?.data?.message);
      } else {
        notify("success", "Đăng kí tài khoản thành công");
        handleReset();
      }
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAccount({
        username: userName,
        password: passWord,
      });
      if (res.data?.status === 400) {
        notify("error", res?.data?.message);
      } else {
        dispatch(login(res.data));
        notify("success", "Đăng nhập thành công");
        handleReset();
      }
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        );

        const res1 = await loginGoogleAPI({
          name: res.data.name,
          email: res.data.email,
          username: res.data.email.split("@")[0],
        });

        dispatch(login(res1.data));
        notify("success", "Đăng nhập thành công");
      } catch (error) {
        console.log(error);
      }
    },
  });



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
    user?._id && navigate("/");
  }, [user]);

  return (
    <MainLayout>
      <Container>
        <Box py={"40px"}>
          <Box
            display={"flex"}
            gap={8}
            alignItems={"flex-start"}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <Box
              flex={1}
              component={"form"}
              onSubmit={handleLogin}
              width={"100%"}
            >
              <Typography color={"#dd3333"} fontSize={"20px"} fontWeight={600}>
                ĐĂNG NHẬP
              </Typography>
              <Box mt={"20px"}>
                <Box>
                  <Typography
                    color={"#222"}
                    fontWeight={500}
                    fontSize={14}
                    mb={"4px"}
                  >
                    Tên tài khoản *
                  </Typography>
                  <InputText
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Box>

                <Box mt={"20px"}>
                  <Typography
                    color={"#222"}
                    fontWeight={500}
                    fontSize={14}
                    mb={"4px"}
                  >
                    Mật khẩu *
                  </Typography>
                  <InputText
                    type="password"
                    required
                    value={passWord}
                    onChange={(e) => setPassWord(e.target.value)}
                  />
                </Box>
              </Box>
              <Box
                mt={"20px"}
                sx={{ flexDirection: { xs: "column", md: "row" } }}
                display="flex"
                gap={2}
              >
                <ButtonAuth type="submit">ĐĂNG NHẬP</ButtonAuth>
                <Button variant="contained" onClick={loginGoogle}>
                  Login Google
                </Button>
              </Box>
              <Typography
                mt={2}
                sx={{ cursor: "pointer", "&:hover": { color: "#dd3333" } }}
                onClick={() => navigate("/lost-password")}
              >
                Quên mật khẩu ?
              </Typography>
            </Box>
            <Box
              width={"1px"}
              bgcolor={"#ececec"}
              height={300}
              display={{ xs: "none", sm: "block" }}
            />
            <Box
              flex={1}
              component={"form"}
              onSubmit={handleRegister}
              width={"100%"}
            >
              <Typography color={"#dd3333"} fontSize={"20px"} fontWeight={600}>
                ĐĂNG KÝ
              </Typography>
              <Box mt={"20px"}>
                <Box>
                  <Typography
                    color={"#222"}
                    fontWeight={500}
                    fontSize={14}
                    mb={"4px"}
                  >
                    Họ tên *
                  </Typography>
                  <InputText
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>
                <Box mt={"20px"}>
                  <Typography
                    color={"#222"}
                    fontWeight={500}
                    fontSize={14}
                    mb={"4px"}
                  >
                    Tên tài khoản *
                  </Typography>
                  <InputText
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Box>
                <Box mt={"20px"}>
                  <Typography
                    color={"#222"}
                    fontWeight={500}
                    fontSize={14}
                    mb={"4px"}
                  >
                    Email *
                  </Typography>
                  <InputText
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>
                <Box mt={"20px"}>
                  <Typography
                    color={"#222"}
                    fontWeight={500}
                    fontSize={14}
                    mb={"4px"}
                  >
                    Mật khẩu *
                  </Typography>
                  <InputText
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Box>

                <Box>
                  <Typography
                    color={"#222"}
                    fontWeight={500}
                    fontSize={14}
                    mb={"4px"}
                  >
                    Nhập lại mật khẩu *
                  </Typography>
                  <InputText
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                  />
                </Box>
                <Box mt={"20px"}>
                  <Typography
                    color={"#222"}
                    fontWeight={500}
                    fontSize={14}
                    mb={"4px"}
                  >
                    Số điện thoại*
                  </Typography>
                  <InputText
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Box>
                <Box mt={2}>
                <Typography
                    color={"#222"}
                    fontWeight={500}
                    fontSize={14}
                    mb={"4px"}
                  >
                    Địa chỉ*
                  </Typography>
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
                <Box mt={"20px"}>
                  <ButtonAuth type="submit">ĐĂNG KÍ</ButtonAuth>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default Auth;
