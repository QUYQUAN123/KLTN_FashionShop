import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function QandA() {
  return (
    <Box>
      <Typography fontSize={20} color={"#DD3333"} fontWeight={600}>
        CÂU HỎI THƯỜNG GẶP
      </Typography>
      <Box mt={"20px"}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ background: "#F9DBD5" }}
          >
            <Typography fontSize={18}>
              Chính sách bảo hành và đổi trả
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box p={"20px"}>
              <Stack gap={2}>
                <Typography color={"#ed1c24"} fontSize={16} fontWeight={600}>
                  Bảo hành cho tất cả các sản phẩm mua tại shop đủ các điều kiện
                  sau:
                </Typography>
                <Typography fontSize={14}>
                  1.
                  Chỉ bảo hành/sửa chữa các sản phẩm được sản xuất và phân phối bởi  A.Q.
                </Typography>
                <Typography fontSize={14}>2. Sản phẩm bị lỗi do quá trình vận chuyển, 
                  Sản phần  sẽ  được A.Q thu hồi và đổi hàng mới cho khách.</Typography>
                <Typography fontSize={14}>
                  3. Sản phẩm được sử dụng đúng theo hướng dẫn của Nhà sản xuất.
                </Typography>
                <Typography fontSize={14}>
                  4. 1 đổi 1 trong vòng 07 ngày kể từ ngày nhận hàng với các sản
                  phẩm quần áo nếu khách hàng nhận được sản phẩm  nhưng bị lỗi: rách vải, phai màu 
                </Typography>
                <Typography fontSize={14}>
                  5. Chỉ nhận bảo hành/sửa chữa các trường hợp sau.Chỉ Nhận lên hoặc xuống gấu, nới rộng hoặc bóp hẹp ở mức độ đơn giản, đính lại phụ kiện
                </Typography>
              
              </Stack>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ background: "#F9DBD5" }}
          >
            <Typography fontSize={18}>
              Dịch Vụ Giao Hàng Tận Nơi Mất Bao Lâu ? Có cho phép kiểm tra sản phẩm khi lấy hàng không ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box p={"20px"}>
              <Typography fontSize={14}>
                1.Nhân viên đang kiểm tra và sẽ liên hệ tới các bạn sớm nhất có
                thể (chậm nhất trong 01 giờ tới (giờ hành chính))
              </Typography>
              <Typography fontSize={14}>
                2. Khi nhận hàng bạn có thể cùng shiper kiểm tra sản phẩm đã mua có đúng với sản phẩm bạn đã đặt hay chưa?
                </Typography>
              <Typography fontSize={14}>
                Nếu bạn có nhu cầu đổi sản phẩm hoặc ship nhanh vui lòng liên hệ
                Hotline: 0916.00.10.20
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ background: "#F9DBD5" }}
          >
            <Typography fontSize={18}>Làm Sao Để Mua Hàng Tại A.Q</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box p={"20px"}>
              <Typography fontSize={14}>
                Để mua hàng online bạn có thể đặt hàng tại website hoặc liên hệ
                hotline 09.16.00.10.20 (có zalo). Nếu Bạn ở HCM thì đến trực
                tiếp tại Shop để được hỗ trợ mua hàng nhanh nhất
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}
