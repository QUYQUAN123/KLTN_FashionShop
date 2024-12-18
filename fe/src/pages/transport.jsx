import React, { useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Box, Container, Typography } from "@mui/material";

function Transport() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <MainLayout>
      <Container>
        <Box py={"40px"}>
          <Typography fontSize={36} color={"#0A0A0A"} fontWeight={600}>
            Chính sách vận chuyển
          </Typography>
          <Typography mt={1}>
            Trước khi vận chuyển, bộ phận giao nhận của A.Q sẽ liên lạc với Quý
            khách hàng để hẹn thời gian và địa điểm cụ thể để giao hàng
          </Typography>
          <Typography mt={2.5} fontSize={26} fontWeight={600} color={"#0A0A0A"}>
            1. Dịch vụ ship 
          </Typography>
          <Typography mt={1}>
            Thời gian vận chuyển cụ thể tùy thuộc vào vị trí địa lý từng khu vực
            khác nhau. A.Q ước tính thời gian vận chuyển như sau (không kể Chủ
            nhật, ngày Lễ):
          </Typography>
          <Box pl={2} mt={1}>
            <Typography>
              • <strong>Nội thành:</strong> 1 ngày
            </Typography>
            <Typography mt={1}>
              • <strong>Khu vực miền Bắc - Trung:</strong> 4-5 ngày
            </Typography>
            <Typography mt={1}>
              • <strong>Khu vực miền Nam:</strong> 2-3 ngày
            </Typography>
          </Box>
          <Typography mt={2.5} fontSize={26} fontWeight={600} color={"#0A0A0A"}>
            3. Ưu đãi
          </Typography>
          <Typography mt={1} fontWeight={600}>
            A.Q thực hiện dịch vụ giao nhận miễn phí tận nhà cho khách hàng ở
            tỉnh với các đơn hàng trị giá từ 500.000 đồng trở lên.
          </Typography>
          <Box pl={2} mt={1}>
            <Typography>
              - Freeship hóa đơn trên 500.000 đồng, áp dụng cho các đơn hàng
              theo hình thức ship thường.
            </Typography>
            <Typography mt={1}>
              - Hỗ trợ tối đa 35.000 đồng phí vận chuyển, áp dụng cho các đơn
              hàng trên 500.000 đồng khi khách hàng yêu cầu dịch vụ ship hỏa tốc
              với khu vực nội thành.
            </Typography>
          </Box>
          <Typography mt={1} fontWeight={600} color={"#dd3333"}>
            (* Không áp dụng với các đơn hàng có tổng đơn bao gồm sản phẩm sale)
          </Typography>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default Transport;
