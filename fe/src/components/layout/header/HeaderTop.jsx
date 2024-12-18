import { Box, Container, useMediaQuery } from "@mui/material";
import React from "react";
import HeaderTopPc from "./HeaderTopPc";
import HeaderTopMB from "./HeaderTopMB";

function HeaderTop() {
  const isMoblie = useMediaQuery("(max-width:600px)");
  return (
    <Box bgcolor={"#AD2823"} py={1}>
      <Container>{!isMoblie ? <HeaderTopPc /> : <HeaderTopMB />}</Container>
    </Box>
  );
}

export default HeaderTop;
