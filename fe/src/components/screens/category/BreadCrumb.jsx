import React from "react";
import { Box, Container, Typography, styled } from "@mui/material";
import { IoFilterSharp } from "react-icons/io5";

const BreadCrumbWrap = styled(Box)({
  backgroundImage: "url('../img/category/BreadCrumb.webp')",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
});

const Select = styled("select")({
  backgroundColor: "hsla(0,0%,100%,.2)!important",
  borderColor: "hsla(0,0%,100%,.09)",
  color: "white",
  padding: "12px 12px",
  borderRadius: 99,
  outline: "none",
  fontSize: 14,
});
const Option = styled("option")({
  color: "#000",
});

function BreadCrumb({ toggleFilter, data, filter, setFilter }) {
  return (
    <BreadCrumbWrap>
      <Box bgcolor={"rgba(10,0,0,0.7)"}>
        <Container>
          <Box
            padding={"30px 0px"}
            display={"flex"}
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={2}
          >
            <Box color={"#fff"} sx={{ cursor: "pointer" }}>
              <Typography component={"span"} fontSize={12}>
                TRANG CHỦ /
              </Typography>{" "}
              <Typography component={"span"} fontSize={14} fontWeight={600}>
                {data?.join(" - ")?.toUpperCase()}
              </Typography>
            </Box>
            <Box
              display={{ xs: "flex", sm: "none" }}
              alignItems={"center"}
              gap={1}
              color={"white"}
              onClick={toggleFilter}
            >
              <IoFilterSharp />
              <Typography fontSize={12} fontWeight={600}>
                LỌC
              </Typography>
            </Box>
            <Box>
              <Select
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              >
                <Option value={"1"}>Mới nhất</Option>
                <Option value={"2"}>Thứ tự theo giá: cao đến thấp</Option>
                <Option value={"3"}> Thứ tự theo giá: thấp đến cao</Option>
                <Option value={"4"}>Thứ tự giảm giá: cao đến thấp</Option>
                <Option value={"5"}>Thứ tự giảm giá: thấp đến cao</Option>
              </Select>
            </Box>
          </Box>
        </Container>
      </Box>
    </BreadCrumbWrap>
  );
}

export default BreadCrumb;
