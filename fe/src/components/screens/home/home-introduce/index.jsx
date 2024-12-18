import { Box, Container } from "@mui/material";
import React from "react";
import SwiperIntroduce from "./SwiperIntroduce";
import HomeCategory from "./HomeCategory";

function HomeIntroduce() {
  return (
    <Box
      sx={{
        backgroundImage: "url('../img/home/HomeIntroduce.webp')",
        backgroundPosition: "51% 23%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Container>
        <Box paddingY={"10px"}>
          <SwiperIntroduce />
          {/* <Box mt={"20px"}>
            <HomeCategory />
          </Box> */}
        </Box>
      </Container>
    </Box>
  );
}

export default HomeIntroduce;
