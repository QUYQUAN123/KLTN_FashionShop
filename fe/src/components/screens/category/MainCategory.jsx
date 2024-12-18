import { Box, Grid } from "@mui/material";
import React from "react";
import ButtonLoadMore from "../../common/ButtonLoadMore";
import ProductCard from "../../common/ProductCard";

function MainCategory({ data }) {
  return (
    <Box>
      <Box mt={"6px"}>
        <Grid container spacing={2}>
          {data?.map((e) => (
            <Grid item xs={6} md={3} key={e?._id}>
              <ProductCard item={e} />
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* <Box mt={"6px"} display={"flex"} justifyContent={"center"}>
        <ButtonLoadMore />
      </Box> */}
    </Box>
  );
}

export default MainCategory;
