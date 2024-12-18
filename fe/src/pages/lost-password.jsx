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
import { lostPassword } from "../utils/api/user";

function LostPassword() {
  const [isSendMail, setIsSendMail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSendMail = async () => {
    setLoading(true);
    try {
      await lostPassword({ email });
      setIsSendMail(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <MainLayout>
      <Container>
        <Box py={"40px"}>
          {!isSendMail ? (
            <>
              <Typography fontSize={14} fontWeight={600}>
                Quên mật khẩu ? Vui lòng nhập tên đăng nhập hoặc địa chỉ email.
                Bạn sẽ nhận được một liên kết tạo mật khẩu mới qua email.
              </Typography>

              <Grid container spacing={2} mt={1}>
                <Grid item xs={12} sm={6}>
                  <InputText
                    placeholder="Nhập email ..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                {Boolean(email) && (
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
            </>
          ) : (
            <Typography fontSize={14} fontWeight={600}>
              Một thư email khôi phục mật khẩu đã được gửi cho địa chỉ email tài
              khoản của bạn, nhưng có thể sẽ mất vài phút để hiển thị trong
              Inbox của hộp thư. Vui lòng đợi ít nhất 10 phút trước khi gửi một
              yêu cầu khôi phục mật khẩu khác.
            </Typography>
          )}
        </Box>
      </Container>
    </MainLayout>
  );
}

export default LostPassword;
