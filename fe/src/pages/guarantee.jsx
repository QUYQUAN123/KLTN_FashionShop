import React, { useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Box, Container, Typography } from "@mui/material";

function Guarantee() {
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
            Chính sách bảo hành
          </Typography>
          <Typography mt={2.5} fontSize={26} fontWeight={600} color={"#0A0A0A"}>
            1. Chính sách của chúng tôi
          </Typography>
          <Typography mt={1}>
            <strong>- Trong vòng 7 ngày đầu </strong> sau khi mua hàng, sản phẩm
            bị lỗi sẽ được đổi mới 100% ( Không áp dụng đổi mới với
            các sản phẩm: Trong chương trình giảm giá )
          </Typography>
          <Typography mt={1}>
            <strong>- Trường hợp không bảo hành được</strong> hoặc thời gian bảo
            hành quá lâu (trên 7 ngày) Quý khách có thể lựa chọn:
          </Typography>
          <Box pl={2} mt={1}>
          <Typography mt={1}>
              • Đổi mới sản phẩm khi sản phẩm bị phai màu trong quá trình sử dụng (thời gian sử dụng dưới 1 tháng).
            </Typography>
            <Typography mt={1}>
              • Nhập lại sản phẩm theo giá thỏa thuận (giá nhập lại sản phẩm
              được tính dựa trên: tình trạng của sản phẩm, phụ kiện, vỏ
              hộp,…và khấu hao thời gian sử dụng).
            </Typography>
          </Box>
          <Typography mt={1} color={"#dd3333"}>
            <strong>- Lưu ý: </strong>
          </Typography>
          <Box pl={2} mt={1}>
            <Typography>
              • Chính sách đổi và nhập lại chỉ áp dụng với sản phẩm bị lỗi do
              hãng sản xuất và đủ điều kiện bảo hành.
            </Typography>
          </Box>
          <Typography mt={2.5} fontSize={26} fontWeight={600} color={"#0A0A0A"}>
            2. Điều kiện bảo hành
          </Typography>
          <Typography mt={1} fontWeight={600}>
            KHÔNG CHẤP NHẬN BẢO HÀNH VỚI CÁC TRƯỜNG HỢP SAU
          </Typography>
          <Typography mt={1}>
            Tất cả các sản phẩm do A.Q bán ra đều tuân thủ điều kiện bảo hành
            của nhà cung cấp, của hãng sản xuất. Các trường hợp sau đây bị coi
            là vi phạm điều kiện bảo hành và không được bảo hành:
          </Typography>
          <Box pl={1} mt={1}>
            <Typography fontWeight={600}>
              1. Chỉ bảo hành/sửa chữa đối với sản phẩm có mức giảm giá dưới 50%
            </Typography>
            <Typography fontWeight={600} mt={1}>
              2. Sản phẩm hết thời hạn bảo hành.
            </Typography>
            <Typography fontWeight={600} mt={1}>
              3. Sản phẩm trong chương trình giảm giá sốc (A.Q sẽ thông báo
              trước cho quý khách)
            </Typography>
            <Typography fontWeight={600} mt={1}>
              4. Sản phẩm bị rách trong quá trình sửa dụng.
            </Typography>
            <Typography fontWeight={600} mt={1}>
              5. Sản phẩm có những tình trạng như sau:
            </Typography>
            <Box pl={1} mt={1}>
              <Typography fontWeight={550}>
                <i>
                  • Sản phẩm đã bị thay đổi kiểu dáng, đã qua sửa chữa ngoài cửa hàng.
                </i>
              </Typography>
              <Typography fontWeight={550} mt={1}>
                <i>
                  • Sản phẩm bị mốc, vải mục, sản phẩm phai màu do sử dụng chất tẩy rửa...
                </i>
              </Typography>
            </Box>

          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default Guarantee;
