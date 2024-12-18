import { Box, styled } from "@mui/material";
import React from "react";

function HomeCart({ img }) {
  const CardItem = styled(Box)({
    background: "#fff",
    border: "1px solid #c0392b",
    transition: "all 0.3s ease-in-out",
    overflow: "hidden",

    "& .img": {
      transition: "all 0.3s ease-in-out",
    },

    "&:hover": {
      borderColor: "transparent",
      "& .img": {
        transform: "scale(1.15)",
      },
    },
  });

  return (
    <CardItem>
      <Box
        className="img"
        component={"img"}
        src={img}
        display={"block"}
        width={"100%"}
        sx={{ objectFit: "contain" }}
      />
    </CardItem>
  );
}

export default HomeCart;
