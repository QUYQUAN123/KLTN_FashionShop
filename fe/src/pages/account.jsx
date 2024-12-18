import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Container, Box, styled, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../utils/api/user";
import { notify } from "../utils/helpers/notify";
import { login } from "../utils/redux/userSlice";
import { InputText } from "../components/common/InputText";

const Button = styled("button")({
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

function Account() {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser(user?._id, {
        name,
        username,
        password,
        phone,
        address,
        email,
      });

      dispatch(login(res.data));
      notify("success", "Cập nhật tài khoản thành công");
    } catch (error) {}
  };

  useEffect(() => {
    if (!user?.username) return navigate("/");
    const getData = async () => {
      try {
        const res = await getUserById(user?._id);
        setName(res?.data?.name);
        setUserName(res?.data?.username);
        setPassword(res?.data?.password);
        setPhone(res?.data?.phone);
        setAddress(res?.data?.address);
        setEmail(res?.data?.email);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
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
            <Box flex={1} component={"form"} onSubmit={handleUpdateInfo}>
              <Typography color={"#dd3333"} fontSize={"20px"} fontWeight={600}>
                THÔNG TIN TÀI KHOẢN
              </Typography>
              <Box mt={"20px"}>
                <Grid container spacing={{ xs: 2, sm: 4 }}>
                  <Grid item xs={12} sm={6}>
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        disabled
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography
                        color={"#222"}
                        fontWeight={500}
                        fontSize={14}
                        mb={"4px"}
                      >
                        Mật khẩu *
                      </Typography>
                      <InputText
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography
                        color={"#222"}
                        fontWeight={500}
                        fontSize={14}
                        mb={"4px"}
                      >
                        Số điện thoại
                      </Typography>
                      <InputText
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography
                        color={"#222"}
                        fontWeight={500}
                        fontSize={14}
                        mb={"4px"}
                      >
                        Địa chỉ
                      </Typography>
                      <InputText
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography
                        color={"#222"}
                        fontWeight={500}
                        fontSize={14}
                        mb={"4px"}
                      >
                        Email khôi phục mật khẩu *
                      </Typography>
                      <InputText
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={"20px"} textAlign={"center"}>
                <Button type="submit">CẬP NHẬT</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default Account;
