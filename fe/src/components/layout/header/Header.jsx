import { Box } from "@mui/material";
import React from "react";
import HeaderTop from "./HeaderTop";
import HeaderMenu from "./HeaderMenu";

function Header() {
  return (
    <Box zIndex={999}>
      <HeaderTop />
      <HeaderMenu />
    </Box>
  );
}

export default Header;
