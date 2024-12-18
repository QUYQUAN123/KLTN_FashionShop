import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { InputText } from "../components/common/InputText";
import { ButtonCommon } from "../components/common/ButtonCommon";
import { updateUser } from "../utils/api/user";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "../utils/helpers/notify";

function ResetPassword() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleSendMail = async () => {
    setLoading(true);
    try {
      await updateUser(id, { password });
      notify("success", "Cập nhật mật khẩu mới thành công");
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <MainLayout>
      <Container>
        <Box py={"40px"}>
          <Typography fontSize={14} fontWeight={600}>
            Nhập mật khẩu mới bên dưới.
          </Typography>

          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6}>
              <InputText
                placeholder="Nhập password mới ..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            {Boolean(password) && (
              <Grid item xs={12} sm={6}>
                {loading ? (
                  <CircularProgress color="error" />
                ) : (
                  <ButtonCommon
                    sx={{ height: "100%" }}
                    onClick={handleSendMail}
                  >
                    ĐẶT LẠI MẬT KHẨU
                  </ButtonCommon>
                )}
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default ResetPassword;
