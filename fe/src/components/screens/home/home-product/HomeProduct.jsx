import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import ProductCard from "../../../common/ProductCard";
import { useNavigate } from "react-router-dom";

function HomeProduct({ data }) {
  const navigate = useNavigate();
  return (
    <Box mt={"20px"}>
      <Container>
        <Box
          paddingX={"5px"}
          paddingY={{ xs: "10px", sm: "15px" }}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          bgcolor={"#ad2823"}
          borderBottom={"2px solid #ececec"}
        >
          <Typography
            color={"white"}
            fontWeight={500}
            fontSize={{ xs: 12, sm: 16 }}
          >
            {data?.name}
          </Typography>
          <Box
            color={"white"}
            display={"flex"}
            alignItems={"center"}
            gap={"2px"}
            sx={{ cursor: "pointer", "&:hover": { color: "#eeee22" } }}
            onClick={() => navigate(`/category/${data?._id}`)}
          >
            <Typography fontWeight={500} fontSize={{ xs: 12, sm: 16 }}>
              XEM THÊM
            </Typography>
            <MdArrowForwardIos />
          </Box>
        </Box>
        <Box mt={"6px"}>
          <Grid container spacing={0.5}>
            {data?.product?.map((e) => (
              <Grid item xs={6} md={2} key={e?._id}>
                <ProductCard item={e} />
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* <Box mt={"6px"} display={"flex"} justifyContent={"center"}>
          <ButtonLoadMore />
        </Box> */}
      </Container>
    </Box>
  );
}

export default HomeProduct;
