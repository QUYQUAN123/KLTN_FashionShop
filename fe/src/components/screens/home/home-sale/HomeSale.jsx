import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import ProductCard from "../../../common/ProductCard";
// import ButtonLoadMore from "../../../common/ButtonLoadMore";

function HomeSale({ data }) {
  return (
    <Container>
      <Box py={"20px"}>
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
            SẢN PHẨM GIẢM GIÁ
          </Typography>
        </Box>
        <Box mt={"6px"}>
          <Grid container spacing={0.5}>
            {data[0]?.product?.map((e) => (
              <Grid item xs={6} md={2} key={e?._id}>
                <ProductCard item={e} />
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* <Box mt={"6px"} display={"flex"} justifyContent={"center"}>
          <ButtonLoadMore />
        </Box> */}
      </Box>
    </Container>
  );
}

export default HomeSale;
